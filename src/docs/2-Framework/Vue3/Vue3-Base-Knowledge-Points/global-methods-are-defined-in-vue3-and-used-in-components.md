# Vue3 中定义全局方法并在组件中使用

在 Vue3 中，我们可以使用 `app.config.globalProperties` 来定义全局方法，然后在组件中使用。以下是一个示例：

::: code-group

```js [main.js]
import _ from "lodash";
const app = createApp(App);

// 挂载全局方法
app.config.globalProperties.$_ = _;

app.mount("#app");
```

```vue [component.vue]
<script setup>
import { getCurrentInstance } from "vue";
const app = getCurrentInstance();
console.log("$_", app.appContext.config.globalProperties.$_);
</script>
```

:::
