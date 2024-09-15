# Highlightjs，一款神奇的 JavaScript 开源代码高亮库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Highlight.js',linkUrl:'https://github.com/highlightjs/highlight.js'},{ linkText:'Highlight.js 官网',linkUrl:'https://highlightjs.org/'}]" />

## Highlight.js 是什么？

`Highlight.js` 是一个开源的代码高亮插件，用于在 `HTML` 中高亮显示代码块。支持多种编程语言的代码高亮显示，具有自动语言检测功能，并且可以用于任何 `HTML` 标记。`Highlight.js` 具有零依赖、轻量级、快速执行等特点，同时提供了丰富的主题和语言支持，使得代码在网页上的展示更加美观和易于阅读。

<el-text size="large" type="danger">特点</el-text>

- <el-text size="large" type="danger">多语言支持</el-text>：支持超过 `200` 种编程和标记语言，包括但不限于 `HTML`, `CSS`, `JavaScript`, `Python`, `Ruby`, `Java`, `C++` 等。

- <el-text size="large" type="danger">动态语言检测</el-text>：能够自动识别代码块的语言，无需手动指定。

- <el-text size="large" type="danger">丰富的主题</el-text>：提供多种预设主题，包括明亮、暗色、复古、现代等风格，同时也支持自定义主题。

- <el-text size="large" type="danger">轻量级</el-text>：库文件体积小，加载快速，对网页性能影响小。

- <el-text size="large" type="danger">易于使用</el-text>：简单的 `API` 使得在网页中集成和使用非常便捷。

- <el-text size="large" type="danger">无依赖</el-text>：不需要其他库或框架支持，可以独立使用。

## 快速开始

首先，需要引入 `Highlight.js` 的库文件和 `CSS` 主题文件。你可以从 `Highlight.js` 的官方网站下载这些文件，或者使用 `CDN` 链接。

::: code-group

```bash [npm]
npm install highlight.js
```

```bash [yarn]
yarn add highlight.js
```

:::

然后，需要在 `HTML` 中创建一个代码块，并为其指定一个语言类。

::: code-group

```html
<!-- 代码块 -->
<pre>
  <code class="javascript">
  // 一个简单的 JavaScript 函数
  function sayHello() {
      alert('Hello, world!');
  }
  </code>
</pre>
```

:::

最后，在 `JavaScript` 中调用 `hljs.highlightAll();` 来初始化高亮显示。

::: code-group

```js
hljs.highlightAll()；
```

:::

代码块被 `Highlight.js` 自动检测并应用相应的语法高亮样式。

![/328652c1-b3e2-4742-a5ee-10421d6caf6d.png](/328652c1-b3e2-4742-a5ee-10421d6caf6d.png)

## `Highlight` 主题

`Highlight.js` 的主题可以分为两大类：内置主题和社区贡献的主题。内置主题通常包括如 `default`、`github`、`emacs` 等经典风格，而社区贡献的主题则提供了更多的选择和创新设计。

为了使用 `Highlight.js` 的主题，用户需要在初始化 `Highlight.js` 时指定主题名称。例如，要使用 `github` 主题，可以在 `JavaScript` 代码中这样设置：

::: code-group

```js
hljs.initHighlighting({
  languages: ["javascript", "css"],
  theme: "github"
});
```

:::
