/**
 * 基数排序（以10为基数）
 * 建立10个块（桶），存放对应的数值
 * 按桶值对数组从个位到十、百千等位的排序
 * @param array
 */
function radixSort(array: number[]): number[] {
  let res = array.slice(),
    bucketArr = new Array(10),
    max = array[0];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    if (max < element) {
      max = element;
    }
  }

  let maxLength = String(max).length;

  for (let i = 0; i < maxLength; i++) {
    for (let j = 0; j < res.length; j++) {
      // 获取指定位的数值
      const element = Math.floor(res[j] / Math.pow(10, i)) % 10;

      if (!bucketArr[element]) {
        bucketArr[element] = [];
      }
      bucketArr[element].push(res[j]);
    }

    res = [];
    // 根据bucketArr计算出新的array，一趟基数排序后生成新的数组顺序
    for (let m = 0; m < 10; m++) {
      res.push(...bucketArr[m]);
    }

    bucketArr = [];
  }

  return res;
}

const arr = [9, 3, 40, 23, 42, 13, 1, 33, 6, 5, 7];
console.log(radixSort(arr));
