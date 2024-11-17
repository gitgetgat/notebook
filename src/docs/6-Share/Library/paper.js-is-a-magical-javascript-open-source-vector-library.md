# Paper.js 一款神奇的 JavaScript 开源矢量图库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Paper.js',linkUrl:'https://github.com/paperjs/paper.js'},{ linkText:'Paper.js 官网',linkUrl:'http://paperjs.org/'}]" />

## Paper.js 是什么？

`Paper.js` 是一个开源的矢量图形库，它允许开发者使用 `JavaScript` 在 `HTML5 Canvas` 上进行高效、准确的矢量图形绘制和处理。`Paper.js` 提供了丰富的 `API`，支持路径操作、形状变形、颜色混合、滤镜效果等多种功能，非常适合用于 `Web` 设计和数据可视化等场景。

<imp-text-danger>主要特点</imp-text-danger>

- <imp-text-danger>矢量图形</imp-text-danger>：它使用矢量图形，图形可以无限放大而不失真。

- <imp-text-danger>响应式</imp-text-danger>：图形可以自动适应不同的屏幕尺寸和分辨率。

- <imp-text-danger>交互性</imp-text-danger>：可以创建交互式的图形，例如响应用户输入的动画和效果。

- <imp-text-danger>集成</imp-text-danger>：可以轻松地与 `HTML`、`CSS` 和其他 `JavaScript` 库集成。

- <imp-text-danger>API</imp-text-danger>：提供了丰富的 `API`，用于创建、编辑和操作图形对象。

`Paper.js` 适用于创建图形设计、数据可视化、游戏开发等多种应用场景。支持导出为 `SVG`、`PDF` 等格式，方便在不同环境中使用。

## 快速开始

### 引入 Paper.js

首先，需要引入 Paper.js ，可以通过 CDN 链接，或者使用包管理工具。

::: code-group

```bash [npm]
npm install paper
```

```bash [yarn]
yarn add paper
```

:::

### 创建画布

在 HTML 中创建一个 canvas 元素，Paper.js 将在这个元素上绘制图形。

::: code-group

```html
<canvas id="myCanvas" resize></canvas>
```

:::

### 编写 JavaScript 代码

::: code-group

```js
paper.setup("myCanvas"); // 初始化 Paper.js 并关联 canvas 元素

var rect = new paper.Path.Rectangle(
  new paper.Point(50, 50),
  new paper.Size(100, 100)
);
rect.fillColor = "red"; // 设置填充颜色

// 为矩形添加拖动功能
rect.onMouseDown = function (event) {
  rect.dragging = true;
};

paper.view.onMouseMove = function (event) {
  if (rect.dragging) {
    rect.position = event.point; // 更新矩形的位置
  }
};

paper.view.onMouseUp = function (event) {
  rect.dragging = false;
};
```

:::

上面代码中，为矩形添加了 `onMouseDown`、`onMouseMove` 和 `onMouseUp` 事件处理器，使得矩形可以被用户拖动。

![/30c58ec8-7674-3143-3a69-f1f3ea427d20.png](/30c58ec8-7674-3143-3a69-f1f3ea427d20.png)

## 核心概念

- <imp-text-danger>项目（Project）</imp-text-danger>：一个 `Paper.js` 项目是图形创建和管理的上下文。它包含了所有图形元素和设置，如视图、活动层等。

- <imp-text-danger>视图（View）</imp-text-danger>：视图是 `Paper.js` 中的画布，它是用户与图形交互的界面。视图可以响应用户输入，如鼠标和触摸事件。

- <imp-text-danger>路径（Path）</imp-text-danger>：路径是 `Paper.js` 中最基本的图形元素，可以是直线、曲线、形状等。路径由一系列的点（锚点）和这些点之间的线段组成。

- <imp-text-danger>工具（Tool）</imp-text-danger>：提供了工具类，如钢笔工具、铅笔工具等，用于创建和编辑路径。

- <imp-text-danger>形状（Shape）</imp-text-danger>：形状是预定义的路径，如矩形、圆形、椭圆形等。`Paper.js` 提供了多种创建标准形状的方法
