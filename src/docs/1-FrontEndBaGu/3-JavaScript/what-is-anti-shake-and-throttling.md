# 防抖和节流是什么?

<article-info/>

|               | 共同点             | 区别           | 应用场景     |
| ------------- | ------------------ | -------------- | ------------ |
| 防抖 debounce | 在事件频繁被触发时 | 只执行最后一次 | input 输入   |
| 节流 throttle | 减少事件执行的次数 | 有规律地执行   | 拖拽、scroll |

::: code-group

```js [防抖]
/*定义防抖函数
 * func：传入一个函数，事件不再持续触发时会调用该函数
 * delay:定义持续多久后执行传入的回调函数
 * */
function debounce(func, delay) {
  let timer = null; // 用于保存定时器
  return function () {
    // 如果定时器存在，清除定时器，随后重新设置timer
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(this, arguments);
      timer = null;
    }, delay); // 超过delay为接收到事件会调用这里的func   必要的额时候可以修改func的this指向  由于timer对外部存在引用，因此不会被销毁
  };
}
```

```js [节流]
/*定义节流函数
 * func：传入一个函数，事件不再持续触发时会调用该函数
 * delay:定义持续多久后执行传入的回调函数
 * */
function throttle(func, delay) {
  let timer = null; // 用于保存定时器
  return function () {
    // 如果定时器存在，清除定时器，随后重新设置timer
    if (timer) return;
    timer = setTimeout(() => {
      func.apply(this, arguments);
      timer = null;
    }, delay); // 超过delay为接收到事件会调用这里的func   必要的额时候可以修改func的this指向  由于timer对外部存在引用，因此不会被销毁
  };
}
```

:::
