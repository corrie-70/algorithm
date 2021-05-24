/**
 * topic https://muyiy.cn/question/js/46.html
 */
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1);
// obj.push(2);
console.log(obj); // [,,1,2]

// 分析：
// 1、成为类数组元素条件，有length属性、splice方法
// 2、push 方法只认length属性，追加值的位置由其确定，不会被类数组的数值键影响
// 3、由2可知，此处只push一个，length为3，obj[2]为1，‘3’的值存在可理解为数组的属性，arr.name = 3
// 4、打印时，由于obj具有类数组属性，浏览器会显示为数组，但是node是作为对象

const arr = [];

arr[2] = 3;
arr.push(4);

console.log(arr);