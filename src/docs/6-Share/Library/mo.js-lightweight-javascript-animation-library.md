# mo.js 轻量级的 JavaScript 动画库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'mo.js',linkUrl:'https://github.com/mojs/mojs'},{  linkText:'mo.js 官方文档',linkUrl:'https://mojs.github.io/'}]" />

![/490521dc-f1d0-89ec-47d5-378774bbf2e5.png](/490521dc-f1d0-89ec-47d5-378774bbf2e5.png)

## `mo.js` 是什么？

`mo.js` 可是专门在运动和动画领域大展身手的 `JavaScript` 库。它能让开发者凭借简单的 `API`，创造出令人惊艳的动画效果。和传统的动画库相较而言，`mo.js` 把更多的精力放在动画的流畅性和表现力上，让动画设计这件事变得轻松又高效。

![/4b1662b2-684b-d4ae-4c5b-588260ed4744.webp](/4b1662b2-684b-d4ae-4c5b-588260ed4744.webp)

![/3bb517c3-42ed-4672-d84a-dc9ecf7d1ed5.webp](/3bb517c3-42ed-4672-d84a-dc9ecf7d1ed5.webp)

项目特点

- <imp-text-danger>极致轻量</imp-text-danger>：mo.js 的文件小巧玲珑，对页面加载时间几乎没有什么大的影响。
- <imp-text-danger>易上手</imp-text-danger>：通过简洁的 API，哪怕是刚入门的新手也能迅速掌握。
- <imp-text-danger>强大动画引擎</imp-text-danger>：支持多种动画类型，像是缓动、路径动画等等。
- <imp-text-danger>高度可定制</imp-text-danger>：开发者能够按照自己的需求，随心定制动画效果。
- <imp-text-danger>广泛兼容性</imp-text-danger>：所有现代浏览器，包括移动设备，它都能完美适配。

## 安装方法

`Nivo.js` 可以通过 `npm` 或 `yarn` 进行安装。首先，确保你的开发环境中已经安装了 `Node.js` 和 `React`。然后，可以通过以下命令安装 `Nivo.js` 的相关组件：

::: code-group

```bash [npm]
npm i @mojs/core
```

```bash [yarn]
yarn add @mojs/core
```

```html [CDN]
<script src="https://cdn.jsdelivr.net/npm/@mojs/core"></script>
```

:::

## 简单示例

在 Vue 的世界里，`mo.js` 能够与 Vue 的响应式系统无缝融合，打造出活力满满的动态用户界面。下面这个简单的例子，就展示了在 Vue 组件中如何使用 `mo.js` 创造一个简单的动画效果。

<script setup>
import ExpUseMo from '../../../../components/example/exp-use-mo-js.vue'
</script>

<exp-use-mo/>
