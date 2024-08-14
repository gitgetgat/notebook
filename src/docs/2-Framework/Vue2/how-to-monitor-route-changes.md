# 如何监听路由的变化？

<article-info/>

## 监听路由从哪里来到那里去

::: code-group

```js
watch: {
  $route(to, from) {
    console.log(to);
    console.log(from);
  },
},
```

:::

## 监听路由变化前后新旧值

::: code-group

```js
watch: {
  $route: {
    handler(newvalue, oldvalue) {
      console.log(newValue, oldValue);
    },
    deep: true,
  },
},
```

:::

## 通过监听方法

::: code-group

```js
watch: { $route: "getPath" },
method: {
  getPath() {
    consloe.log(this.$route.path);
  },
},
```

:::

## 使用 beforeEach 方法全局监听路由

::: code-group

```js
router.beforeEach((to, from, next) => {
  console.log(to);
  next();
});

export default router;
```

:::

## 通过 vue-router 的钩子函数 beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave 在组件内部监听路由

::: code-group

```vue
<template>
  <div></div>
</template>
<script>
export default {
  name: "app",
  beforeRouteEnter(to, from, next) {
    //在渲染该组件的对应路由被 confirm 前调用
    //不能访问该组件的 'this'
  },
  beforeRouteUpdate(to, from, next) {
    //在当前路由改变，但是该组件被复用时调用
    // 可以访问组件 'this'
  },
  beforeRouteLeave(to, from, next) {
    //导航离开该组件的对应路由时调用
    //可以访问组件的'this'
  }
};
</script>
<style scoped></style>
```

:::
