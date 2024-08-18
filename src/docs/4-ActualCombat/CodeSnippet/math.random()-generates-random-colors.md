# Math.random() 生成随机颜色

<article-info/>

::: code-group

```js [RGB]
// RGB
function randomRgbColor() {
  var r = Math.floor(Math.random() * 256),
    g = Math.floor(Math.random() * 256),
    b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}
```

```js [RGBA]
// RGBA
function randomRgbaColor() {
  //随机生成RGBA颜色
  var r = Math.floor(Math.random() * 256), //随机生成256以内r值
    g = Math.floor(Math.random() * 256), //随机生成256以内g值
    b = Math.floor(Math.random() * 256), //随机生成256以内b值
    alpha = Math.random(); //随机生成1以内a值
  return `rgb(${r},${g},${b},${alpha})`; //返回rgba(r,g,b,a)格式颜色
}
```

```js [十六进制]
// 十六进制
function randomHexColor() {
  return "#" + Math.random().toString(16).substring(2, 8).padStart(6, "0");
}
```

```js [RGB转为十六进制]
// RGB转为十六进制
function rgbToHex(r, g, b) {
  /**
   * << 左移运算符：
   * a << b   a 转换为二进制后，左移 b 位
   * 例如：5 << 2 ---- 0000 0000 0000 0101 -> 0000 0000 0001 0100
   * 16 进制换算 10 进制最大 255，在换算 2 进制最大 1111 1111
   * 所以b是最低的8位2进制，g左移8位，r再左移8位（共左移16位）
   * 前面再加一个左移24位的1，防止最高位是0时被省略，最后转为16进制后移出最高位1
   */
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
```

:::
