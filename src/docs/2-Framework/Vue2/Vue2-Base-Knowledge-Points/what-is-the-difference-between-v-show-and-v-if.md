# v-show 和 v-if 有什么区别？使用场景分别是什么？

<article-info/>

![/374be2c1-da0c-cec0-dd36-e5d75fd8ee0e.png](/374be2c1-da0c-cec0-dd36-e5d75fd8ee0e.png)

## `v-show` 与 `v-if` 的共同点

我们都知道在 `vue` 中 `v-show` 与 `v-if` 的作用效果是相同的(不含 v-else)，都能控制元素在页面是否显示

在用法上也是相同的

::: code-group

```html
<Model v-show="isShow" /> <Model v-if="isShow" />
```

:::

- 当表达式为 true 的时候，都会占据页面的位置
- 当表达式都为 false 时，都不会占据页面位置

## `v-show` 与 `v-if` 的区别

- 控制手段不同
  - `v-show` 隐藏则是为该元素添加 `css -- display:none`，`dom` 元素依旧还在。
  - `v-if` 显示隐藏是将 `dom 元素` 整个 添加 或 删除
- 编译过程不同
  - `v-if` 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；
  - `v-show` 只是简单的基于 `css` 切换
- 编译条件不同
  - `v-if` 是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。只有渲染条件为假时，并不做操作，直到为真才渲染
- 生命周期不同
  - `v-show` 由 `false` 变为 `true` 的时候不会触发组件的生命周期
  - `v-if` 由 `false` 变为 `true` 的时候，触发组件的 `beforeCreate、create、beforeMount、mounted 钩子`，由 `true` 变为 `false` 的时候触发组件的 `beforeDestory、destoryed` 方法
- 性能消耗不同
  - `v-if` 有更高的切换消耗；`v-show` 有更高的初始渲染消耗；

## `v-show` 与 `v-if` 原理分析

::: info 具体解析流程这里不展开讲，大致流程如下
将模板 `template` 转为 `ast` 结构的 `JS 对象`

用 `ast` 得到的 `JS 对象`拼装 `render` 和 `staticRenderFns` 函数

`render` 和 `staticRenderFns` 函数被调用后生成 虚拟 `VNODE 节点`，该节点包含创建 `DOM 节点`所需信息

`vm.patch` 函数通过 `虚拟DOM 算法` 利用 VNODE 节点 创建真实 DOM 节点
:::

### `v-show` 原理

不管初始条件是什么，元素总是会被渲染

我们看一下在 vue 中是如何实现的

代码很好理解，有 `transition` 就执行 `transition`，没有就直接设置 `display` 属性

::: code-group

```js
// https://github.com/vuejs/vue-next/blob/3cd30c5245da0733f9eb6f29d220f39c46518162/packages/runtime-dom/src/directives/vShow.ts
export const vShow: ObjectDirective<VShowElement> = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    // ...
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
```

:::

### `v-if` 原理

`v-if` 在实现上比 `v-show` 要复杂的多，因为还有 else else-if 等条件需要处理，这里我们也只摘抄源码中处理 v-if 的一小部分

返回一个 node 节点，`render 函数` 通过表达式的值来决定是否生成 DOM

::: code-group

```js
// https://github.com/vuejs/vue-next/blob/cdc9f336fd/packages/compiler-core/src/transforms/vIf.ts
export const transformIf = createStructuralDirectiveTransform(
  /^(if|else|else-if)$/,
  (node, dir, context) => {
    return processIf(node, dir, context, (ifNode, branch, isRoot) => {
      // ...
      return () => {
        if (isRoot) {
          ifNode.codegenNode = createCodegenNodeForBranch(
            branch,
            key,
            context
          ) as IfConditionalExpression
        } else {
          // attach this branch's codegen node to the v-if root.
          const parentCondition = getParentCondition(ifNode.codegenNode!)
          parentCondition.alternate = createCodegenNodeForBranch(
            branch,
            key + ifNode.branches.length - 1,
            context
          )
        }
      }
    })
  }
)
```

:::

### `v-show` 与 `v-if` 的使用场景

`v-if` 与 `v-show` 都能控制 dom 元素 在页面的显示

`v-if` 相比 `v-show` 开销更大的（直接操作 dom 节点 增加与删除）

如果需要非常频繁地切换，则使用 `v-show` 较

如果在运行时条件很少改变，则使用 `v-if` 较好
