# KaTeX，一款神奇的 JavaScript 开源数学公式渲染库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'KaTeX.js',linkUrl:'https://github.com/KaTeX/KaTeX'},{ linkText:'KaTeX.js 官网',linkUrl:'https://katex.org/'},{ linkText:'KaTeX.js 文档',linkUrl:'https://katex.org/docs/libs'}]" />

![07b5dfa8-208b-535f-5620-8e1bedd960bc](/07b5dfa8-208b-535f-5620-8e1bedd960bc.png)

## KaTeX 是什么？

`KaTeX` 是一个集成速度快且功能丰富的数学公式渲染库，专为 Web 设计。它由 Khan Academy 开发，提供接近印刷品质的数学公式展示，同时保持与浏览器的高效互动性。`KaTeX` 特点包括快速渲染速度、高质量的输出、独立运行、跨平台兼容以及丰富的功能集。它支持服务器端渲染，可以预渲染公式并作为纯 HTML 发送，减轻客户端负担。

## 快速开始

### 安装及引入

`KaTex` 支持包管理器 npm、yarn 和 CDN 方式安装，根据需要选择安装方式。

::: code-group

```bash [npm]
npm i katex
```

```bash [yarn]
yarn add katex
```

:::

如果在 `React` 中使用，可以考虑安装 `react-katex` 包，提供一个 `React` 组件简化数学公式的渲染过程。

::: code-group

```bash [npm]
npm i react-katex katex
# 还有 vue 版本的
npm i vue-katex katex

```

:::

`KaTex` 还有很多扩展库，具体可以参考这个 <link-tag :linkList="[{ linkText:'KaTeX.js 文档',linkUrl:'https://katex.org/docs/libs'}]" />

## 入门示例

作为入门演示示例，下载源码到本地方式引入 `KaTex`。

::: code-group

```html
<!-- 引入样式和库文件 -->
<link rel="stylesheet" href="../libs/katex.css" />
<script src="../libs/katex.js"></script>
```

:::

创建容器 DOM 元素，绑定 equation ID 选择器

::: code-group

```html
<div id="equation">$`x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}`$</div>
<script type="text/javascript" defer>
  // 使用KaTeX渲染指定元素中的公式
  katex.render(
    `x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}`,
    document.getElementById("equation")
  );
</script>
```

:::

![/2ef7b45f-0537-271d-619f-df63508b890e.png](/2ef7b45f-0537-271d-619f-df63508b890e.png)

## 核心功能及 API

`KaTeX` 核心功能包括同步渲染机制、基于 `TeX` 的布局算法、自定义的样式和布局选项。它的 API 允许开发者通过 JavaScript 控制渲染过程，包括手动渲染特定元素或批量渲染文档中的所有公式。

### 自动渲染

使用 JavaScript 手动渲染还是稍微麻烦了一点，官方提供 `auto-render` 自动渲染扩展，通过简单的引入可以实现自动渲染。

::: code-group

```html
// 引入 auto-render.js
<script src="../libs/auto-render.js"></script>
<script type="text/javascript" defer>
  document.addEventListener("DOMContentLoaded", function () {
    renderMathInElement(document.body, {
      // 自定义选项
      // • auto-render 指定解析格式
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
      ],
      // • 不抛出异样，而是渲染公式源码
      throwOnError: false
    });
  });
</script>
```

:::

`auto-render` 扩展可以在页面加载时自动查找并渲染所有使用 `$...$` 和 `$$...$$` 包裹的公式。意味着你不需要手动调用任何函数来渲染这些公式。

`KaTeX` 允许调整样式，例如修改 `.katex` 类的 `font-size` 属性来改变公式的显示大小。此外，`KaTeX` 提供了多个扩展，如 `copy-tex` 扩展允许复制 `LaTeX` 代码，而 `mhchem` 扩展简化了化学方程式的编写。

## 应用场景

`KaTeX` 适用于多种场景，包括在线教育平台、科学期刊网站、个人博客、数学问题社区以及印刷出版。它能够将 `LaTeX` 代码转换为可读性强、易于复制粘贴的格式，有助于读者理解复杂的数学表达式。

`KaTeX` 的优势在于它的渲染速度快于其他数学公式渲染库，同时保持高质量的输出，这使得它适用于对性能要求较高的实时互动环境。

## 同类对比

与 `MathJax` 相比 `KaTeX` 提供更快的渲染速度，更适合需要即时响应的应用。`KaTeX` 的设计注重于减少页面重排，提供更流畅的用户体验。 `MathJax` 提供更多的 `LaTeX` 功能和包支持。根据需要，注重简洁性和高性能选择 `KaTex`，注重功能和包支持，选择 `MathJax`。

![/5d76f2e9-d331-071d-1fc5-41f5dde2c084.png](/5d76f2e9-d331-071d-1fc5-41f5dde2c084.png)
