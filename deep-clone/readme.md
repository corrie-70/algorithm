# 深拷贝

简单版实现对象拷贝，对于循环引用会爆栈。解决爆栈问题一般是缓存变量，可使用Map或者数组来缓存。

## Map、WeakMap区别

- Map：JS的对象Object，本质上是键值对的集合（Hash结构），只能用字符串当做键。ES6增加Map结构，键的范围不再仅限于字符串，各种类型的值，包括对象，都可以当做键。
- WeakMap：与Map结构类似，区别有两点：
    1. WeakMap只接受对象作为键名，不接受其他类型的值作为键名；
    2. WeakMap的键名所指向的对象，不计入垃圾回收机制。意思是，一旦键名引用对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存，WeakMap里的键名对象和对应的键值会自动消失，不需要手动删除引用。

## 参考文献

- [JavaScript基础心法——深浅拷贝](https://github.com/axuebin/articles/issues/20)
- [WeakMap](https://es6.ruanyifeng.com/#docs/set-map#WeakMap)