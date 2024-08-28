# Vue 拓展图标库 vue-icons-plus

<article-info />

[官网地址](https://vue-icons.com/icons/)

## 使用

::: code-group

```bash [安装]
yarn add vue-icons-plus
# or
npm install vue-icons-plus --savec
```

```vue [Vue3]
<script>
import { FaBeer } from "vue-icons-plus/fa";
import { IconName } from "vue-icons-plus/md";
</script>

<template>
  <div>
    <FaBeer />
    <IconName />
  </div>
</template>
```

```vue [Vue ^2.7]
<script>
import { FaBeer } from "vue-icons-plus/fa";
import { IconName } from "vue-icons-plus/md";
export default {
  components: {
    FaBeer
  }
};
</script>

<template>
  <div>
    <FaBeer />
    <IconName />
  </div>
</template>
```

:::

## 配置 Props

您可以通过 props 更改图标的大小、颜色等。

::: code-group

```vue
<script>
import { FaBeer } from "vue-icons-plus/fa";
</script>

<template>
  <div>
    <FaBeer size="48" color="#333" />
  </div>
</template>
```

:::

### Props

| Key       |  Default  |                        Notes |
| --------- | :-------: | ---------------------------: |
| color     | undefined |                    (inherit) |
| size      |    24     |                              |
| className | undefined |                           $1 |
| style     | undefined | Can overwrite size and color |

## 注意！！！

::: warning 遇到的问题
这个库不论我在组件中使用，还是在入口文件 main.js 中使用，使用时没问题，但是在在 vitepress 的 vite 打包构建时报错：

![/b27f7895-e0d6-31f4-72dd-18f5d37b86a1.jpg](/b27f7895-e0d6-31f4-72dd-18f5d37b86a1.jpg)

大意是 "库的入口文件 引用内部的 ES 模块时出错"
:::

::: info 暂时的解决方案
这里我在 vitepress 入口文件引用这个图标库，以组件的形式注册成文全局组件（和 `@element-plus/icons-vue` 方式相同），但是修改引入方式，这样可以打包构建通过
::: code-group

```js
import DefaultTheme from 'vitepress/theme'
import * as iconLu from 'vue-icons-plus/lu' // 旧的报错引入方式 // [!code --]
import * as iconLu from '../../node_modules/vue-icons-plus/icons/lu/index.mjs'// 新的引入方式 // [!code ++]
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    for (const [key, component] of Object.entries(iconLu)) {
      app.component(key, component)
  }
}
```

:::
