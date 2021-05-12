Function.prototype.mycall = function (context, ...args) {
    const context = context || window;
    
    context.fn = this; // 使用隐式绑定到context来实现指定this

    const res = context.fn(...args);
    delete context.fn;
    return res;
}

const obj = {
    a: 1
}

function test(b) {
    console.log(this.a, b);
}

test.mycall(obj, 2);