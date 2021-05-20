/**
 * 计数排序
 * 将数值转化为数组下标，键值为下标为n的元素个数
 * 遍历该数组，则数据已排好序
 * 时间复杂度O(n+k)，空间复杂度O(k)，稳定排序，非原地排序
 * k是临时数组temp的元素个数，如果待排序数组的最大最小值差越大，空间复杂度越高
 * @param array 
 * @returns 
 */
function countSort(array: number[]): number[] {
    const temp = [];

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        temp[element] = temp[element] === undefined ? 1 : temp[element] + 1;
    }

    const res = [];
    for (let i = 0; i < temp.length; i++) {
        let element = temp[i];

        while (element) {
            res.push(i);
            element--;
        }
    }

    return res;
}

const test = [1, 2, 3, 1, 2, 0, 3, 4, 5, 6, 7, 1];

console.log(countSort(test));
