// const event = require('events');

// const ev = new event.EventEmitter();

// ev.on('event', function () {
//     console.log('event trigger1');
// })

// ev.on('event', function () {
//     console.log('event trigger2');
// })

// setTimeout(() => {
//     ev.emit('event');
// }, 1000);

// 观察者模式实现EventEmitter
function EventEmitter() {
    this.listener = {};
}

EventEmitter.prototype.emit = function (key, ...args) {
    this.listener[key].forEach(callback => {
        callback(...args);
    });
}

EventEmitter.prototype.on = function (key, callback) {
    this.listener[key] = this.listener[key] === undefined ? [] : this.listener[key];
    this.listener[key].push(callback);
}

const myev = new EventEmitter();

myev.on('event', function (arg) {
    console.log('event trigger1', arg);
})

setTimeout(() => {
    myev.emit('event', 'arg');
}, 1000);