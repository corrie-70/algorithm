/**
 * 快速排序
 * 基于冒泡排序的优化，采用分治思想，冒泡排序遍历一趟确定一个元素的位置
 * 快速排序遍历一趟确定基准元素的位置，以及划分左区和右区
 * 左区元素都小于基准，右区元素都大于基准，递归两区，直到区中元素为1
 * 时间复杂度O(nlogn)，非稳定排序，原地排序
 */
function quickSort(arr: number[]) {
    partion(arr, 0, arr.length - 1);
}

function partion(arr: number[], left: number, right: number): number {
    let index = left;

    const pivot = arr[index];

    while (left !== right) {
        while (left !== right) {
            if (arr[right] < pivot) {
                arr[index] = arr[right];
                index = right;
                left++;
                break;
            } else {
                right--;
            }
        }

        while (left !== right) {
            if (arr[left] > pivot) {
                arr[index] = arr[left];
                index = left;
                right--;
                break;
            } else {
                left++;
            }
        }
    }

    arr[index] = pivot;

    return index;
}

// console.log(partion([4, 7, 6, 5, 3, 2, 8, 1]));
