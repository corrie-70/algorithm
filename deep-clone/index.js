function deepClone(obj) {
    if (typeof obj !== 'object') { return obj; }

    const newObj = obj instanceof Array ? [] : {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        }
    }

    return newObj;
}

const a = {
    b: 1,
    c: {
        a: 1
    }
}

const b = deepClone(a);
a.b = 2;
a.c.a = 3;
console.log('a', a, 'b', b);