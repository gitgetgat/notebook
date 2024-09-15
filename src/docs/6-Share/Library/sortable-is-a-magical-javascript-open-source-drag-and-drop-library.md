# 一款神奇的 JavaScript 开源拖放库 Sortable.js

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Dragula.js',linkUrl:'https://github.com/SortableJS/Sortable'},{ linkText:'dragula.js 官网',linkUrl:'https://sortablejs.github.io/Sortable/'},{ linkText:'Vue.Draggable Demo',linkUrl:'https://sortablejs.github.io/Vue.Draggable/#/functional'}]" />

![/e818394f-bcec-5330-5582-2cfbf2160e71.png](/e818394f-bcec-5330-5582-2cfbf2160e71.png)

用户交互的丰富性和直观性能给用户带来不一样的使用体验。`Sortable.js` 作为一个轻量级且功能强大的 `JavaScript` 库，为我们提供了一种简单而有效的方式来实现拖拽排序功能。无论是列表、网格还是复杂的布局，`Sortable.js` 都能轻松应对。

## `sortable.js` 是什么？

`Sortable.js` 是一个 `JavaScript` 开源的，无需依赖的现代浏览器拖拽库。它支持触摸设备，并且可以在 IE9 及以上版本中运行。通过其简洁的 `API` 和丰富的配置选项，`Sortable.js` 能够轻松集成到任何项目中，无论是 `React`、`Vue` 还是 `Angular`，都能与之无缝配合。

## 快速开始

### 安装

通过 `npm` 或 `yarn` 安装 `Sortable.js` 非常简单：

::: code-group

```bash [npm]
npm install sortablejs --save
```

```bash [yarn]
yarn add sortablejs
```

:::

在项目中引入 `Sortable.js` ，可以通过直接在 `HTML` 文件中添加 `script` 标签，或者在模块化项目中使用 `import` 语句：

::: code-group

```js
import Sortable from "sortablejs";
```

:::

### 基础使用

`Sortable.js` 的使用非常直观。以下是一个基本的示例，展示了如何使一个列表可拖拽：

::: code-group

```html
<div class="container">
  <h1>Sortable List</h1>
  <ul id="sortable-list" class="sortable-list">
    <li class="sortable-item">Drag me 1</li>
    <li class="sortable-item">Drag me 2</li>
    <li class="sortable-item">Drag me 3</li>
    <li class="sortable-item">Drag me 4</li>
    <li class="sortable-item">Drag me 5</li>
  </ul>
</div>
```

:::

::: code-group

```js
document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementById("sortable-list");
  var sortable = Sortable.create(el, {
    animation: 150,
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen"
  });
});
```

:::

![/02be1c75-809e-7239-8964-6900da74eb5e.gif](/02be1c75-809e-7239-8964-6900da74eb5e.gif)

## 进阶用法

`Sortable.js` 的强大之处在于其丰富的配置选项和事件处理。例如，你可以设置拖拽手柄、过滤不可拖拽的元素、设置拖拽阈值等：

::: code-group

```js
new Sortable(document.getElementById("example-list"), {
  handle: ".handle", // 指定拖拽手柄
  filter: ".filtered", // 过滤不可拖拽的元素
  threshold: 10, // 设置拖拽阈值
  onEnd: function (evt) {
    console.log("拖拽结束", evt);
  }
});
```

:::

假设我们需要在一个任务管理器中实现任务的拖拽排序。我们可以使用 `Sortable.js` 来轻松实现这一功能：

::: code-group

```html [HTML]
<ul id="task-list">
  <li class="task">任务 1</li>
  <li class="task">任务 2</li>
  <li class="task">任务 3</li>
</ul>
```

```js [JavaScript]
new Sortable(document.getElementById("task-list"), {
  animation: 150,
  onEnd: function (evt) {
    // 任务拖拽结束后的逻辑处理
    console.log("任务排序已更新");
  }
});
```

:::

## 与 `Dragula.js` 相比

`Sortable.js` 和 `Dragula.js` 都是非常流行的 `JavaScript` 库，用于实现拖拽功能，但它们各有特点和适用场景。如果需要一个功能丰富、动画效果流畅且与现代前端框架兼容的拖拽库，`Sortable.js` 是一个不错的选择。而如果项目需要快速实现简单的拖拽功能，且需要兼容旧浏览器，`Dragula.js` 可能更适合。
