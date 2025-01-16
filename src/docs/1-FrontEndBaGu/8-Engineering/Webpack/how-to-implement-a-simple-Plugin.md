# 如何实现一个简单的 Plugin？

<article-info/>

<link-tag :linkList="[{ linkText:'自定义插件 Webpack 官方文档',linkUrl:'https://webpack.docschina.org/contribute/writing-a-plugin/'},{ linkText:'Plugin API Webpack 官方文档',linkUrl:'https://webpack.docschina.org/api/plugins/'},{ linkText:'compiler 钩子 Webpack 官方文档',linkUrl:'https://webpack.docschina.org/api/compiler-hooks/'},{ linkText:'compilation 钩子 Webpack 官方文档',linkUrl:'https://webpack.docschina.org/api/compilation-hooks/'}]" />

## 入口文件代码

现在，我们先来编写入口文件 `index.js` 的代码。具体代码如下：

::: code-group

```js
console.log("hello monday");
```

:::

## 编写 `plugin`

现在，我们来编写 `plugin` 的内容， `copyright-webpack-plugin.js` 文件的代码具体如下：

::: code-group

```js
class CopyrightWebpackPlugin {
  //编写一个构造器
  constructor(options) {
    console.log(options);
  }

  apply(compiler) {
    //遇到同步时刻
    compiler.hooks.compile.tap("CopyrightWebpackPlugin", () => {
      console.log("compiler");
    });

    //遇到异步时刻
    //当要把代码放到dist目录之前，要走下面这个函数
    //Compilation存放打包的所有内容，Compilation.assets放置生成的内容
    compiler.hooks.emit.tapAsync(
      "CopyrightWebpackPlugin",
      (Compilation, cb) => {
        debugger;
        // 往代码中增加一个文件，copyright.txt
        Compilation.assets["copyright.txt"] = {
          source: function () {
            return "copyright by monday";
          },
          size: function () {
            return 19;
          }
        };
        cb();
      }
    );
  }
}

module.exports = CopyrightWebpackPlugin;
```

:::

上面的这个插件中想要实现的功能就是，`获取版权信息`。

## 引用 `plugin`

现在，我们在 `webpack.config.js` 中，来引入我们上面的 `plugin` 。`具体配置如下`：

::: code-group

```js
const path = require("path");
const CopyrightWebpackPlugin = require("./plugins/copyright-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },
  plugins: [
    new CopyrightWebpackPlugin({
      name: "monday"
    })
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  }
};
```

:::

通过上述代码，我们可以了解到，在 `（编写 plugin）` 中，我们首先需要定义一个类，之后呢，在类中写一个构造器和一个 `apply()` 方法来调用。然后呢，大家看到 `（引用 plugin）`，通过 `require` 的方式，来进行 `new` 实例 ，实例化一个插件，从而在项目中使用这个插件。
最终，我们项目进行打包时，就会生成一个 `dist` 目录，并且在目录下增加一个 `copyright.txt` 文件，并且文件中的内容就是 `copyright by monday` 。
