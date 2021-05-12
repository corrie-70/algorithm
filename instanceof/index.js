function objInstance(from, to) {
    let p = from;

    while (p) {
        if (p.__proto__ === to.prototype) {
            return true;
        }

        p = p.__proto__;
    }

    return false;
}

function F() { }

const a = new F();
const b = Object.create(a);

console.log(b instanceof F);
console.log(objInstance(b, F));