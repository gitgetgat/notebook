# 为什么建议使用 void 0 替代 undefined

<article-info/>

`void` 是一个 <el-text size="large" type="success">关键字</el-text>，后面更一个表达式，整体的返回是 undefined；

但是 `undefined` 它不是一个关键字，她是全局对象 `window` 的一个只读属性，在全局时，你无法给它赋值，可以读取，它的值 是 `undefined`，但是在局部作用域中，由于它不是<el-text size="large" type="success">关键字</el-text>，导致它可以被声明为一个变量：

::: code-group

```js
function fn() {
  var undefined = 10;
  console.log(undefined); // 10
  console.log(void 0); // undefined
}

fn();
```

:::

这种时候，容易埋下隐患，所以建议使用 `void 0` 替代 `undefined`
