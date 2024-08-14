# 如何实现自定义组件？自定义组件的 v-model

<article-info/>

自定义两个子组件 BaseInput、BaseCheckbox，并在父组件里使用

::: tip 📌 v-model 更换默认绑定方式
允许一个自定义组件在使用  `v-model`  时定制 prop 和 event。默认情况下，一个组件上的  `v-model`  会把  `value`  用作 prop 且把  `input`  用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用  `value` prop 来达到不同的目的。使用  `model`  选项可以回避这些情况产生的冲突。

::: warning ⚠️ 请仔细看 `BaseCheckbox` 组件

:::

::: code-group

```vue [BaseInput]
<template>
  <div>
    <input type="text" :value="value" @input="handleInput" />
  </div>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>

<style></style>
```

```vue [BaseCheckbox]
<template>
  <div>
    <input type="checkbox" :checked="checked" />
  </div>
</template>

<script>
export default {
  model: {
    props: "checked",
    event: "change"
  },
  props: ["checked"],
  methods: {
    handleChange() {
      this.$emit("change", e.target.checked);
    }
  }
};
</script>

<style></style>
```

```vue [父组件使用]
<template>
  <div>
    <h1>Vue 中自定义组件的 v-model</h1>
    <base-input v-model="message"></base-input>
    <base-input :value="message" @input="message = $event"></base-input>
    <p>文字：{{ message }}</p>

    <hr />

    <base-checkbox v-model="checked"></base-checkbox>
    <base-checkbox
      :checked="checked"
      @change="checked = $event"
    ></base-checkbox>
    <p>已经选中了：{{ checked }}</p>
  </div>
</template>
<script>
import BaseInput from "./BaseInput.vue";
import BaseCheckbox from "./BaseCheckbox.vue";

export default {
  name: "test",
  components: {
    BaseInput,
    BaseCheckbox
  },
  data() {
    return {
      message: "hahaha",
      checked: true
    };
  }
};
</script>
<style scoped></style>
```

:::
