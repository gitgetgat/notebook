# 常用的 loader 有哪些？

<article-info/>

## 常用的 `loader`

- <imp-text-danger>raw-loader</imp-text-danger>：加载文件原始内容（`utf-8`）
- <imp-text-danger>file-loader</imp-text-danger>：把文件输出到一个文件夹中，在代码中通过相对 `URL` 去引用输出的文件 (处理图片和字体)
- <imp-text-danger>url-loader</imp-text-danger>：与 `file-loader` 类似，区别是用户可以设置一个阈值，大于阈值会交给 `file-loader` 处理，小于阈值时返回文件 `base64` 形式编码 (处理图片和字体)
- <imp-text-danger>source-map-loader</imp-text-danger>：加载额外的 `Source Map` 文件，以方便断点调试
- <imp-text-danger>svg-inline-loader</imp-text-danger>：将压缩后的 `SVG` 内容注入代码中
- <imp-text-danger>image-loader</imp-text-danger>：加载并且压缩图片文件
- <imp-text-danger>image-webpack-loader</imp-text-danger>：加载并且压缩图片文件
- <imp-text-danger>json-loader</imp-text-danger>：加载 `JSON` 文件（默认包含）
- <imp-text-danger>handlebars-loader</imp-text-danger>: 将 `Handlebars` 模版编译成函数并返回
- <imp-text-danger>babel-loader</imp-text-danger>：把 `ES6` 转换成 `ES5`
- <imp-text-danger>ts-loader</imp-text-danger>: 将 `TypeScript` 转换成 `JavaScript`
- <imp-text-danger>awesome-typescript-loader</imp-text-danger>：将 `TypeScript` 转换成 `JavaScript`，性能优于 `ts-loader`
- <imp-text-danger>sass-loader</imp-text-danger>：将 `SCSS/SASS` 代码转换成 `CSS`
- <imp-text-danger>css-loader</imp-text-danger>：加载 `CSS`，支持模块化、压缩、文件导入等特性
- <imp-text-danger>style-loader</imp-text-danger>：把 `CSS` 代码注入到 `JavaScript` 中，通过 `DOM` 操作去加载 `CSS`
- <imp-text-danger>postcss-loader</imp-text-danger>：扩展 `CSS` 语法，使用下一代 `CSS`，可以配合 `autoprefixer` 插件自动补齐 `CSS3` 前缀
- <imp-text-danger>eslint-loader</imp-text-danger>：通过 `ESLint` 检查 `JavaScript` 代码
- <imp-text-danger>tslint-loader</imp-text-danger>：通过 `TSLint` 检查 `TypeScript` 代码
- <imp-text-danger>mocha-loader</imp-text-danger>：加载 `Mocha` 测试用例的代码
- <imp-text-danger>vue-loader</imp-text-danger>：加载 `Vue.js` 单文件组件
- <imp-text-danger>i18n-loader</imp-text-danger>: 国际化
- <imp-text-danger>cache-loader</imp-text-danger>: 可以在一些性能开销较大的 `Loader` 之前添加，目的是将结果缓存到磁盘里
