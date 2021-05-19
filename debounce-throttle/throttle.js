var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

const setUseAction = throttle(getUserAction, 1000);

container.onmousemove = setUseAction;

function throttle(fn, delay) {
    let context;

    let inThrottle;

    return function (...args) {
        context = this;

        if (!inThrottle) {
            inThrottle = setTimeout(() => {
                fn.apply(context, args);

                inThrottle = null;
            }, delay);
        }
    }
}

function throttleByTimestamp(fn, delay) {
    const context = this;

    let previous = 0;

    return function (...args) {
        const now = +new Date();
        const timeSpan = now - previous;

        if (timeSpan > delay) {
            fn.apply(context, args);

            previous = now;
        }
    }
}