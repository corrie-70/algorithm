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
