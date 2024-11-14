# Glide.js 一款轻量级 JavaScript 开源轮播图工具库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Glide.js',linkUrl:'https://github.com/glidejs/glide'},{ linkText:'Glide.js 官网',linkUrl:'https://glidejs.com/docs/'}]" />

![/59857ee9-e645-ccf0-bfae-b8b17f4a2ab4.png](/59857ee9-e645-ccf0-bfae-b8b17f4a2ab4.png)

## 什么是 `Glide.js` ？

`Glide.js` 是一个独立、无依赖的 JavaScript 开源轮播组件，具有轻量级、灵活性和快速响应的特点，专为滑动体验而设计。无论是新手还是经验丰富的开发者，`Glide.js` 都能满足你对滑动功能的所有需求。

<imp-text-danger>特点</imp-text-danger>

• <imp-text-danger>无依赖</imp-text-danger>：`Glide.js` 完全自给自足，无需额外的库或框架。

• <imp-text-danger>轻量级</imp-text-danger>：所有功能大小约为 28KB 压缩后的大小仅为约 8KB。

• <imp-text-danger>模块化</imp-text-danger>：你可以根据需求移除未使用的模块，进一步减小文件体积。

• <imp-text-danger>可扩展性</imp-text-danger>：轻松插件自己的模块以增加额外的功能。

• <imp-text-danger>打包工具兼容</imp-text-danger>：支持 `Rollup`、`Webpack` 和 `Vite` 等现代构建工具，方便集成到现有项目中。

## 快速开始

### 安装

你可以通过 `npm` 安装 `Glide.js`：

::: code-group

```bash [npm]
npm install @glidejs/glide
```

```html [CDN]
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/css/glide.core.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/@glidejs/glide/dist/glide.min.js"></script>
```

:::

### 入门示例

::: code-group

```vue
<!-- ../../../../components/example/exp-use-glide-js.vue -->
<template>
  <div class="glide" id="use-gilde-box">
    <div class="glide__track" data-glide-el="track">
      <div class="glide__slides">
        <div class="glide__slide">
          <div class="glide__slide__item">item0</div>
        </div>
        <div class="glide__slide">
          <div class="glide__slide__item">item1</div>
        </div>
        <div class="glide__slide">
          <div class="glide__slide__item">item2</div>
        </div>
      </div>
    </div>

    <div class="glide__bullets" data-glide-el="controls[nav]">
      <button class="glide__bullet" data-glide-dir="=0"></button>
      <button class="glide__bullet" data-glide-dir="=1"></button>
      <button class="glide__bullet" data-glide-dir="=2"></button>
    </div>
  </div>
</template>

<script setup>
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import { nextTick, onMounted } from "vue";

onMounted(() => {
  new Glide(".glide").mount();
});
</script>

<style scoped>
#use-gilde-box {
  color: black;
  width: 100%;
  position: static;
  display: block;
  /* height: 200px; */
  /* background: #fff; */
}
.glide__slide__item {
  height: 200px;
  background-color: aqua;
  text-align: center;
  line-height: 200px;
  border-radius: 10px 10px 0 0;
}
.glide__bullets {
  background-color: burlywood;
  display: block;
  position: static;
  height: 40px;
  line-height: 40px;
  text-align: center;
  left: auto;
  transform: none;
  /* bottom: 10px; */
}
</style>
```

:::

## 高级应用

`Glide.js` 支持多种配置选项，如类型、每视图数量、焦点位置等。此外，它还提供了 API 方法，如 `go()`、`mount()`、`destroy()` 等，以便更细致地控制滑动行为。

### <imp-text-warning>丰富的配置项</imp-text-warning>

![/2aabdd5d-1aa7-364f-ec11-be8d4fc3f841.png](/2aabdd5d-1aa7-364f-ec11-be8d4fc3f841.png)

### <imp-text-warning>响应式设计</imp-text-warning>

`Glide.js` 支持响应式设计，你可以定义不同的断点和设置，以确保在不同设备上都能提供良好的用户体验。

::: code-group

```js
new Glide(".glide", {
  type: "carousel",
  perView: 4,
  breakpoints: {
    800: {
      perView: 2
    },
    480: {
      perView: 1
    }
  }
}).mount();
```

:::

## 和 Swiper 比较

两者都是流行的 JavaScript 轮播图库，但各自有不同的特点和优势。`Swiper` 的优点在于它功能强大、高度可定制，支持丰富的滑动效果和配置选项，适合有复杂交互需求的项目。而 `Glide.js` 则以轻量级和简单易用著称，它的 API 直观，适合注重性能和简洁性的项目。

如果你需要一个具有多种滑动效果、导航、分页等高级功能且对性能要求不是极致严格的项目，`Swiper` 是一个不错的选择。如果你更倾向于一个轻量级的库，且希望快速实现基本的滑动和轮播功能，`Glide.js` 将更适合你的需求。
