# Vue 虚拟列表组件 vue-virtual-scroller

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'vue-virtual-scroller',linkUrl:'https://github.com/Akryum/vue-virtual-scroller'},{  linkText:'vue-virtual-scroller 文档',linkUrl:'https://vue-virtual-scroller-demo.netlify.app/'}]" />

## `vue-virtual-scroller` 是什么？

`vue-virtual-scroller` 是一个针对大数据列表展示的 Vue 组件。它的核心功能就是虚拟化滚动，这意味着即便你的列表项有成千上万条，它也能以飞快的速度流畅展示，不会拖慢页面。

![/9579e65a-47a5-cb89-0765-da26ff45232f.png](/9579e65a-47a5-cb89-0765-da26ff45232f.png)

## 主要特点

- <imp-text-danger>快速滚动</imp-text-danger>：这个组件最大的特点就是快。无论数据多大，它都能处理得游刃有余。如果你做了个超长列表，结果卡到爆，那就该考虑它了。

- <imp-text-danger>Vue 2 & Vue 3 全覆盖</imp-text-danger>：不论你是 Vue 2 的老粉丝，还是 Vue 3 的新追随者，`vue-virtual-scroller` 都支持，真的是面面俱到。

- <imp-text-danger>自定义强大</imp-text-danger>: 它不仅支持动态的项大小，还可以轻松配置组件和容器的高度，甚至还能滚动到特定项。总之，想怎么滚就怎么滚，体验随你定。

- <imp-text-danger>高性能数据展示</imp-text-danger>：在处理超长列表或表格时，它能显著减少 DOM 操作，让你的页面秒变丝滑。这可不光是炫技，而是对用户体验的实打实提升。

## 入门

通过 npm、yarn 或者 Browser 安装：

::: code-group

```bash [npm]
npm install --save vue-virtual-scroller@next
```

```bash [yarn]
yarn add vue-virtual-scroller@next
```

```html [Browser]
<link
  rel="stylesheet"
  href="vue-virtual-scroller/dist/vue-virtual-scroller.css"
/>

<script src="vue.js"></script>
<script src="vue-virtual-scroller/dist/vue-virtual-scroller.min.js"></script>

<script>
  // 注册组件
  app.use(VueVirtualScroller);
  // 使用自定义名称注册单个组件
  app.component("RecycleScroller", VueVirtualScroller.RecycleScroller);
</script>
```

:::

注册组件：

::: code-group

```js [main.js]
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
// 注册全部组件
import VueVirtualScroller from "vue-virtual-scroller";
import { RecycleScroller } from "vue-virtual-scroller";

app.use(VueVirtualScroller);

// 单独注册组件

app.component("RecycleScroller", RecycleScroller);
```

```bash [yarn]
yarn add vue-virtual-scroller@next
```

```html [Browser]
<link
  rel="stylesheet"
  href="vue-virtual-scroller/dist/vue-virtual-scroller.css"
/>

<script src="vue.js"></script>
<script src="vue-virtual-scroller/dist/vue-virtual-scroller.min.js"></script>

<script>
  // 注册组件
  app.use(VueVirtualScroller);
  // 使用自定义名称注册单个组件
  app.component("RecycleScroller", VueVirtualScroller.RecycleScroller);
</script>
```

:::

使用方式：

::: code-group

```vue
<template>
  <virtual-scroller :items="myItems" :item-height="100">
    <template #default="{ item }">
      <div>{{ item.name }}</div>
    </template>
  </virtual-scroller>
</template>

<script>
import { VirtualScroller } from "vue-virtual-scroller";

export default {
  components: { VirtualScroller },
  data() {
    return {
      myItems: Array.from({ length: 1000 }, (_, i) => ({
        name: `Item ${i + 1}`
      }))
    };
  }
};
</script>
```

:::
