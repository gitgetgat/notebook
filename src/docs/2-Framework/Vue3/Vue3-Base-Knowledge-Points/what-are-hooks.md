# 什么是 hooks？关于 vue3 中的 hooks

<article-info/>

`vue3` 带来了 `Composition API`，其中 `Hooks` 是其重要组成部分，本文将深入探讨 `Vue3` 中 `Hooks`，帮助你在 `Vue3` 开发中更加得心应手。

## `Vue3 Hooks` 实现原理

在 `Vue3` 中，`Hooks` 是基于 `Composition API` 实现的，它允许我们在组件的逻辑代码中更好地组织和复用代码。`Hooks` 本质上是一组可复用的函数，它们可以 “钩入” Vue 组件的生命周期，让我们能够在组件的不同生命周期阶段执行特定的逻辑。

`Vue3` 中的 `Hooks` 是通过 `setup` 函数来使用的，`setup` 函数是 `Vue3` 组件中的一个新的生命周期函数，它在组件实例被创建之前调用，并且接收两个参数：`props` 和 `context`。在 `setup` 函数中，我们可以定义和返回组件中需要使用的响应式数据、方法、计算属性等，而这些都可以通过 `Hooks` 来实现。

## `Vue3 Hooks` 使用场景

- <imp-text-danger>逻辑复用</imp-text-danger>：当多个组件需要共享相同的逻辑时，我们可以将这些逻辑封装成一个 `Hook`，然后在需要的组件中导入并使用它。这样可以避免代码重复，提高代码的复用性。
- <imp-text-danger>逻辑拆分</imp-text-danger>：对于复杂的组件，我们可以使用 `Hooks` 将组件的逻辑拆分成多个独立的函数，每个函数负责处理一部分逻辑。这样可以使组件的代码更加清晰、易于维护。
- <imp-text-danger>副作用管理</imp-text-danger>：`Hooks` 中的函数可以访问组件的响应式数据，并且可以在组件的生命周期中执行副作用操作（如定时器、事件监听等）。通过使用 `Hooks`，我们可以更好地管理这些副作用操作，确保它们在组件卸载时得到正确的清理。

## `Vue3 Hooks` 优缺点

### 优点：

- 提高了代码的复用性和可维护性。
- 使组件的逻辑更加清晰、易于理解。
- 更好地管理组件的副作用操作。

### 缺点：

- 学习曲线较陡峭，需要熟悉新的编程模式和思维方式。
- 对于小型项目或简单组件，使用 `Hooks` 可能过于复杂。
- 在 `Vue` 生态中，第三方 `Hooks` 的质量和兼容性可能存在差异。

## 自定义 Hooks 示例代码

下面是一个简单的自定义 Hook 示例，用于追踪鼠标位置：

::: code-group

```vue
<script setup>
import { ref, onMounted, onUnmounted } from "vue";

export function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  function updatePosition(event) {
    x.value = event.clientX;
    y.value = event.clientY;
  }

  onMounted(() => {
    window.addEventListener("mousemove", updatePosition);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", updatePosition);
  });

  return { x, y };
}
</script>
```

:::

在组件中使用该 Hook：

::: code-group

```vue
<template>
  <div>Mouse position: X={{ x }}, Y={{ y }}</div>
</template>

<script setup>
import { useMousePosition } from "./useMousePosition";

const { x, y } = useMousePosition();
</script>
```

:::

## Hooks 书写规范

- <imp-text-danger>命名规范</imp-text-danger>：自定义 `Hooks` 应该以 `“use”` 为前缀，以区分其他函数和变量。例如：<imp-text-success>useUserInfo</imp-text-success>、<imp-text-success>useMousePosition</imp-text-success> 等。同时，命名应清晰明了，准确描述 `Hooks` 的功能。
- <imp-text-danger>参数与返回值</imp-text-danger>：自定义 `Hooks` 应该接收明确的参数，并返回需要在组件中使用的响应式数据、方法、计算属性等。返回的对象应该具有清晰的属性名和结构。
- <imp-text-danger>副作用管理</imp-text-danger>：如果自定义 `Hooks` 包含副作用操作（如定时器、事件监听等），应确保在组件卸载时正确清理这些副作用。可以使用 <imp-text-success>onMounted</imp-text-success>、<imp-text-success>onUnmounted</imp-text-success> 等生命周期钩子来管理副作用的添加和移除。
- <imp-text-danger>文档注释</imp-text-danger>：为自定义 `Hooks` 编写清晰的文档注释是非常重要的，说明其用途、参数、返回值和使用示例。这将有助于其他开发者理解和使用你的自定义 `Hooks`。
- <imp-text-danger>类型定义（如果使用 TypeScript）</imp-text-danger>：为自定义 `Hooks` 提供类型定义可以确保更好的类型安全性和编辑器支持。使用 `TypeScript` 的泛型功能可以增加 `Hooks` 的灵活性和可复用性。
- <imp-text-danger>测试</imp-text-danger>：为自定义 `Hooks` 编写单元测试是确保其正确性和稳定性的重要手段。测试应该覆盖各种使用场景和边界情况。

## 常用的第三方 Hooks 推荐

- <imp-text-danger>Vueuse</imp-text-danger>：`Vueuse` 是一个基于 `Vue3 Composition API` 的实用函数集合，包含了大量有用的自定义 `Hooks`，如 <imp-text-success>useMouse</imp-text-success>、<imp-text-success>useKeyboardJs</imp-text-success>、<imp-text-success>useLocalStorage</imp-text-success> 等。它是 `Vue3` 生态中最受欢迎的第三方 `Hooks` 库之一。
- <imp-text-danger>@vue/reactivity</imp-text-danger>：这是 `Vue` 官方提供的响应式库，虽然它不是一个 `Hooks` 库，但其中的函数和工具可以与 `Composition API` 结合使用，帮助我们创建自定义的 Hooks 来处理响应式数据和副作用。例如，我们可以使用 <imp-text-success>reactive</imp-text-success>、<imp-text-success>ref</imp-text-success>、<imp-text-success>computed</imp-text-success> 等函数来创建响应式数据和计算属性。

## 总结

`Vue3` 中的 `Hooks` 为组件开发带来了全新的编程模式和思维方式，使我们能够更好地组织和复用代码，提高代码的清晰度和可维护性。通过自定义 `Hooks`，我们可以将组件的逻辑拆分成独立的函数，并在多个组件中共享这些逻辑。

然而，`Hooks` 的学习需要一定的时间和实践来熟悉和掌握。在使用过程中，我们应遵循 `Hooks` 的书写规范和实践最佳实践，以确保代码的质量和兼容性。
