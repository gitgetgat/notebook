# NProgress.js，一款神奇的 JavaScript 开源页面进度条库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'NProgress.js',linkUrl:'https://github.com/rstacruz/nprogress'},{  linkText:'NProgress.js 官网',linkUrl:'https://ricostacruz.com/nprogress/'}]" />

## `NProgress` 是什么？

`NProgress.js` 是一个轻量级的 JavaScript 库，用于在应用的页面顶部显示一个进度条，指示页面加载或异步操作的进度。它非常适合用于单页面应用程序（SPA），能够在路由变化时给用户友好的加载提示。本文是 `NProgress.js` 的基本使用方法和一些配置选项的详细介绍。

![/d10dc641-e6b5-8ff6-60a7-16ab602e6e6a.gif](/d10dc641-e6b5-8ff6-60a7-16ab602e6e6a.gif)

## 快速开始

### 安装和引入

`NProgress.js` 支持管理工具 `npm` 或 `yarn` 安装，也支持 `CDN` 引入。

::: code-group

```bash [npm]
npm install nprogress -S
```

```bash [yarn]
yarn add nprogress
```

:::

引入时，别忘了引入 `nprogress.css` 样式文件

### 启动和结束进度条

::: code-group

```js
NProgress.start(); // 启动进度条
NProgress.done(); // 结束进度条
```

:::

### 设置进度

::: code-group

```js
NProgress.set(0.4); // 设置进度至 40%
```

:::

设置进度百分比，参数取值 `0 ~ 1` 之间。如果传 `0` 类似于调用 `.start()`，传 `1` 类似于调用 `.done()` 方法。

### 递增进度条

::: code-group

```js
NProgress.inc(); // 随机递增进度条
NProgress.inc(0.2); // 以 0.2 的值递增进度条
```

:::

递增进度条，以 `随机量` 增加，永远不会到达 `100%`。

## 配置选项

::: code-group

```js
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载指示器
  trickle: false, // 是否开启自动递增行为
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: "body", // 指定进度条的父容器
  barSelector: '[role="bar"]', // 进度条选择器
  spinnerSelector: '[role="spinner"]' // 加载指示器选择器
});
```

:::

配置项还有 `template` 自定义模板，为了保证正常工作，需要保留一个带 `role='bar'` 的元素。参考默认模板。

::: code-group

```js
NProgress.configure({
  template: `
    <div class="bar" role="bar">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner">
      <div class="spinner-icon"></div>
    </div>`
});
```

:::

另外，通过覆盖 `nprogress.css` 样式，可以实现定制化样式。

## 在 `Vue` 中使用

在 `Vue` 项目中，可以将 `NProgress.js` 集成到路由系统中，方便页面跳转时显示进度条。在 `router/index.js` 中引入 `NProgress` 并在路由卫士中调用相应的 `API`。

::: code-group

```js
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 导入进度条
import { start, close } from "../utils/nprogress";
const router = new VueRouter({
  // ...
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});
```

:::

### 修改进度条样式

通过添加 `CSS` 样式来自定义进度条的颜色和其他视觉效果。

::: code-group

```css
#nprogress .bar {
  background: green !important; /* 自定义颜色 */
}
```

:::
