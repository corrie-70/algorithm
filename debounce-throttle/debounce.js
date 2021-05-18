var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

const setUseAction = debounce(getUserAction, 10000, true);

container.onmousemove = setUseAction;

document.getElementById("button").addEventListener('click', function(){
    setUseAction.cancel();
})

/**
 * 防抖函数
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} immediate 若为true，将函数执行的时刻提升到第一次触发fn，false时，将会在debounce结束后执行
 * @returns 
 */
function debounce(fn, delay, immediate) {
    let inDebounce;

    let debounce = function (...args) {
        const context = this;
        let result;
        clearTimeout(inDebounce);

        if (immediate) {
            // 已经有定时器，说明该时间段内已执行过事件，等到下次inDebounce为null才能再执行
            // 即，在delay时间段内，都没有再触发过fn
            const callNow = !inDebounce;

            inDebounce = setTimeout(() => {
                inDebounce = null;
            }, delay);

            if (callNow) { result = fn.apply(context, args) };
        } else {
            inDebounce = setTimeout(() => {
                fn.apply(context, args);
            }, delay);
        }

        return result;
    }

    debounce.cancel = function () {
        clearTimeout(inDebounce);
        inDebounce = null;
    }

    return debounce;
}