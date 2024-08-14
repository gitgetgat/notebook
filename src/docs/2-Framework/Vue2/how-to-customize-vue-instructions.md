# Vue 如何自定义指令？

<article-info/>

自定义指令：

::: code-group

```js
// 指令 navActive.js
export default {
  bind: function (el, binding) {
    // el 是被绑定元素对应的真实DOM
    // binding 是一个对象，描述了指令中提供的信息
    const options = binding.value;
    const { className, activeClass, currentIndex } = options;
    const children = el.getElementsByClassName(className);
    children[currentIndex].className += `${activeClass}`;
  },
  insert: function (el, binding) {},
  update: function (el, binding) {
    const options = binding.value;
    const oldOptions = binding.oldValue;
    const { className, activeClass, currentIndex } = options;
    const children = el.getElementsByClassName(className);
    const { currentIndex: oldCurIndex } = oldOptions;
    children[currentIndex].className += `${activeClass}`;
    children[oldCurIndex].className = className;
  }
};
```

:::

![/aea8a4a2-8039-74fd-8ba3-01d68452e934.png](/aea8a4a2-8039-74fd-8ba3-01d68452e934.png)

自定义组件 `navBar`，实现切换选项，给对应的选项添加选中的类名 `nav-active`

全局注册指令：

::: code-group

```js
// main.js
import Vue from "vue"
...
import vNavActive from "./directives/navActive.js"
Vue.directive("loading", vNavActive)
...
```

:::

局部注册指令：

::: code-group

```vue
<template>
  <div
    class="nav-bar"
    v-nav-active="{
      className: 'nav-item',
      activeClass: 'nav-active',
      currentIndex
    }"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      @click="changeIndex(index)"
      v-bind:class="['nav-item', { 'nav-active': index === currentIndex }]"
    >
      {{ item }}
    </div>
  </div>
</template>
<script>
import NavActive from "./directives/navActive";

export default {
  name: "navBar",
  directives: {
    NavActive
  },
  data() {
    return {
      items: ["项目1", "项目2", "项目3"],
      currentIndex: 0
    };
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
    }
  }
};
</script>
<style scoped></style>
```

:::
