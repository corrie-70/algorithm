/**
 * topic https://muyiy.cn/question/js/33.html
 */
// var b = 10;
// (function b(){
//     b = 20;
//     console.log(b);  // [Function b]
// })();

// 分析：该IIFE函数为非匿名，在对b赋值时，在作用域链找到此非匿名IIFE函数定义的函数，
// 但是非匿名IIFE函数的函数名只读，无法修改，所以此处静默报错
// 如果在严格模式会抛出Uncaught TypeError: Assignment to constant variable

/**
 * topic https://muyiy.cn/question/js/34.html
 */
// var b = 10;
// (function (){
//     b = 20;
//     console.log(b);  // 20
// })();

var b = 10;
(function b(){
    b = 20;
    console.log(this.b);  // 10 node环境输出undefined，浏览器环境输出10
})();
