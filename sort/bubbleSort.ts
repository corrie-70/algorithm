/**
 * 冒泡排序
 * 比较相邻元素，如果前值比后值大，则交换元素位置，即保证大值在最后
 * 用内层遍历的索引值做数组元素交换，比较过的位置固定，不用再做比较
 * 时间复杂度O(n2)，空间复杂度O(1)，原地排序
 */
 function bubbleSort(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            }
        }
    }
}

/**
 * 冒泡排序优化
 * 如果遍历一趟，没有发生元素交换，说明数组已排好序，无需继续遍历
 */
function bubbleSortOptimize(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
        let flag = true;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                flag = false;
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            }
        }
        if (flag) {
            break;
        }
    }
}