function MyPromise(executor) {
    this.status = "pending";
    this.value = null;
    this.reason = null;

    /** 执行成功回调 */
    this.onFulfilled = [];
    /** 执行失败回调 */
    this.onRejected = [];

    var _this = this;

    function resolve(value) {
        if (_this.status === "pending") {
            _this.status = "fulfilled";
            _this.value = value;

            // 执行成功回调
            _this.onFulfilled.forEach(fn => fn(_this.value));
        }
    };

    function reject(reason) {
        if (_this.status === "pending") {
            _this.status = "rejected";
            _this.reason = reason;
            // 执行成功回调
            _this.onRejected.forEach(fn => fn(_this.reason));
        }
    };

    try {
        executor(resolve, reject);
    }
    catch (e) {
        reject(e);
    }
}

function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        reject(new TypeError("Chaining cycle"));
    }
    if (x && (typeof x === "object" || typeof x === "function")) {
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
                if (used)
                    return;
                used = true;
                resolve(x);
            }
        } catch (error) {
            if (used)
                return;
            used = true;
            reject(error);
        }
    }
    else {
        resolve(x);
    }
};

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    var fulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
    var rejected = typeof onRejected === "function"
        ? onFulfilled
        : (reason) => {
            throw reason;
        };

    var _this = this;

    var promise2 = new MyPromise(function (resolve, reject) {
        if (_this.status === "fulfilled") {
            setTimeout(function () {
                try {
                    var x = fulfilled(_this.value);
                    resolvePromise(promise2, x, resolve, reject);
                }
                catch (error) {
                    reject(error);
                }
            }, 0);
        }
        if (_this.status === "rejected") {
            setTimeout(function () {
                try {
                    var x = rejected(_this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                }
                catch (error) {
                    reject(error);
                }
            }, 0);
        }
        if(_this.status === "pending") {
            _this.onFulfilled.push(function () {
                setTimeout(function () {
                    try {
                        var x = fulfilled(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (error) {
                        reject(error);
                    }
                }, 0);
            });
            _this.onRejected.push(function () {
                setTimeout(function () {
                    try {
                        var x = rejected(_this.reason);
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

MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {};
    dfd.promise = new MyPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

module.exports = MyPromise;