# Plugin 是什么？

<article-info/>

## `webpack` 插件的作用

- 通过安装和配置第三方的插件，可以拓展 `webpack` 的能力，从而让 `webpack` 用起来更方便。最常用的 `webpack` 插件有如下两个：

  1️⃣ <link-tag :linkList="[{  linkText:'webpack-dev-server',linkUrl:'https://webpack.docschina.org/configuration/dev-server/'}]" />

  - 类似于 `node.js` 阶段用到的 `nodemon` 工具，浏览器自动更改后的内容
  - 每当修改了源代码，`webpack` 会自动进行项目的打包和构建
  - 作为普通的 Web Server，处理静态资源文件请求

  2️⃣ <link-tag :linkList="[{  linkText:`html-webpack-plugin`,linkUrl:'https://webpack.docschina.org/plugins/html-webpack-plugin/#root'}]" />

  - `webpack` 中的 `HTML` 插件（类似于一个模板引擎插件）
  - 可以通过此插件自定制 `index.html` 页面的内容

## `webpack-dev-server`

`webpack-dev-server` 可以让 `webpack` 监听项目源代码的变化，从而进行自动打包构建。

### 安装 `webpack-dev-server`

运行如下的命令，即可在项目中安装此插件

::: code-group

```bash
npm install webpack-dev-server@3.11.2 -D
```

:::

### 配置 `webpack-dev-server`

1️⃣ 修改 `package.json -> scripts` 中的 `dev` 命令如下

::: code-group

```json [package.json]
{
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --open" //open是自动执行后打开页面
  }
}
```

:::

2️⃣ 再次运行 `npm run dev` 命令，重新进行项目的打包

![/63894287-1cbc-b625-12cf-05315d088ba8.png](/63894287-1cbc-b625-12cf-05315d088ba8.png)

3️⃣ 在浏览器中访问 `http://localhost:8080` 地址，查看自动打包效果

- 注意：`webpack-dev-server` 会启动一个实时打包的 `http` 服务器

  ![/983e8164-2553-630d-8878-1fdcadd4f4c0.png](/983e8164-2553-630d-8878-1fdcadd4f4c0.png)

- 只要修改代码，就会被这个插件所监听到

  ![/5815455b-6089-3ecd-1699-7b2879acee3c.png](/5815455b-6089-3ecd-1699-7b2879acee3c.png)

### 打包生成的文件哪儿去了？

1️⃣ 不使用 `webpack-dev-server` 的情况下，`webpack` 打包生成的文件，会存放到实际的物理磁盘上

- 严格遵守开发者在 `webpack.config.js` 中指定配置
- 根据 `output` 节点指定路径进行存放

2️⃣ 使用了 `webpack-dev-server` 之后，打包生成的文件存放到了内存中

- 不再根据 `output` 节点指定的路径，存放到实际的物理磁盘上
- 提高了实时打包输出的性能，因为内存比物理磁盘速度快很多

所以在使用了打包插件后，根目录文件下看不到生成的 `bundle.js` （本质上是 `main.js`，打包插件把 `main.js` 加载到内存当中改名为 `bundle.js`），但能访问到，这是因为存放到内存当中了

![/51b8bc3f-ce99-8476-61fb-5555fb2ec775.png](/51b8bc3f-ce99-8476-61fb-5555fb2ec775.png)

![/9e1bb3ef-0821-cf48-b480-663e5b5d2db3.png)](/9e1bb3ef-0821-cf48-b480-663e5b5d2db3.png)

![/5383071f-542c-7da6-84e8-4d1992e3f991.png](/5383071f-542c-7da6-84e8-4d1992e3f991.png)

### 生成到内存中的文件该如何访问？

`webpack-dev-server` 生成到内存中的文件，默认是放到了项目的根目录中，而且是虚拟的、不可见的。

#️⃣ 可以直接用 `/` 表示项目根目录，后面跟上要访问的文件名称，即可访问内存中的文件
#️⃣ 例如 `/bundle.js` 就表示要访问 `webpack-dev-server` 生成到内存中的 `bundle.js` 文件

- 所以把 `index.html` 引入内存中的 `bundle.js` （本质还是 `/dist/main.js` ）

  ![/3a019f2e-550d-d151-421f-7512b457fafc.png](/3a019f2e-550d-d151-421f-7512b457fafc.png)

- 把 `index.js` 改成 红 黑 交替

  ![/57b13783-0862-9006-1a85-ba0a803cc406.png](/57b13783-0862-9006-1a85-ba0a803cc406.png)

- 访问 `http://localhost:8080/src/`，发现可以实时变化

  ![/d4e5c571-fc00-cd42-03bd-04993c12e9ba.png](/d4e5c571-fc00-cd42-03bd-04993c12e9ba.png)

## `html-webpack-plugin`

- `html-webpack-plugin` 是 `webpack` 中的 `HTML` 插件，可以通过此插件自定制 `index.html` 页面的内容。
- 需求：通过 `html-webpack-plugin` 插件，将 src 目录下的 `index.html` 首页，复制到项目根目录中一份。

### 安装 `html-webpack-plugin`

- 运行如下的命令，即可在项目中安装此插件：

::: code-group

```bash
npm install html-webpack-plugin@5.3.2 -D
```

:::

### 配置 `html-webpack-plugin`

![/7eaf6a44-d902-d634-347b-193386702093.png](/7eaf6a44-d902-d634-347b-193386702093.png)

### 解惑 `html-webpack-plugin`

1️⃣ 通过 `HTML` 插件复制到项目根目录中的 `index.html` 页面，也被放到了内存中

- 运行 `npm run dev` 后，在 `8080` 端口下就能直接访问到项目中的 `index.html`

  ![/140dcf94-0c79-7b45-a5b5-d1be93617067.png](/140dcf94-0c79-7b45-a5b5-d1be93617067.png)

- 访问根路径下的 `src` 目录，也能访问到项目，说明 `html-webpack-plugin` 把 `src` 下的 `index.html` 文件复制一份到根路径下了

  ![/8e88ed1a-9e6f-aa40-e398-053c67c0ff7f.png](/8e88ed1a-9e6f-aa40-e398-053c67c0ff7f.png)

- 在根路径下并没有看到复制出的 `index.html` 文件，说明被放到内存当中了

  ![/f19a489f-8bba-c0cf-cb21-02f0b5ba8742.png](/f19a489f-8bba-c0cf-cb21-02f0b5ba8742.png)

2️⃣ `HTML` 插件在生成的 `index.html` 页面，自动注入了打包的 `bundle.js` 文件

- 把引入的 `bundle.js` 文件注释掉，但还能在页面中看到效果

  ![/b1e96aee-7897-6236-8bcb-96a0fa50ce12.png](/b1e96aee-7897-6236-8bcb-96a0fa50ce12.png)

  ![/46b2f567-bfdf-3901-c00b-f389ab876722.png](/46b2f567-bfdf-3901-c00b-f389ab876722.png)

- 查看网页源代码，发现 `html-webpack-plugin` 插件会自动注入打包后的 `bundle.js` 文件，所以后面打包后就不需要手动注入 `bundle.js` 文件了

  ![/24047ec0-46be-deb6-fe9f-6056b274b85d.png](/24047ec0-46be-deb6-fe9f-6056b274b85d.png)

## `devServer` 节点

- 在每一次打包后，都要手动打开浏览器输入 `8080` 端口才能看到页面，有点麻烦
- 在 `webpack.config.js` 配置文件中，可以通过 `devServer` 节点对 `webpack-dev-server` 插件进行更多的配置

![/5a27a2db-2813-3428-b94a-1187cc5a1741.png](/5a27a2db-2813-3428-b94a-1187cc5a1741.png)

## 完整的实例代码如下

![/268b0167-eb6e-f09b-1fcb-2c8da7dee160.png](/268b0167-eb6e-f09b-1fcb-2c8da7dee160.png)

::: code-group

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

```js [index.js]
//1.使用 ES6 导入语法，导入 JQuery
import $ from "jquery";

//2.定义JQuery的入口函数
$(function () {
  //3.实现奇偶数变色
  $("li:odd").css("background-color", "red");
  $("li:even").css("background-color", "pink");
});
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
    "html-webpack-plugin": "^5.3.2",
    "webpack": "^5.42.1",
    "webpack-cli": "^4.9.0",
    "webpack-dev-server": "^3.11.2"
  }
}
```

```js [webpack.config.js]
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
  }
};
```

:::
