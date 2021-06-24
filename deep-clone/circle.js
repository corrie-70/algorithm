/**
 * 支持循环引用的深拷贝实现
 * 思想：用Map或者数组缓存递归过的对象键值
 * 键值优先从缓存读取
 * @param {*} obj 
 */
function deepCloneCircle(param) {
    const map = new Map();

    function _deepCloneCircle(source) {
        if (!isObject(source)) {
            return;
        }

        const obj = Array.isArray(source) ? [] : {};

        if (map.has(source)) {
            return map.get(source);
        }

        map.set(source, source);

        for (const key in source) {
            if (Object.hasOwnProperty.call(source, key)) {
                obj[key] = isObject(source[key]) ? _deepCloneCircle(source[key]) : source[key];
            }
        }

        return obj;
    }

    return _deepCloneCircle(param);
}

function isObject(obj) {
    return !!obj && typeof obj === 'object';
}

/**
 * 方式二，map作为参数传递，不使用闭包
 * @param {*} source 
 * @param {*} map 
 * @returns 
 */
function deepCloneCircle2(source, map = new WeakMap()) {
    if (!isObject(source)) {
        return;
    }

    if (map.has(source)) {
        return map.get(source);
    }

    const obj = Array.isArray(source) ? [] : {};
    map.set(source, obj);

    for (const key in source) {
        if (Object.hasOwnProperty.call(source, key)) {
            obj[key] = isObject(source[key]) ? deepCloneCircle(source[key], map) : source[key];
        }
    }

    return obj;
}

let a = {
    b: 1,
    c: 2,
}

a.d = a;

let b = deepCloneCircle2(a);

console.log(b);