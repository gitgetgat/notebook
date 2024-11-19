# 探索 Globby：Node.js 文件操作的“全能搜寻器”

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Globby',linkUrl:'https://github.com/sindresorhus/globby'}]" />

## 什么是 `Globby`？

`Globby` 是一个强大的 Node.js 库，用于文件匹配和查找。基于 `glob` 模式，它能够轻松搜索、匹配和筛选文件路径。无论是简单的文件查找还是复杂的模式匹配，`Globby` 都能帮你轻松搞定。

## 使用方式

::: code-group

```bash [npm 安装]
npm install globby
```

```js [NodeJs 使用]
const globby = require("globby");

async function findFiles() {
  try {
    // 匹配所有js文件
    const paths = await globby(["*.js", "!node_modules"]);

    console.log("找到的文件:", paths);
  } catch (error) {
    console.error("文件查找失败", error);
  }
}

findFiles();
```

:::

## `Globby` 的优劣势

### 优势

- <imp-text-danger>易于使用</imp-text-danger>：`Globby` 提供了简单直观的 API，让文件匹配操作变得轻松自如。

- <imp-text-danger>强大的模式匹配</imp-text-danger>：支持多种 `glob` 模式，能够灵活处理各种文件查找需求。

- <imp-text-danger>异步操作</imp-text-danger>：支持 `Promise` 和 `async/await`，异步文件操作更加高效。

- <imp-text-danger>高性能</imp-text-danger>：经过优化的算法和实现，能够快速处理大规模文件查找。

- <imp-text-danger>社区支持</imp-text-danger>：作为开源项目，`Globby` 得到了广泛的社区支持和贡献，不断进行改进和优化。

### 劣势

- <imp-text-danger>学习曲线</imp-text-danger>：对于不熟悉 `glob` 模式的开发者来说，可能需要一些时间来掌握复杂的匹配规则。

- <imp-text-danger>限制性</imp-text-danger>：虽然强大，但在一些非常特殊的文件匹配需求下，可能需要结合其他工具使用。

## 使用 `Globby` 需要注意的地方

- <imp-text-danger>模式精度</imp-text-danger>：确保使用正确的 `glob` 模式来匹配文件，避免遗漏或误包含文件。

- <imp-text-danger>性能考虑</imp-text-danger>：在处理非常大量的文件时，注意性能优化，避免长时间等待。

- <imp-text-danger>异步处理</imp-text-danger>：利用 `Promise` 或 `async/await` 进行异步处理，避免阻塞事件循环。

- <imp-text-danger>文件排除</imp-text-danger>：善用排除模式（如`!node_modules`），避免不必要的文件匹配。

- <imp-text-danger>安全性</imp-text-danger>：在处理用户输入的模式时，注意安全性，防止路径遍历攻击。
