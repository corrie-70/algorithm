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