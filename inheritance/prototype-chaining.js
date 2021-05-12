function Child(name) {
    this.name = name;
}

function Parent(age) {
    this.age = age;
}

Parent.prototype.sayAge = function () {
    console.log(`${this.name} is ${this.age} .`)
}

Child.prototype = new Parent(20); // 继承父类原型链上的属性和方法


const a = new Child('jack');
console.log(a.name, a.age);
a.sayAge();