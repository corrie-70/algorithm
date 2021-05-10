function MyPromise(executor) {
    this.status = "pending";
    this.value = null;
    this.reason = null;

    /** 执行成功回调 */
    this.onFulfilledCallbacks = [];
    /** 执行失败回调 */
    this.onRejectedCallbacks = [];

    var self = this;

    function resolve(value) {
        if (self.status === "pending") {
            self.status = "fulfilled";
            self.value = value;

            // 执行成功回调
            self.onFulfilledCallbacks.forEach(fn => fn(self.value));
        }
    };

    function reject(reason) {
        if (self.status === "pending") {
            self.status = "rejected";
            self.reason = reason;
            // 执行成功回调
            self.onRejectedCallbacks.forEach(fn => fn(self.reason));
        }
    };

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        reject(new TypeError("Chaining cycle"));
    }

    if (x && typeof x === "object" || typeof x === "function") {
        var used = false;

        try {
            var thenable = x.then;
            
            if (typeof thenable === "function") {
                // x为promise
                thenable.call(x, function (y) {
                    if (used)
                        return;
                    used = true;
                    resolvePromise(promise, y, resolve, reject);
                }, function (r) {
                    if (used)
                        return;
                    used = true;
                    reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (error) {
            if (used)
                return;

            reject(error);
        }
    } else {
        resolve(x);
    }
};

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
    onRejected = typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
        };

    var self = this;

    var promise2 = new MyPromise(function (resolve, reject) {
        if (self.status === "fulfilled") {
            setTimeout(function () {
                try {
                    var x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                }
                catch (error) {
                    reject(error);
                }
            }, 0);
        }
        if (self.status === "rejected") {
            setTimeout(function () {
                try {
                    var x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                }
                catch (error) {
                    reject(error);
                }
            }, 0);
        }
        if (self.status === "pending") {
            self.onFulfilledCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        var x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (error) {
                        reject(error);
                    }
                }, 0);
            });

            self.onRejectedCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        var x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (error) {
                        reject(error);
                    }
                }, 0);
            });
        }
    });
    return promise2;
};

// for promises-aplus-tests
MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {};
    dfd.promise = new MyPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

module.exports = MyPromise;