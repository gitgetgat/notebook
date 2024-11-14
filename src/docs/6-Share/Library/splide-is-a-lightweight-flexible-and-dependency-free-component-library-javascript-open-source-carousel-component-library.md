# Splide 轻量级、灵活且无依赖的组件库的 JavaScript 开源轮播组件库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Splide',linkUrl:'https://github.com/Splidejs/splide'},{  linkText:'Splide 文档',linkUrl:'https://splidejs.com/'}]" />

![/b5c21b6e-4cea-823a-d404-2cec77df910a.png](/b5c21b6e-4cea-823a-d404-2cec77df910a.png)

## `Splide.js` 是什么？

`Splide.js` 是一个无需依赖任何外部库的滑动组件，设计目标是简单、高效且易于定制。核心特点是轻量化，压缩后的文件大小仅为 12KB，使得它在加载速度和资源消耗方面表现卓越，尤其适用于对性能要求较高的项目。

## 快速开始

### 安装与引入

`Splide.js` 支持多种安装方式，包括 npm 安装和直接在 HTML 中引入。

::: code-group

```bash [npm]
$ npm install @splidejs/splide
```

```bash [html]
<link rel="stylesheet" href="https://unpkg.com/@splidejs/splide@latest/dist/css/splide.min.css">
<script type="module" src="https://unpkg.com/@splidejs/splide@latest/dist/js/splide.esm.browser.js"></script>
```

:::

然后，在你的 `JavaScript` 文件中引入 `Splide`：

::: code-group

```js
import Splide from "@splidejs/splide";
// Default theme
import "@splidejs/splide/css";

// or other themes
import "@splidejs/splide/css/skyblue";
import "@splidejs/splide/css/sea-green";

// or only core styles
import "@splidejs/splide/css/core";
```

:::

## 创建并初始化 Splide 实例

在你的 `HTML` 中创建基础的滑块结构，并使用 `JavaScript` 初始化 `Splide`：

::: code-group

```html
<div class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">Slide 1</li>
      <li class="splide__slide">Slide 2</li>
      <li class="splide__slide">Slide 3</li>
    </ul>
  </div>
</div>
<script>
  new Splide(".splide").mount();
</script>
```

:::

这样，你就创建了一个基本的滑动组件。

### 最佳实践：

- 利用数据属性扩展功能，例如 `data-splide-autoplay="true"` 以启用自动播放。

- 在图片懒加载场景下利用 `Splide` 的懒加载特性提高页面加载速度。

## 总结

`Splide.js` 是一个轻量级、高性能的滑动插件，提供了丰富的 API 和扩展，开发者可以轻松地在网站上实现各种滑动效果。现在，你就可以开始使用 `Splide.js` 来丰富你的下一个项目，让你的网站滑动起来更加优雅和高效！
