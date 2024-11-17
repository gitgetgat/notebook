# Vue-Waterfall 一个轻量级的、专为实现灵活的瀑布流布局设计的 Vue.js 组件

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Vue-Waterfall',linkUrl:'https://github.com/MopTym/vue-waterfall'}]" />

![/0e5c00ac-577d-724f-940c-99167f571352.png](/0e5c00ac-577d-724f-940c-99167f571352.png)

## `Vue-Waterfall` 是什么？

`Vue-Waterfall` 是由 MopTym 开发的开源组件，专门用于在 Vue.js 项目中实现瀑布流布局。无论你是要做商品展示、图集展示，还是动态内容的排版，这个组件都能轻松应对。

最酷的是，它不仅支持垂直布局，还能做水平的瀑布流！而且响应式效果极佳，在窗口大小变化时会 <imp-text-danger>自动调整布局</imp-text-danger>。

## 组件特点

• <imp-text-danger>多方向布局</imp-text-danger>：支持水平（h）和垂直（v）的瀑布流布局，适应不同的页面需求。

图片

• <imp-text-danger>自定义行间距</imp-text-danger>：通过 line-gap 属性，轻松设置元素间的距离。

• <imp-text-danger>动画过渡</imp-text-danger>：组件支持移动元素的动画过渡，布局调整时效果平滑，就像在看“流动”的瀑布。

• <imp-text-danger>响应式支持</imp-text-danger>：窗口大小变化时，布局会自动重排，省去你手动调整的烦恼。

图片

• <imp-text-danger>灵活的元素对齐方式</imp-text-danger>：支持左、右、居中对齐，满足你的布局强迫症。

## 安装与使用

安装 Vue-Waterfall 非常简单，只需要运行下面的命令：

::: code-group

```bash [npm]
npm install --save vue-waterfall
```

:::

在你的 Vue 项目中使用它时，可以这样引入：
::: code-group

```js
import Waterfall from "vue-waterfall/lib/waterfall";
import WaterfallSlot from "vue-waterfall/lib/waterfall-slot";

export default {
  components: {
    Waterfall,
    WaterfallSlot
  }
};
```

:::

HTML 结构也是极其简洁的：

::: code-group

```html
<waterfall :line-gap="200" :watch="items">
  <waterfall-slot
    v-for="(item, index) in items"
    :width="item.width"
    :height="item.height"
    :order="index"
    :key="item.id"
  >
    <!-- 这里可以放任何自定义内容 -->
  </waterfall-slot>
</waterfall>
```

:::

轻松几行代码，就能打造出流畅的瀑布流布局。特别适合那些喜欢简单优雅页面布局的开发者。

## 核心功能解析

### 动态响应式布局

`Vue-Waterfall` 会监听 `watch` 属性，实时调整布局，无需担心窗口大小的变化导致布局错乱。

### 过渡动画

组件内置了动画支持，当元素位置发生变化时，过渡平滑，用户体验更佳。

### 支持事件触发

你可以通过 `$emit('reflow')` 手动触发布局的重新排布，同时还能监听 `reflowed` 事件，捕捉布局完成后的状态。
