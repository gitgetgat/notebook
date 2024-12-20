# Gridstack.js 一款能够构建交互式的仪表板神奇的 JavaScript 开源网格布局库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Gridstack.js',linkUrl:'https://github.com/gridstack/gridstack.js'},{ linkText:'Gridstack.js 官网',linkUrl:'https://gridstackjs.com/'}]" />

![/44703fb2-eee9-7dc6-0f92-ff5fd42fca1d.png](/44703fb2-eee9-7dc6-0f92-ff5fd42fca1d.png)

## `Gridstack.js` 是什么？

`Gridstack.js` 是一个非常强大的 `JavaScript` 开源库，允许开发者通过简单的代码创建可拖拽、可调整大小的网格布局。这个库非常适合用来构建交互式的仪表板和复杂的用户界面。

下面，我们将从基础到高级，逐步探索 `Gridstack.js` 的使用和功能。

## 基础入门

首先，你需要在你的项目中安装 `Gridstack.js`。可以通过 `npm` 来安装：

::: code-group

```bash [npm]
npm install gridstack
```

```html [CDN]
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/7.2.3/gridstack.min.css"
/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gridstack.js/7.2.3/gridstack-all.js"></script>
```

:::

下面示例中需要引入 `Gridstack.js` 和 `Gridstack.css`：

::: code-group

```vue
<template>
  <div class="grid-stack-container">
    <div class="grid-stack"></div>
  </div>
</template>

<script setup>
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import { onMounted, ref } from "vue";
onMounted(() => {
  const grid = GridStack.init({
    cellHeight: 80,
    margin: 6,
    minRow: 5 // 确保网格至少有5行高
  });
  grid.load([
    { x: 0, y: 0, w: 2, h: 2, content: "1" },
    { x: 4, y: 0, w: 4, h: 4, content: "2" },
    { x: 8, y: 0, w: 4, h: 2, content: "3" },
    { x: 0, y: 2, w: 3, h: 3, content: "4" },
    { x: 8, y: 6, w: 4, h: 3, content: "5" }
  ]);
});
</script>
<style>
.grid-stack-container {
  background: #f1f2f4;
  border-radius: 0.5rem;
}
.grid-stack .grid-stack-item-content {
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(34 197 94 / 0.15);
  text-align: center;
}
</style>
```

:::

<!-- <script setup>
import ExpUseGridstack from '../../../../components/example/exp-use-gridstack-js.vue'
</script>

<exp-use-gridstack/> -->

## 进阶使用

`Gridstack.js` 提供了许多高级功能，比如响应式布局、嵌套网格、保存和恢复布局等。你可以通过设置不同的选项来定制网格的行为。例如，你可以设置网格的列数、单元格高度、垂直边距等：

::: code-group

```js
var grid = GridStack.init({
  column: 6, // 设置网格列数
  cellHeight: 80, // 设置单元格高度
  verticalMargin: 20, // 设置垂直边距
  float: true，
  animate: true, // 启用动画
});
```

:::

### 动态操作

`Gridstack.js` 也支持动态地添加、移除和更新网格项。你可以使用 `addWidget`、`removeWidget` 和 `update` 方法来操作网格：

::: code-group

```js
// 添加一个新的网格项
grid.addWidget({ x: 0, y: 0, w: 2, h: 2, content: "新组件" });

// 移除一个网格项
grid.removeWidget(document.querySelector(".grid-stack-item"));

// 更新一个网格项
grid.update(document.querySelector(".grid-stack-item"), { w: 3, h: 3 });
```

:::

### 事件监听

`Gridstack.js` 提供了丰富的事件监听机制，可以用来监听网格项的变化，如添加、移除、拖拽开始、拖拽停止等：

::: code-group

```js
grid.on("change", function (event, items) {
  console.log("网格布局发生了变化", items);
});

grid.on("added", function (event, items) {
  console.log("添加了新的网格项", items);
});

grid.on("removed", function (event, items) {
  console.log("移除了网格项", items);
});
```

:::
