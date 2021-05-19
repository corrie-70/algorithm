function distinct1(array) {
    return [...new Set(array)];
}

function distinct2(array) {
    const res = [];
    array.forEach(element => {
        if (res.indexOf(element) === -1) {
            res.push(element);
        }
    });
    return res;
}

// 排序后比较相邻元素
function distinct3(array) {
    const sortedArr = array.concat().sort();

    let previous, res = [];

    sortedArr.forEach(element => {
        if (element !== previous) {
            res.push(element);
        }

        previous = element;
    });

    return res;
}

const arr = [1, 1, 2, 3, 4, 3, 2, 4, 5, 6, 3, 1, 7, 8, 9, 5];

console.log('distinct1', distinct1(arr));
console.log('distinct2', distinct2(arr));
console.log('distinct3', distinct3(arr));