# vue-loader

<article-info/>

## vue-loader 是什么 ？

简单的说，他就是基于 `webpack` 的一个的 `loader`，解析和转换 `.vue` 文件，提取出其中的逻辑代码 `script`、样式代码 `style`、以及 `HTML` 模版 `template`，再分别把它们交给对应的 `Loader` 去处理，核心的作用，就是提取，划重点。

## 什么是 webpack 的 loader ？

其实就是用来打包、转译 `js` 或者 `css` 文件，简单的说就是把你写的代码转换成浏览器能识别的，还有一些打包、压缩的功能等。

## vue-loader 的作用（引用自官网）

- 允许为 `Vue` 组件的每个部分使用其它的 `webpack loader`，例如在  `<style>`  的部分使用 `Sass` 和在  `<template>`  的部分使用 `Pug（模板引擎）`；
- 允许在一个  `.vue`  文件中使用自定义块，并对其运用自定义的 loader 链；
- 使用 `webpack loader` 将  `<style>`  和  `<template>`  中引用的资源当作模块依赖来处理；
- 为每个组件模拟出 `scoped CSS`；
- 在开发过程中使用热重载来保持状态。
