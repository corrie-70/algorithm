const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
    // promise默认状态
    this.status = PENDING;

    // 状态为fulfilled时，必须有一个value值
    this.value = null;
    // fulfilled回调数组
    this.onFulfilledCallbacks = [];

    // 状态为rejected，必须有失败原因
    this.reason = null;
    // rejected回调数组
    this.onRejectedCallbacks = [];

    var self = this; //保存this

    function resolve(value) {
        // 只能由pending转换为fulfilled状态
        if (self.status === PENDING) {
            self.status = FULFILLED;
            self.value = value;

            // 取出fulfilled回调，依次执行
            self.onFulfilledCallbacks.forEach(fn => fn());
        }
    }

    function reject(reason) {
        // 只能由pending转换为rejected状态
        if (self.status === PENDING) {
            self.status = REJECTED;
            self.reason = reason;

            // 取出rejected回调，依次执行
            self.onRejectedCallbacks.forEach(fn => fn());
        }
    }

    // 执行executor使用throw抛出异常
    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    // onFulfilled必须是函数类型，如果不是，给一个默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected必须是函数类型，如果不是，给一个默认函数
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    let self = this;

    let promise2 = new Promise((resolve, reject) => {

        // 在promise状态为fulfilled时，调用onFulfilled
        if (self.status === FULFILLED) {
            // onFulfilled是微任务，此处用setTimeout模拟
            setTimeout(() => {
                try {
                    const x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            }, 0);
        }

        // 在promise状态为rejected时，调用onRejected
        if (self.status === REJECTED) {
            // onRejected是微任务
            setTimeout(() => {
                try {
                    const x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            }, 0);
        }

        // 在promise状态为pending时，将回调推入数组，等待状态转变后，被依次执行
        if (self.status === PENDING) {
            this.onFulfilledCallbacks.push(function () {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            });

            this.onRejectedCallbacks.push(function () {
                setTimeout(() => {
                    try {
                        const x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            });
        }

    });

    // then 必须返回一个promise
    return promise2;
}

function resolvePromise(promise, x, resolve, reject) {
    // 如果promise和x相等，抛出TypeError
    if (promise === x) {
        reject(new TypeError('chaining cycle'));
    }

    if (x && typeof x === 'object' || typeof x === 'function') {
        let called = false;

        try {
            let then = x.then;

            // 如果then为函数，即为promise
            if (typeof then === 'function') {
                // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 都调用了，那么第一个调用优先，后面的调用忽略。
                then.call(x, function (y) {
                    if (called) return;
                    called = true;

                    resolvePromise(promise, y, resolve, reject);
                }, function (r) {
                    if (called) return;
                    called = true;

                    reject(r);
                });

                return;
            }

            resolve(x);
        } catch (error) {
            // 2.3.3.3.4 如果调用then抛出异常，如果 resolvePromise 或 rejectPromise 已经被调用，那么忽略
            if (called) return;

            reject(error);
        }

        return;
    }

    resolve(x);
}

Promise.resolve = function (param) {
    // 如果参数为promise对象，返回该对象
    if (param instanceof Promise) {
        return param;
    }

    // 如果是thenable对象，返回的promise会跟随该对象，采用其最终状态
    return new Promise((resolve, reject) => {
        if (param && param.then && typeof then === 'function') {
            setTimeout(() => {
                param.then(resolve, reject);
            }, 0);
        } else {
            resolve(param);
        }
    })
}

Promise.reject = function (param) {
    return new Promise((resolve, reject) => {
        reject(param);
    })
}

Promise.prototype.catch = function (onRejected) {
    // 返回新的promise，是特殊的then方法
    return this.then(null, onRejected);
}

Promise.prototype.finally = function (onFinally) {
    // 返回值为promise，不管成功或失败都会执行onFinally
    // 还能继续then，所以需要传递promise状态
    return this.then(
        // 执行onFinally函数后，继续传递原promise参数和状态
        value => Promise.resolve(onFinally()).then(() => value),
        reason => Promise.resolve(onFinally()).then(() => { throw reason })
    );
}

Promise.all = function (array) {
    // 返回一个promise，如果传入数组元素状态全部成功，则resolve，value为数组的resolve value数组
    // 如果有一个元素状态为失败，则reject，reason为该元素失败原因
    return new Promise((resolve, reject) => {
        const res = [];

        // 数组长度为空，同步resolve
        if (array.length === 0) { return resolve(res) }

        for (let index = 0; index < array.length; index++) {
            const element = array[index];

            // 元素可能不是promise对象，需要Promise.resolve处理
            // 数组长度不为空，在then回调内resolve
            Promise.resolve(element).then(
                value => {
                    res[index] = value;
                    if (index + 1 === array.length) {
                        resolve(res);
                    }
                },
                reason => {
                    reject(reason);
                    return;
                });
        }
    })
}

Promise.race = function (array) {
    // 返回率先改变的promise实例的状态值，并由此确定race的promise状态
    return new Promise((resolve, reject) => {

        if (array.length === 0) { return }

        for (let index = 0; index < array.length; index++) {
            const element = array[index];

            Promise.resolve(element).then(value => {
                resolve(value);
                return;
            }, reason => {
                reject(reason);
                return;
            });
        }
    });
}

Promise.any = function (array) {
    // 与all相反，只要有一个状态为成功，则返回成功
    // 如果全部失败，返回失败数组
    return new Promise((resolve, reject) => {
        const err = [];

        for (let index = 0; index < array.length; index++) {
            const element = array[index];

            Promise.resolve(element).then(
                value => {
                    resolve(value);
                    return;
                },
                reason => {
                    err.push(new Error(reason));

                    if (index + 1 === array.length) {
                        reject(err);
                    }
                }
            );
        }
    })
}

Promise.allSettled = function (array) {
    return new Promise((resolve, reject) => {
        const res = [];

        for (let index = 0; index < array.length; index++) {
            const element = array[index];

            const p = Promise.resolve(element).then(
                value => {
                    res.push(1);
                    console.log(index)
                    if (index + 1 === array.length) {
                        return resolve(res);
                    }
                },
                reason => {
                    res.push(1);
                    console.log(index)

                    if (index + 1 === array.length) {
                        return resolve(res);
                    }
                }
            )
        }
    })
}

// for promises-aplus-tests
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

module.exports = Promise;


// const t = new Promise((resolve, reject) => {
//     console.log('promise execute t start');
//     const b = new Promise((res, rej) => {
//         console.log('promise execute b start');
//         rej('my pb');
//         console.log('promise execute b end');
//     });
//     console.log('before res b', b);
//     resolve(b);
//     console.log('promise execute t end');
//     // reject(2);
// });
// const bt = t.then((res) => { throw Error(res) }, rej => console.log('rej', rej));
// console.log(t);
// console.log('bt', bt);
// // const a = bt.then(res => console.log('res', res), rej => console.log('rej', rej))
// setTimeout(() => {
//     console.log('t', t);
//     console.log('bt1', bt);
// }, 0);

// Promise.race([
//     new Promise((resolve, reject) => { setTimeout(() => { resolve(100) }, 1000) }),
//     undefined,
//     new Promise((resolve, reject) => { setTimeout(() => { reject(100) }, 100) })
// ]).then((data) => {
//     console.log('success ', data);
// }, (err) => {
//     console.log('err ', err);
// });

Promise.allSettled([
    new Promise((resolve, reject) => { setTimeout(() => { resolve(100) }, 100) }),
    new Promise((resolve, reject) => { setTimeout(() => { reject(200) }, 200) }),
    new Promise((resolve, reject) => { setTimeout(() => { reject(100) }, 100) })
]).then((data) => {
    console.log('success ', data);
}, (err) => {
    console.log('err ', err);
});