# JavaScript 随机颜色生成器

<article-info/>

## RandomColor.js

[官方文档](https://randomcolor.lllllllllllllllll.com/)

[git](https://github.com/davidmerfield/randomColor)

`RandomColor.js` 是一款功能丰富的 `JavaScript` 库，用于生成随机的颜色。它支持在浏览器和 `Node.js` 环境运行，提供优雅的方式来生成美观的随机颜色。`RandomColor.js` 不仅可以生成随机颜色，还允许通过传递参数来定制颜色的亮度、色调等属性。

### 快速开始

::: code-group

```bash
npm install randomcolor
```

:::

### 使用

使用 `RandomColor.js` 通过简单的 `API` 调用 `randomColor()` 函数获取一个十六进制颜色代码。

::: code-group

```js
const color = randomColor(); // 创建十六进制颜色 #436cb2
console.log("color: ", color);
```

:::

#### hue

控制生成颜色的色调。您可以传递代表颜色名称的字符串：当前支持 `red` 、 `orange` 、 `yellow` 、 `green` 、 `blue` 、 `purple` 、 `pink` 和 `monochrome` 。如果您传递十六进制颜色字符串（例如 #00FFFF ，`randomColor` 将提取其色调值并使用它来生成颜色。

::: code-group

```js
const greenColor = randomColor({ hue: "green" }); // 控制生成颜色的色调，绿色主调
const orangeColor = randomColor({ hue: "orange" }); // 控制生成颜色的色调，橙色主调
```

:::

![/66233f6e-6e47-5c3e-aaf4-6afa9c551722.png](/66233f6e-6e47-5c3e-aaf4-6afa9c551722.png)

#### luminosity

控制生成颜色的亮度。您可以指定包含 `bright` 、 `light` 或 `dark` 字符串。

::: code-group

```js
const brightColor = randomColor({ hue: "orange", luminosity: "bright" });
const lightColor = randomColor({ hue: "orange", luminosity: "light" });
const darkColor = randomColor({ hue: "orange", luminosity: "dark" });
```

:::

![/0118b287-69a2-919c-7e2d-3c92bb368908.png](/0118b287-69a2-919c-7e2d-3c92bb368908.png)

#### count

一个整数，指定要生成的颜色数量。

::: code-group

```js
const colors = randomColor({ count: 2 });
console.log(colors); //  ['#ce831a', '#f9e5b1']
```

:::

#### seed

一个整数或字符串，传递时将导致 `randomColor` 每次返回相同的颜色。

#### format

指定生成颜色的格式的字符串。可能的值为 `rgb` 、 `rgba` 、 `rgbArray` 、 `hsl` 、 `hsla` 、 `hslArray` 和 `hex （默认）`。

#### alpha

0 到 1 之间的小数。仅在使用带有 `alpha` 通道的格式（ `rgba` 和 `hsla` ）时才相关。默认为随机值。

## chroma.js

[官方文档](https://gka.github.io/chroma.js/)

[git](https://github.com/gka/chroma.js)

![/1a81f8ca-4727-ff01-18ef-730df56043a1.png](/1a81f8ca-4727-ff01-18ef-730df56043a1.png)

`Chroma.js`， 一个小巧而强大的 `JavaScript` 库，为你的色彩带来无限可能。它以极简的代码，解锁颜色空间转换、动态渐变生成和智能颜色调整的大门。

🔔 功能特性

- `颜色空间转换`：`Chroma.js` 支持包括 `RGB`、`HEX`、`HSL`、`HSV`、`LAB`、`LCH`、`XYZ` 以及 `CMYK` 在内的颜色空间之间的无缝转换。

- `动态颜色操作`：提供了颜色变暗、变亮等动态调整功能，以适应不同的视觉需求。

- `渐变效果生成`：能够创建平滑且吸引人的颜色渐变效果，为数据可视化增添视觉吸引力。

- `调色板构建`：允许用户构建和管理个性化的颜色调色板，简化颜色使用流程。

- `与 d3.js 的兼容性`：`Chroma.js` 可与流行的数据可视化库 `d3.js` 无缝集成，扩展其功能。

### 快速开始

通过 `npm` 包管理器安装 `Chroma.js`，或通过在 `HTML` 文件中引入 `CDN` 链接来快速集成。创建 `Chroma` 对象并利用其丰富的 `API`，用户可以轻松实现颜色的转换与操作。

::: code-group

```bash
npm install chroma-js
```

:::

### 使用

`Chroma.js` 中最基础的操作包括颜色的创建、转换和其他颜色空间的转换。创建一个 `Chroma` 对象，然后将其转换为其他颜色格式：

::: code-group

```js
import chroma from "chroma-js";
const color = chroma("#3498db"); // 创建一个颜色对象
console.log(color.hex()); // 输出: #3498db
console.log(color.rgb()); // 输出: [52, 152, 219]
console.log(color.hsl()); // 输出: [204, 0.68, 0.53]
```

:::

除了颜色转换，`Chroma.js` 还提供了多种颜色操作方法，比如调整亮度、混合颜色、生成渐变色等：

::: code-group

```js
let color1 = chroma("#ff0000").brighten(2); // 提高亮度
let color2 = chroma.mix("#ff0000", "#0000ff"); // 混合红色和蓝色
console.log(color1.hex()); // 输出: 根据实际调整结果变化
console.log(color2.hex()); // 输出: 根据实际调整结果变化
```

:::

Chroma.js 还可以生成漂亮的颜色渐变，数据可视化比较常用：

::: code-group

```js
let scale = chroma.scale(["white", "red"]);
console.log(scale(0.5).hex()); // 输出: "#ff8080"，介于白色和红色中间的颜色
```

:::
