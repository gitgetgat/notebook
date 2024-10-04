# Vue3 中的 v-bind 指令的工作原理

<article-info/>

## 前言

`v-bind` 指令想必大家都不陌生，并且都知道他支持各种写法，比如 `<div v-bind:title="title">`、`<div :title="title">`、`<div :title>`(vue 3.4 中引入的新的写法)。这三种写法的作用都是一样的，将 `title` 变量绑定到 `div` 标签的 `title` 属性上。本文将通过 debug 源码的方式带你搞清楚，`v-bind` 指令是如何实现这么多种方式将 `title` 变量绑定到 `div` 标签的 `title` 属性上的。注：本文中使用的 vue 版本为 <imp-text-success>3.4.19</imp-text-success>。

## 看个 demo

还是老套路，我们来写个 demo。代码如下：

::: code-group

```vue
<template>
  <div v-bind:title="title">Hello Word</div>
  <div :title="title">Hello Word</div>
  <div :title>Hello Word</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const title = ref("Hello Word");
</script>
```

:::

上面的代码很简单，使用三种写法将 `title` 变量绑定到 `div` 标签的 `title` 属性上。

我们从浏览器中来看看编译后的代码，如下：

::: code-group

```js
const _sfc_main = _defineComponent({
  __name: "index",
  setup(__props, { expose: __expose }) {
    // ...省略
  },
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        _createElementVNode(
          "div",
          { title: $setup.title },
          "Hello Word",
          8,
          _hoisted_1
        ),
        _createElementVNode(
          "div",
          { title: $setup.title },
          "Hello Word",
          8,
          _hoisted_2
        ),
        _createElementVNode(
          "div",
          { title: $setup.title },
          "Hello Word",
          8,
          _hoisted_3
        ),
      ],
      64
      /* STABLE_FRAGMENT */
    )
  );
}
_sfc_main.render = _sfc_render;
export default _sfc_main;
```

:::

从上面的 `render` 函数中可以看到三种写法生成的 `props` 对象都是一样的：`{ title: $setup.title }`。`props` 属性的 `key` 为 `title`，值为 `$setup.title` 变量。

再来看看浏览器渲染后的样子，如下图：

![/2f37e65f-d967-e609-a844-9559892ca7e2.png](/2f37e65f-d967-e609-a844-9559892ca7e2.png)

从上图中可以看到三个 `div` 标签上面都有 `title` 属性，并且属性值都是一样的。

## `transformElement` 函数

在之前的 [vue3 是怎么处理内置的 v-for、v-model 等指令？](./how-does-vue3-handle-built-in-v-for-v-model-and-other-instructions.md) 文章中我们讲过了在编译阶段会执行一堆 `transform` 转换函数，用于处理 vue 内置的 `v-for` 等指令。而 `v-bind` 指令就是在这一堆 `transform` 转换函数中的 `transformElement` 函数中处理的。

还是一样的套路启动一个 <imp-text-danger>debug 终端</imp-text-danger>。这里以 vscode 举例，打开终端然后点击终端中的 `+` 号旁边的下拉箭头，在下拉中点击 <imp-text-danger>Javascript Debug Terminal</imp-text-danger> 就可以启动一个 <imp-text-danger>debug 终端</imp-text-danger>。

![/how-to-open-javascript-debug-terminal-in-vscode.png](/how-to-open-javascript-debug-terminal-in-vscode.png)

给 `transformElement` 函数打个断点，`transformElement` 函数的代码位置在：`node_modules/@vue/compiler-core/dist/compiler-core.cjs.js`。

在 debug 终端上面执行 yarn dev 后在浏览器中打开对应的页面，比如：`http://localhost:5173/` 。此时断点就会走到 `transformElement` 函数中，在我们这个场景中简化后的 `transformElement` 函数代码如下：

::: code-group

```js
const transformElement = (node, context) => {
  return function postTransformElement() {
    let vnodeProps;
    const propsBuildResult = buildProps(
      node,
      context,
      undefined,
      isComponent,
      isDynamicComponent
    );
    vnodeProps = propsBuildResult.props;

    node.codegenNode = createVNodeCall(
      context,
      vnodeTag,
      vnodeProps,
      vnodeChildren
      // ...省略
    );
  };
};
```

:::

我们先来看看第一个参数 `node`，如下图：

![/ac759334-d20e-a178-7a03-e0beb2173516.png](/ac759334-d20e-a178-7a03-e0beb2173516.png)

从上图中可以看到此时的 `node` 节点对应的就是 `<div v-bind:title="title">Hello Word</div>` 节点，其中的 `props` 数组中只有一项，对应的就是 `div` 标签中的 `v-bind:title="title"` 部分。

我们接着来看 `transformElement` 函数中的代码，可以分为两部分。

第一部分为调用 `buildProps` 函数拿到当前 `node` 节点的 `props` 属性赋值给 `vnodeProps` 变量。

第二部分为根据当前 `node` 节点 `vnodeTag` 也就是节点的标签比如 `div`、`vnodeProps` 也就是节点的 `props` 属性对象、`vnodeChildren` 也就是节点的 `children` 子节点、还有一些其他信息生成 `codegenNode` 属性。在之前的 [Vue 3 的 generate 是这样生成 render 函数的](./vue-3-generate-generates-the-render-function-like-this.md) 文章中我们已经讲过了编译阶段最终生成 `render` 函数就是读取每个 `node` 节点的 `codegenNode` 属性然后进行字符串拼接。

从 `buildProps` 函数的名字我们不难猜出他的作用就是生成 `node` 节点的 `props` 属性对象，所以我们接下来需要将目光聚焦到 `buildProps` 函数中，看看是如何生成 `props` 对象的。

## `buildProps` 函数

将断点走进 `buildProps` 函数，在我们这个场景中简化后的代码如下：

::: code-group

```js
function buildProps(node, context, props = node.props) {
  let propsExpression;
  let properties = [];

  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    const { name } = prop;
    const directiveTransform = context.directiveTransforms[name];
    if (directiveTransform) {
      const { props } = directiveTransform(prop, node, context);
      properties.push(...props);
    }
  }

  propsExpression = createObjectExpression(
    dedupeProperties(properties),
    elementLoc
  );
  return {
    props: propsExpression,
    // ...省略
  };
}
```

:::

由于我们在调用 `buildProps` 函数时传的第三个参数为 `undefined`，所以这里的 `props` 就是默认值 `node.props`。如下图：

![/48e9870d-5c4b-13fb-fbfd-725d8d7eba36.png](/48e9870d-5c4b-13fb-fbfd-725d8d7eba36.png)

从上图中可以看到 `props` 数组中只有一项，`props` 中的 `name` 字段为 `bind`，说明 v-bind 指令还未被处理掉。

并且由于我们当前 node 节点是第一个 div 标签：`<div v-bind:title="title">`，所以 `props` 中的 `rawName` 的值是 `v-bind:title`。

我们接着来看上面 for 循环遍历 `props` 的代码：`const directiveTransform = context.directiveTransforms[name]`，现在我们已经知道了这里的 `name` 为 `bind`。那么这里的 `context.directiveTransforms` 对象又是什么东西呢？我们在 <imp-text-danger>debug 终端</imp-text-danger> 来看看 `context.directiveTransforms`，如下图：

![/cd8d8b3d-fe9d-0d29-314e-b214c183c64e.png](/cd8d8b3d-fe9d-0d29-314e-b214c183c64e.png)

从上图中可以看到 `context.directiveTransforms` 对象中包含许多指令的转换函数，比如 `v-bind`、`v-cloak`、`v-html`、`v-model` 等。

我们这里 `name` 的值为 `bind`，并且 `context.directiveTransforms` 对象中有 `name` 为 `bind` 的转换函数。所以 `const directiveTransform = context.directiveTransforms[name]` 就是拿到处理 `v-bind` 指令的转换函数，然后赋值给本地的 `directiveTransform` 函数。

接着就是执行 `directiveTransform` 转换函数，拿到 `v-bind` 指令生成的 `props` 数组。然后执行 `properties.push(...props)` 方法将所有的 `props` 数组都收集到 `properties` 数组中。

由于 `node` 节点中有多个 `props`，在 `for` 循环遍历 `props` 数组时，会将经过 `transform` 转换函数处理后拿到的 `props` 数组全部 `push` 到 `properties` 数组中。`properties` 数组中可能会有重复的 `prop`，所以需要执行 `dedupeProperties(properties)` 函数对 `props` 属性进行去重。

`node` 节点上的 `props` 属性本身也是一种 `node` 节点，所以最后就是执行 `createObjectExpression` 函数生成 `props` 属性的 `node` 节点，代码如下：

::: code-group

```js
propsExpression = createObjectExpression(
  dedupeProperties(properties),
  elementLoc
);
```

:::

其中 `createObjectExpression` 函数的代码也很简单，代码如下：

::: code-group

```js
function createObjectExpression(properties, loc) {
  return {
    type: NodeTypes.JS_OBJECT_EXPRESSION,
    loc,
    properties,
  };
}
```

:::

上面的代码很简单，`properties` 数组就是 `node` 节点上的 `props` 数组，根据 `properties` 数组生成 `props` 属性对应的 `node` 节点。

我们在 <imp-text-danger>debug 终端</imp-text-danger> 来看看最终生成的 `props` 对象 `propsExpression` 是什么样的，如下图：

![/633d1ba7-7cd2-0415-27a4-d065028dd859.png](/633d1ba7-7cd2-0415-27a4-d065028dd859.png)

从上图中可以看到此时 `properties` 属性数组中已经没有了 `v-bind` 指令了，取而代之的是 `key` 和 `value` 属性。`key.content` 的值为 `title`，说明属性名为 `title`。`value.content` 的值为 `$setup.title`，说明属性值为变量 `$setup.title`。

到这里 `v-bind` 指令已经被完全解析了，生成的 `props` 对象中有 `key` 和 `value` 字段，分别代表的是属性名和属性值。后续生成 render 函数时只需要遍历所有的 `props`，根据 `key` 和 `value` 字段进行字符串拼接就可以给 `div` 标签生成 `title` 属性了。

接下来我们继续来看看处理 `v-bind` 指令的 `transform` 转换函数具体是如何处理的。

## `transformBind` 函数

将断点走进 `transformBind` 函数，在我们这个场景中简化后的代码如下：

::: code-group

```js
const transformBind = (dir, _node) => {
  const arg = dir.arg;
  let { exp } = dir;

  if (!exp) {
    const propName = camelize(arg.content);
    exp = dir.exp = createSimpleExpression(propName, false, arg.loc);
    exp = dir.exp = processExpression(exp, context);
  }

  return {
    props: [createObjectProperty(arg, exp)],
  };
};
```

:::

我们先来看看 `transformBind` 函数接收的第一个参数 `dir`，从这个名字我想你应该已经猜到了他里面存储的是指令相关的信息。

在 <imp-text-danger>debug 终端</imp-text-danger> 来看看三种写法的 `dir` 参数有什么不同。

第一种写法：`<div v-bind:title="title">` 的 `dir` 如下图：

![/397ff21f-c27b-8112-e7a6-8a7e65206aa0.png](/397ff21f-c27b-8112-e7a6-8a7e65206aa0.png)

从上图中可以看到 `dir.name` 的值为 `bind`，说明这个是 `v-bind` 指令。`dir.rawName` 的值为 `v-bind:title` 说明没有使用缩写模式。`dir.arg` 表示 `bind` 绑定的属性名称，这里绑定的是 `title` 属性。`dir.exp` 表示 `bind` 绑定的属性值，这里绑定的是 `$setup.title` 变量。

第二种写法：`<div :title="title">` 的 `dir` 如下图：

![/7fa3ee8a-1465-a22b-80f4-fbcbcb68f86e.png](/7fa3ee8a-1465-a22b-80f4-fbcbcb68f86e.png)

从上图中可以看到第二种写法的 `dir` 和第一种写法的 `dir` 只有一项不一样，那就是 `dir.rawName`。在第二种写法中 `dir.rawName` 的值为:title，说明我们这里是采用了缩写模式。

::: warning 可能有的小伙伴有疑问了，这里的 `dir` 是怎么来的？vue 是怎么区分 <imp-text-danger>第一种全写模式</imp-text-danger> 和 <imp-text-danger>第二种缩写模式</imp-text-danger> 呢？

答案是在 `parse` 阶段将 `html` 编译成 `AST` 抽象语法树阶段时遇到 `v-bind:title` 和 `:title` 时都会将其当做 `v-bind` 指令处理，并且将解析处理的指令绑定的属性名塞到 `dir.arg` 中，将属性值塞到 `dir.exp` 中。
:::

第三种写法：`<div :title>` 的 `dir` 如下图：

![/9dd49251-dc29-8683-6bb8-e1dd3fd40fc4.png](/9dd49251-dc29-8683-6bb8-e1dd3fd40fc4.png)

第三种写法也是缩写模式，并且将属性值也一起给省略了。所以这里的 `dir.exp` 存储的属性值为 `undefined`。其他的和第二种缩写模式基本一样。

我们再来看 `transformBind` 中的代码，`if (!exp)` 说明将值也一起省略了，是第三种写法。就会执行如下代码：

::: code-group

```js
if (!exp) {
  const propName = camelize(arg.content);
  exp = dir.exp = createSimpleExpression(propName, false, arg.loc);
  exp = dir.exp = processExpression(exp, context);
}
```

:::

这里的 `arg.content` 就是属性名 `title`，执行 `camelize` 函数将其从 <imp-text-success>kebab-case 命名法</imp-text-success> 转换为 <imp-text-success>驼峰命名法</imp-text-success>。比如我们给 div 上面绑一个自定义属性 `data-type`，采用第三种缩写模式就是这样的：`<div :data-type>`。大家都知道变量名称是不能带短横线的，所以这里的要执行 `camelize` 函数将其转换为 <imp-text-success>驼峰命名法</imp-text-success>：改为绑定 `dataType` 变量。

从前面的那几张 `dir` 变量的图我们知道 `dir.exp` 变量的值是一个对象，所以这里需要执行 `createSimpleExpression` 函数将省略的变量值也补全。`createSimpleExpression` 的函数代码如下：

::: code-group

```js
function createSimpleExpression(
  content,
  isStatic,
  loc,
  constType
): SimpleExpressionNode {
  return {
    type: NodeTypes.SIMPLE_EXPRESSION,
    loc,
    content,
    isStatic,
    constType: isStatic ? ConstantTypes.CAN_STRINGIFY : constType,
  };
}
```

:::

经过这一步处理后 `dir.exp` 变量的值如下图：

![/3f536119-c855-c46e-4ec3-c1e1cae12f9c.png](/3f536119-c855-c46e-4ec3-c1e1cae12f9c.png)

还记得前面两种模式的 `dir.exp.content` 的值吗？他的值是 `$setup.title`，表示属性值为 `setup` 中定义的 `title` 变量。而我们这里的 `dir.exp.content` 的值为 `title` 变量，很明显是不对的。

所以需要执行 `exp = dir.exp = processExpression(exp, context)` 将 `dir.exp.content` 中的值替换为 `$setup.title`，执行 `processExpression` 函数后的 `dir.exp` 变量的值如下图：

![/fa1d5484-5370-23b9-9721-b781dafd05a7.png](/fa1d5484-5370-23b9-9721-b781dafd05a7.png)

我们来看 `transformBind` 函数中的最后一块 `return` 的代码：

::: code-group

```js
return {
  props: [createObjectProperty(arg, exp)],
};
```

:::

这里的 `arg` 就是 `v-bind` `绑定的属性名，exp` 就是 `v-bind` 绑定的属性值。`createObjectProperty` 函数代码如下：

::: code-group

```js
function createObjectProperty(key, value) {
  return {
    type: NodeTypes.JS_PROPERTY,
    loc: locStub,
    key: isString(key) ? createSimpleExpression(key, true) : key,
    value,
  };
}
```

:::

经过 `createObjectProperty` 函数的处理就会生成包含 `key`、`value` 属性的对象。`key` 中存的是绑定的属性名，`value` 中存的是绑定的属性值。

其实 `transformBind` 函数中做的事情很简单，解析出 `v-bind` 指令绑定的属性名称和属性值。如果发现 `v-bind` 指令没有绑定值，那么就说明当前 `v-bind` 将值也给省略掉了，绑定的属性和属性值同名才能这样写。然后根据属性名和属性值生成一个包含 `key`、`value` 键的 `props` 对象。后续生成 render 函数时只需要遍历所有的 `props`，根据 `key` 和 `value` 字段进行字符串拼接就可以给 `div` 标签生成 `title` 属性了。

## 总结

在 `transform` 阶段处理 vue 内置的 `v-for`、`v-model` 等指令时会去执行一堆 `transform` 转换函数，其中有个 `transformElement` 转换函数中会去执行 `buildProps` 函数。

`buildProps` 函数会去遍历当前 `node` 节点的所有 `props` 数组，此时的 `props` 中还是存的是 `v-bind` 指令，每个 `prop` 中存的是 `v-bind` 指令绑定的属性名和属性值。

在 `for` 循环遍历 `node` 节点的所有 `props` 时，每次都会执行 `transformBind` 转换函数。如果我们在写 `v-bind` 时将值也给省略了，此时 `v-bind` 指令绑定的属性值就是 `undefined`。这时就需要将省略的属性值补回来，补回来的属性值的变量名称和属性名是一样的。

在 `transformBind` 转换函数的最后会根据属性名和属性值生成一个包含 `key`、`value` 键的 `props` 对象。`key` 对应的就是属性名，`value` 对应的就是属性值。后续生成 `render` 函数时只需要遍历所有的 `props`，根据 `key` 和 `value` 字段进行字符串拼接就可以给 `div` 标签生成 `title` 属性了。
