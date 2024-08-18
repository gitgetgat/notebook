# 对象的属性名的类型带来的赋值问题

<article-info/>

JS 中 `Object(对象)` 的属性名类型只能是 `String`、`Symbol`。

::: code-group

```js [举例1]
var arr = [];
arr[1] = 1; // 数字会转换调用toString为字符串
arr["1"] = 13;
console.log(arr[1]); // 13
```

```js [举例2]
var arr = {},
  b = { key: "b" },
  c = { key: "c" };
/**
 * 对象 b 会转换调用 toString 方法为字符串 "[object Object]"
 * 所以实际上是：arr["[object Object]"] = 123;
 */
arr[b] = 123;
/**
 * 对象 c 会转换调用 toString 方法为字符串 "[object Object]"
 * 所以实际上是：arr["[object Object]"] = 456;
 */
arr[c] = 456;
/**
 * arr[b] 所以实际上是：arr["[object Object]"]
 */
console.log(arr[b]); // 456
```

:::
