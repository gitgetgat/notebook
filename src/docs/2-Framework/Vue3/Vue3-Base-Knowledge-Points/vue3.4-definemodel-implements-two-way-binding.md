# Vue3.4 defineModel 实现双向绑定

## 前言

随着 `vue3.4` 版本的发布，`defineModel` 也正式转正了。它可以简化父子组件之间的双向绑定，是目前官方推荐的双向绑定实现方式。

## `vue3.4` 以前如何实现双向绑定

大家应该都知道 `v-model` 只是一个语法糖，实际就是给组件定义了 `modelValue` 属性和监听 `update:modelValue` 事件，所以我们以前要实现数据双向绑定需要给子组件定义一个 `modelValue` 属性，并且在子组件内要更新 `modelValue` 值时需要 `emit` 出去一个 `update:modelValue` 事件，将新的值作为第二个字段传出去。

我们来看一个简单的例子，父组件、子组件的代码如下：

::: code-group

```vue [父组件]
<template>
  <CommonInput v-model="inputValue" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const inputValue = ref();
</script>
```

```vue [子组件]
<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup lang="ts">
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>
```

:::

上面的例子大家应该很熟悉，以前都是这样去实现 `v-model` 双向绑定的。但是存在一个问题就是 `input` 输入框其实支持直接使用 `v-model` 的，我们这里却没有使用 `v-model` 而是在 `input` 输入框上面添加 `value` 属性和 `input` 事件。

原因是因为从 `vue2` 开始就已经是单向数据流，在子组件中是不能直接修改 `props` 中的值。而是应该由子组件中抛出一个事件，由父组件去监听这个事件，然后去修改父组件中传递给 `props` 的变量。如果这里我们给 `input` 输入框直接加一个 `v-model="props.modelValue"`，那么其实是在子组件内直接修改 `props` 中的 `modelValue`。由于单向数据流的原因，`vue` 是不支持直接修改 `props` 的，所以我们才需要将代码写成上面的样子。

## 使用 `defineModel` 实现数据双向绑定

`defineModel` 是一个宏，所以不需要从 `vue` 中 `import` 导入，直接使用就可以了。这个宏可以用来声明一个双向绑定 `prop`，通过父组件的 `v-model` 来使用。

### 基础 demo

::: code-group

```vue [父组件]
<template>
  <CommonInput v-model="inputValue" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const inputValue = ref();
</script>
```

```vue [子组件]
<template>
  <input v-model="model" />
</template>

<script setup lang="ts">
const model = defineModel();
model.value = "xxx";
</script>
```

:::

在上面的例子中我们直接将 `defineModel` 的返回值使用 `v-model` 绑定到 `input` 输入框上面，无需定义 `modelValue` 属性和监听 `update:modelValue` 事件，代码更加简洁。`defineModel` 的返回值是一个 `ref`，我们可以在子组件中修改 `model` 变量的值，并且父组件中的 `inputValue` 变量的值也会同步更新，这样就可以实现双向绑定。

那么问题来了，从 `vue2` 开始就变成了单向数据流。这里修改子组件的值后，父组件的变量值也被修改了，那这不就变回了 `vue1` 的双向数据流了吗？其实并不是这样的，这里还是单向数据流，我们接下来会简单讲一下 `defineModel` 的实现原理。

### 实现原理

`defineModel` 其实就是在子组件内定义了一个叫 `model` 的 `ref` 变量和 `modelValue` 的 `props`，并且 `watch` 了 `props` 中的 `modelValue`。当 `props` 中的 `modelValue` 的值改变后会同步更新 `model` 变量的值。并且当在子组件内改变 `model` 变量的值后会抛出 `update:modelValue` 事件，父组件收到这个事件后就会更新父组件中对应的变量值。

实现原理代码如下：

::: code-group

```vue
<template>
  <input v-model="model" />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const model = ref();

watch(
  () => props.modelValue,
  () => {
    model.value = props.modelValue;
  }
);
watch(model, () => {
  emit("update:modelValue", model.value);
});
</script>
```

:::

看了上面的代码后你应该了解到了为什么可以在子组件内直接修改 `defineModel` 的返回值后父组件对应的变量也会同步更新了吧。我们修改的其实是 `defineModel` 返回的 `ref` 变量，而不是直接修改 `props` 中的 `modelValue`。实现方式还是和 `vue3.4` 以前实现双向绑定一样的，只是 `defineModel` 这个宏帮我们将以前的那些繁琐的代码给封装到内部实现了。

其实 `defineModel` 的源码中是使用 `customRef` 和 `watchSyncEffect` 去实现的，我这里是为了让大家能够更容易的明白 `defineModel` 的实现原理才举的 `ref` 和 `watch` 的例子。如果大家对 `defineModel` 的源码感兴趣，可以看这篇 [defineModel 如何简化 props 和 emit 自定义事件的 ?](../Vue3-Compilation-Principle-Revealed/how-definemodel-simplifies-props-and-emits-custom-events.md) 文章。

### `defineModel` 如何定义 `type`、`default` 等

既然 `defineModel` 是声明了一个 `prop`，那同样也可以定义 `prop` 的 `type`、`default`。具体代码如下：

::: code-group

```js
const model = defineModel({ type: String, default: "20" });
```

:::

除了支持 `type` 和 `default`，也支持 `required` 和 `validator`，用法和定义 `prop` 时一样。

### `defineModel` 如何实现多个 `v-model` 绑定

同样也支持在父组件上面实现多个 `v-model` 绑定，这时我们给 `defineModel` 传的第一个参数就不是对象了，而是一个字符串。

::: code-group

```js
const model1 = defineModel("count1");
const model2 = defineModel("count2");
```

:::

在父组件中使用 `v-model` 时代码如下：

::: code-group

```js
<CommonInput v-model:count1="inputValue1" />
<CommonInput v-model:count2="inputValue2" />
```

:::

我们也可以在多个 `v-model` 中定义 `type`、`default` 等

::: code-group

```js
const model1 = defineModel("count1", {
  type: String,
  default: "aaa"
});
```

:::

### `defineModel` 如何使用内置修饰符和自定义修饰符

如果要使用系统内置的修饰符比如 `trim`，父组件的写法还是和之前是一样的：

::: code-group

```vue
<CommonInput v-model.trim="inputValue" />
```

:::

子组件也无需做任何修改，和上面其他的 `defineModel` 例子是一样的：

::: code-group

```js
const model = defineModel();
```

:::

`defineModel` 也支持自定义修饰符，比如我们要实现一个将输入框的字母全部变成大写的 `uppercase` 自定义修饰符，同时也需要使用内置的 `trim` 修饰符。

我们的父组件代码如下：

::: code-group

```js
<CommonInput v-model.trim.uppercase="inputValue" />
```

:::

我们的子组件需要写成下面这样的：

::: code-group

```vue
<template>
  <input v-model="modelValue" />
</template>

<script setup lang="ts">
const [modelValue, modelModifiers] = defineModel({
  // get我们这里不需要
  set(value) {
    if (modelModifiers.uppercase) {
      return value?.toUpperCase();
    }
  }
});
</script>
```

:::

这时我们给 `defineModel` 传进去的第一个参数就是包含 `get` 和 `set` 方法的对象，当对 `modelValue` 变量进行读操作时会走到 `get` 方法里面去，当对 `modelValue` 变量进行写操作时会走到 `set` 方法里面去。如果只需要对写操作进行拦截，那么可以不用写 `get`。

`defineModel` 的返回值也可以解构成两个变量，第一个变量就是我们前面几个例子的 `ref` 对象，用于给 `v-model` 绑定。第二个变量是一个对象，里面包含了有哪些修饰符，在这里我们有 `trim` 和 `uppercase` 两个修饰符，所以 `modelModifiers` 的值为：

::: code-group

```js
{
  trim: true,
  uppercase: true
}
```

:::

在输入框进行输入时，就会走到 `set` 方法里面，然后调用 `value?.toUpperCase()` 就可以实现将输入的字母变成大写字母。

## 总结

这篇文章介绍了如何使用 `defineModel` 宏实现双向绑定以及 `defineModel` 的实现原理。

- 在子组件内调用 `defineModel` 宏会返回一个 `ref` 对象，在子组件内可以直接对这个 `ref` 对象进行赋值，父组件内的相应变量也会同步修改。
- `defineModel` 其实就是在子组件内定义了一个 `ref` 变量和对应的 `prop`，然后监听了对应的 `prop` 保持 `ref` 变量的值始终和对应的 `prop` 是一样的。在子组件内当修改 `ref` 变量值时会抛出一个事件给父组件，让父组件更新对应的变量值，从而实现双向绑定。
- 使用 `defineModel({ type: String, default: "20" })` 就可以定义 `prop` 的 `type` 和 `default` 等选项。
- 使用 `defineModel("count")` 就可以实现多个 `v-model` 绑定。
- 通过解构 `defineModel()` 的返回值拿到 `modelModifiers` 修饰符对象，配合 `get` 和 `set` 转换器选项实现自定义修饰符。
