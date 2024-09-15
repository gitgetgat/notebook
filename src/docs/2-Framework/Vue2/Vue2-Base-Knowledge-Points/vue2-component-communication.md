# Vue2 组件通信

<article-info/>

## props / $emit

- 父组件通过 `props` 的方式向子组件传递数据，而通过 `$emit` 子组件可以向父组件通信。
- 子组件使用  `$emit` 向父组件传数据，原理这样的: 父组件在子组件通过 `v-on`监听函数并接收参数，vue 框架就在子组件监听了你 `v-on="fn"`的 fn 事件函数，在子组件使用 `$emit`就能触发了

## v-model 指令

- `v-model` 是用来在 `表单控件` 或者 `组件` 上创建 `双向绑定` 的，他的本质是  `v-bind` 和  `v-on` 的 `语法糖` ，在一个组件上使用  `v-model`，默认会为组件绑定名为  `value` 的 `prop` 和名为  `input` 的事件。
- 当我们组件中的某一个  `prop` 需要实现上面所说的”双向绑定“时，`v-model` 就能大显身手了。有了它，就不需要自己手动在组件上绑定监听当前实例上的自定义事件，会使 `代码更简洁` 。

::: code-group

```vue [父组件]
<template>
  <base-input v-model="inputValue"></base-input>
</template>
<script>
export default {
  data() {
    return {
      input: ""
    };
  }
};
</script>
```

```vue [子组件]
<template>
  <input type="text" :value="currentValue" @input="handleInput" />
</template>

<script>
export default {
  data() {
    return {
      currentValue: this.value === undefined || this.value === null ? ''
    }
  },
  props: {
    value: [String, Number], // 关键1
  },
  methods: {
    handleInput(event) {
        const value = event.target.value;
        this.$emit('input', value); // 关键2
    },
  },
}
</script>
```

:::

## .sync 修饰符

- `.sync`  修饰符在 vue 1.x 的版本中就已经提供，1.x 版本中，当子组件改变了一个带有  `.sync`  的  `prop`  的值时，会将这个值同步到父组件中的值。这样使用起来十分方便，但问题也十分明显，这样破坏了单向数据流，当应用复杂时，debug 的成本会非常高。
- 于是乎，在 vue 2.0 中移除了  `.sync`。但是在实际的应用中，`.sync`  是有它的应用场景的，所以在  `vue 2.3`  版本中，又迎来了 `全新的 .sync`。
- 新的  `.sync`  修饰符所实现的已经不再是真正的双向绑定，它的本质和  `v-model`  类似，只是一种缩写。

::: code-group

```js
// 父组件
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
/>
// 等同于
<text-document v-bind:title.sync="doc.title" />

// 子组件

this.$emit('update:title', newTitle)

// 看到这里，是不是发现 .sync 修饰符 和 v-model 很相似，也是语法糖， v-bind:title.sync 也就是 等效于 v-bind:title="doc.title" v-on:update:title="doc.title = $event"
```

:::

- v-model 和 .sync 对比
  - `.sync` 从功能上看和  `v-model` 十分相似，都是为了实现数据的 `“双向绑定”` ，本质上，也都不是真正的双向绑定，而是 `语法糖` 。
  - 相比较之下，`.sync`  更加灵活，它可以给多个  `prop`  使用，而  `v-model`  在一个组件中只能有一个。
  - 从语义上来看，`v-model`  绑定的值是指这个组件的绑定值，比如  `input 组件`，`select 组件`，`日期时间选择组件`，`颜色选择器组件`，这些组件所绑定的值使用  `v-model`
      比较合适。其他情况，没有这种语义，个人认为使用  `.sync`  更好。

## $parent / $children

- 通过 `$parent` 和 `$children` 就可以访问组件的实例
- 要注意边界情况，如在 `#app` 上拿 `$parent` 得到的是 `new Vue()` 的实例，在这实例上再拿 `$parent` 得到的是 `undefined`，而在最底层的子组件拿 `$children` 是个空数组。`$children` 的值是数组且无序，而 `$parent` 是个对象

## `provide` / `inject`

- `provide` / `inject` 是 v ue2.2.0 新增的 api, 简单来说就是父组件中通过 `provide来提供变量`, 然后再子组件中通过 `inject来注入变量`。
- 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效
- `provide` **和** `inject` \***\*绑定的值并不是可响应的，但绑定的对象的属性是可以响应的**。\*\*
- `provide` / `inject` 不是只能从祖先传递给后代吗？是的，但是，如果我们绑定到最顶层的组件 `app.vue`，是不是所有后代都接收到了，就是当做全局变量来用了。
- `provide` / `inject` **实现页面刷新，不闪烁**

  ::: code-group

  ```jsx
  //app.vue
  <router-view v-if="isShowRouter" />;

  export default {
    name: "App",
    provide() {
      return {
        reload: this.reload
      };
    },
    data() {
      return {
        isShowRouter: true
      };
    },
    methods: {
      reload() {
        this.isShowRouter = false;
        this.$nextTick(() => {
          this.isShowRouter = true;
        });
      }
    }
  };
  ```

  :::

## ref / $refs

- `ref`：如果在普通的 DOM 元素上使用，引用指向的就是  `DOM 元素`；如果用在 `子组件` 上，引用就指向 `组件实例`，可以通过实例直接调用组件的方法或访问数据
- `ref` 这种方式，就是获取子组件的实例，然后可以直接子组件的方法和访问操作 data 的数据，就是父组件控制子组件的一种方式，子组件想向父组件传参或操作，只能通过其他的方式了

## eventBus

- `eventBus` 呢，其实原理就是 `事件订阅发布`，`eventBus`  又称为事件总线，在 vue 中可以使用它（`Vue 实例`）来作为沟通桥梁的概念, 就像是所有组件共用相同的事件中心（使用的地方引用这个 `Vue 实例` ），可以向该中心注册发送（`$emit`）事件或接收（`$on`）事件， 所以组件都可以通知其他组件。
- 如果想移除事件的监听，可以使用 `$off`

## Vuex / Pinia

[Vuex 是什么？ | Vuex](https://vuex.vuejs.org/zh/)

[Pinia 🍍](https://pinia.vuejs.org/zh/)

## localStorage / sessionStorage

这种通信比较简单,缺点是数据和状态比较混乱,不太容易维护。

- 通过`window.localStorage.getItem(key)`获取数据
- 通过`window.localStorage.setItem(key,value)`存储数据

::: warning ⚠️ 注意
用 `JSON.parse()` / `JSON.stringify()`  做数据格式转换， localStorage / sessionStorage 可以结合 vuex, 实现 `数据的持久保存` ,同时使用 vuex 解决数据和状态混乱问题.
:::

## 通过 $root 访问根实

## $attrs与 $listeners

- 通常配合  `inheritAttrs`  一起使用，
  - `inheritAttrs：true`  时继承除 props 之外的所有属性
  - `inheritAttrs：false`  只继承 class 和 style 属性
- `$attrs`：包含了父作用域中不被认为 (且不预期为) `props` 的特性绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件。当一个组件没有声明任何 `props` 时，它包含所有父作用域的绑定 (`class` 和 `style` 除外)。
- `$listeners`：包含了父作用域中的 (`不含 .native 修饰符`) v-on 事件监听器。它可以通过  `v-on="$listeners"`  传入内部组件。它是一个对象，里面包含了作用在这个组件上的所有事件监听器，相当于`子组件继承了父组件的事件`。

::: code-group

```vue [father.vue]
<template>
  　　
  <child
    :name="name"
    :age="age"
    :infoObj="infoObj"
    @updateInfo="updateInfo"
    @delInfo="delInfo"
  />
</template>
<script>
import Child from "../components/child.vue";

export default {
  name: "father",
  components: { Child },
  data() {
    return {
      name: "阿离王",
      age: 22,
      infoObj: {
        from: "广东",
        job: "policeman",
        hobby: ["reading", "writing", "skating"]
      }
    };
  },
  methods: {
    updateInfo() {
      console.log("update info");
    },
    delInfo() {
      console.log("delete info");
    }
  }
};
</script>
```

```vue [child.vue]
<template>
  <!-- 通过 $listeners 将父作用域中的事件，传入 grandSon 组件，使其可以获取到 father 中的事件 -->
  <grand-son
    :height="height"
    :weight="weight"
    @addInfo="addInfo"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>
<script>
import GrandSon from "../components/grandSon.vue";
export default {
  name: "child",
  components: { GrandSon },
  props: ["name"],
  data() {
    return {
      height: "180cm",
      weight: "70kg"
    };
  },
  created() {
    console.log(this.$attrs); // 结果：age, infoObj, 因为父组件共传来name, age, infoObj三个值，由于name被 props接收了，所以只有age, infoObj属性
    console.log(this.$listeners); // updateInfo: f, delInfo: f
  },
  methods: {
    addInfo() {
      console.log("add info");
    }
  }
};
</script>
```

```vue [grandSon.vue]
<template>
  <div>
    {{ $attrs }} --- {{ $listeners }}
  <div>
</template>
<script>
  export default {
    props: ['weight'],
    created() {
      console.log(this.$attrs); // age, infoObj, height
      console.log(this.$listeners) // updateInfo: f, delInfo: f, addInfo: f
      this.$emit('updateInfo') // 可以触发 father 组件中的updateInfo函数
    }
  }
</script>
```

:::

## slot

就是把子组件的数据通过插槽的方式传给父组件使用，然后再插回来

::: code-group

```vue [Child.vue]
<template>
  <div>
    <slot :user="user"></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: { name: "xxx" }
    };
  }
};
</script>
```

```vue [Parent.vue]
<template>
  <div>
    <child v-slot="slotProps">
      {{ slotProps.user.name }}
    </child>
  </div>
</template>
```

:::

## 总结

常见使用场景可以分为三类:

- 父子组件通信: `props` / `$emit`、`$parent` / `$children`、 `provide` / `inject` 、 `ref` / `$refs` 、`$attrs` / `$listeners`、`slot`
- 兄弟组件通信: `eventBus` 、 `vuex`
- 跨级通信: `eventBus`、 `Vuex`、 `provide / inject` 、 `$attrs / $listeners`
