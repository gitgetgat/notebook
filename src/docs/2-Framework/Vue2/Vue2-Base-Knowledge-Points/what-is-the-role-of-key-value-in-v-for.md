# v-for 中 key 值的作用是什么？为什么 Vue 的 key 最好不是数组下标？

<article-info/>

## 为什么 Vue 的 key 最好不是数组下标

::: tip
在没有 `key` 的情况下，Vue 将使用一种最小化元素移动的算法，并尽可能地就地更新/复用相同类型的元素。如果传了 `key`，则将根据 `key` 的变化顺序来重新排列元素，并且将始终移除/销毁 `key` 已经不存在的元素。

同一个父元素下的子元素必须具有 `唯一的 key`。重复的 `key` 将会导致渲染异常。
:::

例如：有元素 A B C D E ,当我想把元素变成 B C D E 时

没有 `key` 值时，`key` 默认都是 `undefined`，就会按照 `diff算法` 的就地复用来进行比较，它会把 A 更新成 B，B 更新成 C，C 更新成 D，最后删除 E

有唯一的 `key` 值时，B C D E 全部复用，只删除 A

明显可以看出，当没有 `key` 值时改变元素会产生许多 DOM 操作，而 DOM 操作 是非常消耗性能的，尤其是当有多层嵌套时，消耗的性能可想而知。

## 什么情况下使用 index 作为 key 值会出问题

在我们实际使用中使用 `index` 作为 `key` 或者不写 `key` 值，看起来除了操作 `DOM` 更耗性能，好像没有出现什么问题。

当你的只是用来做数据展示的时候，确实是没有什么问题的，但当你的子元素包含输入文本时就会出现问题了。

下面看下例子：

::: code-group

```vue
<template>
  <div>
    <div
      v-for="(item, index) in list"
      :key="index"
      style="background-color: palegoldenrod;margin: 10px;padding: 10px;"
    >
      <div>{{ item.name }}</div>
      <input type="input" placeholder="请输入" />
      <span @click="handleAdd()" style="margin-right: 15px;">添加</span>
      <span @click="handleDelete(index)">删除</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.handleAdd();
  },
  methods: {
    handleAdd() {
      let random = Math.random() * 1000;
      this.list.push({
        id: random,
        name: random
      });
    },
    handleDelete(i) {
      this.list.splice(i, 1);
    }
  }
};
</script>

<style lang="scss" scoped></style>
```

:::

此时我生成了三条数据

![/8f5ed20f-920b-bbca-ec77-abce6ad4921a.png](/8f5ed20f-920b-bbca-ec77-abce6ad4921a.png)

当我点击删除第二条数据时，可以看到文本框的内容还是原本的第二条数据的内容

![/87d543f4-c601-2e10-5bc2-c662810cd409.png](/87d543f4-c601-2e10-5bc2-c662810cd409.png)

原因是 `虚拟 DOM` 在比较元素的时候，因为 `DOM` 上的 `key` 等属性均未发生变化，所以其自身和内部的 `input` 均被复用了。
