# vue3 是如何实现在 style 中使用响应式变量

<article-info/>

## 前言

`vue2` 的时候想必大家有遇到需要在 `style` 模块中访问 `script` 模块中的响应式变量，为此我们不得不使用 `css` 变量去实现。现在 `vue3` 已经内置了这个功能啦，可以在 `style` 中使用 `v-bind` 指令绑定 `script` 模块中的响应式变量，这篇文章我们来讲讲 `vue` 是如何实现在 `style` 中使用 `script` 模块中的响应式变量。注：本文中使用的 `vue` 版本为 `3.4.19`。

## 举例

我们来看个简单的 demo，index.vue 文件代码如下：

::: code-group

```vue [index.vue]
<template>
  <div>
    <p>222</p>
    <span class="block">hello world</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const primaryColor = ref("red");
</script>

<style scoped>
.block {
  color: v-bind(primaryColor);
}
</style>
```

:::

我们在 `script` 模块中定义了一个响应式变量 `primaryColor`，并且在 `style` 中使用 `v-bind` 指令将 `primaryColor` 变量绑定到 `color` 样式上面。

我们在浏览器的 `network` 面板中来看看编译后的 `js` 文件，如下图：

![/37a8ca82-07f2-d1d9-ed97-b1f38e685675.png](/37a8ca82-07f2-d1d9-ed97-b1f38e685675.png)

从上图中可以看到在 `network` 面板中编译后的 `index.vue` 文件有两个，并且第二个里面有一些 `query` 参数，其中的 `type=style` 就表示当前文件的内容对应的是 `style` 模块。第一个 `index.vue` 对应的是 `template` 和 `script` 模块中的内容。

我们来看看第一个 `index.vue`，如下图：

![/5414c4cc-cdf6-12b0-a000-c3accbcfcab8.png](/5414c4cc-cdf6-12b0-a000-c3accbcfcab8.png)

从上图中可以看到 `setup` 函数是 `script` 模块编译后的内容，在 `setup` 函数中多了一个 `_useCssVars` 函数，从名字你应该猜到了，这个函数的作用是和 `css` 变量有关系。别着急，我们接下来会详细去讲 `_useCssVars` 函数。

我们再来看看第二个 `index.vue`，如下图：

![/0956a82c-1f9b-36c5-3ad4-c137128c20e1.png](/0956a82c-1f9b-36c5-3ad4-c137128c20e1.png)

从上图中可以看到这个 `index.vue` 确实对应的是 style 模块中的内容，并且原本的 `color: v-bind(primaryColor);` 已经变成了 `color: var(--c845efc6-primaryColor);`。

很明显浏览器是不认识 `v-bind(primaryColor);` 指令的，所以经过编译后就变成了浏览器认识的 `css` 变量 `var(--c845efc6-primaryColor);`。

我们接着在 `elements` 面板中来看看此时 `class` 值为 `block` 的 `span` 元素，如下图：

![/5e9e23fd-14ab-3264-6e59-c6c54b205bfb.png](/5e9e23fd-14ab-3264-6e59-c6c54b205bfb.png)

从上图中可以看到 `color` 的值为 `css` 变量 `var(--c845efc6-primaryColor)`，这个我们前面讲过。不同的是这里从父级元素 `div` 中继承过来一个 `--c845efc6-primaryColor: red;`。

这个就是声明一个名为 `--c845efc6-primaryColor` 的 `css` 变量，变量的值为 `red`。

还记得我们在 `script` 模块中定义的响应式变量 `primaryColor` 吗？他的值就是 `red`。

所以这个 `span` 元素最终 `color` 渲染出来的值就是 `red`。

接下来我们将通过 `debug` 的方式带你搞清楚在 `style` 中是如何将指令 `v-bind(primaryColor)` 编译成 `css` 变量 `var(--c845efc6-primaryColor)`，以及 `_useCssVars` 函数是如何生成声明值为 `red` 的 `css` 变量 `--c845efc6-primaryColor`。
