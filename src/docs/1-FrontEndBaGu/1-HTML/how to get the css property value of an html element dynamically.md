# 如何动态获取一个 HTML 元素的 CSS 属性值

<article-info/>

`getComputedStyle` 是一个 `JavaScript` 方法，它可以获取到指定元素的所有最终用于显示的 `CSS` 属性值。

::: code-group

```js [javascript]
// 假设你想获取页面中id为'myElement'的元素的样式
const myElement = document.getElementById("myElement");
const style = window.getComputedStyle(myElement);
console.log(style.color); // 打印出元素的颜色
console.log(style.backgroundColor); // 打印出元素的背景颜色
```

```vue [使用 Vue 的响应式引用]
<template>
  <div ref="myElementRef">Hello, VitePress!</div>
</template>

<script>
export default {
  mounted() {
    const style = window.getComputedStyle(this.$refs.myElementRef);
    console.log(style.color); // 打印出元素的颜色
    console.log(style.backgroundColor); // 打印出元素的背景颜色
  }
};
</script>
```

:::

::: warning ⚠️ 注意
在 `服务器端渲染(SSR)` 的 `VitePress` 应用中，你不能在 `created` 或 `beforeMount` 钩子中使用 `getComputedStyle` ，因为在服务器端没有 DOM API。你应该等到 `mounted` 钩子中获取样式信息。
:::
