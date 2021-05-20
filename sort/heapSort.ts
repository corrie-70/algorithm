/**
 * 堆排序
 * 选择排序的优化排序算法
 * 首先是写筛选算法，然后是将无序序列构建为大顶堆
 * 构建思路是从最后一个非叶子节点开始筛选，逐级向上，递归调用筛选算法
 * 这样就满足了筛选算法的前提，即左右子树已经是大顶堆数组
 * 最后是将筛选出的大值固定至数组尾部，再重新对无序区进行筛选
 * 由于只交换了顶部值，所以再做一次筛选即可构建新的大顶堆
 * 时间复杂度O(nlogn)，空间复杂度O(1)，原地排序，非稳定排序
 * @param array
 */
function heapSort(array: number[]) {
    const len = array.length;

    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        sift(array, i, len - 1);
    }

    for (let j = len - 1; j >= 1; j--) {
        [array[0], array[j]] = [array[j], array[0]];
        sift(array, 0, j - 1);
    }
}

/**
 * 筛选算法建堆
 * 假设左子树和右子树都满足大顶堆定义，调整顶部元素到合适位置
 * @param array
 * @param low 顶部元素索引
 * @param high 末尾元素索引
 */
function sift(array: number[], low: number, high: number) {
    let i = low,
        j = 2 * i + 1,
        temp = array[i];

    while (j <= high) {
        if (j + 1 <= high && array[j + 1] > array[j]) {
            j++;
        }

        if (temp < array[j]) {
            array[i] = array[j];
            i = j;
            j = 2 * i + 1;
        } else {
            break;
        }
    }

    array[i] = temp;
}

const test = [4, 7, 6, 5, 3, 2, 8, 1];

heapSort(test);
console.log("test", test);
