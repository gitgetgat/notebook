# 如何实现一个简单的 loader？

<article-info/>

<link-tag :linkList="[{ linkText:'编写 loader Webpack 官方文档',linkUrl:'https://webpack.docschina.org/contribute/writing-a-loader/'}]" />

## 用法准则

编写 `loader` 时应该遵循以下准则。它们按重要程度排序，有些仅适用于某些场景，请阅读下面详细的章节以获得更多信息。

- 保持 `简单` 。
- 使用 `链式` 传递。
- `模块化` 的输出。
- 确保 `无状态` 。
- 使用 loader utilities 。
- 记录 loader `的依赖` 。
- 解析 `模块依赖关系` 。
- 提取 `通用代码` 。
- 避免 `绝对路径` 。
- 使用 peer dependencies。

## 代码编写

### 入口文件代码

此次我们要写的 `loader` 实现一个很简单的功能，就是把字符串 `monday` 替换为传入的参数的 `name` 属性。现在，我们先来编写入口文件 `index.js` 的代码。具体代码如下：

::: code-group

```js
console.log("hello monday");
```

:::

### 编写 `loader`

充分利用 `loader-utils` 包。它提供了许多有用的工具，但最常用的一种工具是获取传递给 `loader` 的选项。`schema-utils` 包配合 `loader-utils`，用于保证 `loader` 选项，进行与 `JSON Schema` 结构一致的校验。这里有一个简单使用两者的例子：

::: code-group

```js
const loaderUtils = require("loader-utils");
import { validate } from "schema-utils";

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    }
  }
};

export default function (source) {
  const options = loaderUtils.getOptions(this);

  validate(schema, options, {
    name: "Example Loader",
    baseDataPath: "options"
  });

  console.log("The options: ", options);

  // 对资源应用一些转换……

  const result = source.replace("monday", options.name);

  this.callback(null, result);
}
```

:::

大家可以看到，通过使用 `loaderUtils` 插件，间接地，调用 `getOptions` 方法，来自动的帮我们分析 `this.query` ，从而取到我们想要的内容。

值得注意的是，我们还需要再了解一下 `this.callback` 的内容。

一般情况下，如果我们接收到了源代码 `source` ，那么现在我们只能对源代码做处理。但是呢，有的时候，我们想要使用一些 `sourceMap` ，或者对源代码分析好了之后，我们不仅想要返回源代码，还要把 `sourceMap` 也带回去。

因为我们 `return` 的时候只能 `return` 一个参数，其余的一些额外的内容就带不出去了。这个时候呢，我们就需要 `this.callback` 来帮我们把 `sourceMap` 给带出去。因此，一般用 `this.callback` 来返回内容。

### 引用 `loader`

现在，我们在 `webpack.config.js` 中，来引入我们上面的 `loader` 。具体配置如下：

::: code-group

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            loader: path.resolve(__dirname, "./loaders/replaceLoader.js"),
            //上面的 options.name 中的 name
            options: {
              name: "阿罗拉"
            }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  }
};
```

:::

通过以上方式，我们写了一个简易的 `loader` ，这个 `loader` 实现了将 `monday` 替换为 `阿罗拉` 的功能。并且供我们在 `webpack` 中使用自己书写的 `loader` 。

### 在 `loader` 里面做一些异步的操作

好了现在，如果我们想要给 `loader` 做一些异步操作，该怎么实现呢？
在我们所写的 `loader` 当中，加入异步操作，那么我们需要调用官方提供给我们的 `this.async()` 这个 API 来实现。现在，我们来改造一下 `replaceLoader.js` 文件的代码。具体代码如下：

::: code-group

```js
const loaderUtils = require("loader-utils");

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  //调用this.async()这个API，来给异步代码使用
  const callback = this.async();

  setTimeout(() => {
    const result = source.replace("monday", options.name);
    callback(null, result);
  }, 1000);
};
```

:::

通过这种方式，我们就可以在 `loader` 中编写异步代码，来达到我们想要的效果。

### `loader` 路径自定义

有一个很小的注意点就是，当我们在配置 `webpack.config.js` 文件中， `loader` 的路径时，每回都要 `path.resolve` 去寻找路径文件。文件少的时候还好，但如果遇到多文件的时候呢？岂不是会很麻烦。
所以，我们引用 `resolveLoader` 来简化它。现在我们在 `webpack.config.js` 文件中进行改造。具体配置如下：

::: code-group

```js
const path = require("path");

module.exports = {
  // 先到node_modules中去找，找不到则去./loaders目录下去找
  resolveLoader: {
    modules: ["node_modules", "./loaders"]
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            loader: "replaceLoader"
          }
        ]
      }
    ]
  }
};
```

:::

通过配置 `resolveLoader` ，来对文件文件目录进行查找，从而简化了路径内容。
