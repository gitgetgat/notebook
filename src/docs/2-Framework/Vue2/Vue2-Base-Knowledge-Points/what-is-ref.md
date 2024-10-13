# ref 是什么？

<article-info/>

## `ref` 有三种用法

- `ref` 加在普通的元素上，用 `this.$refs[name]` 获取到的是 `dom` 元素

- `ref` 加在子组件上，用 `this.$refs[name]` 获取到的是组件实例，可以使用组件的所有属性和方法

- 利用 `v-for` 和 `ref` 获取一组数组或者 `dom` 节点
