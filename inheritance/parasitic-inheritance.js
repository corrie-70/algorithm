function object(proto) {
    function F() { };
    F.prototype = proto; // 原型对象
    return new F();
}

function inheritePrototype(child, parent) {
    let proto = object(parent.prototype); // 参数为parent.prototype
    proto.constructor = child;
    child.prototype = proto;
}

function Child(name, age) {
    Parent.call(this, age); // 调用父类构造函数
    this.name = name;
}

function Parent(age) {
    this.age = age;
}

Parent.prototype.sayAge = function () {
    console.log(`${this.name} is ${this.age} .`)
}

inheritePrototype(Child, Parent);

const a = new Child('jack', 20);
console.log(a.name, a.age);
a.sayAge();