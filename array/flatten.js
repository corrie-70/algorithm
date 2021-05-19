function flatten(array) {
    const res = [];

    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        if (element instanceof Array) {
            res.push(...flatten(element));
        } else {
            res.push(element)
        }
    }

    return res;
}

function flatten1(array) {
    return array.reduce((acu, cur) => {
        return acu.concat(Array.isArray(cur) ? flatten1(cur) : cur)
    }, []);
}

function flatten2(array) {
    while (array.some(item => Array.isArray(item))) {
        array = [].concat(...array);
    }

    return array;
}

const test = [1, 2, [3, 4, [5]]];

console.log(flatten(test));
console.log(flatten2(test));