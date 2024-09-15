# 到底是 vue 全局混入好，还是 Vue.prototype 添加方法好？

<article-info/>

- `mixins` 是直接复制到 vue 实例对象上，在初始化时，把 `mixin` 的选项 复制一份
- `vue.prototype` 是直接在原型上添加方法

::: warning ⚠️ 注意
请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项，就像上面示例一样。推荐将其作为 [插件](https://cn.vuejs.org/v2/guide/plugins.html) 发布，以避免重复应用混入。
:::
