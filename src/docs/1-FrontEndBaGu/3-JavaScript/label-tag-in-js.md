# JS 中的 lable 标签

<article-info/>

`label` 可以说是 JS 里面控制循环一个使用的语句了，一般搭配 `continue` 和 `break` 使用，首先来回顾一下这两个语句：

- continue：`立即退出循环后从循环的顶部继续执行。`

- break：`立即退出循环并强制执行后面的语句。`

这两个语句可以精确地控制 `for` 和 `while` 的进行，但是在一些方面却不尽人意，来看一个示例：

::: code-group

```js
var n = 10;
var m = 10;
var num = 0;
for (var i = 0; i < n; i++) {
  for (var j = 0; j < m; j++) {
    if (i === 5 && j === 5) {
      console.log("OK!");
      break;
    }
    num++;
  }
}
console.log(num);
// OK!
// 95
```

:::

可以看到，需要是寻找 55 这个数字，找到之后输出 OK，以上代码的确完成了这项任务，但是可以看到 num 的值为 95，也就是说，在找到了 55 这个值之后，循环并未立即结束，而是一直进行到了最后，这样就带来了不必要的内存占用，也增加了时间消耗。但是如果使用 `label` 去指定结束的位置，既可以避免这些问题：

::: code-group

```jsx
var n = 10;
var m = 10;
var num = 0;
outerloop: for (var i = 0; i < n; i++) {
  for (var j = 0; j < m; j++) {
    if (i === 5 && j === 5) {
      console.log("OK!");
      break outerloop;
    }
    num++;
  }
}
console.log(num);
// OK!
// 55
```

:::
