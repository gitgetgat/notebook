# Vue 3 的 setup 语法糖到底是什么东西？

<article-info/>

## 前言

我们每天写 `vue3` 项目的时候都会使用 `setup` 语法糖，但是你有没有思考过下面几个问题。 `setup` 语法糖经过编译后是什么样子的？为什么在 `setup` 顶层定义的变量可以在 `template` 中可以直接使用？为什么 `import` 一个组件后就可以直接使用，无需使用 `components` 选项来显式注册组件？

## `vue` 文件如何渲染到浏览器上

要回答上面的问题，我们先来了解一下从一个 `vue` 文件到渲染到浏览器这一过程经历了什么？

我们的 `vue` 代码一般都是写在后缀名为 `vue` 的文件上，显然浏览器是不认识 `vue` 文件的，浏览器只认识 `html` 、 `css` 、 `js` 等文件。所以第一步就是通过 `webpack` 或者 `vite` 将一个 `vue` 文件编译为一个包含 `render` 函数的 `js` 文件。然后执行 `render` 函数生成 `虚拟DOM` ，再调用浏览器的 `DOM API` 根据 `虚拟DOM` 生成 `真实DOM` 挂载到浏览器上。

![/cb38496e-371f-08a3-64cb-4d103e5fee79.jpg](/cb38496e-371f-08a3-64cb-4d103e5fee79.jpg)

## `setup` 编译后的样子

在 `javascript` 标准中 `script` 标签是不支持 `setup` 属性的，浏览器根本就不认识 `setup` 属性。所以很明显 `setup` 是作用于编译时阶段，也就是从 `vue` 文件编译为 `js` 文件这一过程。

我们来看一个简单的 `demo`，这个是 `index.vue` 源代码：

::: code-group

```vue
<template>
  <h1>{{ title }}</h1>
  <h1>{{ msg }}</h1>
  <Child />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Child from "./child.vue";

const msg = ref("Hello World!");
const title = "title";
if (msg.value) {
  const content = "content";
  console.log(content);
}
</script>
```

:::

这里我们定义了一个名为 `msg` 的 `ref` 响应式变量和非响应式的 `title` 变量，还有 `import` 了 `child.vue` 组件。

这个是 `child.vue` 的源代码

::: code-group

```vue
<template>
  <div>i am child</div>
</template>
```

:::

我们接下来看 index.vue 编译后的样子，代码我已经做过了简化：

::: code-group

```js
import { ref } from "vue";
import Child from "./Child.vue";

const title = "title";

const __sfc__ = {
  __name: "index",
  setup() {
    const msg = ref("Hello World!");
    if (msg.value) {
      const content = "content";
      console.log(content);
    }
    const __returned__ = { title, msg, Child };
    return __returned__;
  }
};

import {
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  createVNode as _createVNode,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        _createElementVNode("h1", null, _toDisplayString($setup.title)),
        _createElementVNode(
          "h1",
          null,
          _toDisplayString($setup.msg),
          1 /* TEXT */
        ),
        _createVNode($setup["Child"])
      ],
      64 /* STABLE_FRAGMENT */
    )
  );
}
__sfc__.render = render;
export default __sfc__;
```

:::

我们可以看到 `index.vue` 编译后的代码中已经没有了 template 标签和 `script` 标签，取而代之是 `render` 函数和 `__sfc__` 对象。并且使用`__sfc__.render = render` 将 `render` 函数挂到 `__sfc__` 对象上，然后将 `__sfc__` 对象 `export default` 出去。

看到这里你应该知道了其实一个 `vue` 组件就是一个普通的 `js` 对象， `import` 一个 `vue` 组件，实际就是 `import` 这个 `js` 对象。这个 `js` 对象中包含 `render` 方法和 `setup` 方法。

## 编译后的 `setup` 方法

我们先来看看这个 `setup` 方法，是不是觉得和我们源代码中的 `setup` 语法糖中的代码很相似？没错，这个 `setup` 方法内的代码就是由 `setup` 语法糖中的代码编译后来的。

`setup` 语法糖原始代码

::: code-group

```vue
<script lang="ts" setup>
import { ref } from "vue";
import Child from "./child.vue";

const msg = ref("Hello World!");
const title = "title";
if (msg.value) {
  const content = "content";
  console.log(content);
}
</script>
```

:::

`setup` 编译后的代码

::: code-group

```js
import { ref } from "vue";
import Child from "./Child.vue";

const title = "title";

const __sfc__ = {
  __name: "index",
  setup() {
    const msg = ref("Hello World!");
    if (msg.value) {
      const content = "content";
      console.log(content);
    }
    const __returned__ = { title, msg, Child };
    return __returned__;
  }
};
```

:::

经过分析我们发现 `title` 变量由于不是响应式变量，所以编译后 `title` 变量被提到了 `js` 文件的全局变量上面去了。而 `msg` 变量是响应式变量，所以依然还是在 `setup` 方法中。我们再来看看 `setup` 的返回值，返回值是一个对象，对象中包含 `title` 、 `msg` 、 `Child` 属性，非 `setup` 顶层中定义的 `content` 变量就不在返回值对象中。

看到这里，可以回答我们前面提的第一个问题。

### `setup` 语法糖经过编译后是什么样子的？

`setup` 语法糖编译后会变成一个 `setup` 方法，编译后 `setup` 方法中的代码和 `script` 标签中的源代码很相似。方法会返回一个对象，对象由 `setup` 中定义的顶层变量和 `import` 导入的内容组成。

## 由 `template` 编译后的 `render` 函数

我们先来看看原本 `template` 中的代码：

::: code-group

```vue
<template>
  <h1>{{ title }}</h1>
  <h1>{{ msg }}</h1>
  <Child />
</template>
```

:::
我们再来看看由 `template` 编译成的 `render` 函数：

::: code-group

```js
import {
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  createVNode as _createVNode,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        _createElementVNode("h1", null, _toDisplayString($setup.title)),
        _createElementVNode(
          "h1",
          null,
          _toDisplayString($setup.msg),
          1 /* TEXT */
        ),
        _createVNode($setup["Child"])
      ],
      64 /* STABLE_FRAGMENT */
    )
  );
}
```

:::

我们这次主要看在 `render` 函数中如何访问 `setup` 中定义的顶层变量 `title` 、 `msg` ， `createElementBlock` 和 createElementVNode 等创建 `虚拟DOM` 的函数不在这篇文章的讨论范围内。你只需要知道 `createElementVNode("h1", null, _toDisplayString($setup.title))` 为创建一个 `h1` 标签的 `虚拟DOM` 就行了。

在 `render` 函数中我们发现读取 `title` 变量的值是通过 `$setup.title` 读取到的，读取 `msg` 变量的值是通过 `$setup.msg` 读取到的。这个 `$setup` 对象就是调用 `render` 函数时传入的第四个变量，我想你应该猜出来了，这个 `$setup` 对象就是我们前面的 `setup` 方法返回的对象。

那么问题来了，在执行 `render` 函数的时候是如何将 `setup` 方法的返回值作为第四个变量传递给 `render` 函数的呢？我在下一节会一步一步的带你通过 `debug` 源码的方式去搞清楚这个问题，我们带着问题去 `debug` 源码其实非常简单。

## `debug` 源码搞清楚是如何调用 `render` 函数

有的小伙伴看到这里需要看源码就觉得头大了，别着急，其实很简单，我会一步一步的带着你去 `debug` 源码。

首先我们将 `Enable JavaScript source maps` 给取消勾选了，不然在 `debug` 源码的时候断点就会走到 `vue` 文件中，而不是走到编译会的 `js` 文件中。

![/d8cb97e7-c03b-fd2c-021f-21ac4193de08.png](/d8cb97e7-c03b-fd2c-021f-21ac4193de08.png)

然后我们需要在设置里面的 `Ignore List` 看看 `node_modules` 文件夹是否被忽略。新版谷歌浏览器中会默认排除掉 `node_modules` 文件夹，所以我们需要将这个取消勾选。如果忽略了 `node_modules` 文件夹，那么 `debug` 的时候断点就不会走到 `node_modules` 中 `vue` 的源码中去了。

![/7f0cfc38-36fb-5aa2-7b8a-cdb6d6d2582a.png](/7f0cfc38-36fb-5aa2-7b8a-cdb6d6d2582a.png)

接下来我们需要在浏览器中找到 `vue` 文件编译后的 `js` 代码，我们只需要在 `network` 面板中找到这个 `vue` 文件的 `http` 请求，然后在 `Response` 下右键选择 `Open in Sources panel`，就会自动在 `sources` 面板自动打开对应编译后的 `js` 文件代码。

![/07fff2e6-5031-0e5a-6ceb-0228722b86f5.png](/07fff2e6-5031-0e5a-6ceb-0228722b86f5.png)

找到编译后的 `js` 文件，我们想 `debug` 看看是如何调用 `render` 函数的，所以我们给 `render` 函数加一个断点。然后刷新页面，发现代码已经走到了断点的地方。我们再来看看右边的 <imp-text-danger>Call Stack</imp-text-danger> 调用栈，发现 `render` 函数是由一个 `vue` 源码中的 `renderComponentRoot` 函数调用的。

![/b1964893-8f2f-210a-65c1-df9089d6f887.png](/b1964893-8f2f-210a-65c1-df9089d6f887.png)

点击 <imp-text-danger>Call Stack</imp-text-danger> 中的 `renderComponentRoot` 函数就可以跳转到 `renderComponentRoot` 函数的源码，我们发现 `renderComponentRoot` 函数中调用 `render` 函数的代码主要是下面这样的：

::: code-group

```js
function renderComponentRoot(instance) {
  const {
    props,
    data,
    setupState
    // 省略...
  } = instance;

  render2.call(
    thisProxy,
    proxyToUse,
    renderCache,
    props,
    setupState,
    data,
    ctx
  );
}
```

:::

这里我们可以看到前面的 `$setup` 实际就是由 `setupState` 赋值的，而 `setupState` 是当前 `vue` 实例上面的一个属性。那么 `setupState` 属性是如何被赋值到 `vue` 实例上面的呢？

我们需要给 `setup` 函数加一个断点，然后刷新页面进入断点。通过分析 <imp-text-danger>Call Stack</imp-text-danger> 调用栈，我们发现 `setup` 函数是由 `vue` 中的一个 `setupStatefulComponent` 函数调用执行的。

![/981fbe14-e72a-70d0-f8ab-ddbd92ccbeb5.png](/981fbe14-e72a-70d0-f8ab-ddbd92ccbeb5.png)

点击 <imp-text-danger>Call Stack</imp-text-danger> 调用栈中的 `setupStatefulComponent` ，进入到 `setupStatefulComponent` 的源码。我们看到 `setupStatefulComponent` 中的代码主要是这样的：

::: code-group

```js
function setupStatefulComponent(instance) {
  const { setup } = Component;
  // 省略
  const setupResult = callWithErrorHandling(setup, instance);
  handleSetupResult(instance, setupResult);
}
```

:::

`setup` 函数是 `Component` 上面的一个属性，我们将鼠标放到 `Component` 上面，看看这个 `Component` 是什么东西？

![/f015bc9c-d15e-c8bb-2970-b6d0eb51e255.png](/f015bc9c-d15e-c8bb-2970-b6d0eb51e255.png)

看到这个 `Component` 对象中既有 `render` 方法也有 `setup` 方法是不是感觉很熟悉，没错这个 `Component` 对象实际就是我们的 `vue` 文件编译后的 `js` 对象。

::: code-group

```js
const __sfc__ = {
  __name: "index",
  setup() {
    const msg = ref("Hello World!");
    if (msg.value) {
      const content = "content";
      console.log(content);
    }
    const __returned__ = { title, msg, Child };
    return __returned__;
  }
};

__sfc__.render = render;
```

:::

从 `Component` 对象中拿到 `setup` 函数，然后执行 `setup` 函数得到 `setupResult` 对象。然后再调用 `handleSetupResult(instance, setupResult);`

我们再来看看 `handleSetupResult` 函数是什么样的，下面是我简化后的代码：

::: code-group

```js
function handleSetupResult(instance, setupResult) {
  if (isFunction(setupResult)) {
    // 省略
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  }
}
```

:::

我们的 setup 的返回值是一个对象，所以这里会执行 `instance.setupState = proxyRefs(setupResult)`，将 `setup` 执行会的返回值赋值到 `vue` 实例的 `setupState` 属性上。

看到这里我们整个流程已经可以串起来了，首先会执行由 `setup` 语法糖编译后的 `setup` 函数。然后将 `setup` 函数中由顶层变量和 `import` 导入组成的返回值对象赋值给 `vue` 实例的 `setupState` 属性，然后执行 `render` 函数的时候从 `vue` 实例中取出 `setupState` 属性也就是 `setup` 的返回值。这样在 `render` 函数也就是 `template` 模版就可以访问到 `setup` 中的顶层变量和 `import` 导入。

![/1be57bb0-42e2-cfa2-5a30-afaf19ef9bf7.png](/1be57bb0-42e2-cfa2-5a30-afaf19ef9bf7.png)

现在我们可以回答前面提的另外两个问题了：

### <imp-text-success>为什么在 setup 顶层定义的变量可以在 template 中可以直接使用？</imp-text-success>

因为在 `setup` 语法糖顶层定义的变量经过编译后会被加入到 `setup` 函数返回值对象 `__returned__` 中，而非 `setup` 顶层定义的变量不会加入到 `__returned__` 对象中。 `setup` 函数返回值会被塞到 `vue` 实例的 `setupState` 属性上，执行 `render` 函数的时候会将 `vue` 实例上的 `setupState` 属性传递给 `render` 函数，所以在 `render` 函数中就可以访问到 `setup` 顶层定义的变量和 `import` 导入。而 `render` 函数实际就是由 `template` 编译得来的，所以说在 `template` 中可以访问到 `setup` 顶层定义的变量和 `import` 导入。。

### <imp-text-success>为什么 import 一个组件后就可以直接使用，无需使用 components 选项来显式注册组件？</imp-text-success>

因为在 `setup` 语法糖中 `import` 导入的组件对象经过编译后同样也会被加入到 `setup` 函数返回值对象 `__returned__` 中，同理在 `template` 中也可以访问到 `setup` 的返回值对象，也就可以直接使用这个导入的组件了。

## 总结

`setup` 语法糖经过编译后就变成了 `setup` 函数，而 `setup` 函数的返回值是一个对象，这个对象就是由在 `setup` 顶层定义的变量和 `import` 导入组成的。`vue` 在初始化的时候会执行 `setup` 函数，然后将 `setup` 函数返回值塞到 `vue` 实例的 `setupState` 属性上。执行 `render` 函数的时候会将 `vue` 实例上的 `setupState` 属性（也就是 `setup` 函数的返回值）传递给 `render` 函数，所以在 `render` 函数中就可以访问到 `setup` 顶层定义的变量和 `import` 导入。而 `render` 函数实际就是由 `template` 编译得来的，所以说在 `template` 中就可以访问到 `setup` 顶层定义的变量和 `import` 导入。
