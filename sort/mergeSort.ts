/**
 * 归并排序
 * 把数组一分为二，对两个数组进行归并排序
 * 把两个排序好的数组再排序，最终整个数组排序完成
 * 对数组的归并排序不断分裂数组，直到数组元素个数为2
 * 时间复杂度O(nlogn) 空间复杂度O(n) 稳定排序 非原地排序
 */
function mergeSort(arr: number[]): number[] {
    return mergeRecursiveSort(arr);
}

/**
 * 递归实现分组
 * @param tempArr
 * @returns
 */
function mergeRecursiveSort(tempArr: number[]): number[] {
    const len = tempArr.length;
    if (len <= 1) {
        return tempArr;
    }
    const h = Math.floor(len / 2);
    const tempArr1 = mergeRecursiveSort(tempArr.slice(0, h));
    const tempArr2 = mergeRecursiveSort(tempArr.slice(h));
    return concatArray(tempArr1, tempArr2);
}

/**
 * 迭代实现分组
 * @param tempArr 
 */
// function mergeIterativeSort(tempArr: number[]): number[] {
//     const len = tempArr.length;
//     for (let index = 2; index < len; index += index) {
        
//     }
// }

/**
 * 合并已排序完成的两个数组
 * 返回新的排序数组
 * @param arr1
 * @param arr2
 */
function concatArray(arr1: number[], arr2: number[]): number[] {
    const temp = [];
    let i = 0,
        j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            temp.push(arr1[i]);
            i++;
        } else {
            temp.push(arr2[j]);
            j++;
        }
    }
    if (i < arr1.length) {
        temp.push(...arr1.slice(i));
    }
    if (j < arr2.length) {
        temp.push(...arr2.slice(j));
    }
    return temp;
}

const arr = [9, 3, 40, 23, 42, 13, 1, 33, 6, 5, 7];

console.log(mergeSort(arr));
