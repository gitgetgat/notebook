# Reveal.js 一款神奇的 JavaScript 开源 WEB 演示框架

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Reveal.js',linkUrl:'https://github.com/hakimel/reveal.js'},{ linkText:'Reveal.js 官网',linkUrl:'https://revealjs.com/'}]" />

![/52093e88-72ae-a01a-77f7-d7b01d5439ec.gif](/52093e88-72ae-a01a-77f7-d7b01d5439ec.gif)

## `Reveal.js` 是什么？

`Reveal.js` 是一个基于 `HTML`、`CSS` 和 `JavaScript` 的开源演示框架，它允许用户创建具有丰富动画效果和交互性的幻灯片。与传统的 `PPT` 或 `Keynote` 不同，`Reveal.js` 充分利用了 `Web` 技术的优势，使得演示文稿更加现代、灵活和跨平台。

`Reveal.js` 具有以下特点：

- 跨平台兼容性：可以在任何支持现代浏览器的设备上运行。

- 丰富的动画效果：内置多种过渡动画效果。

- 强大的自定义能力：通过修改 `CSS` 和 `JavaScript`，可以几乎无限制地自定义外观和行为。

- `Markdown` 支持：支持 `Markdown` 语法，便于编写和维护内容。

- 插件生态：拥有丰富的插件库，可以通过安装插件来扩展功能。

- 响应式设计：自动适应各种屏幕尺寸和设备类型。

## 快速开始

### 安装

`Reveal.js` 提供多种安装方式，最基本方法前往 `Github` 下载源码，无需任何构建工具。如果想在现有项目中使用 `Reveal.js` 可以通过包管理工具引入。

::: code-group

```bash [npm]
npm install reveal.js
```

```bash [yarn]
yarn add reveal.js
```

:::

## 简单示例

演示文稿标记层次结构需要是 `.reveal > .slides > section` ，其中 `section` 元素代表一张幻灯片并且可以无限重复。

如果将多个 `section` 元素放置在另一个 `section` 内，它们将显示为垂直幻灯片。第一张垂直幻灯片是其他幻灯片的“根”（位于顶部），并将包含在水平序列中。

<!-- <script setup>
import ExpUseReveal from '../../../../components/example/exp-use-reveal-js.vue'
</script>

<exp-use-reveal/> -->

::: warning
根据官方文档，使用 `Reveal.js` 时需要 引入相应的 `CSS` 文件，但是在组件中引入会出现污染全局变量的问题。
所以在组件的 `<style>` 标签内将以下 `reveal.js/dist/reveal.css` 、 `reveal.js/dist/theme/black.css` 两个文件的 `CSS` 代码 copy 到这里并用 `reveal-container` 类名包裹，将 `CSS` 变量提到外面定义，`"--r-controls-spacing: 12px;"` 这个变量没定义在 `reveal.js` 中，所以手动添加一个.
详情可以看组件<imp-text-danger>源码</imp-text-danger>
:::

## 应用场景

- <imp-text-danger>学术报告</imp-text-danger>：在学术会议或研讨会上，使用 Reveal.js 可以创建图文并茂、逻辑清晰的报告。

- <imp-text-danger>产品发布</imp-text-danger>：通过 Reveal.js 的动画效果和交互性，可以让产品介绍更加生动有趣，吸引观众的注意力。

- <imp-text-danger>企业宣讲</imp-text-danger>：无论是内部培训还是外部推广，Reveal.js 都能帮助制作出专业且吸引人的演示文稿。

- <imp-text-danger>教育讲座</imp-text-danger>：适用于教师和学生在课堂上的互动式教学。

- <imp-text-danger>技术分享</imp-text-danger>：在技术会议或研讨会上分享技术知识和经验。
