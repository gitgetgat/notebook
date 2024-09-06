# 深度选择器探秘：`/deep/`、`>>>`、`::v-deep` 与 `v-deep()` 的区别与用法

<article-info/>

在 Vue.js 项目中，尤其是在使用组件化开发时，我们时常需要修改组件内部的样式，做`样式穿透`，但 Vue 的样式封装特性（如 `<style scoped>` ）会阻止外部样式直接作用于组件内部。为了应对这一挑战，Vue 社区引入了 `深度选择器`（也称为穿透选择器或阴影穿透选择器），让我们能够跨越组件的封装边界，对内部元素进行样式定制。

本文将详细探讨 <span v-pre>`/deep/`</span> 、 <span v-pre>`>>>`</span> 、<span v-pre>`::v-deep`</span> 以及 <span v-pre>Vue3 Composition API</span> 中的 <span v-pre>`v-deep()`</span> 的区别与使用方法。

## 深度选择器的区别

### <span v-pre>`/deep/`</span>

- Vue 2.x 中的用法：<span v-pre>`/deep/`</span> 是 Vue 2.x 中用于穿透组件样式封装的一种方式，类似于 Sass 的 <span v-pre>`/deep/`</span> 或 <span v-pre>`/deep/`</span> 的别名 <span v-pre>`::v-deep`</span>（但 Vue 2.x 官方文档中并未直接提及<span v-pre>`::v-deep`</span>）。

- 兼容性：支持 CSS 预处理器（如 Sass、Less）和 CSS 原生样式。

::: warning ⚠️ 注意
在 Vue 3.x 中，`/deep/` 不再被官方直接支持，虽然一些构建工具或库可能仍然兼容，但推荐使用 `::v-deep`。
:::

### <span v-pre>`>>>`</span>

- CSS 原生语法：`>>>` 是 CSS 原生中的深度选择器语法，用于穿透样式封装。但在 Vue 单文件组件（.vue）中，它并不总是被直接支持，因为 Vue 会将其视为普通 CSS 选择器的一部分。

- 兼容性：仅在某些特定环境（如 Webpack 的 css-loader 配置中）和原生 CSS 中有效，Vue 单文件组件中通常需要特定配置才能使用。

::: warning ⚠️ 注意
在 Vue 3.x 中，`>>>` 同样不再被推荐使用，应使用 `::v-deep`。
:::

### <span v-pre>`::v-deep`</span>

- Vue 3.x 中的推荐用法：`::v-deep` 是 Vue 3.x 中引入的官方深度选择器，用于替代 Vue 2.x 中的 `/deep/` 和原生 CSS 中的 `>>>`。

- 兼容性：支持 CSS 预处理器和 CSS 原生样式，是 Vue 3.x 中推荐使用的深度选择器。

- 优点：与 Vue3 的其他新特性相兼容，提供了更好的开发体验。

### `v-deep()`（Vue 3 Composition API）

- 特殊用法：在 Vue 3 的 Composition API 中，可以通过 `v-deep()` 函数在<span v-pre>`<style>`</span> 标签中动态应用深度选择器。这不是 CSS 语法的一部分，而是 Vue 3 特有的模板编译特性。

- 用法：通常在 <span v-pre>`<style>`</span> 标签的 `scoped` 属性下，结合 `v-bind:class` 或 `v-bind:style` 在模板中动态绑定样式时使用。

- 示例：
  :::code-group

  ```vue
  <template>
    <div :class="{ 'custom-class': true }">
      <ChildComponent />
    </div>
  </template>

  <script setup>
  // Composition API 逻辑
  </script>

  <style scoped>
  .custom-class::v-deep(.child-class) {
    /* 样式规则 */
  }
  /* 或者使用v-deep()函数（虽然不直接在<style>中，但说明其概念） */
  /* 注意：实际中v-deep()不直接用于<style>标签内，而是可能通过其他方式结合Composition API使用 */
  </style>
  ```

  :::

  ::: warning ⚠️ 注意
  上面的 `v-deep()` 示例主要是为了说明概念，实际上在 <span v-pre>`<style>`</span> 标签内直接使用 `v-deep()` 函数是不支持的。在 Composition API 中，`v-deep()` 通常与动态样式绑定结合使用，但这更多是在 `JavaScript` 层面而非 `CSS` 层面。
  :::

## 如何使用

### Vue 2.x

::: code-group

```vue [/deep/]
<style scoped>
.parent /deep/ .child {
  /* 样式规则 */
}
</style>
```

```vue [>>>]
<style scoped>
.parent >>> .child {
  /* 样式规则 */
}
</style>
```

:::

::: tip
使用 `>>>`（需要配置支持）
:::

### Vue 3.x

在 Vue 3.x 中，推荐使用 `::v-deep` 作为深度选择器，因为它既清晰又符合 Vue 的官方规范。

::: code-group

```vue
<template>
  <div class="parent">
    <ChildComponent />
  </div>
</template>

<script setup>
// Composition API 逻辑
</script>

<style scoped>
.parent::v-deep .child-class {
  /* 样式规则，这些规则将穿透到ChildComponent内部，并应用于具有.child-class类的元素 */
  color: blue;
  font-weight: bold;
}
</style>
```

:::

在上述例子中，`.parent::v-deep .child-class` 选择器将确保 `.child-class` 的样式被应用到 <span v-pre>`<ChildComponent />`</span> 内部的任何匹配元素上，即使这些元素被 <span v-pre>`<ChildComponent />`</span> 的 <span v-pre>`<style scoped>`</span> 封装所包围。

## 关于 `v-deep()` 在 `Composition API` 中的特殊说明

需要注意的是，`v-deep()` 并不是一个在 <span v-pre>`<style>`</span> 标签内直接使用的 CSS 选择器或函数。相反，它的概念更多地与 Vue 3 的 Composition API 和动态样式绑定相关。然而，Vue 官方并没有直接提供一个名为 `v-deep()` 的函数用于在 Composition API 中处理样式穿透。

在 Composition API 中处理样式穿透时，你通常会继续使用 `::v-deep` 选择器，但可能会通过 JavaScript 逻辑来动态绑定类名或样式，而不是直接使用一个名为 `v-deep()` 的函数。例如，你可以使用 `v-bind:class` 或 `v-bind:style` 来根据组件的状态动态地添加或移除样式类。

## 结论

- `/deep/` 和 `>>>` 在 Vue 2.x 中用于穿透样式封装，但在 Vue 3.x 中不再推荐使用。
- `::v-deep` 是 Vue 3.x 中推荐的深度选择器，用于穿透组件的样式封装。
- `v-deep()` 并不是 Vue 官方提供的一个函数，用于在 <span v-pre>`<style>`</span> 标签内或 Composition API 中直接处理样式穿透。相反，你应该使用 `::v-deep` 选择器，并结合 Vue 的模板和 Composition API 功能来实现动态样式绑定。
