# 对象属性遍历顺序问题 Object.keys

<article-info/>

## 问题描述

通过 `for in` 或者 `Object.keys` 遍历对象属性值时，发现顺序并不是书写顺序

::: code-group

```js
var obj = {
  p2: "aaa",
  2: "aaa",
  1: "aaa",
  p1: "aaa"
};

console.log(Object.keys(obj)); // [ '1', '2', 'p2', 'p1' ]
for (const key in obj) {
  console.log(key); // '1', '2', 'p2', 'p1'
}
```

:::

## 产生原因

浏览器底层在存储对象时，针对内存管理做了优化，会把数字类型的 key，分出来并且按升序排列存储，这样读取 key 时是会提升效率的，对于字符串类型的 key，就按照书写顺序来即可

::: warning ⚠️ 注意
Object(对象) 的 `key` 只能是 `String` 或 `Symbol`，所以数字作为可以会被转换为字符串
:::
