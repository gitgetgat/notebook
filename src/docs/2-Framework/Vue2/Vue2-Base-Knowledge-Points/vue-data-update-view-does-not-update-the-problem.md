# vue 数据更新视图不更新的问题

<article-info/>

::: code-group

```js
<template>
  <div>
    <div v-for="(item, index) in obj" :key="index">{{ item }}</div>
    <button @click="change">改变对象属性</button>
    <button @clck="add">添加对象属性</button>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      obj: {
        a: "1",
        b: "2",
        c: "3",
        d: "4",
      },
    };
  },
  methods: {
    change() {
      this.obj.a = "000";
    },
    add() {
      this.obj.e = "5";// 因为 Vue 响应式对象监听不到添加和删除操作，所以视图不更新
    },
  },
};
</script>
```

:::

解决方法：

1. `this.$set(this.obj, ‘e’, ‘5’)`
2. `this.$forceUpdate()`
3. 直接更换对象：

   ::: code-group

   ```jsx
   const obj = JSON.parse(JSON.stringify(this.obj));
   obj.e = "5";
   this.obj = obj;
   ```

   :::
