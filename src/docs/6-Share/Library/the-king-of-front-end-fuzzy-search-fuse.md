# 前端模糊搜索的王者 —— 神库 Fuse.js

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Fuse.js',linkUrl:'https://github.com/krisk/fuse'},{  linkText:'Fuse.js 文档',linkUrl:'https://www.fusejs.io/examples.html'}]" />

## 为什么要用 `Fuse.js`？

- 使用 `Fuse.js`，您不需要设置专用后端来处理搜索。
- 简单性和性能是开发 `Fuse.js` 的主要优势

## 快速开始

### 安装与引入

`Splide.js` 支持多种安装方式，包括 npm 安装和直接在 HTML 中引入。

::: code-group

```bash [npm]
npm install fuse.js
```

```bash [Yarn]
yarn add fuse.js
```

```html [CDN]
<script src="https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.js"></script>
```

:::

然后，在你的 `JavaScript` 文件中引入 `Splide`：

::: code-group

```js [ES6 module syntax]
import Fuse from "fuse.js";
```

```js [CommonJS]
const Fuse = require("fuse.js");
```

```js [Deno]
import Fuse from "https://deno.land/x/fuse@v7.0.0/dist/fuse.min.mjs";
```

:::

## 示例

可以看官方这里 <link-tag :linkList="[{  linkText:'Fuse.js Examples',linkUrl:'https://www.fusejs.io/examples.html'}]" />

## 高级用法

可以看官方这里 <link-tag :linkList="[{  linkText:'Fuse.js Options',linkUrl:'https://www.fusejs.io/api/options.html'}]" />
