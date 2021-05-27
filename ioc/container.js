class Container {
    constructor() {
        this.bindMap = new Map();
    }

    registerInstance(identifier, registerClass, args) {
        this.bindMap.set(identifier, {
            registerClass,
            args,
        });
    }

    get(identifier) {
        const target = this.bindMap.get(identifier);
        const { registerClass, args = [] } = target;
        return Reflect.construct(registerClass, args);
    }
}

// ---------------------
class A {
    constructor(p) {
        this.p = p;
    }
}

class B {
    constructor() {
        this.a = container.get('a');
    }
}

const container = new Container();

container.registerInstance("a", A, [1]);
container.registerInstance("b", B);

const b = container.get('b');
console.log(b);