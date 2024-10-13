# ref 和 reactive 的使用和区别

<article-info/>

## `ref` 和 `reactive` 的基本用法

### 使用 `ref`

`ref` 用于创建一个响应式的引用对象，通常用于基本数据类型（如字符串、数字等）。

::: code-group

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

:::

在这个例子中，我们创建了一个名为 `count` 的响应式引用，并通过 `increment` 函数来更新它的值。注意，访问和修改 `ref` 创建的响应式数据时，需要通过 `.value` 属性。

### 使用 `reactive`

`reactive` 用于创建一个响应式的复杂数据类型，如对象或数组。

::: code-group

```vue
<script setup>
import { reactive } from "vue";

const state = reactive({
  count: 0,
  message: "Hello Vue 3!",
});

function increment() {
  state.count++;
}
</script>

<template>
  <button @click="increment">Count is: {{ state.count }}</button>
  <p>{{ state.message }}</p>
</template>
```

:::

在这个例子中，我们创建了一个名为 `state` 的响应式对象，它包含两个属性：`count` 和 `message`。通过 `increment` 函数更新 `count` 属性的值。

## `ref` 和 `reactive` 的区别

### 数据类型

- `ref` 用于基本数据类型（如字符串、数字、布尔值等）。

- `reactive` 用于复杂数据类型（如对象、数组等）。

### 访问和修改

- `ref` 创建的响应式引用需要通过 `.value` 属性来访问和修改。

- `reactive` 创建的响应式对象可以直接访问和修改其属性，无需使用 `.value`。

### 用途

- 当你需要将一个基本数据类型作为响应式数据时，使用 `ref`。
- 当你需要将一个对象或数组作为响应式数据时，使用 `reactive`。

### 与 toRefs 的结合使用

当你需要将 `reactive` 对象的每个属性都作为独立的响应式引用时，可以使用 `toRefs`。

::: code-group

```vue
<script setup>
import { reactive, toRefs } from "vue";

const state = reactive({
  count: 0,
  message: "Hello Vue 3!",
});

const { count, message } = toRefs(state);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
  <p>{{ message }}</p>
</template>
```

:::

在这个例子中，我们使用 `toRefs` 将 `reactive` 对象的每个属性转换为独立的响应式引用，这样就可以像使用 `ref` 一样操作它们。
