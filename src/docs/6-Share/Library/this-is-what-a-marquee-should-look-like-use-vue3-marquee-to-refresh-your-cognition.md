# 探索 vue3-marquee：跑马灯该有的样子！

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'vue3-marquee',linkUrl:'https://github.com/megasanjay/vue3-marquee'},{ linkText:'vue3-marquee 官网',linkUrl:'https://vue3-marquee.vercel.app/'}]" />

![/75d13cff-0ba2-8f04-ce8c-57dfc319c283.png](/75d13cff-0ba2-8f04-ce8c-57dfc319c283.png)

## 什么是 `vue3-marquee`？

`vue3-marquee` 是一个专门为 Vue 3 开发的轻量级跑马灯组件，不需要任何外部依赖。原本这个项目是作者为了内部需求开发的，但作者可能是个心软的好人，最终决定分享给大众使用。其设计灵感来自于 React Fast Marquee，实现了内容无缝滚动，不再有那些尴尬的空白或者卡顿。

## 核心特点

`vue3-marquee` 可谓麻雀虽小，五脏俱全。以下是一些亮点：

- <imp-text-danger>无依赖性</imp-text-danger>：不需要引入额外的库，占用少，轻便。

- <imp-text-danger>平滑无缝</imp-text-danger>：支持克隆内容实现无缝循环滚动。

- <imp-text-danger>高度可定制</imp-text-danger>：通过丰富的属性设置，你可以随意调整滚动方向、持续时间、动画循环次数等。

- <imp-text-danger>响应式暂停</imp-text-danger>：支持鼠标悬停和点击暂停，用户体验满分。

- <imp-text-danger>多事件监听</imp-text-danger>：可以监控动画的完成状态，如 `onComplete`、`onLoopComplete`、`onPause` 等。

## 使用方式

::: code-group

```bash [npm 或 yarn 安装]
npm install vue3-marquee@latest --save
# 或者
yarn add vue3-marquee@latest
```

```js [main.js]
import { createApp } from "vue";
import Vue3Marquee from "vue3-marquee";

const app = createApp(App);
app.use(Vue3Marquee);
// 如果你觉得 Vue3Marquee 名字太长？好办，重命名它
// app.use(Vue3Marquee, { name: 'MarqueeMagic' });
app.mount("#app");
```

```vue [vue 中使用]
<template>
  <Vue3Marquee :duration="10" direction="reverse" pauseOnHover>
    <p>这是一个流动的内容，让我们滚起来！</p>
  </Vue3Marquee>
</template>
```

:::

## 高级功能

| 属性名         |   类型    |   默认值 |                            描述 |
| -------------- | :-------: | -------: | ------------------------------: |
| `direction`    | `string`  | 'normal' | 滚动方向：'normal' 或 'reverse' |
| `duration`     | `number`  |       20 |          内容滚动所需时间（秒） |
| `pauseOnHover` | `boolean` |    false |          鼠标悬停时是否暂停动画 |
| `loop`         | `number`  |        0 |      动画循环次数，0 为无限循环 |

## 事件监听

想要知道动画什么时候结束？没问题：

- <imp-text-danger>onComplete</imp-text-danger>：当有限循环次数结束时触发。

- <imp-text-danger>onPause / onResume</imp-text-danger>：在 `pauseOnHover` 或 `pauseOnClick` 时触发，监控动画暂停或恢复。

- <imp-text-danger>onOverflowDetected</imp-text-danger>：如果启用了 `animateOnOverflowOnly`，当内容溢出时触发。

## 升级提示

如果你还在用 `3.x` 版本，建议更新到 `4.x`，因为它增加了对 `TypeScript` 的支持，还去掉了 `dist/style.css` 导入。查看<link-tag :linkList="[{ linkText:'vue3-marquee 示例',linkUrl:'https://vue3-marquee.vercel.app/examples'}]" />获取更多信息。
