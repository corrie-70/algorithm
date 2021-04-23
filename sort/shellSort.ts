/**
 * 希尔排序
 * 插入排序的变种，当最大元素在数组第一位时，挪动到正确位置需要n-1次移动
 * 为了加快速度，改进了插入排序，交换不相邻元素对数组进行局部排序
 * 思想：采用插入排序的思想，先让数组间隔为h的元素有序，
 * h从n/2，到n/4，直到缩小为1
 * 此时数组中任意间隔为1的元素有序，即数组有序
 * 时间复杂度O(nlogn) 空间复杂度O(n) 非稳定排序 原地排序
 */
 function shellSort(arr: number[]) {
    let h = Math.floor(arr.length / 2);
    while (h > 0) {
        for (let i = h; i < arr.length; i++) {
            const temp = arr[i];
            let j = i - h;
            while (j >= 0 && arr[j] > temp) {
                arr[j + h] = arr[j];
                j -= h;
            }
            arr[j + h] = temp;
        }
        h = Math.floor(h / 2);
    }
}