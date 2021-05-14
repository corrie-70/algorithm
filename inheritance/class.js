class Parent {
    constructor(age) {
        this.age = age;
    }

    sayAge() {
        console.log(`${this.name} is ${this.age} .`)
    }
}

class Child extends Parent {
    constructor(name, age) {
        super(age);
        this.name = name;
    }
}

const a = new Child('jack', 20);
console.log(a.name, a.age);
a.sayAge();

// ES6 class 继承的简要原理代码

// 继承原型链方法和属性
Es6Array.prototype = Object.create(Array.prototype, {
    constructor: Array
})
Es6Array.__proto__ = Array;

// 创建父类实例，指定其构造函数
var _Super = function () {
    return Reflect.construct(Array, arguments, Es6Array);
}

function Es6Array() {
    var _this;
    // 执行父类构造函数，创建父类实例
    _this = _Super.call(this); 

    // 子类属性赋值
    // ...

    // 有返回值的构造函数
    return _this;
}

const b = new Es6Array();
b[0] = '1';
console.log(b);
console.log(b.length);
b.length = 0;
console.log(b);