/**
 * 快速排序
 * 基于冒泡排序的优化，采用分治思想，冒泡排序遍历一趟确定一个元素的位置
 * 快速排序遍历一趟确定基准元素的位置，以及划分左区和右区
 * 左区元素都小于基准，右区元素都大于基准，递归两区，直到区中元素为1
 * 时间复杂度O(nlogn)，非稳定排序，原地排序
 */
function quickSort(arr: number[]) {
    _quickSort(arr, 0, arr.length - 1);
}

function _quickSort(arr: number[], startIndex: number, endIndex: number) {
    if (endIndex <= startIndex) {
        return [];
    }

    const pivotIndex = partion(arr, startIndex, endIndex);

    _quickSort(arr, startIndex, pivotIndex - 1);
    _quickSort(arr, pivotIndex + 1, endIndex);
}

function partion(arr: number[], startIndex: number, endIndex: number): number {
    // return holePartion(arr, startIndex, endIndex);
    return pointerPartion(arr, startIndex, endIndex);
}

/**
 * 挖坑法分区定基准位置
 * @param arr
 * @param left
 * @param right
 * @returns
 */
function holePartion(
    arr: number[],
    startIndex: number,
    endIndex: number
): number {
    let index = startIndex,
        left = startIndex,
        right = endIndex;

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

/**
 * 指针法定分区、基准位置
 * @param arr
 * @param left
 * @param right
 */
function pointerPartion(
    arr: number[],
    startIndex: number,
    endIndex: number
): number {
    let left = startIndex,
        right = endIndex;

    const pivot = arr[left];

    while (left !== right) {
        while (left < right && arr[right] > pivot) {
            right--;
        }

        while (left < right && arr[left] <= pivot) {
            left++;
        }

        if (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
        }
    }

    [arr[left], arr[startIndex]] = [arr[startIndex], arr[left]];

    return left;
}

const test = [4, 7, 6, 5, 3, 2, 8, 1];
quickSort(test);

console.log(test);
