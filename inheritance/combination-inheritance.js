function Child(name) {
    Parent.call(this, 20); // 调用父类构造函数
    this.name = name;
}

function Parent(age) {
    this.age = age;
}

Parent.prototype.sayAge = function () {
    console.log(`${this.name} is ${this.age} .`)
}

Child.prototype = new Parent(20);


const a = new Child('jack');
console.log(a.name, a.age);
a.sayAge();