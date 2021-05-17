// async 、await原理简要实现
function* test() {
    const data1 = yield 'data1';
    console.log('data1', data1);

    const data2 = yield 'data2';
    console.log('data2', data2);

    const data3 = yield 'data3';
    console.log('data3', data3);

    return 'success';
}

// const gen = test();
// const data1 = gen.next();
// const data2 = gen.next(data1);
// const data3 = gen.next(data2);
// const data4 = gen.next(data3);
// console.log(data4);

// async函数伪代码
function asyncToGenerator(fn) {
    return function () {
        const gen = fn.apply(this, arguments);

        // async函数返回一个promise，可以用.then链式调用
        return new Promise((resolve, reject) => {

            // key值有两个，next和throw，对应gen函数的方法
            // args参数用于将promise resolve的值传给下一个yield
            function step(key, args) {
                let generatorRes;

                try {
                    // 执行gen.next，传递上次next的值
                    generatorRes = gen[key](args);
                } catch (error) {
                    reject(error);
                }

                const { value, done } = generatorRes;

                if (done) {
                    return resolve(value);
                } else {
                    // 如果状态为false，继续生成微任务
                    return Promise.resolve(value).then(
                        // 递归调用step，传递返回值value
                        val => step('next', val),
                        err => step('throw', err)
                    );
                }
            }

            step('next');
        })
    }
}

const testAsync = asyncToGenerator(test);
testAsync().then(res => console.log(res));


// test for event loop
function fakeAjax(params) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(params);
        }, 0);
    })
}

Promise.resolve('1').then(val => console.log('start' + val));

async function test1() {
    console.log('=====async start');

    const data1 = await fakeAjax('data1');
    console.log('async data1', data1);

    const data2 = await fakeAjax('data2');
    console.log('async data2', data2);

    const data3 = await fakeAjax('data3');
    console.log('async data3', data3);
}

// test1();

fakeAjax('2').then(val => console.log('end' + val));
