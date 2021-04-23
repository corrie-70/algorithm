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

    then() {}
}

const a = new Promise((resolve) => resolve(1));
