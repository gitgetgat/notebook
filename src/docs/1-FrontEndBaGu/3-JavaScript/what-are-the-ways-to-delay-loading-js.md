# 延迟加载 JS 有哪些方式？

<article-info/>

延迟加载有两种：

## async

::: code-group

```html
<script async type="text/javascript”src='script.js'></script>
```

:::

- `async` 是和 html 解析同步的 (一起的)，不是顺次执行 js 脚本 (谁先加载完谁先执行)

## defer

::: code-group

```html
<script defer type="text/javascript”src='script.js'></script>
```

:::

- 等 html 全部解析完成，才会执行 js 代码，顺次执行 js 脚本

他们的区别可视化分析：<link-tag :linkList="[{ linkText:'growing with the web',linkUrl:'https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html'}]" />
