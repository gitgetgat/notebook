# vue3 性能要好于 vue2 的原因？

<article-info/>

## diff 算法优化

`vue2` 中的`虚拟dom`是全量的对比（每个节点不论写死的还是动态的都会一层一层比较，这就浪费了大部分事件在对比静态节点上）

`vue3` 新增了静态标记（`patchflag`）与上次虚拟节点对比时，只对比带有 `patchflag` 的节点（动态数据所在的节点）；可通过 flag 信息得知当前节点要对比的具体内容。

例如：下面的模板包含一个 `div`，`div` 内包含三个段落，其中前两个段落是静态固定不变的，而第三个段落的内容绑定的 msg 属性，当 msg 改变的时候，Vue 会生成新的 虚拟 DOM 然后和旧的进行对比。

::: code-group

```html
<div>
  <p>云驻共创</p>
  <p>如何评价 vue3</p>
  <p>{{msg}}</p>
</div>
```

:::

当视图更新时，只对动态节点部分进行 diff 运算，减少了资源的损耗。`Patchflag` 是个枚举，取值为 1 代表这个元素的文本是动态绑定的，取值为 2 代表元素的 class 是动态绑定的。

## hoistStatic 静态提升

vue2 无论元素是否参与更新，每次都会重新创建然后再渲染。

vue3 对于不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用即可。
例如：下面我们利用 `Vue 3 Template Explorer`，来直观的感受一下：

::: code-group

```html
<div>
  <div>共创1</div>
  <div>共创2</div>
  <div>{{name}}</div>
</div>
```

:::

静态提升之前

::: code-group

```js
export function render(...) {
  return (
    _openBlock(),
    _createBlock('div', null, [
      _createVNode('div', null, '共创1'),
      _createVNode('div', null, '共创2'),
      _createVNode(
        'div',
        null,
        _toDisplayString(_ctx.name),
        1 /* TEXT */
      ),
    ])
  )
}
```

:::

静态提升之后

::: code-group

```js
const _hoisted_1 = /*#__PURE__*/ _createVNode(
  'div',
  null,
  '共创1',
  -1 /* HOISTED */
)
const _hoisted_2 = /*#__PURE__*/ _createVNode(
  'div',
  null,
  '共创2',
  -1 /* HOISTED */
)

export function render(...) {
  return (
    _openBlock(),
    _createBlock('div', null, [
      _hoisted_1,
      _hoisted_2,
      _createVNode(
        'div',
        null,
        _toDisplayString(_ctx.name),
        1 /* TEXT */
      ),
    ])
  )
}
```

:::

从以上代码中我们可以看出，`_hoisted_1` 和 `_hoisted_2` 两个方法被提升到了渲染函数 render 之外，也就是我们说的静态提升。通过静态提升可以避免每次渲染的时候都要重新创建这些对象，从而大大提高了渲染效率。

## cacheHandlers 事件侦听器缓存

vue2.x 中，绑定事件每次触发都要重新生成全新的 function 去更新，`cacheHandlers` 是 Vue3 中提供的事件缓存对象，当 `cacheHandlers` 开启，会自动生成一个内联函数，同时生成一个静态节点。当事件再次触发时，只需从缓存中调用即可，无需再次更新。

默认情况下 onClick 会被视为动态绑定，所以每次都会追踪它的变化，但是同一个函数没必要追踪变化，直接缓存起来复用即可。

例如：下面我们同样是通过 `Vue 3 Template Explorer`，来看一下事件监听器缓存的作用：

::: code-group

```html
<div>
  <div @click="todo">做点有趣的事</div>
</div>
```

:::

该段 html 经过编译后变成我们下面的结构(未开启事件监听缓存)：

::: code-group

```js
export function render(...) {
  return (_openBlock(),_createBlock('div', null, [
      _createVNode('div',{ onClick: _ctx.todo}, '做点有趣的事', 8 /* PROPS */,
          ['onClick']),
    ])
  )
}
```

:::

当我们开启事件监听器缓存后：

::: code-group

```js
export function render(...) {
  return (_openBlock(),_createBlock('div', null, [
    _createVNode('div',{
        onClick:    //开启监听后
            _cache[1] || (_cache[1] = (...args) =>_ctx.todo(...args)),
      },'做点有趣的事'),
    ])
  )
}
```

:::

我们可以对比开启事件监听缓存前后的代码，转换之后的代码, 大家可能还看不懂, 但是不要紧，我们只需要观察有没有静态标记即可，`在 Vue3 的 diff 算法中, 只有有静态标记的才会进行比较, 才会进行追踪。`

## ssr 渲染

Vue2 中也是有 SSR 渲染的，但是 Vue3 中的 SSR 渲染相对于 Vue2 来说，性能方面也有对应的提升。

当存在大量静态内容时，这些内容会被当作纯字符串推进一个 buffer 里面，即使存在动态的绑定，会通过模版插值潜入进去。这样会比通过虚拟 dmo 来渲染的快上很多。

当静态内容大到一个量级的时候，会用 \_createStaticVNode 方法在客户端去生成一个 static node，这些静态 node，会被直接 innerHtml，就不需要再创建对象，然后根据对象渲染。

## 更好的 Ts 支持

vue2 不适合使用 ts，原因在于 vue2 的 Option API 风格。options 是个简单对象，而 ts 是一种类型系统、面向对象的语法。两者有点不匹配。

在 vue2 结合 ts 的具体实践中，要用 vue-class-component 强化 vue 组件，让 Script 支持 TypeScript 装饰器，用 vue-property-decorator 来增加更多结合 Vue 特性的装饰器，最终搞的 ts 的组件写法和 js 的组件写法差别挺大。

在 vue3 中，量身打造了 defineComponent 函数，使组件在 ts 下，更好的利用参数类型推断 。Composition API 代码风格中，比较有代表性的 api 就是 ref 和 reactive，也很好的支持了类型声明。

::: code-group

```js
import { defineComponent, ref } from 'vue'
const Component = defineComponent({
  props: {
    success: { type: String },
    student: {
      type: Object as PropType<Student>,
      required: true
    }
  },
  setup() {
    const year = ref(2020)
    const month = ref<string | number>('9')
    month.value = 9 // OK
    const result = year.value.split('')
  }
})
```

:::

## Compostion API: 组合 API / 注入 API

传统的网页是 html/css/javascript（结构/样式/逻辑）分离。vue 通过组件化的方式，将联系紧密的结构/样式/逻辑放在一起，有利于代码的维护。compostion api 更进一步，着力于 JS（逻辑）部分，将逻辑相关的代码放在一起，这样更有利于代码的维护。

在 vue2 的组件内使用的是 Option API 风格 (data/methods/mounted) 来组织的代码，这样会让逻辑分散，举个例子就是我们完成一个计数器功能，要在 data 里声明变量，在 methods 定义响应函数，在 mounted 里初始化变量，如果在一个功能比较多、代码量比较大的组件里，你要维护这样一个功能，就需要在 data/methods/mounted 反复的切换到对应位置，然后进行代码的更改。

而在 vue3 中，使用 setup 函数。如下所示跟 count 相关的逻辑，都放到 counter.js 文件里，跟 todo 相关的逻辑放到 todos.js 里。

::: code-group

```js
import useCounter from './counter'
import useTodo from './todos'

setup(){
	let { val, todos, addTodo } = useTodo()
	let {count,add} = useCounter()
	return {
		val, todos, addTodo,
		count, add,
	}
}
```

:::

## 更先进的组件

vue2 是不允许这样写的，组件必须有一个跟节点，现在可以这样写，vue 将为我们创建一个虚拟的 Fragment 节点。

::: code-group

```js
<template>
  <div>华为云享专家</div>
  <div>全栈领域博主</div>
</template>
```

:::

在 Suspended-component 完全渲染之前，备用内容会被显示出来。如果是异步组件，Suspense 可以等待组件被下载，或者在设置函数中执行一些异步操作。

## 自定义渲染 API

vue2.x 项目架构对于 weex（移动端跨平台方案）和 myvue（小程序上使用）等渲染到不同平台不太友好，vue3.0 推出了自定义渲染 API 解决了该问题。下面我们先看 vue2 和 vue3 的入口写法有哪些不同。

::: code-group

```jsx [vue2]
import Vue from 'vue'
import App from './App.vue'
new Vue({ => h(App)}).$mount('#app')
```

```jsx [vue3]
const { createApp } from 'vue'
import App from "./src/App"
createApp(App).mount(('#app'))
```

:::

vue 官方实现的 createApp 会给我们的 template 映射生成 html 代码，但是要是你不想渲染生成到 html ，而是要渲染生成到 canvas 之类的不是 html 的代码的时候，那就需要用到 Custom Renderer API 来定义自己的 render 渲染生成函数了。

::: code-group

```js
import { createApp } from "./runtime-render";
import App from "./src/App"; // 根组件
createApp(App).mount("#app");
```

:::

使用自定义渲染 API，如 weex 和 myvue 这类方案的问题就得到了完美解决。只需重写 createApp 即可。

## 按需编译，体积比 vue2.x 更小

框架的大小也会影响其性能。这是 Web 应用程序的唯一关注点，因为需要即时下载资源，在浏览器解析必要的 JavaScript 之前该应用程序是不可交互的。对于单页应用程序尤其如此。尽管 Vue 一直是相对轻量级的（Vue 2 的运行时大小压缩为 23 KB）。

在 Vue 3 中，通过将大多数全局 API 和内部帮助程序移至 ES 模块导出来，实现了这一目标。这使现代的打包工具可以静态分析模块依赖性并删除未使用的导出相关的代码。模板编译器还会生成友好的 Tree-shaking 代码，在模板中实际使用了该功能时才导入该功能的帮助程序。

框架的某些部分永远不会 Tree-shaking，因为它们对于任何类型的应用都是必不可少的。我们将这些必不可少的部分的度量标准称为基准尺寸。尽管增加了许多新功能，但 Vue 3 的基准大小压缩后约为 10 KB，还不到 Vue 2 的一半。

## 支持多根节点组件

Vue3 一个模板不再限制有多个根节点，(多个根节点上的 Attribute 继承) 需要显式定义 attribute 应该分布在哪里。否则控制台会给出警告提示。
在 Vue 3 中，组件现在正式支持多根节点组件，即片段！

在 2.x 中，不支持多根组件，当用户意外创建多根组件时会发出警告，因此，为了修复此错误，许多组件被包装在一个中。如下

::: code-group

```html
<template>
  <div>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  </div>
</template>
```

:::

在 3.x 中，组件现在可以有多个根节点！但是，这确实要求开发者明确定义属性应该分布在哪里。

::: code-group

```html
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

:::

## 结尾想说的

Vue 是国内最火的前端框架之一。性能提升，运行速度是 vue2 的 1.2-2 倍。

- 体积更小，按需编译体积 vue2 要更小。
- 类型推断，更好的支持 ts 这个也是趋势。
- 高级给予，暴露了更底层的 API 和提供更先进的内置组件。
- 组合 API，能够更好的组织逻辑，封装逻辑，复用逻辑

## 对未来的展望：

技术总是越新越好，越来越多的企业都升级了 vue3；

大型项目，由于对 TS 的友好越来越多的大型项目可以使用 vue3；

作为程序员，我们就应该适应市场，提高自己的竞争力，为加薪提供空间。
