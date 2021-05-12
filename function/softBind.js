Function.prototype.softBind = function (context, ...args) {
    const self = this;

    const fNOP = function () { }

    const fBound = function (...args1) {
        return self.call(!self || this === (window || globalThis ? context : this), ...args, ...args1);
    }

    fNOP.prototype = self.prototype;
    fBound.prototype = new fNOP();

    return fBound;
}