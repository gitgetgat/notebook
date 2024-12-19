# Webpack 是如何把不同的模块合并到一起，并且保证其正常工作的

<article-info/>

1. <imp-text-danger>解析入口文件</imp-text-danger>：`Webpack` 从配置的入口文件开始，解析该文件及其依赖的模块。入口文件通常是项目的根文件，如 `index.js`。
2. <imp-text-danger>构建 AST（抽象语法树）</imp-text-danger>：`Webpack` 使用 `解析器（parser）` 将源代码转换为 `AST`。`AST` 是源代码的树状表现形式，使得 `Webpack` 能够理解和分析代码的结构。
3. <imp-text-danger>找出依赖关系</imp-text-danger>：在解析 `AST` 的过程中，`Webpack` 会识别出 `import`、`require` 等模块导入语句，并记录下这些依赖关系。这些依赖关系形成了一个依赖图（dependency graph）。
4. <imp-text-danger>加载和转换模块</imp-text-danger>：根据依赖图，`Webpack` 会加载每个依赖模块，并使用配置的 `loader` `对模块进行转换。例如，CSS` 文件会通过 `css-loader` 转换为 `JavaScript` 模块，图片文件会通过 `file-loader` 或 `url-loader` 进行处理。
5. <imp-text-danger>打包模块</imp-text-danger>：一旦所有模块都被加载和转换，`Webpack` 会将它们打包到一个或多个 `bundle` 中。这个过程包括将模块的代码和依赖关系合并到一起，以及进行代码优化和压缩等操作。
6. <imp-text-danger>输出 bundle</imp-text-danger>：最后，`Webpack` 将打包好的 `bundle` 输出到配置的输出目录中。输出可以是单个文件，也可以是多个文件（如代码分割后的多个 `chunk`）。
