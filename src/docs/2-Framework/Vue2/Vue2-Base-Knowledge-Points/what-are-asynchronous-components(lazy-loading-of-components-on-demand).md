# 什么是异步组件？（按需组件懒加载）

<article-info/>

::: info 为什么使用异步组件？
随着项目越来大，性能问题也越来越凸显出重要。在 vue 项目中，异步组件的使用，有利于项目的性能优化、提高页面的加载速度。
:::

## 什么是异步组件

异步组件就是定义的时候什么都不做，只在组件需要渲染（组件第一次显示）的时候进行加载渲染并缓存，缓存是以备下次访问。

结合 vue 的源码分析，异步组件的本质是：实现了 2 次渲染，先渲染成注释节点（占位），当组件渲染成功后，调用 `forceRender` 重新渲染

## 异步组件的三种方法

### 工厂函数实现

这个特殊的  `require`  语法将会告诉 `webpack` 自动将你的构建代码切割成多个包，这些包会通过 Ajax 请求加载

::: code-group

```vue
<template>
  <div>
    <h1>Vue 中的异步组件的使用</h1>
    <button @click="handleClick">按钮</button>
    <div v-if="show">
      <list></list>
    </div>
  </div>
</template>
<script>
import List from "./list.vue";
export default {
  name: "test",
  data() {
    return {
      show: false
    };
  },
  methods: {
    handleClick() {
      this.show = !this.show;
    }
  },
  components: {
    list: (resolve) => {
      require("./list"), resolve;
    }
  }
};
</script>
<style scoped></style>
```

:::

### promise 方式

把 `webpack` 和 `ES6` 语法加在一起，我们可以这样使用动态导入：

::: code-group

```vue
<template>
  <div>
    <h1>Vue 中的异步组件的使用</h1>
    <button @click="handleClick">按钮</button>
    <div v-if="show">
      <list></list>
    </div>
  </div>
</template>
<script>
export default {
  name: "test",
  data() {
    return {
      show: false
    };
  },
  methods: {
    handleClick() {
      this.show = !this.show;
    }
  },
  components: {
    list: () => import(/* webpackChunkName: "list" */ "./list")
  }
};
</script>
<style scoped></style>
```

:::

::: tip webpackChunkName 是什么
`webpackChunkName` 是为预加载的文件取别名，作用就是 `webpack` 在打包的时候，对异步引入的库代码（lodash）进行代码分割时（需要配置 `webpack` 的 `SplitChunkPlugin` 插件），为分割后的代码块取得名字

· 异步加载的写法实现页面模块 ·（Vue 中的路由异步加载）：Vue 中运用 · 的懒加载语句以及 `webpack` 的魔法注释，在项目进行 `webpack` 打包的时候，对不同模块进行代码分割，在首屏加载时，用到哪个模块再加载哪个模块，实现懒加载进行页面的优化
:::

### 高级用法

::: code-group

```vue
<template>
  <div>
    <h1>Vue 中的异步组件的使用</h1>
    <button @click="handleClick">按钮</button>
    <div v-if="show">
      <AsycnList></AsycnList>
    </div>
  </div>
</template>
<script>
import LoadingComponent from "./loading.vue";
import ErrorComponent from "./error.vue";

const AsycnList = () => ({
  component: import(/* webpackChunkName: "list" */ "./list.vue"),
  loading: LoadingComponent, // 加载时显示的组件
  error: ErrorComponent, // 加载失败时显示的组件
  delay: 200, // 加载的延迟时间
  timeout: 3000 // 加载的超时时间
});

export default {
  name: "test",
  data() {
    return {
      show: false
    };
  },
  methods: {
    handleClick() {
      this.show = !this.show;
    }
  },
  components: {
    AsycnList
  }
};
</script>
<style scoped></style>
```

:::
