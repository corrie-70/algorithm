# 排序算法

## 选择排序

将数组划分位无序区和有序区，每趟遍历选取出比较数值选取最小或最大值固定在有序区，直到有序区达到数组长度，排序完成。

### 简单选择排序

选取最值的方法通过遍历比较实现

```js
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
```

### 堆排序

选取最值的方法通过堆实现。堆分为大根堆和小根堆，大根堆是指，每个父节点的值都大于子节点的值。堆排序首先要构建初始堆，再选择根节点放入有序区，再调节无序区数组是其仍是大根堆。依次执行，直到有序区达到数组长度，排序完成。

```js
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
```

## 插入排序

将数组划分为无序区和有序区，此处有序区是局部有序并非全部有序，元素的位置不代表已经是其最终排序位置（选择排序的有序区是全局有序）。每趟遍历将无序区元素插入到有序区正确位置，会产生整个数组元素位置调整，最终直到有序区达到数组长度，排序完成。

### 直接插入排序

插入排序的直接实现，未进行优化。

```js
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
```

### 希尔排序

插入排序的一种，对直接插入排序进行了优化。为了减少直接插入排序中元素的移动次数，将数组划分为子序列进行直接插入排序，划分的方法是选取元素为 h/2，h/4，直到 h=1 的子序列。

```js
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
```

## 交换排序

对于数组中两个元素，如果其排序顺序与结果相反，将其交换。

### 冒泡排序

将数组分为有序区和无序区，一趟排序确定一个值的位置，其有序区是全局有序，一旦元素位置被确定，其位置在之后的排序中不会被更改。

```js
function bubbleSort(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            }
        }
    }
}
```

### 快速排序

对冒泡排序有所改进，以数组第一个元素为基准，一趟遍历后，确认元素的最终排序位置，并且元素左边的子序列都小于基准，右侧子序列都大于该基准。即一趟排序后，不仅确定了元素位置，也对数组做了分区，采取了分治法思想。再分别对左右子序列进行递归，直到序列长度为 1，数组排序完成。

```js
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
```

## 归并排序

将两个有序的子序列合并为一个有序序列。

```js
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
```

## 计数排序

将数组的值作为数组下标保存在临时数组中，遍历此临时数组，得到的即是排序完成的数组。

```js
function countSort(array: number[]): number[] {
    const temp = [];

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        temp[element] = temp[element] === undefined ? 1 : temp[element] + 1;
    }

    const res = [];
    for (let i = 0; i < temp.length; i++) {
        let element = temp[i];

        while (element) {
            res.push(i);
            element--;
        }
    }

    return res;
}
```

## 桶排序

使用 10 个桶分区存储数组数据，根据数组最大、最小值的差，能得到每个桶存储元素值的范围，遍历数组，将元素归入对应的桶，堆桶中元素进行排序，最后依次遍历各个桶，组合其内元素，得到排序完成的数组。这种算法作为基数排序的前身，并不单独使用。

```js
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
```

## 基数排序

基数是指数值进制数，一般是十进制排序，所以桶数为 10。根据数组最大元素的长度，遍历数组元素，按照个十百千的顺序，每趟遍历确认元素在对应位置的排序，将其作为新数组又传入十位排序中，则遍历数达到最大元素长度时，数组排序完成。

```js
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
```

## 参考文献

[必学十大经典排序算法，看这篇就够了](https://zhuanlan.zhihu.com/p/57088609)

[漫画：什么是快速排序？](https://www.cxyxiaowu.com/5262.html)

[数据结构](https://www.icourse163.org/learn/WHU-1001539003?tid=1002049010#/learn/content?type=detail&id=1002711952&cid=1003019863&replay=true)
