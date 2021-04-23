/**
 * 插入排序
 * 选取元素插入到已局部排序的数组前面项
 * 内层遍历时，数组元素比待比较值大的，往后移一位
 * 时间复杂度O(n2)，空间复杂度O(1)，原地排序
 */
 function insertSort(arr: number[]) {
    for (let i = 1; i < arr.length; i++) {
        const temp = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = temp;
    }
}