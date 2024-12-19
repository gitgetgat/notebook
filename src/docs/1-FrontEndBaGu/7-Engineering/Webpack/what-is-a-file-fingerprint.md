# 文件指纹是什么？怎么用？

<article-info/>

文件指纹是打包后输出的文件名的后缀。

- <imp-text-danger>Hash</imp-text-danger>：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 `hash` 值就会更改
- <imp-text-danger>Chunkhash</imp-text-danger>：和 `Webpack` 打包的 `chunk` 有关，不同的 `entry` 会生出不同的 `chunkhash`
- <imp-text-danger>Contenthash</imp-text-danger>：根据文件内容来定义 `hash`，文件内容不变，则 `contenthash` 不变

## `JS` 的文件指纹设置

设置 `output` 的 `filename`，用 `chunkhash`。

::: code-group

```js
module.exports = {
  entry: {
    app: "./scr/app.js",
    search: "./src/search.js"
  },
  output: {
    filename: "[name][chunkhash:8].js",
    path: __dirname + "/dist"
  }
};
```

:::

## `CSS` 的文件指纹设置

设置 `MiniCssExtractPlugin` 的 `filename`，使用 `contenthash`。

::: code-group

```js
module.exports = {
  entry: {
    app: "./scr/app.js",
    search: "./src/search.js"
  },
  output: {
    filename: "[name][chunkhash:8].js",
    path: __dirname + "/dist"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name][contenthash:8].css`
    })
  ]
};
```

:::

## 图片的文件指纹设置

设置 `file-loader` 的 `name`，使用 `hash`。

占位符名称及含义

- <imp-text-danger>ext：</imp-text-danger> 资源后缀名
- <imp-text-danger>name：</imp-text-danger> 文件名称
- <imp-text-danger>path：</imp-text-danger> 文件的相对路径
- <imp-text-danger>folder：</imp-text-danger> 文件所在的文件夹
- <imp-text-danger>contenthash：</imp-text-danger> 文件的内容 `hash`，默认是 `md5` 生成
- <imp-text-danger>hash：</imp-text-danger> 文件内容的 `hash`，默认是 `md5` 生成
- <imp-text-danger>emoji：</imp-text-danger> 一个随机的指代文件内容的 `emoji`

::: code-group

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name][hash:8].[ext]"
            }
          }
        ]
      }
    ]
  }
};
```

:::
