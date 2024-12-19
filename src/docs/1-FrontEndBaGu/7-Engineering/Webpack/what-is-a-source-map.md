# source map 是什么？

<article-info/>

<link-tag :linkList="[{ linkText:'devtool 设置 source map Webpack 官方文档',linkUrl:'https://webpack.docschina.org/configuration/devtool/#devtool'}]" />

## 什么是 `Source Map`

### 概念介绍

在现代的前端开发中，源代码经过编译、打包和压缩后会变得难以阅读，尤其是当你使用如 `Babel` 之类的工具将 `ES6+` 的语法转换成 `ES5` 时，或是使用 `TypeScript` 编译为 `JavaScript` 代码。此时，如果项目在生产环境中出现问题，调试变得极为困难。

为了解决这个问题，`Source Map` 作为一种映射机制应运而生。它将编译、压缩后的代码与源代码对应起来，使开发者在调试工具中能够看到原始的代码结构。这极大地提高了调试的效率和开发体验。

### `Source Map` 的工作原理

`Source Map` 实质上是一个映射文件，记录了从压缩代码到源代码的映射关系。当你在浏览器的开发者工具中查看 JavaScript 文件时，若发现错误，浏览器会根据 `Source Map` 文件还原源代码，从而让你看到真正发生错误的地方。

通常，在打包后的代码文件的末尾，`Webpack` 会添加一行类似这样的注释：
::: code-group

```js
//# sourceMappingURL=app.js.map
```

:::

浏览器通过这行注释，知道该去加载 `Source Map` 文件。

## `Source Map` 的配置选项

可选参数： `[inline-|hidden-|eval-] [nosources-] [cheap-[module-]]source-map`

### `eval`

`eval` 是最基础的 `Source Map` 类型，它将每个模块封装在 `eval()` 函数中，并在行尾加上注释来标识代码的位置。这个选项的优点是打包速度最快，但缺点是调试体验较差，无法看到原始代码。

适用场景：开发阶段，主要用于追求构建速度。

::: code-group

```js
module.exports = {
  devtool: "eval"
};
```

:::

### `source-map`

`source-map` 是一个完整的 `Source Map`，将映射关系单独存储为一个 `.map` 文件。它可以帮助你在浏览器开发者工具中准确地调试代码。

适用场景：生产环境，追求准确性。

::: code-group

```js
module.exports = {
  devtool: "source-map"
};
```

:::

### `cheap-source-map`

`cheap-source-map` 是一种较轻量的 `Source Map`，只会生成行映射，而不会进行列映射。它牺牲了一定的精确性以提高构建速度。

适用场景：开发环境，适合需要快速调试的场景。

::: code-group

```js
module.exports = {
  devtool: "cheap-source-map"
};
```

:::

### `eval-source-map`

`eval-source-map` 将源代码和映射关系内嵌在打包后的文件中。它在调试时提供了较好的可读性，并且构建速度快，但在生产环境中不推荐使用。

适用场景：开发环境，提供快速且较为完整的调试体验。

::: code-group

```js
module.exports = {
  devtool: "eval-source-map"
};
```

:::

### `hidden-source-map`

`hidden-source-map` 的行为与 `source-map` 类似，但它不会在打包后的文件中添加 `//# sourceMappingURL` 的注释。即使用户在浏览器中查看代码，也无法轻易获取 `Source Map`，提高了安全性。

适用场景：生产环境，避免暴露源代码的同时仍然能够通过错误报告调试问题。

::: code-group

```js
module.exports = {
  devtool: "hidden-source-map"
};
```

:::

### `nosources-source-map`

`nosources-source-map` 与 `source-map` 类似，但它会隐藏所有源代码。这意味着用户只能看到错误报告中的堆栈信息，而无法查看具体的源代码。

适用场景：生产环境，严格防止源代码泄露。

::: code-group

```js
module.exports = {
  devtool: "nosources-source-map"
};
```

:::

## `Source Map` 的实际使用场景

### 开发环境中的 `Source Map`

在开发环境中，构建速度和调试体验是最关键的因素。`eval-source-map` 和 `cheap-module-eval-source-map` 是两种常用的配置，它们在提供良好调试体验的同时，也能保证较快的构建速度。

::: code-group

```js
module.exports = {
  mode: "development",
  devtool: "eval-source-map"
};
```

:::

这种配置可以让开发者在浏览器中轻松看到原始代码，并快速定位错误。由于调试信息和源代码被嵌入到打包文件中，加载速度也相对较快。

### 生产环境中的 `Source Map`

在生产环境中，通常我们更关注性能和安全性，因此需要选择一种不会影响打包文件大小，并且能够保证源代码不被轻易暴露的 `Source Map` 配置。推荐使用 `source-map` 或 `hidden-source-map`。

::: code-group

```js
module.exports = {
  mode: "production",
  devtool: "source-map"
};
```

:::

在这种配置下，`Source Map` 文件会生成并存储在单独的文件中，便于错误分析，但不会影响用户加载的性能。

### 安全性考虑

在某些场景下，源代码的泄露可能带来安全风险。为此，`Webpack` 提供了 `nosources-source-map` 和 `hidden-source-map` 等选项。它们可以有效地隐藏源代码，防止被恶意用户分析。

::: code-group

```js
module.exports = {
  mode: "production",
  devtool: "nosources-source-map"
};
```

:::

## 调试工具中的 `Source Map` 支持

现代浏览器如 `Chrome`、`Firefox`、`Safari` 等都内置支持 `Source Map`，开发者可以在这些浏览器的开发者工具中查看源代码、设置断点、查看调用堆栈等。

要启用 `Source Map`，你只需打开开发者工具（`F12`），在 <imp-text-danger>“Source”</imp-text-danger> 标签页下，你可以看到原始的源代码文件，而不是经过压缩和打包的代码。如果 `Source Map` 配置正确，你可以在调试时看到清晰的源代码结构。

## `Source Map` 的优化建议

### 控制 `Source Map` 的生成

在大型项目中，生成完整的 `Source Map` 可能会导致构建速度的降低。你可以通过以下方式优化 `Source Map` 的生成：

- 在开发环境中使用 `cheap-module-source-map` 或 `eval-source-map` 来提高构建速度。
- 在生产环境中，选择较为轻量的 `Source Map` 配置，如 `hidden-source-map` 或 `nosources-source-map`。

### 分析和优化打包文件

你可以使用 `Webpack` 的 `source-map-explorer` 工具来分析打包后的文件结构，了解每个模块的大小，从而找到优化空间。这个工具能够帮助你可视化 `Source Map`，并确定是否存在过大的依赖或未被使用的代码。

::: code-group

```js
npm install -g source-map-explorer
source-map-explorer bundle.js bundle.js.map
```

:::

## 总结

`Source Map` 是 `Webpack` 提供的一项强大功能，帮助开发者在复杂的打包环境中轻松进行调试。通过对 `devtool` 属性的合理配置，你可以在不同的开发阶段选择适合的 `Source Map` 类型，从而提升开发效率并确保生产环境中的代码安全。希望通过本文的详细介绍，能够帮助你更好地理解和使用 `Webpack` 的 `Source Map` 功能，在实际项目中更加高效地进行调试与优化。
