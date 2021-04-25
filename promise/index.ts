type PromiseType = "pending" | "fulfilled" | "rejected";

class MyPromise<T> {
    private status: PromiseType;
    private value: T;
    private reason?: any;
    /** 执行成功回调 */
    private onFulfilled: Function[] = [];
    /** 执行失败回调 */
    private onRejected: Function[] = [];

    constructor(
        executor: (
            resolve: (value: T) => void,
            reject: (reason?: any) => void
        ) => void
    ) {
        this.status = "pending";
        try {
            executor(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }

    private resolve(value: T) {
        if (this.status === "pending") {
            this.status = "fulfilled";
            this.value = value;
            // 执行成功回调
            this.onFulfilled.forEach((fn) => fn());
        }
    }

    private reject(reason?: any) {
        if (this.status === "pending") {
            this.status = "rejected";
            this.reason = reason;
            // 执行成功回调
            this.onRejected.forEach((fn) => fn());
        }
    }

    private resolvePromise(promise, x, resolve, reject) {
        if (promise === x) {
            reject(new TypeError("Chaining cycle"));
        }
    }

    then(onFulfilled?: Function, onRejected?: Function): MyPromise<T> {
        const fulfilled =
            typeof onFulfilled === "function" ? onFulfilled : (value) => value;
        const rejected =
            typeof onRejected === "function" ? onFulfilled : (reason) => reason;
        const res = new MyPromise<T>((resolve, reject) => {
            if (this.status === "fulfilled") {
                setTimeout(() => {
                    try {
                        const x = fulfilled(this.value);
                        this.resolvePromise(res, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            } else if (this.status === "rejected") {
                setTimeout(() => {
                    try {
                        const x = rejected(this.reason);
                        this.resolvePromise(res, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            } else {
                this.onFulfilled.push(() => {
                    setTimeout(() => {
                        try {
                            const x = fulfilled(this.value);
                            this.resolvePromise(res, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
                this.onRejected.push(() => {
                    setTimeout(() => {
                        try {
                            const x = rejected(this.reason);
                            this.resolvePromise(res, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
            }
        });
        return res;
    }
}

const a = new Promise((resolve) => resolve(1));
