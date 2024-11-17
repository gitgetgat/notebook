# watch 与 watchEffect

<article-info/>

## 区别

`watch` 和 `watchEffect` 都能响应式地执行有副作用（除了返回预期结果外还会简介影响其它数据）的回调。它们之间的主要区别是追踪响应式依赖的方式

- `watch`：<imp-text-primary>只追踪明确侦听的数据源</imp-text-primary>。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- `watchEffect`：会在副作用发生期间追踪依赖。它会在同步执行过程中，<imp-text-primary>自动追踪所有能访问到的响应式属性</imp-text-primary>。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

::: code-group

```vue
<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
const num1 = ref(1);
const num2 = ref(2);
const num3 = ref(3);

const calculateTotal = () => {
  return num1.value + num2.value + num3.value;
};

watch(num1, () => {
  console.log(calculateTotal()); //仅num1变化时触发
});

watchEffect(() => {
  console.log(calculateTotal()); //num1,num2,num3任意一个变化时触发
});
</script>
```

:::

### 总结

watch:

1. 只侦听明确的数据。

2. 只在侦听数据发生变动时触发。

3. 提供变化前后的值。

watchEffect:

1. 追踪能访问到的所有响应式属性。

2. 初始化时会触发一次。

3. 不提供变化前后的值

## watch 使用方式

::: code-group

```vue [单个ref侦听]
<script setup lang="ts">
import { ref, watch } from "vue";
const num1 = ref(0);
watch(num1, (newVlue, oldVlue) => {
  console.log(newVlue, oldVlue);
});
</script>
```

```vue [多个ref侦听]
<script setup lang="ts">
import { ref, watch } from "vue";
const num1 = ref(1);
const num2 = ref(2);

watch([num1, num2], (newNum1, newNum2) => {
  console.log(newNum2, newNum3);
});
</script>
```

```vue [getter 函数]
<script setup lang="ts">
import { ref, watch } from "vue";
const num1 = ref(1);
const num2 = ref(2);
watch(
  () => num1.value + num2.value,
  (sum) => {
    console.log(sum);
  }
);
</script>
```

:::

### 侦听响应式对象的注意事项

响应式对象的值需要深度侦听才能得到，在 `ref` 侦听中会隐式地创建一个深层侦听器，在 `getter` 函数方式侦听中则需要主动加一个 `{ deep: true }`

::: code-group

```vue
<script setup lang="ts">
import { reactive, watch } from "vue";
const num1 = reactive({ a: 1 });
// 当num1.a从1变为2时
watch(num1, (newNum1, oldNum1) => {
  console.log(newNum1.a, oldNum1.a); //2，2：可以正常侦听num1.a的变化,但是侦听旧值失败
});
watch(num1.a, (newNum1, oldNum1) => {
  console.log(newNum1, oldNum1); //报错
});
watch(
  () => num1,
  (a) => {
    console.log(a); //无反应，不能侦听num1的属性值的变化
  }
);
watch(
  () => num1.a,
  (a) => {
    console.log(a); //可以正常侦听num1.a的变化
  }
);
watch(
  () => num1,
  (num1) => {
    console.log(num1.a); //2:可以正常侦听num1.a的变化
  },
  { deep: true } //开启深度侦听
);
</script>
```

:::

### 即时回调侦听器：{ immediate: true }

当使用 `watch` 时需要像 `watchEffect` 那样刚开始就执行一次时，可以使用 `{ immediate: true }`

::: code-group

```vue
<script setup lang="ts">
import { ref, watch } from "vue";
const num1 = ref(1);
watch(
  num1,
  (newNum1, oldNum1) => {
    console.log(newNum1, oldNum1); //1,undefined
  },
  { immediate: true }
);
</script>
```

:::

### 一次性侦听器：{ once: true }

当希望只对某个 ref 只侦听一次时，可以使用{ once: true }

::: code-group

```vue
<script setup lang="ts">
import { ref, watch } from "vue";
const num1 = ref(1);
watch(
  num1,
  (newNum1, oldNum1) => {
    console.log(newNum1); // 当num1从1变为2时:2,接着num1从2变为3:无反应
  },
  { once: true }
);
</script>
```

:::

## watchEffect 使用方式

### 跟踪对象多个属性

`watchEffect` 只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性，对于需要侦听一个对象中多个属性的情况 `watchEffect` 比深度侦听效率更高。

::: code-group

```vue
<script setup lang="ts">
import { reactive, watchEffect } from "vue";
const nums = reactive({
  num1: 1,
  num2: 2,
  num3: 3
});
watchEffect(() => {
  console.log(nums.num1 + nums.num2 + nums.num3); //num1,num2,num3任意一个变化时触发
});
</script>
```

:::

### 响应式数据请求

通过使用 `watchEffect` 可以在数据变化时自动发起请求，如下所示，当 `data` 变化时会自动发起新的请求

::: code-group

```vue
<script setup lang="ts">
import { watchEffect } from "vue";
watchEffect(() => {
  axios.post("https://ljy.com:5000/chat", data).then((res) => {
    resData.value = res.data;
  });
});
</script>
```

:::

## watchPostEffect 使用方式（dom 更新后侦听）

`vue` 的更新是异步的， `Vue` 的响应式数据发生变化时，`Vue` 不会立即更新 `DOM`，而是会等待当前同步任务执行完毕，然后在下一个事件循环的 `“tick”` 中执行更新。默认情况下，侦听器回调会在父组件更新 (如有) 之后、所属组件的 `DOM` 更新之前被调用。这意味着如果你尝试在侦听器回调中访问所属组件的 `DOM`，那么 `DOM` 将处于更新前的状态。

::: code-group

```vue
<template>
  <div class="mian" ref="main">
    {{ a }}
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
const main = ref<HTMLElement | null>(null);
const a = ref(0);
a.value = 1;
watchEffect(() => {
  console.log(main.value); // null,<div class="mian" ref="main">1</div>
});
</script>
```

:::

如果想在 `dom` 更新后侦听，可以使用 `watchPostEffect`

::: code-group

```vue
<template>
  <div class="mian" ref="main">
    {{ a }}
  </div>
</template>
<script setup lang="ts">
import { watchPostEffect } from "vue";
watchPostEffect(() => {
  console.log(main.value); // <div class="mian" ref="main">1</div>
});
</script>
```

:::

## watchSyncEffect 使用方式（任何更新之前触发）

`watchSyncEffect` 是个同步侦听器，使用方式如下：

::: code-group

```vue
<template>
  <div class="mian" ref="main">
    {{ a }}
  </div>
</template>
<script setup lang="ts">
import { watchSyncEffect } from "vue";

watchSyncEffect(() => {
  /* 在响应式数据变化时同步执行 */
});
</script>
```

:::

## 停止侦听器

在 `setup()` 或 `<script setup>` 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。因此，在大多数情况下，你无需关心怎么停止一个侦听器。

一个关键点是，侦听器必须用同步语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。如

::: code-group

```vue
<script setup>
import { watchEffect } from "vue";

// 它会自动停止
watchEffect(() => {});

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {});
}, 100);
</script>
```

:::

停止侦听器方式：

::: code-group

```vue
<script setup>
import { watchEffect } from "vue";

const unwatch = watchEffect(() => {});

// ...当该侦听器不再需要时
unwatch();
</script>
```

:::

注意，需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，你可以使用条件式的侦听逻辑：

::: code-group

```vue
<script setup>
import { ref, watchEffect } from "vue";
// 需要异步请求得到的数据
const data = ref(null);

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
});
</script>
```

:::

## watchEffect 可能有的问题

### 可维护性较差

假如我要监听 `a`、`b`、`c`，然后去执行很多逻辑，如果我是使用 `watch`，我一眼就能看到，依赖项是 `a`、`b`、`c` 这三个变量，后面接手代码的开发者，也能很明确看到执行这些逻辑的依赖项是什么

![/89b08b10-fe89-0154-8c5d-9e0457afb0f9.png](/89b08b10-fe89-0154-8c5d-9e0457afb0f9.png)

但是如果你使用的是 `watchEffect`，那么你下次看代码时，你得去这么多逻辑中去自己一个一个找依赖项是什么，是不是感觉代码可维护性变得比较差了？

![/46101bea-d0dd-b74d-7919-433b7e7052c6.png](/46101bea-d0dd-b74d-7919-433b7e7052c6.png)

### 性能问题

再来说说 `watchEffect` 可能有性能问题，我们看以下例子

![/95969fcd-9b6a-7c12-1816-7b30ab70298c.png](/95969fcd-9b6a-7c12-1816-7b30ab70298c.png)

其实 `isEven` 自始至终都是 `true`，所以应该只执行一次函数就行了，但是 `watchEffect` 没有做惰性处理，也就是只要 `isEven.value` 被重新赋值，函数就会重新执行一遍，无论 `isEven` 是否变了，这就会造成无意义的代码执行~

但是如果是用 `watch` 就不会有这种情况发生

![/1629cf36-0919-5d7a-ca31-45a1431ea6fe.png](/1629cf36-0919-5d7a-ca31-45a1431ea6fe.png)
