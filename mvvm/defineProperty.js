// const store = observerable({ n: 1 }); 数据可观测
// autorun(() => console.log(store.n)); autorun函数内使用到的可观测变量变化时，自动触发autorun 依赖收集
// store.n = 2; 触发推导，运行autorun

const event = require('events');

const ev = new event.EventEmitter();

function observerable(obj) {
    // 增加私有属性，且不可枚举，保存变量值
    Object.defineProperty(obj, '_data', {
        enumerable: false,
        value: Object.assign({}, obj)
    });

    Object.keys(obj).forEach(key => {
        Object.defineProperty(obj, key, {
            set: function (value) {
                ev.on('event');
                this._data[key] = value;
            },
            get: function () {
                ev.emit('event');
                return this._data[key];
            }
        })
    });
}

function autorun(fn) {

}

const a = { n: 1 };
observerable(a);
a.n;
a.n = 2;
a.n;