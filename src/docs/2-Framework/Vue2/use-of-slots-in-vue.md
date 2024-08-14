# Vue 中的 slot 的使用？slot 匿名(默认)插槽、作用域插槽、具名插槽都是什么？

<article-info/>

::: warning ⚠️ 注意
本篇笔记为方便兼容 `Vue3（Vue 2.6+）`，均采用了比较新的 `v-slot` 写法，而未采用老式的 slot 和 slot-scope
:::

- 插槽（slot）是 vue 为组件的封装者提供的能力。允许开发者在封装组件时，把不确定的、希望由用户指定的部分定义为插槽，可以把插槽认为是组件封装期间，为用户预留的内容的占位符。
- 插槽常用于父组件向子组件指定位置插入 html 结构，也是一种组件间通信方式，适用于父组件 ➡️ 子组件
- `$slots` 是组件插槽集，是组件所有默认插槽、具名插槽的集合，可以用来获取当前组件的插槽集

## 默认（匿名）插槽

::: code-group

```vue [父组件]
<template>
  <div class="container">
    <!--默认插槽-->
    <!--写在标签上的是父组件以props形式向子组件传递的属性,与插槽无关-->
    <Category title="美食" :listDate="foods">
      <!--希望向子组件中插入的内容-->
      <img src="img1.jpg" />
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category";
export default {
  name: "App",
  components: { Category }
};
</script>
```

```vue [子组件]
<template>
  <div class="category">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Category"
};
</script>
```

:::

### 解析

在父组件调用 子组件 Category 时，额外附加了一段代码 `<img src="img1.jpg">`。添加这段代码后，vue 会在 Category 中自动寻找可以插入的地方。

若 Category 中定义了插槽 `<slot></slot>`，则这段代码会被替换为`<img src="img1.jpg">`；若没有，则父组件传入的代码会被自动抛弃
如果在 `<slot></slot>` 之间写入代码，则该段代码将会作为 <el-text size="large" type="primary">后备内容</el-text>。即，若父组件没有传入附加代码，该段代码会作为默认值自动渲染

::: warning ⚠️ 注意

- 若父组件需要传入不同的代码，并在子组件不同地方渲染，默认插槽会失效，此时需使用具名插槽
- 默认插槽是特殊的具名插槽，它具有隐藏的 `name="default"`
- 默认插槽无法让父组件获取子组件中的变量和值

  下面 ⬇️ 的 `user.name` 在子组件中为 `undefined` 。因为插槽会先渲染然后再传递到子组件中，而 `user.name` 在父组件中不存在，即便子组件中具有 `user.name`，也不会获取到该变量

  如果要让父组件获取子组件中的变量和值，可以使用作用域插槽
  ::: code-group

  ```vue
  <navigation-link url="/profile">
    Logged in as {{ user.name }}
  </navigation-link>
  ```

  :::

## 具名插槽

有时候会同时需要多个插槽，并将其渲染到不同的位置上，此时就需要使用具名插
::: code-group

```vue [父组件]
<template>
  <div class="container">
    <Category title="美食" :listDate="foods">
      <!--添加名称-->
      <template v-slot:center>
        <img src="img1.jpg" />
      </template>
      <!--添加名称-->
      <template v-slot:footer>
        <a href="www.baidu.com">百度</a>
      </template>
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category";
export default {
  name: "App",
  components: { Category }
};
</script>
```

```vue [子组件]
<template>
  <div class="category">
    <!--指定名称-->
    <slot name="center"></slot>
    <!--指定名称-->
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
  name: "Category"
};
</script>
```

:::

### 解析：

指定的代码会渲染到对应名称的 slot 上

## 作用域插槽

当数据在组件的自身，而根据数据生成的结构需要组件的使用者来决定时，就要用作用域插槽

假设子组件 `<current-user>` 具有 `user` 对象数据，此时有如下代码

::: code-group

```vue [父组件]
<template>
  <current-user>
    {{ user.firstName }}
  </current-user>
</template>
<script>
export default {};
</script>
```

```vue [子组件]
<template>
  <span>
    <slot></slot>
  </span>
</template>
<script>
export default {};
</script>
```

:::

以上代码不会正常工作，因为只有  `<current-user>`  组件可以访问到  `user`，而提供的内容是在父级渲染的

此时需要使用作用域插槽

::: code-group

```vue [父组件]
<template>
  <current-user>
    <template v-slot:default="ScopeData">
      {{ ScopeData.user.firstName }}
    </template>
  </current-user>
</template>
<script>
export default {};
</script>
```

```vue [子组件]
<template>
  <span>
    <slot :user="user"></slot>
  </span>
</template>
<script>
export default {};
</script>
```

:::

### 解析：

仔细看看和普通插槽相比，父子组件在使用作用域插槽时分别产生了哪些改变：

- 父组件

  传统的 `v-slot:default` 后添加了 `="slotScope"`
  而这个 `"slotScope"` 在插入内容中，用 <span v-pre>`{{ ScopeData.user.firstName }}`</span> 替代了 <span v-pre>`{{ user.firstName }}`</span>

- 子组件

  子组件额外添加了一个 `:user="user"`

- 原理

  实际上在这里，父组件对子组件进行了一次传参，只不过传参与参数的接受仅仅局限于插槽之间
  绑定在  `<slot>` 元素上的 attribute 被称为 <el-text size="large" type="primary">插槽 prop</el-text>，而在这个例子中，我们选择将包含所有插槽 prop 的对象命名为  `slotProps`
  也就是说，子组件用 `:user="user"` 将 `user` 对象绑定在了 `slotProps` 上，然后传递了过去，父组件则用 `slotProps.user.firstName`的方式接收到了。

  ::: warning ⚠️ 注意
  这并不意味着作用域插槽可以用于子组件 → 父组件传递数据，实际逻辑为父组件 →（需求子组件数据）→（发送请求）→（子组件绑定数据传输到父组件）→（父组件渲染）→（插入到子组件）→ 子组件。整体仍然是父组件传递数据到子组件
  :::
