/**
 * topic https://muyiy.cn/question/js/53.html
 */
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

console.log(a.x); // undefined
console.log(b.x); // {n: 2}

// 分析：
// 1、var b = a; 使得b和a都指向同一个变量{n: 1}
// 2、a.x = a = { n: 2 }; .运算的优先级高于赋值运算，先执行a.x = a，会修改堆内存中原{ n: 1 }变量，为其增加x属性，其值为对象a
// 3、再执行a = { n: 2 }; 修改了a变量的指向，使其指向堆内存中新的变量{n: 2}变量，无x属性
// 4、由于b.x执行a，所以指向最新a变量的值