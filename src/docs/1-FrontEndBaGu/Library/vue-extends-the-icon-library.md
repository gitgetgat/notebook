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
