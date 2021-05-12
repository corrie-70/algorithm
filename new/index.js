function newObj(fn, ...args) {
    let obj = {};

    // 执行构造函数，增强obj属性
    const res = fn.call(obj, ...args);

    // 修改obj原型链
    obj.__proto__ = fn.prototype;

    // 如果返回值为非空对象，返回其值
    if (res && (typeof res === 'object' || typeof res === 'function')) {
        return res;
    }

    // 返回新创建的对象
    return obj;
}