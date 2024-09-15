# Mock.js 一款神奇的 JavaScript 开源前端模拟数据生成器

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Mock.js',linkUrl:'https://github.com/nuysoft/Mock'},{  linkText:'Mock.js 官方文档',linkUrl:'http://mockjs.com/'}]" />

![/920b48a5-c8cf-8c8e-6c55-ca3a87724010.png](/920b48a5-c8cf-8c8e-6c55-ca3a87724010.png)

## `Mock.js` 是什么？

`Mock.js` 是一款流行的前端数据模拟工具，允许开发者在不依赖后端接口的情况下，模拟后端数据，从而加快前端开发的速度。`Mock.js` 可以拦截 `Ajax` 请求，并返回预先定义好的模拟数据，对前后端分离开发特别有用，可以使得前端开发在后端未开发好时能够进行接口请求。

## 快速开始

`Mock.js` 可以通过 npm 或 yarn 进行安装：

::: code-group

```bash [npm]
npm install mockjs --save-dev
```

```bash [yarn]
yarn add mockjs --dev
```

:::

安装完成后，可以在项目引入 `Mock.js`，并定义模拟数据：

::: code-group

```js
// 定义模拟数据
Mock.mock("/api/user", "get", {
  code: 200,
  data: {
    id: "@id",
    name: "@name",
    age: "@integer(20, 50)"
  }
});

// 发生网络请求
axios.get("/api/user").then((res) => {
  console.log(res.data);
});
```

:::

以上代码，当发起 GET 请求到 /api/user 时，`Mock.js` 将返回一个带有模拟数据的响应。

![/74ea8336-e423-7ac3-bbbe-d6e987c204cb.png](/74ea8336-e423-7ac3-bbbe-d6e987c204cb.png)

## 生成规则

`Mock.js` 支持的数据类型相当丰富，主要包括文本、数字、布尔值、日期、邮箱、链接、图片和颜色等。

### 文本数据

`Mock.js` 支持多种文本数据的生成，例如：

• `@cname`: 生成随机中文名，如：张三、李四等；`@name` 生成随机英文名。

•` @ctitle`: 生成随机中文标题，可以指定长度范围；`@title` 生成随机英文名。

• `@paragraph`: 生成随机段落，通常用于模拟文章内容。

• `@city`: 生成随机城市名，适合模拟地址信息。

• `@country`: 生成随机县级行政区名称。

### 数字数据

数字数据的生成同样多样，包括：

• `@integer`: 随机生成整数。

• `@float`: 随机生成浮点书，可以指定小数位数。

• `@increment`: 从某个数值开始，每次递增固定值。

• `@between`: 在两个数之间生成随机数。

### 日期和时间

日期和时间的模拟也非常重要，`Mock.js` 提供了：

• `@date`: 随机生成日期，支持多种格式。

• `@time`: 随机生成时间，支持多种格式。

### 特殊数据

还有一些特殊的数据类型，如：

• `@email`: 生成随机邮箱地址。

• `@url`: 生成随机 `URL` 链接。

• `@dataImage`: 生成随机图片 `URL`，可以指定大小。

• `@color`: 生成随机颜色，支持多种颜色格式。

• `@image`: 生成随机图片 `URL`

另外，`Mock.js` 同样支持自定义函数和正则表达式来生成特定的数据。

## 与 Vue.js 集成

在 Vue 项目中使用 `Mock.js` 只需在入口文件 `main.js` 中引入，并定义接口的模拟数据即可。

::: code-group

```js
import Mock from "mockjs";
import "./mock"; // 引入Mock.js配置文件

if (process.env.NODE_ENV === "development") {
  Mock.start(); // 在开发环境中启用Mock.js
}
```

:::

在 `mock` 文件夹下创建文件，定义接口的模拟数据即可。
