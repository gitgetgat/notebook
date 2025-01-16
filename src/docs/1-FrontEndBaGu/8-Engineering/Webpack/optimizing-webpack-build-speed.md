# 优化 Webpack 的构建速度

<article-info/>

高版本、多进程并行压缩、高效压缩 loader 、有些不压缩、有些提前压缩缓存，分包压缩，充分利用缓存

- 使用高版本的 `Webpack` 和 `Node.js`
- 多进程/多实例构建：`HappyPack`(不维护了)、`thread-loader`
- 压缩代码
  - 多进程并行压缩
    - [webpack-paralle-uglify-plugin](./what-are-the-commonly-used-plugins.md#webpack-parallel-uglify-plugin)
    - [uglifyjs-webpack-plugin](./what-are-the-commonly-used-plugins.md#uglifyjs-webpack-plugin) 开启 `parallel` 参数 (不支持 `ES6`)
    - [terser-webpack-plugin](./what-are-the-commonly-used-plugins.md#terser-webpack-plugin) 开启 `parallel` 参数
  - 通过 `mini-css-extract-plugin` 提取 `Chunk` 中的 `CSS` 代码到单独文件，通过 `css-loader` 的 `minimize` 选项开启 `cssnano` 压缩 `CSS`。
- 图片压缩
  - 使用基于 `Node` 库的 `imagemin` (很多定制选项、可以处理多种图片格式)
  - 配置 `image-webpack-loader`
- 缩小打包作用域
  - `exclude/include` (确定 `loader` 规则范围)
  - `resolve.modules` 指明第三方模块的绝对路径 (减少不必要的查找)
  - `resolve.mainFields` 只采用 `main` 字段作为入口文件描述字段 (减少搜索步骤，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段)
  - `resolve.extensions` 尽可能减少后缀尝试的可能性
  - `noParse` 对完全不需要解析的库进行忽略 (不去解析但仍会打包到 `bundle` 中，注意被忽略掉的文件里不应该包含 `import`、`require`、`define` 等模块化语句)
  - [IgnorePlugin](./what-are-the-commonly-used-plugins.md#ignoreplugin) (完全排除模块)
  - 合理使用 `alias`
- 提取页面公共资源
  - 基础包分离
    - 使用 [html-webpack-externals-plugin](./what-are-the-commonly-used-plugins.md#html-webpack-externals-plugin)，将基础包通过 CDN 引入，不打入 bundle 中
    - 使用 [SplitChunksPlugin](./what-are-the-commonly-used-plugins.md#splitchunksplugin) 进行(公共脚本、基础包、页面公共文件)分离(Webpack4 内置)
      - 替代了 CommonsChunkPlugin 插件
- `DLL`
  - 使用 `DllPlugin` 进行分包，使用 DllReferencePlugin(索引链接) 对 `manifest.json` 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。
  - [hashed-module-id-plugin](./what-are-the-commonly-used-plugins.md#hashed-module-id-plugin) 可以解决模块数字 id 问题
- 充分利用缓存提升二次构建速度
  - `babel-loader` 开启缓存
  - [terser-webpack-plugin](./what-are-the-commonly-used-plugins.md#terser-webpack-plugin) 开启缓存
  - 使用 `cache-loader` 或者 [hard-source-webpack-plugin](./what-are-the-commonly-used-plugins.md#hard-source-webpack-plugin)
- `Tree shaking`
  - 打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 `bundle` 中去掉(只能对 `ES6 Modlue` 生效) 开发中尽可能使用 `ES6 Module` 的模块，提高 `tree shaking` 效率
  - 禁用 `babel-loader` 的模块依赖解析，否则 `Webpack` 接收到的就都是转换过的 `CommonJS` 形式的模块，无法进行 `tree-shaking`
  - 使用 `PurifyCSS(不在维护)` 或者 `uncss` 去除无用 `CSS` 代码
    - [purgecss-webpack-plugin](./what-are-the-commonly-used-plugins.md#purgecss-webpack-plugin) 和 [mini-css-extract-plugin](./what-are-the-commonly-used-plugins.md#mini-css-extract-plugin) 配合使用(建议)
- [Scope hoisting](./what-are-the-commonly-used-plugins.md#moduleconcatenationplugin)
  - 构建后的代码会存在大量闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。`Scope hoisting` 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
  - 必须是 `ES6` 的语法，因为有很多第三方库仍采用 `CommonJS` 语法，为了充分发挥 `Scope hoisting` 的作用，需要配置 mainFields 对第三方模块优先采用 `jsnext:main` 中指向的 ES6 模块化语法
  - 作用域提升 策略 `Scope Hoisting` 通过将所有模块的代码放入一个新的、更紧凑的作用域中，减少全局作用域中的变量和函数数量，降低内存消耗并提高代码执行速度。这可以使 `Webpack` 打包出来的代码文件更小、运行的更快。
- 动态 `Polyfill`
  - 建议采用 `polyfill-service` 只给用户返回需要的 `polyfill`，社区维护。 (部分国内奇葩浏览器 UA 可能无法识别，但可以降级返回所需全部 `polyfill`)
