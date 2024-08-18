# parseInt 的其余用法

<article-info/>

::: code-group

```js
console.log(["1", "2", "3"].map(parseInt)); // [ 1, NaN, NaN ]
```

:::

`parseInt` 的第二个参数，接受数字 `2~36`

- 如果传 `0`，`NaN`，`Infinity`
  - 如果输入的字符串以 `'0x'` 或者 `'0X'` 开头，则转为 `16` 进制
  - 按照 `10` 进制处理
- 进制小于 `2`，或者大于 `36`，则返回 `NaN`

::: tip
进制转换只能识别该进制内的有效字符，比如 `'3'` 不是 `2 进制` 能识别的有效字符，所以 `NaN`
:::
