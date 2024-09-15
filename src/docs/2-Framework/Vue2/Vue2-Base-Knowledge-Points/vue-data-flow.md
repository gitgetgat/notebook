# Vue 数据流向

<article-info/>

::: info
Vue 官方对单向数据流的描述是这样的（去掉了几句）：父子 prop 之间形成了一个单向下行绑定，父级 prop 的更新会向下流动到子组件中，额外的，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。
:::

意思是说，父级给子组件是啥，子组件可以用，也可以不用，但是不能修改。这就保证了数据可控性，但是事实真的如此吗？官方文档下面还有一句话。

::: warning ⚠️ 注意
：JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态。
:::

## 基本数据类型传递

我们先来传递基本数据类型，然后在子组件中修改，看控制台如何提示

首先定义一个父组件，只引用一个子组件，只传递一个基本数据类型的 index

::: code-group

```js
<template>
  <div>
    <Footer :index="index"></Footer>
  </div>
</template>
<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer,
  },
  data() {
    return {
      index: 1,
    };
  },
};
</script>
<style scoped></style>
```

:::

子组件接收父组件的值，点击事件给 index++

::: code-group

```js
<template>
  <div>
    {{ index }}
    <div @click="change">改变index</div>
  </div>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  methods: {
    change() {
      this.index++;
    },
  },
};
</script>
<style scoped></style>
```

:::

在控制台会发现如下报错

![/45b2eedb-50a4-d8b6-eb8f-c47908a63f6a.png](/45b2eedb-50a4-d8b6-eb8f-c47908a63f6a.png)

正如官方所说你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

## 引用类型数据传递

引用类型对象中包含数组

::: code-group

```js
<template>
  <div>
    <Footer :Obj="Obj"></Footer>
  </div>
</template>
<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer,
  },
  data() {
    return {
      Obj: {
        name: "父组件",
        value: "这是值",
        Arr: [1, 2, 3, 4, 5],
      },
    };
  },
};
</script>
<style scoped></style>
```

:::

子组件接收，并且通过事件修改值

::: code-group

```js
<template>
  <div>
    {{ Obj }}
    <div @click="change">改变index</div>
  </div>
</template>
<script>
export default {
  props: {
    Obj: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    change() {
      this.Obj.name = "我修改了";
      this.Obj.arr.push(6);
    },
  },
};
</script>
<style scoped></style>
```

:::

![/34154bac-08ce-3a7b-3888-592db8287704.png](/34154bac-08ce-3a7b-3888-592db8287704.png)

点击事件，改变值

![/8c287258-965b-bd01-37ba-b3292647cf7d.png](/8c287258-965b-bd01-37ba-b3292647cf7d.png)

可以看到，数据已经改变了，并且改变的数据父级可以拿到，这种情况有时是我们需要的，如果不希望改变父级，可以在子组件中深拷贝数据。简单点直接 `JSON.parse(JSON.stringify(data))`

## 总结

所以，Vue 中的单向数据流是针对基本数据类型，而引用类型是对数据地址的引入，子组件修改数据，父组件能接收到数据的更改。
