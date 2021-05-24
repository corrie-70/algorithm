var a = 10;
(function () {
    console.log(a); // undefined
    a = 5;
    console.log(window.a); // 10
    // 变量提升到IIFE函数作用域
    var a = 20;
    console.log(a); // 20
})()