function curry(fn, args) {
    let length = fn.length;

    args = args || [];

    return function (...args1) {
        // 组合所有传递过的参数
        const params = args.concat(args1);

        if (params.length < length) {
            // 如果参数个数不够，不足以执行原函数，则继续curry
            return curry.call(this, fn, params);
        } else {
            // 参数完整，执行原函数
            return fn.apply(this, params);
        }
    }
}

function add(a, b, c) {
    return a + b + c;
}

var add1 = curry(add);

console.log(add1(1, 2, 3));
console.log(add1(1)(2)(3));