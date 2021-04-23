/**
 * 选择排序
 * 每轮遍历选择一个最小元素放在遍历的起始点
 * 两层遍历，选择后面元素中最小的，与当前外层循环指针元素交换
 * 时间复杂度O(n2)，空间复杂度O(1)，原地排序
 */
function selectSort(arr: number[]) {
    for (let i = 0; i < arr.length - 1; ) {
        for (let j = i + 1; j < arr.length; ) {
            if (arr[j] < arr[i]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            j++;
        }
        i++;
    }
}
