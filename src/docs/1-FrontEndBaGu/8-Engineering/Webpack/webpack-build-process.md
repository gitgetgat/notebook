# Webpack 构建流程

<article-info/>

## Webpack 的运行流程

`Webpack` 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1.  <imp-text-danger>初始化参数（Initialization）：</imp-text-danger>从配置文件和 `Shell` 语句中读取与合并参数，得出最终的参数；并且构建出 `Compiler` 对象。这个阶段主要包括以下几个步骤：

    - <imp-text-primary>读取配置：</imp-text-primary>`Webpack` 读取 `webpack.config.js` 配置文件（如果没有配置文件，会使用默认配置）。

    - <imp-text-primary>创建 Compiler 对象：</imp-text-primary>根据配置，`Webpack` 会创建一个全局的 `Compiler` 对象，这个对象是贯穿整个打包过程的核心，它管理着整个打包的生命周期。

      ::: code-group

      ```js
      const compiler = webpack(config);
      ```

      :::

    - <imp-text-primary>注册插件：</imp-text-primary>在初始化时，`Webpack` 会注册在配置文件中指定的插件（通过 `plugins` 选项）。这些插件会监听 `Webpack` 的生命周期钩子，并在特定时刻执行自定义的逻辑。

2.  <imp-text-danger>开始编译（Start Compiling）：</imp-text-danger>在 `Webpack` 初始化后，编译过程正式开始。这一阶段 `Webpack` 会开始处理模块的依赖关系，执行对象的 `run` 方法开始执行编译；

    - <imp-text-primary>触发 run 钩子：</imp-text-primary>`Webpack` 在编译开始时会触发 `run` 钩子，`Plugin` 可以在这个时刻做一些初始化操作。

      ::: code-group

      ```js
      compiler.run((err, stats) => {
        // 开始编译
      });
      ```

      :::

    - <imp-text-primary>创建 Compilation 对象：</imp-text-primary>`Webpack` 创建了 `Compilation` 对象，它用于跟踪本次打包的所有信息，包含模块依赖、生成的代码块、文件等信息。

3.  <imp-text-danger>确定入口（Entry Options）：</imp-text-danger>根据配置中的 `entry` 找出所有的入口文件，`Webpack` 确定从哪里开始解析依赖树。

    ::: code-group

    ```js
    module.exports = {
      entry: "./src/index.js" // 定义入口文件
    };
    ```

    :::

    入口文件是 Webpack 构建依赖图的起点，从这里开始递归地分析依赖。

4.  <imp-text-danger>编译模块（Building Modules）：</imp-text-danger>从入口文件出发，调用所有配置的 `Loader` 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；

    步骤详解：

    - <imp-text-primary>解析依赖：</imp-text-primary>`Webpack` 从入口文件出发，递归地查找模块的依赖。对于每一个依赖的文件，`Webpack` 会把它看作一个模块。

      - `Webpack` 内部把 `JavaScript` 文件和其他资源（如 CSS、图片）都视为模块。`JavaScript` 文件会被直接处理，而非 `JavaScript` 文件（如 CSS、图片等）则需要通过 `Loader` 进行转换。

    - <imp-text-primary>应用 Loader：</imp-text-primary>对于每个模块，`Webpack` 会根据配置中的 `module.rules` 应用相应的 `Loader` 来转换模块的内容。

      - 例如：使用 `babel-loader` 将 `ES6+` 的 `JavaScript` 转换为 `ES5` 代码，或使用 `css-loader` 来加载 `CSS` 文件。

    ::: code-group

    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/, // 匹配 .js 文件
            use: "babel-loader" // 使用 babel-loader 转换代码
          },
          {
            test: /\.css$/, // 匹配 .css 文件
            use: ["style-loader", "css-loader"] // 使用多个 loader 处理 CSS
          }
        ]
      }
    };
    ```

    :::

    - <imp-text-primary>递归构建依赖树：</imp-text-primary>`Webpack` 会递归地解析每个模块的依赖项，把每个依赖也看作是一个新的模块，继续重复这个过程。最终，`Webpack` 会得到整个项目的依赖图，即所有模块及其依赖关系的完整结构。

5.  <imp-text-danger>完成模块编译（Module Bundling）：</imp-text-danger>在经过第 `4` 步使用 `Loader` 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；Webpack 开始将这些模块打包成一个或多个输出文件。

    - <imp-text-primary>将模块分块（Chunking）：</imp-text-primary>`Webpack` 会根据配置（比如 `output` 和 `optimization.splitChunks`）将所有的模块进行分块处理，生成一个或多个代码块（chunk）。

    - <imp-text-primary>优化打包：</imp-text-primary>这个阶段，`Webpack` 会进行一些优化工作，比如：

      - <imp-text-primary>代码压缩：</imp-text-primary>通过 `TerserPlugin` 等插件进行 `JavaScript` 代码压缩。
      - <imp-text-primary>CSS 优化：</imp-text-primary>通过 `CssMinimizerPlugin` 压缩 `CSS` 文件。
      - <imp-text-primary>Tree Shaking：</imp-text-primary>移除未使用的代码。
      - <imp-text-primary>代码分割：</imp-text-primary>把依赖关系大的代码分割成多个文件，以实现按需加载（通过 `optimization.splitChunks` 配置实现）。

6.  <imp-text-danger>输出资源（Emit Assets）：</imp-text-danger>根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；(在 `Compiler` 开始生成文件前，钩子 `emit` 会被执行，这是我们修改最终文件的最后一个机会)，在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。这个阶段 `Webpack` 会处理以下工作：

    - <imp-text-primary>生成文件</imp-text-primary>：`Webpack` 会把最终的代码块（`chunks`）打包成一个或多个文件（如 `bundle.js`）。

    - <imp-text-primary>处理模板</imp-text-primary>：如果使用了 `HtmlWebpackPlugin` 插件，`Webpack` 会生成一个 `HTML` 文件，并自动注入打包生成的文件链接。

    例如，打包结果可能包含一个 `index.html`，其中自动插入了 `<script src="bundle.js"></script>`。

    - <imp-text-primary>写入文件系统</imp-text-primary>：最后，`Webpack` 会把生成的文件写入到配置的输出目录中，通常是 `dist` 目录。

    ::: code-group

    ```js
    module.exports = {
      output: {
        filename: "bundle.js", // 输出的文件名
        path: path.resolve(__dirname, "dist") // 输出文件的目录
      }
    };
    ```

    :::

7.  <imp-text-danger>输出完成（Done）：</imp-text-danger>当文件成功输出后，`Webpack` 会触发 `done` 钩子，此时可以执行一些完成后的操作，比如通知用户、输出打包报告等。

    - <imp-text-primary>触发 done 钩子：</imp-text-primary>插件可以在 `done` 钩子中执行一些清理、通知或者日志输出操作。

8.  <imp-text-danger>热更新（HMR - Hot Module Replacement，选择性）：</imp-text-danger>如果你在开发模式中启用了<imp-text-primary>热模块替换（HMR）</imp-text-primary>功能，`Webpack` 会保持监听文件变化，并在代码变动时只更新变化的部分，而不是重新打包整个项目。

## 事件广播

在以上过程中，`Webpack` 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 `Webpack` 提供的 `API` 改变 `Webpack` 的运行结果。

![/90ccbfe5-de26-d07d-73b1-4a6959d69f79.png](/90ccbfe5-de26-d07d-73b1-4a6959d69f79.png)

## 总结

1. <imp-text-danger>初始化</imp-text-danger>：启动构建，读取与合并配置参数，加载 `Plugin`，实例化 `Compiler`
2. <imp-text-danger>编译</imp-text-danger>：从 `Entry` 出发，针对每个 `Module` 串行调用对应的 `Loader` 去翻译文件的内容，再找到该 `Module` 依赖的 `Module`，递归地进行编译处理
3. <imp-text-danger>输出</imp-text-danger>：将编译后的 `Module` 组合成 `Chunk`，将 `Chunk` 转换成文件，输出到文件系统中
