# Loader 是什么？

<article-info/>

## `loader` 概述

在实际开发过程中，`webpack` 默认只能打包处理以 `.js` 后缀名结尾的模块。其他非 `.js` 后缀名结尾的模块，`webpack` 默认处理不了，需要调用 `loader` 加载器才可以正常打包，否则会报错！

`loader` 加载器的作用：协助 `webpack` 打包处理特定的文件模块。比如：

- `css-loader` 可以打包处理 `.css` 相关的文件
- `less-loader` 可以打包处理 `.less` 相关的文件
- `babel-loader` 可以打包处理 `webpack` 无法处理的高级 JS 语法

## `loader` 的调用过程

![/16d87c3c-aa78-5f4b-f20a-beae340908df.png](/16d87c3c-aa78-5f4b-f20a-beae340908df.png)

## `loader` 调用过程图解

![/e071b322-cd51-3fd8-a564-5221bef3fd4b.png](/e071b322-cd51-3fd8-a564-5221bef3fd4b.png)

## `loader` 示例

### 打包处理 `css` 文件

1. 运行 npm i style-loader@3.0.0 css-loader@5.2.6 -D 命令，安装处理 css 文件的 loader
2. 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：

::: code-group

```json {3-4}
{
  module: {
    rules: [ // 文件后缀名的匹配规则，定义了不同模块对应的 loader
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
}
```

:::

其中，test 表示匹配的文件类型， use 表示对应要调用的 loader

::: tip 注意
1️⃣ use 数组中指定的 loader 顺序是固定的

2️⃣ 多个 loader 的调用顺序是：从后往前调用
:::

在 `src` 目录下添加 `css/index.css` 文件

![/05555a9d-f634-1d59-01ce-554f3a743fe2.png](/05555a9d-f634-1d59-01ce-554f3a743fe2.png)

![/8cc93883-d645-9a66-2766-4a165855da89.png](/8cc93883-d645-9a66-2766-4a165855da89.png)

如下把图标去掉：

::: code-group

```css
/* index.css */
li {
  list-style: none;
}
```

:::

重新运行 `npm run dev` 后，就会加载对应的 `css-loader`

![/b4a16d8e-a484-28f8-b4c5-44aa7ec23241.png](/b4a16d8e-a484-28f8-b4c5-44aa7ec23241.png)

`loader` 调用的时候是从后往前调用的

### 打包处理 `less` 文件

1. 运行 `npm i less-loader@10.0.1 less@4.1.1 -D` 命令
2. 在 `webpack.config.js` 的 `module -> rules` 数组中，添加 `loader` 规则如下：

less 属于 less-loader 内部的依赖项

::: code-group

```json {5-6}
{
  module: {
    rules: [ // 文件后缀名的匹配规则，定义了不同模块对应的 loader
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // 处理 .less 文件的 loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
    ]
  }
}
```

:::

在上面案例的基础上，在 `css` 文件夹下新建 `index.less` 文件，添加如下：

![/1b5714c3-fe83-093f-56a6-bf5d38e2912a.png](/1b5714c3-fe83-093f-56a6-bf5d38e2912a.png)

::: code-group

```css
html,
body,
ul {
  margin: 0;
  padding: 0;
  li {
    line-height: 30px;
    padding-left: 20px;
    font-size: 12px;
  }
}
```

:::

在 `index.js` 中引入 `index.less` 文件

![/61928f5d-b0a2-f927-7bce-dd22823899e1.png](/61928f5d-b0a2-f927-7bce-dd22823899e1.png)

运行后，根据 `less` 文件中设定的值而变化

![/d7198ae5-0a55-ec33-e1fa-20032ef46830.png](/d7198ae5-0a55-ec33-e1fa-20032ef46830.png)

### 打包处理样式表中与 `url` 路径相关的文件

::: info
小图片（logo）建议转成 `bese64` 格式，因为转为 `base64` ，浏览器访问 `base64` 字符串就不需要再次发送请求给服务器，可以直接拿到图片的数据，防止发起不必要的网络请求
:::

::: info
大图片建议还是采用 `<img>` 标签的形式获取图片，标签的形式获取图片时，浏览器通过请求服务器来获取图片的数据，而 `base64` 则不需要再次请求，直接访问到图片的数据了
:::

::: info
可以通过控制图片的大小来定义是否是大图片或小图片，如：超过 10MB 为大图片，没超过则为小图片，这个时候可以通过 `limit` 来控制了
:::

- 运行 `npm i url-loader@4.1.1 file-loader@6.2.0 -D` 命令
- 在 `webpack.config.js` 的 `module -> rules` 数组中，添加 `loader` 规则如下：

  其中 `?` 之后的是 `loader` 的参数项：

  1️⃣ `limit` 用来指定图片的大小，单位是字节（byte）

  2️⃣ 只有 `≤ limit` 大小的图片，才会被转为 `base64` 格式的图片，否则不会转

然后设定 `limit` 的大小

::: code-group

```json {7-9}
{
  module: {
    rules: [ // 文件后缀名的匹配规则，定义了不同模块对应的 loader
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // 处理 .less 文件的 loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      // 处理图片文件的 loader
      // 如果需要调用的 loader 只有一个，则只传递一个字符串就行，如果有多个loader，则必须写成数组的形式
      { test: /\.jpg|png|gif$/, use: 'url-loader?limit=9712' },
    ]
  }
}
```

:::

运行后，可以看到 `logo.png` 图片被转成 `base64` 了

![/71e0cddf-b0c0-1821-faa5-5a63c68ed2b5.png](/71e0cddf-b0c0-1821-faa5-5a63c68ed2b5.png)

如果设定的值小于图片的大小，就不会被转成 `base64` ，依旧是通过请求的方式访问

![/f6e9f7f1-83fb-a5d8-6ca6-c24986b596fa.png](/f6e9f7f1-83fb-a5d8-6ca6-c24986b596fa.png)

### 打包处理 `js` 文件中的高级语法

- `webpack` 只能打包处理一部分高级的 JavaScript 语法。对于那些 `webpack` 无法处理的高级 JavaScript 语法，需要借助于 `babel-loader` 进行打包处理。例如 `webpack` 无法处理下面的 JavaScript 代码：

::: code-group

```js
// 1. 定义装饰类函数
function info(target) {
  // 2. 为目标添加静态属性 info
  target.info = "Person info";
}

// 3. 定义一个普通类，为 Person 类应用 info 装饰器
@info
class Person {}

// 4. 打印 Person 的静态属性 info
console.log(Person.info);
```

:::

可以看到 `webpack` 已经报错了

![/8f1e4302-6ef5-a7be-4a37-620369ef4f43.png](/8f1e4302-6ef5-a7be-4a37-620369ef4f43.png)

安装 `babel-loader` 相关的包

- 运行如下的命令安装对应的依赖包

::: code-group

```bash
npm i babel-loader@8.2.2 @babel/core@7.14.6 @babel/plugin-proposal-decorators@7.14.5 -D
```

:::

- 在 `webpack.config.js` 的 `module -> rules` 数组中，添加 `loader` 规则如下

::: code-group

```json {10-11}
{
  module: {
    rules: [ // 文件后缀名的匹配规则，定义了不同模块对应的 loader
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // 处理 .less 文件的 loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      // 处理图片文件的 loader
      // 如果需要调用的 loader 只有一个，则只传递一个字符串就行，如果有多个loader，则必须写成数组的形式
      { test: /\.jpg|png|gif$/, use: 'url-loader?limit=9712' },
      // 使用 babel-loader 处理 JS 高级语法
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
    ]
  }
}
```

:::

配置 `babel-loader`

- 在项目根目录下，创建名为 `babel.config.js` 的配置文件，定义 `Babel` 的配置项如下

::: code-group

```js
module.exports = {
  // 声明 babel 可用的插件
  // 将来，webpack 在调用 babel-loader 的时候，会先加载 plugins 插件来使用
  plugins: [{'@babel/plugin-proposal-decorators', { legacy: true }}]
}
```

:::

- 详情请参考 `Babel` 的官网 https://babeljs.io/docs/en/babel-plugin-proposal-decorators

- 重新运行后，可以看到已经生效了

  ![/de2e36e0-89a2-d1e7-cfd2-32c0bcc2fcda.png](/de2e36e0-89a2-d1e7-cfd2-32c0bcc2fcda.png)

### 完整示例代码

![/567a754e-a818-5788-13cb-63417d163387.png](/567a754e-a818-5788-13cb-63417d163387.png)

::: code-group

```js [index.js]
//1.使用 ES6 导入语法，导入 JQuery
import $ from "jquery";

//导入css样式(在webpack中，一切皆模块,都可以通过ES6导入语法进行导入和使用)
import "./css/index.css";
import "./css/index.less";

//1.导入图片，得到图片文件
import logo from "./images/logo.png";
//2.给 img 标签的 src 动态赋值
$(".box").attr("src", logo);

//2.定义JQuery的入口函数
$(function () {
  //3.实现奇偶数变色
  $("li:odd").css("background-color", "red");
  $("li:even").css("background-color", "pink");
});

//1.定义装饰类函数
function info(target) {
  //2.为目标添加静态属性 info
  target.info = "Person info";
}

//3.定义一个普通类,为Person 类应用 info 装饰器
@info
class Person {}

//4.打印 Person 的静态属性 info
console.log(Person.info);
```

```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <!--    <script src="../dist/main.js"></script>-->
    <!--    <script src="/bundle.js"></script>-->
  </head>
  <body>
    <ul>
      <li>这是第 1 个 li</li>
      <li>这是第 2 个 li</li>
      <li>这是第 3 个 li</li>
      <li>这是第 4 个 li</li>
      <li>这是第 5 个 li</li>
      <li>这是第 6 个 li</li>
      <li>这是第 7 个 li</li>
      <li>这是第 8 个 li</li>
      <li>这是第 9 个 li</li>
    </ul>
  </body>
</html>
```

```css [index.css]
li {
  list-style: none;
}
```

```less [index.less]
html,
body,
ul {
  margin: 0;
  padding: 0;
  li {
    line-height: 30px;
    padding-left: 20px;
    font-size: 12px;
  }
}
```

```js [babel.config.js]
module.exports = {
  // 声明 babel 可用的插件
  // 将来，webpack 在调用 babel-loader 的时候，会先加载 plugins 插件来使用
  plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
};
```

```js [webpack.config.js]
const path = require("path");

//1. 导入 HTML 插件，得到一个构造函数
const HtmlPlugin = require("html-webpack-plugin");
//2. 创建 HTML 插件的对象实例
const htmlPlugin = new HtmlPlugin({
  template: "./src/index.html", //指定原文件存放路径
  filename: "./index.html" //指定生成的文件的存放路径
});

//使用 node.js 中的导出语法，向外导出一个 webpack 的配置对象
module.exports = {
  //代表 webpack 运行的模式，可选值有两个， development  production
  mode: "development",
  entry: path.join(__dirname, "./src/index.js"), //打包入口文件的路径
  output: {
    path: path.join(__dirname, "./dist"), //输出文件的存放路径
    filename: "bundle.js" //输出文件的名称
  },
  plugins: [htmlPlugin], //通过 plugins 节点，使 htmlPlugin 插件生效
  devServer: {
    open: true, //初始打包完成后，自动打开浏览器
    host: "127.0.0.1", //实时打包所使用的主机地址
    port: 80 //实时打包所使用的端口号
  },

  module: {
    rules: [
      // 文件后缀名的匹配规则，定义了不同模块对应的 loader
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      // 处理 .less 文件的 loader
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      // 处理图片文件的 loader
      // 如果需要调用的 loader 只有一个，则只传递一个字符串就行，如果有多个loader，则必学写成数组的形式
      { test: /\.jpg|png|gif$/, use: "url-loader?limit=9712" },
      // 使用 babel-loader 处理 JS 高级语法
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ }
    ]
  }
};
```

```json [package.json]
{
  "name": "change-rows-color",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "webpack serve"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "jquery": "^3.6.0"
  },
  "devDependencies": {
    "@babel/core": "^7.14.6",
    "@babel/plugin-proposal-decorators": "^7.14.5",
    "babel-loader": "^8.2.2",
    "css-loader": "^5.2.6",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.3.2",
    "less": "^4.1.1",
    "less-loader": "^10.0.1",
    "style-loader": "^3.0.0",
    "url-loader": "^4.1.1",
    "webpack": "^5.42.1",
    "webpack-cli": "^4.9.0",
    "webpack-dev-server": "^3.11.2"
  }
}
```

:::
