# 使用“正则前瞻”数字格式化

<article-info/>

`\B` ：单词边界

`(?=)` ：前瞻运算符

::: code-group

```js
const str = "10000000000"; // 10,ooo,ooo,ooo
const r = str.replace(/(?=\B(\d{3})+$)/g, ",");
console.log(r);
```

:::
