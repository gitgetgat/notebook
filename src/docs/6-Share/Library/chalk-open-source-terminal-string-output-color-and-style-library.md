# Chalk.js 开源终端字符串输出颜色和样式库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Chalk.js',linkUrl:'https://github.com/chalk/chalk'}]" />

![/861248c0-6148-6131-1f2c-d31940ff73f6.png](/861248c0-6148-6131-1f2c-d31940ff73f6.png)

## `Chalk.js` 是什么？

`Chalk.js` 是一个流行的 Node.js 库，用于在终端中输出彩色文本。它提供了一种简单的方法来改变控制台中输出的文本颜色和样式，使得命令行输出更具可读性和吸引力。`Chalk.js` 支持多种颜色和样式，包括基本颜色、背景颜色、加粗、下划线等多种修饰符，并且可以通过链式调用组合使用这些样式。

## 使用方式

::: code-group

```bash [npm 安装]
npm install chalk
```

```js [Browser 使用]
import chalk from "chalk";
console.log(chalk.blue("Hello world!"));
```

```js [NodeJs 使用]
const chalk = require("chalk");
console.log(chalk.blue("Hello") + " World" + chalk.red("!"));
```

:::

## 常见用法

- <imp-text-danger>字体颜色</imp-text-danger>：`chalk.red`, `chalk.green`, `chalk.blue` 等。

- <imp-text-danger>背景颜色</imp-text-danger>：在颜色名前加上 `bg`，如 `chalk.bgRed`。

- <imp-text-danger>链式调用</imp-text-danger>：可以将多个样式方法链接在一起，如 `chalk.blue.bold.underline`。

- <imp-text-danger>多参数输出</imp-text-danger>：`console.log(chalk.blue('Hello'), 'World!', 'Foo', 'bar', 'biz', 'baz');`。

- <imp-text-danger>嵌套样式</imp-text-danger>：可以在一个字符串中嵌套不同的样式，如 `chalk.red('Hello', chalk.underline.bgBlue('world') + '!')`。

## 注意事项

- 从 `Chalk 5.0` 版本开始，不再支持 `CommonJS` 的 `require` 方式引入，而是只支持 `ES Modules` 的 `import` 方式。如果需要在 `Node.js` 中使用，可以考虑使用 `Chalk 4.x` 版本。

- 某些样式可能在所有终端中并不都有效，如 `underline` 和 `bold` 在 `Git Bash` 上可能不被支持。

- 若要在项目中使用 `Chalk.js`，需要确保终端支持 `ANSI` 颜色编码。大多数现代终端都支持。

`Chalk.js` 作为一个广泛使用的库，有着活跃的社区和完善的文档。
