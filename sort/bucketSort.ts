/**
 * 桶排序
 * 先遍历记录数组最大、最小值，再将中间的区间划分为10个桶
 * 将元素放入各自对应的桶，最后再对桶内元素进行排序
 * 最后再对各个桶合并排序
 * @param array
 */
function bucketSort(array: number[]): number[] {
  let max = array[0],
    min = array[0],
    res = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element > max) {
      max = element;
    } else if (element < min) {
      min = element;
    }
  }

  const span = max - min;
  const bucketArr = [];

  // 第i桶存放5*i～5*(i+1)-1范围内的数值
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    const count = Math.floor((element - min) / span);
    if (!bucketArr[count]) {
      bucketArr[count] = [];
    }
    bucketArr[count].push(element);
  }
  console.log("bucketArr", bucketArr);
  for (let i = 0; i < bucketArr.length; i++) {
    // 对桶内元素进行快速排序或归并排序
    const element = bucketArr[i];

    element.sort((a, b) => a - b);
  }

  for (let i = 0; i < bucketArr.length; i++) {
    const element = bucketArr[i];

    for (let j = 0; j < element.length; j++) {
      res.push(element[j]);
    }
  }

  return res;
}

const arr = [9, 3, 40, 23, 42, 13, 1, 33, 6, 5, 7];

console.log(bucketSort(arr));
