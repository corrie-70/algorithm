/**
 * 堆排序
 * 选择排序的优化排序算法
 * 构建大顶堆，得到当前数组最大值，将其交换至末尾，固定其值
 * 剩余数组元素继续构建大顶堆，得到第二大值，固定其位置
 * @param array
 */
function heapSort(array: number[]): number[] {
    adjustHeapPeak(array);
    return [];
}

/**
 * 调整大顶堆数组
 * 元素的子节点序号为 2*index+1，2*index+2
 * 数组最后一个非叶子节点 array.length / 2 - 1
 * @param array
 */
function adjustHeapPeak(array: number[]): number {
    const lastParentIndex = Math.floor(array.length / 2) - 1;

    // 比较父节点与叶子节点大小，得到三个元素中最大值的索引
    let switchIndex = lastParentIndex;
    if (array[switchIndex] < array[2 * lastParentIndex + 1]) {
        switchIndex = 2 * lastParentIndex + 1;
    }
    if (array[switchIndex] < array[2 * lastParentIndex + 2]) {
        switchIndex = 2 * lastParentIndex + 2;
    }

    // 交换最大值到顶点
    [array[lastParentIndex], array[switchIndex]] = [
        array[switchIndex],
        array[lastParentIndex],
    ];

    return lastParentIndex;
}

const test = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(adjustHeapPeak(test));
console.log(test);