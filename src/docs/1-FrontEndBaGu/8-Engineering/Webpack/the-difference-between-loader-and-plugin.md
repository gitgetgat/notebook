# Loader 和 Plugin 的区别

在 `Webpack` 中，`Loader` 和 `Plugin` 是两个不同的概念，它们的作用和使用方式也有所不同。

## 概念

- <imp-text-danger>Loader</imp-text-danger>：意为 <imp-text-danger>“加载器”</imp-text-danger>，由于 `Webpack` 本身只能打包 JS 文件，对于非 JS 文件（如 CSS、图片等）无法直接打包，因此需要引入第三方的模块进行打包。`Loader` 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。`Loader` 扩展了 `Webpack`，专注于转化文件这一个领域，主要作用是进行文件转化，完成压缩/打包/语言翻译等，以实现对非 JS 文件的打包。`Loader` 在 `module.rules` 中配置，也就是说它作为模块的解析规则而存在。例如，处理 CSS 文件需要使用 `css-loader`，处理图片需要使用 `file-loader` 等。使用 `Loader` 可以实现代码转换、文件处理、代码压缩等功能。

- <imp-text-danger>Plugin</imp-text-danger>：意为 <imp-text-danger>“插件”</imp-text-danger>，主要用于扩展 `Webpack` 的功能，可以访问整个编译生命周期，包括加载器已经执行完毕之后的时期。`Plugin` 的目标在于解决 `Loader` 无法实现的其他事。它针对打包过程中的某些事件节点执行自定义操作，如生成 HTML 文件、压缩代码、提取公共代码等。使用 `Plugin` 可以实现 `Webpack` 无法处理的复杂任务。`Plugin` 在 `plugins` 中单独配置，类型可以是函数或带有 apply 方法的类。

## 区别

### 功能和作用范围不同

- <imp-text-danger>Loader</imp-text-danger>：为专门解决某个子问题（eslint、scss）的加载器，运行在打包文件之前，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中

- <imp-text-danger>Plugin</imp-text-danger>：服务于整个 `webpack` 的生命周期，赋予了 `webpack` 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 `loader` 无法实现的其他事

### 配置方式不同

- <imp-text-danger>Loader</imp-text-danger>：在 `module.rules` 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。
- <imp-text-danger>Plugin</imp-text-danger>：在 `plugins` 中单独配置，类型为数组，每一项是一个 `Plugin` 的实例，参数都通过构造函数传入。
