# 什么是动态组件?

<article-info/>

## 什么是动态组件

动态组件指的是动态切换组件的显示与隐藏

## 如何实现动态组件渲染

vue 提供了一个内置的  `<component>`  组件，专门用来实现动态组件的渲染

::: code-group

```vue
<template>
  <div>
    <!--3.点击按钮，动态切换组件的名称-->
    <button @click="comName = 'my-dynamic-1'">组件1</button>
    <button @click="comName = 'my-dynamic-2'">组件2</button>
    <!--2.通过 is 属性，动态指定要渲染的组件的名称-->
    <component :is="comName"></component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comName: "my-dynamic-1" //1.当前要渲染的组件的名称
    };
  }
};
</script>
```

:::

## 使用 keep-alive 保持状态

默认情况下，切换动态组件时无法保持组件的状态。此时可以使用 vue 内置的 组件保持动态组件的状态

::: code-group

```vue
<template>
  <div>
    <keep-alive>
      <component :is="comName"></component>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comName: "my-dynamic-1" //1.当前要渲染的组件的名称
    };
  }
};
</script>
```

:::

## keep-alive 对应的 [生命周期](./talk-about-the-understanding-of-vue-life-cycle.md) 函数数

当组件 `被缓存` 时，会自动触发组件的 `deactivated` 生命周期函数

当组件 `被激活` 时，会自动触发组件的 `activated` 生命周期函数

## keep-akive 的 include 属性

include 属性用来指定：只有名称匹配的组件会被缓存。多个组件名之间使用英文的逗号分隔
