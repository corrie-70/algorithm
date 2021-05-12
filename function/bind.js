Function.prototype.mybind = function (context, ...args) {
    const self = this;

    const fNOP = function () { }

    const fBound = function (...args1) {
        return self.call(this instanceof fNOP ? this : context, ...args, ...args1);
    }

    // 使用fNOP中转原型，避免fBound.prototype = this.prototype导致的
    // fBound和this原型执行同一个内存地址，修改fBound会影响原函数的原型链
    fNOP.prototype = self.prototype;
    fBound.prototype = new fNOP();

    return fBound;
}