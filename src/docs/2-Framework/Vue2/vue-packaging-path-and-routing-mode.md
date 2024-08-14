# Vue 打包路径和路由模式

<article-info/>

## [**打包路径**](https://cli.vuejs.org/zh/config/#publicpath)

::: code-group

```js
module.exports = {
  publicPath: './';// 使用相对路径
}
```

:::

## 路由模式

- 上线前使用 hash 模式测试
- 打包上线时使用 history 模式，交给后端或者运维，处理 URL 问题
