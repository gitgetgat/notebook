# 什么是 mixin？

<article-info/>

## 什么是混入？

混入 (`mixin`) ： 是一种分发 Vue 组件中可复用功能的非常灵活的一种方式。混入对象（`mixins`）是一个 `js` 对象，它可以包含我们组件中 `script` 项中的任意功能选项，如 `data`、`components`、`created`、`methods` 、`computed`、`watch` 等等。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

## 创建 Mixins

在 src 目录下创建一个 `mixins` 文件夹，文件夹下新建自己要定义的混入对象 js 文件。使用对象的形式来定义混入对象，在对象中可定义与 `vue组件` 一样的 `data`、`components`、`created`、`methods` 、`computed`、`watch`等属性，并通过 `export` 导出该对象.

::: code-group

```js
// pageMixin.js
export const pageMixin = {
  data() {
    return {
      page: {
        // 分页信息
        pageNo: 10, // 当前页
        limit: 10, // 每页行数
        total: 0 // 列表总数量
      },
      tableList: [], // 列表数据
      loading: false, // 加载列表数据的Loading
      PAGE_SIZES: [5, 10, 20, 30, 50, 90], // 每页行数列表,用于切换每页行数
      LAYOUT: "total, sizes, prev, pager, next, jumper" // Element表格组件中使用的功能
    };
  },
  methods: {
    // 查询列表数据
    queryList() {},
    // 修改当前页
    handleCurrentChange(pageNo) {
      this.page.pageNo = pageNo;
      this.queryList();
    },
    // 修改每页行数
    handleSizeChange(limit) {
      this.page.pageNo = 1;
      this.page.limit = limit;
      this.queryList();
    }
  }
};
```

:::

### 使用 Mixins

在需要调用的组件页面中引入 pageMixin.js 文件

::: code-group

```js
import { pageMixin } from "@/mixins/pageMixin";
export default {
  mixins: [pageMixin],
  data() {
    return {};
  }
};
```

:::

- 组件调用了混入对象故混入对象的选项会合并到当前组件中。
- 当混入对象和组件含有同名选项时，这些选项将以恰当的方式进行“合并”。比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先，即发生冲突会覆盖混入对象的选项。

## 什么情况下需要使用 mixins

当多个组件执行的方法和需要的数据类似时，我们可以提取出公共部分写入混入对象中，哪个组件需要用直接引入即可。

## mixins 的特性

组件使用 `mixins` 中的属性或者方法，当改变 `mixins` 的属性值或者是方法内部的一些逻辑操作时，只会在当前组件中起作用而并不会改变混入对象的属性值或者是方法，故其他组件引入 `mixins` 并使用其属性或者是方法时是不会受当前组件操作影响的（可类比继承，子继承了父的方法或属性，在子中对继承来的方法或属性做改变，是不会改变父的方法和属性的，更不会影响到其他的子继承父的属性和方法）

## 选项合并

当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。

此时，同名的 `created 生命周期钩子` 进行了合并，合并为一个数组，因此都将被调用（先执行 `mixin` ，再执行 组件的）。另外，混入对象的钩子将在组件自身钩子之前调用。而 `methods` 中的 hello 方法因为冲突，在合并时保留组件中的 hello，即优先当前组件的选项，因此打印的是 “hello from Home!”。

值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

## 全局混入

混入也可以进行 `全局注册`。使用时格外小心！一旦使用 `全局混入`，它将影响 <el-text size="large" type="success">每一个</el-text> 之后创建的 Vue 实例。使用恰当时，这可以用来为自定义选项注入处理逻辑。

在 main.js 中通过 Vue.mixin() 引入混入对象即可全局使用（作用于该 Vue 实例下的所有组件）

::: code-group

```js
import mixin from "./mixins";
Vue.mixin(mixin);
```

:::

::: warning ⚠️ 注意
请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项，就像上面示例一样。推荐将其作为 [插件](https://cn.vuejs.org/v2/guide/plugins.html) 发布，以避免重复应用混入。

:::

## 与 vuex 的区别

- vuex：用来做状态管理的，state 中定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改。

- Mixins：可以定义共用的变量，在每个组件中使用，引入组件中之后，各个变量是相互独立的，值的修改在组件中不会相互影响。
