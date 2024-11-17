# 一款神奇的 JavaScript 开源拖放库 Dragula.js

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Dragula.js',linkUrl:'https://github.com/bevacqua/dragula'},{ linkText:'dragula.js 官网',linkUrl:'https://bevacqua.github.io/dragula/'}]" />

`Dragula.js` —— 一个为开发者设计的拖放库，它以简洁的代码和强大的功能，让你的应用交互更加流畅和直观。

## Dragula.js 是什么？

`Dragula.js` 是一个用于拖放操作的 JavaScript 库，允许开发者实现元素的拖放功能。由 Google 的软件工程师 Matthew Rothenberg 开发，设计初衷是为了简化拖放操作的开发过程，使得开发者可以专注于应用的其他方面。 `Dragula.js` 具有以下几个特点：

- `简洁的 API`：它提供了一个非常简洁的 API，使得拖放操作非常容易实现。

- `轻量级`：库的大小很小，不会增加页面的加载时间。

- `模块化`：`Dragula.js` 可以很容易地与其他库和框架集成，如 React、Angular 等。

- `响应式`：它支持响应式设计，确保在不同屏幕尺寸的设备上都能正常工作。

- `自定义`：开发者可以根据需要自定义拖放的行为和样式。

## 快速开始

### 安装

::: code-group

```bash [npm]
npm install dragula -S
```

```bash [yarn]
yarn add dragula
```

:::

如果你没有使用包管理工具，可以通过下载 Github 仓库中的 dist 文件夹中的 `dragula` 来使用。注意将 `js` 文件放在 `<body>` 中，还要引入 `CSS` 文件。

### 示例

首先，引入 `Dragula` 文件，

::: code-group

```html
<link rel="stylesheet" href="./dragula/dist/dragula.css" />
<script src="./dragula/dist/dragula.js"></script>
```

:::

`Dragula` 提供了简单的 API，可以方便的实现拖拽。首先定义 DOM 结构，

::: code-group

```html
<div class="wrapper">
  <div id="left-defaults" class="container">
    <div>1. 可以在两个列表之间移动元素</div>
    <div>2. 可以移动到任意位置</div>
    <div>3. 任何元素都可以被移动</div>
  </div>
  <div id="right-defaults" class="container">
    <div>A. 你可以在同一个容器中移动元素，改变它的位置</div>
    <div>B. 这是默认用例。</div>
    <div>C. 提供很多配置项</div>
  </div>
</div>
```

:::

实现两个容器元素之间的拖动，只需调用 `dragula` 函数即可。示例中允许用户将元素 left 拖到 right ， right 拖到 left 。

::: code-group

```js
dragula([$("left-defaults"), $("right-defaults")]);
function $(id) {
  return document.getElementById(id);
}
```

:::

![/90f10eb9-1bb3-6b25-5a58-ff97a26e3d13.gif](/90f10eb9-1bb3-6b25-5a58-ff97a26e3d13.gif)

## 更多配置

上面示例中，我们没有向 `Dragula` 函数传递任何 `Options` 属性，其实他提供了一个默认的 `Options` 对象。

::: code-group

```js
dragula(containers, {
  // 判断元素是否是容器，返回 false 表示只有 `drake.containers` 中的元素才会被考虑作为容器
  isContainer: function (el) {
    return false;
  },
  // 判断元素是否可以移动，返回 true 表示默认情况下所有元素都是可拖动的
  moves: function (el, source, handle, sibling) {
    return true;
  },
  // 判断元素是否可以被放置在目标容器中，返回 true 表示默认情况下元素可以被放置在任何 `containers` 中
  accepts: function (el, target, source, sibling) {
    return true;
  },
  // 判断元素是否应该被阻止拖动，返回 false 表示默认情况下不会阻止任何元素的拖动
  invalid: function (el, handle) {
    return false;
  },
  // 确定拖动方向，'vertical' 表示在确定元素放置位置时，只考虑 Y 轴方向
  direction: "vertical",
  // 是否复制元素，默认为 false，表示移动元素而不是复制
  copy: false,
  // 是否允许在复制源容器中重新排序元素，默认为 false
  copySortSource: false,
  // 如果元素在拖动过程中溢出容器，是否将其恢复到拖动前的位置，默认为 false
  revertOnSpill: false,
  // 如果元素在拖动过程中溢出容器，是否将其从 DOM 中移除，默认为 false
  removeOnSpill: false,
  // 设置镜像元素（拖动时显示的元素）应该附加到的元素，默认为 document.body
  mirrorContainer: document.body,
  // 是否忽略输入框中的文本选择，设置为 true 允许用户选择输入框中的文本，而不会触发拖动
  ignoreInputTextSelection: true,
  // 设置在 X 轴上移动多少距离后才认为是拖动而不是点击，默认为 0
  slideFactorX: 0,
  // 设置在 Y 轴上移动多少距离后才认为是拖动而不是点击，默认为 0
  slideFactorY: 0
});
```

:::
