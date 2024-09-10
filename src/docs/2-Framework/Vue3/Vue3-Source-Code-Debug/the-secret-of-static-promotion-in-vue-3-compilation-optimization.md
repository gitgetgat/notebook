# Vue 3 编译优化之 "静态提升" 的秘密

<article-info/>

## 前言

在上一篇 [vue3 针对动态节点的 "靶向更新"](./vue3-targeted-update-for-dynamic-nodes.md) 文章中讲了对于动态节点，vue 做的优化是将这些动态节点收集起来，然后当响应式变量修改后进行靶向更新。那么 vue 对静态节点有没有做什么优化呢？答案是：当然有，对于静态节点会进行 <el-text size="large" type="success">“静态提升”</el-text> 。这篇文章我们来看看 vue 是如何进行静态提升的。

## 什么是静态提升？

我们先来看一个 demo，代码如下：

::: code-group

```vue
<template>
  <div>
    <h1>title</h1>
    <p>{{ msg }}</p>
    <button @click="handleChange">change msg</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const msg = ref("hello");

function handleChange() {
  msg.value = "world";
}
</script>
```

:::

这个 demo 代码很简单，其中的 `h1` 标签就是我们说的静态节点，p 标签就是动态节点。点击 button 按钮会将响应式 `msg` 变量的值更新，然后会执行 `render` 函数将 `msg` 变量的最新值 `"world"` 渲染到 `p` 标签中。

我们先来看看未开启 <el-text size="large" type="success">“静态提升”</el-text> 之前生成的 `render` 函数是什么样的：

由于在 `vite` 项目中启动的 vue 都是开启了 <el-text size="large" type="success">“静态提升”</el-text> ，所以我们需要在 <link-tag :linkList="[{  linkText:'Vue 3 Template Explorer',linkUrl:'https://template-explorer.vuejs.org/'}]" />网站中看看未开启 <el-text size="large" type="success">“静态提升”</el-text> 的 `render` 函数的样子，如下图将 `hoistStatic` 这个选项取消勾选即可：

![/b4565abf-94e6-f6ed-37de-6c9489419120.png](/b4565abf-94e6-f6ed-37de-6c9489419120.png)

未开启静态提升生成的 `render` 函数如下：

::: code-group

```vue

```

:::

我们先来看一个 demo，代码如下：

::: code-group

```vue
<template>
  <div>
    <h1>title</h1>
    <p>{{ msg }}</p>
    <button @click="handleChange">change msg</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const msg = ref("hello");

function handleChange() {
  msg.value = "world";
}
</script>
```

:::

这个 demo 代码很简单，其中的 `h1` 标签就是我们说的静态节点，p 标签就是动态节点。点击 button 按钮会将响应式 `msg` 变量的值更新，然后会执行 `render` 函数将 `msg` 变量的最新值 `"world"` 渲染到 `p` 标签中。

我们先来看看未开启 <el-text size="large" type="success">“静态提升”</el-text> 之前生成的 `render` 函数是什么样的：

由于在 `vite` 项目中启动的 vue 都是开启了 <el-text size="large" type="success">“静态提升”</el-text> ，所以我们需要在 <link-tag :linkList="[{  linkText:'Vue 3 Template Explorer',linkUrl:'https://template-explorer.vuejs.org/'}]" />网站中看看未开启 <el-text size="large" type="success">“静态提升”</el-text> 的 `render` 函数的样子，如下图将 `hoistStatic` 这个选项取消勾选即可：

![/b4565abf-94e6-f6ed-37de-6c9489419120.png](/b4565abf-94e6-f6ed-37de-6c9489419120.png)

未开启静态提升生成的 `render` 函数如下：

::: code-group

```js
import {
  createElementVNode as _createElementVNode,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from "vue";

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock("template", null, [
      _createElementVNode("div", null, [
        _createElementVNode("h1", null, "title"),
        _createElementVNode(
          "p",
          null,
          _toDisplayString(_ctx.msg),
          1 /* TEXT */
        ),
        _createElementVNode(
          "button",
          { onClick: _ctx.handleChange },
          "change msg",
          8 /* PROPS */,
          ["onClick"]
        )
      ])
    ])
  );
}
```

:::

每次响应式变量更新后都会执行 `render` 函数，每次执行 `render` 函数都会执行 `createElementVNode` 方法生成 `h1` 标签的 `虚拟 DOM`。但是我们这个 `h1` 标签明明就是一个静态节点，根本就不需要每次执行 `render` 函数都去生成一次 `h1` 标签的 `虚拟 DOM`。

vue3 对此做出的优化就是将 “执行 `createElementVNode` 方法生成 `h1` 标签 `虚拟 DOM` 的代码” 提取到 `render` 函数外面去，这样就只有初始化的时候才会去生成一次 `h1` 标签的 `虚拟 DOM`，也就是我们这篇文章中要讲的 <el-text size="large" type="success">“静态提升”</el-text>。开启静态提升后生成的 `render` 函数如下：

::: code-group

```js
import {
  createElementVNode as _createElementVNode,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from "vue";

const _hoisted_1 = /*#__PURE__*/ _createElementVNode(
  "h1",
  null,
  "title",
  -1 /* HOISTED */
);

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock("template", null, [
      _createElementVNode("div", null, [
        _hoisted_1,
        _createElementVNode(
          "p",
          null,
          _toDisplayString(_ctx.msg),
          1 /* TEXT */
        ),
        _createElementVNode(
          "button",
          {
            onClick:
              _cache[0] ||
              (_cache[0] = (...args) =>
                _ctx.handleChange && _ctx.handleChange(...args))
          },
          "change msg"
        )
      ])
    ])
  );
}
```

:::

从上面可以看到生成 `h1` 标签 `虚拟 DOM` 的 `createElementVNode` 函数被提取到 `render` 函数外面去执行了，只有初始化时才会执行一次将生成的 `虚拟 DOM` 赋值给 `_hoisted_1` 变量。在 `render` 函数中直接使用 `_hoisted_1` 变量即可，无需每次执行 `render` 函数都去生成 `h1` 标签的 `虚拟 DOM`，这就是我们这篇文章中要讲的 <el-text size="large" type="success">“静态提升”</el-text>。

我们接下来还是一样的套路通过 debug 的方式来带你搞清楚 vue 是如何实现 <el-text size="large" type="success">“静态提升”</el-text> 的，注：本文使用的 vue 版本为 <el-text size="large" type="success">3.4.19</el-text>

## 如何实现静态提升

实现静态提升主要分为两个阶段：

- `transform` 阶段遍历 `AST 抽象语法树`，将静态节点找出来进行标记和处理，然后将这些静态节点塞到根节点的 `hoists` 数组中。

- `generate` 阶段遍历上一步在根节点存的 `hoists` 数组，在 `render` 函数外去生成存储静态节点 `虚拟 DOM` 的 `_hoisted_x` 变量。然后在 `render` 函数中使用这些 `_hoisted_x` 变量表示这些静态节点。

### `transform` 阶段

在我们这个场景中 `transform` 函数简化后的代码如下：

::: code-group

```js
function transform(root, options) {
  // ...省略
  if (options.hoistStatic) {
    hoistStatic(root, context);
  }
  root.hoists = context.hoists;
}
```

:::

从上面可以看到实现静态提升是执行了 `hoistStatic` 函数，我们给 `hoistStatic` 函数打个断点。让代码走进去看看 `hoistStatic` 函数是什么样的，在我们这个场景中简化后的代码如下：

::: code-group

```js
function hoistStatic(root, context) {
  walk(root, context, true);
}
```

:::

从上面可以看到这里依然不是具体实现的地方，接着将断点走进 `walk` 函数。在我们这个场景中简化后的代码如下：

::: code-group

```js
function walk(node, context, doNotHoistNode = false) {
  const { children } = node;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (
      child.type === NodeTypes.ELEMENT &&
      child.tagType === ElementTypes.ELEMENT
    ) {
      const constantType = doNotHoistNode
        ? ConstantTypes.NOT_CONSTANT
        : getConstantType(child, context);
      if (constantType > ConstantTypes.NOT_CONSTANT) {
        if (constantType >= ConstantTypes.CAN_HOIST) {
          child.codegenNode.patchFlag = PatchFlags.HOISTED + ` /* HOISTED */`;
          child.codegenNode = context.hoist(child.codegenNode);
          continue;
        }
      }
    }

    if (child.type === NodeTypes.ELEMENT) {
      walk(child, context);
    }
  }
}
```

:::

我们先在 debug 终端上面看看传入的第一个参数 `node` 是什么样的，如下图：

![/9987ff8b-21e9-0bf6-2ad5-8029014c0a8d.png](/9987ff8b-21e9-0bf6-2ad5-8029014c0a8d.png)

从上面可以看到此时的 `node` 为 `AST 抽象语法树` 的根节点，树的结构和 `template` 中的代码刚好对上。外层是 `div` 标签，`div` 标签下面有 `h1`、`p`、`button` 三个标签。

我们接着来看 `walk` 函数，简化后的 `walk` 函数只剩下一个 `for` 循环遍历 `node.children`。在 `for` 循环里面主要有两块 `if` 语句：

- 第一块 `if` 语句的作用是实现静态提升

- 第二块 `if` 语句的作用是递归遍历整颗树。

我们来看第一块 `if` 语句中的条件，如下：

::: code-group

```js
if (
  child.type === NodeTypes.ELEMENT &&
  child.tagType === ElementTypes.ELEMENT
)
```

:::

在将这块 `if` 语句之前，我们先来了解一下这里的两个枚举。`NodeTypes` 和 `ElementTypes`

## `NodeTypes` 枚举

`NodeTypes` 表示 `AST 抽象语法树` 中的所有 `node` 节点类型，枚举值如下：

::: code-group

```js
const NodeTypes = {
  ROOT: 0, // 根节点
  ELEMENT: 1, // 元素节点，比如：div元素节点、Child组件节点
  TEXT: 2, // 文本节点
  COMMENT: 3, // 注释节点
  SIMPLE_EXPRESSION: 4, // 简单表达式节点，比如v-if="msg !== 'hello'"中的msg!== 'hello'
  INTERPOLATION: 5, // 双大括号节点，比如{{msg}}
  ATTRIBUTE: 6, // 属性节点，比如 title="我是title"
  DIRECTIVE: 7 // 指令节点，比如 v-if=""
  // ...省略
};
```

:::

看到这里有的小伙伴可能有疑问了，为什么 `AST 抽象语法树` 中有这么多种节点类型呢？

我们来看一个例子你就明白了，如下：

::: code-group

```js
<div v-if="msg !== 'hello'" title="我是title">
  msg为 {{ msg }}
</div>
```

:::

上面这段代码转换成 `AST 抽象语法树` 后会生成很多 `node` 节点：

- `div` 对应的是 `ELEMENT` 元素节点

- `v-if` 对应的是 `DIRECTIVE` 指令节点

- `v-if` 中的 `msg !== 'hello'` 对应的是 `SIMPLE_EXPRESSION` 简单表达式节点

- `title` 对应的是 `ATTRIBUTE` 属性节点

- `msg` 为对应的是 `ELEMENT` 元素节点

- `{{ msg }}` 对应的是 `INTERPOLATION` 双大括号节点

## `ElementTypes` 枚举

`div` 元素节点、`Child` 组件节点都是 `NodeTypes.ELEMENT` 元素节点，那么如何区分是不是组件节点呢？就需要使用 `ElementTypes` 枚举来区分了，如下：

::: code-group

```js
enum ElementTypes {
  ELEMENT,  // html元素
  COMPONENT,  // 组件
  SLOT, // 插槽
  TEMPLATE, // 内置template元素
}
```

:::

现在来看第一块 `if` 条件，你应该很容易看得懂了：

::: code-group

```js
if (
  child.type === NodeTypes.ELEMENT &&
  child.tagType === ElementTypes.ELEMENT
)
```

:::

如果当前节点是 `html` 元素节点，那么就满足 `if` 条件。

当前的 `node` 节点是最外层的 `div` 节点，当然满足这个 `if` 条件。

接着将断点走进 `if` 条件内，第一行代码如下：

::: code-group

```js
const constantType = doNotHoistNode
  ? ConstantTypes.NOT_CONSTANT
  : getConstantType(child, context);
```

:::

在搞清楚这行代码之前先来了解一下 `ConstantTypes` 枚举

## `ConstantTypes` 枚举

我们来看看 `ConstantTypes` 枚举，如下：

::: code-group

```js
const ConstantTypes = {
  NOT_CONSTANT: 0, // 不是常量
  CAN_SKIP_PATCH: 1, // 跳过patch函数
  CAN_HOIST: 2, // 可以静态提升
  CAN_STRINGIFY: 3 // 可以预字符串化
};
```

:::

`ConstantTypes` 枚举的作用就是用来标记静态节点的 `4` 种等级状态，<el-text size="large" type="success">高等级的状态拥有低等级状态的所有能力</el-text>。比如：`NOT_CONSTANT`：表示当前节点不是静态节点。比如下面这个 `p` 标签使用了 `msg` 响应式变量：

::: code-group

```js
<p>{{ msg }}</p>;

const msg = ref("hello");
```

:::

`CAN_SKIP_PATCH`：表示当前节点在重新执行 `render` 函数时可以跳过 `patch` 函数。比如下面这个 `p` 标签虽然使用了变量 `name`，但是 `name` 是一个常量值。所以这个 `p` 标签其实是一个静态节点，但是由于使用了 `name` 变量，所以不能提升到 `render` 函数外面去。

::: code-group

```js
<p>{{ name }}</p>;
const name = "name";
```

:::

`CAN_HOIST`：表示当前静态节点可以被静态提升，当然每次执行 `render` 函数时也无需执行 `patch` 函数。demo 如下：

::: code-group

```js
<h1>title</h1>
```

:::

`CAN_STRINGIFY`：表示当前静态节点可以被预字符串化，下一篇文章会专门讲预字符串化。 从 debug 终端中可以看到此时 `doNotHoistNode` 变量的值为 `true`，所以 `constantType` 变量的值为 `ConstantTypes.NOT_CONSTANT`。`getConstantType` 函数的作用是根据当前节点以及其子节点拿到静态节点的 `constantType`。

我们接着来看后面的代码，如下：

::: code-group

```js
if (constantType > ConstantTypes.NOT_CONSTANT) {
  if (constantType >= ConstantTypes.CAN_HOIST) {
    child.codegenNode.patchFlag = PatchFlags.HOISTED + ` /* HOISTED */`;
    child.codegenNode = context.hoist(child.codegenNode);
    continue;
  }
}
```

:::

前面我们已经讲过了，当前 `div` 节点的 `constantType` 的值为 `ConstantTypes.NOT_CONSTANT`，所以这个 `if` 语句条件不通过。

我们接着看 `walk` 函数中的最后一块代码，如下：

::: code-group

```js
if (child.type === NodeTypes.ELEMENT) {
  walk(child, context);
}
```

:::

前面我们已经讲过了，当前 `child` 节点是 `div` 标签，所以当然满足这个 `if` 条件。将子节点 `div` 作为参数，递归调用 `walk` 函数。

我们再次将断点走进 `walk` 函数，和上一次执行 `walk` 函数不同的是，上一次 `walk` 函数的参数为 `root` 根节点，这一次参数是 `div` 节点。

同样的在 `walk` 函数内先使用 `for` 循环遍历 `div` 节点的子节点，我们先来看第一个子节点 `h1` 标签，也就是需要静态提升的节点。很明显 `h1` 标签是满足第一个 `if` 条件语句的：

::: code-group

```js
if (
  child.type === NodeTypes.ELEMENT &&
  child.tagType === ElementTypes.ELEMENT
)
```

:::

在 debug 终端中来看看 `h1` 标签的 `constantType` 的值，如下：图片

从上图中可以看到 `h1` 标签的 `constantType` 值为 `3`，也就是 `ConstantTypes.CAN_STRINGIFY`。表明 `h1` 标签是最高等级的<el-text size="large" type="success">预字符串</el-text>，当然也能 <el-text size="large" type="success">静态提升</el-text>。

`h1` 标签的 `constantType` 当然就能满足下面这个 `if` 条件：

::: code-group

```js
if (constantType > ConstantTypes.NOT_CONSTANT) {
  if (constantType >= ConstantTypes.CAN_HOIST) {
    child.codegenNode.patchFlag = PatchFlags.HOISTED + ` /* HOISTED */`;
    child.codegenNode = context.hoist(child.codegenNode);
    continue;
  }
}
```

:::

值得一提的是上面代码中的 `codegenNode` 属性就是用于生成对应 `node` 节点的 `render` 函数。

然后以 `codegenNode` 属性作为参数执行 `context.hoist` 函数，将其返回值赋值给节点的 `codegenNode` 属性。如下：

::: code-group

```js
child.codegenNode = context.hoist(child.codegenNode);
```

:::

上面这行代码的作用其实就是将原本生成 `render` 函数的 `codegenNode` 属性替换成用于静态提升的 `codegenNode` 属性。

## `context.hoist` 方法

将断点走进 `context.hoist` 方法，简化后的代码如下：

::: code-group

```js
function hoist(exp) {
  context.hoists.push(exp);
  const identifier = createSimpleExpression(
    `_hoisted_${context.hoists.length}`,
    false,
    exp.loc,
    ConstantTypes.CAN_HOIST
  );
  identifier.hoisted = exp;
  return identifier;
}
```

:::

我们先在 debug 终端看看传入的 `codegenNode` 属性。如下图：

![/9ec4b3e4-f2f9-ca10-1a4e-2b2a5f4431e3.png](/9ec4b3e4-f2f9-ca10-1a4e-2b2a5f4431e3.png)

从上图中可以看到此时的 `codegenNode` 属性对应的就是 `h1` 标签，`codegenNode.children` 对应的就是 `h1` 标签的 `title` 文本节点。`codegenNode` 属性的作用就是用于生成 `h1` 标签的 `render` 函数。

在 `hoist` 函数中首先执行 `context.hoists.push(exp)` 将 `h1` 标签的 `codegenNode` 属性 `push` 到 `context.hoists` 数组中。`context.hoists` 是一个数组，数组中存的是 `AST 抽象语法树` 中所有需要被 <el-text size="large" type="success">静态提升</el-text> 的所有 `node` 节点的 `codegenNode` 属性。

接着就是执行 `createSimpleExpression` 函数生成一个新的 `codegenNode` 属性，我们来看传入的第一个参数：

::: code-group

```js
`_hoisted_${context.hoists.length}`;
```

:::

由于这里处理的是第一个需要 <el-text size="large" type="success">静态提升</el-text> 的静态节点，所以第一个参数的值`_hoisted_1`。如果处理的是第二个需要 <el-text size="large" type="success">静态提升</el-text> 的静态节点，其值为`_hoisted_2`，依次类推。

接着将断点走进 `createSimpleExpression` 函数中，代码如下：

::: code-group

```js
function createSimpleExpression(
  content,
  isStatic = false,
  loc = locStub,
  constType = ConstantTypes.NOT_CONSTANT
) {
  return {
    type: NodeTypes.SIMPLE_EXPRESSION,
    loc,
    content,
    isStatic,
    constType: isStatic ? ConstantTypes.CAN_STRINGIFY : constType
  };
}
```

:::

这个函数的作用很简单，根据传入的内容生成一个简单表达式节点。我们这里传入的内容就是 `_hoisted_1` 。

表达式节点我们前面讲过了，比如：`v-if="msg !== 'hello'"` 中的 `msg!== 'hello'`就是一个简单的表达式。

同理上面的 `_hoisted_1` 表示的是使用了一个变量名为 `_hoisted_1` 的表达式。

我们在 debug 终端上面看看 `hoist` 函数返回值，也就是 `h1` 标签新的 `codegenNode` 属性。如下图：

![/a580ef2b-248f-38f3-990d-f77c9240b059.png](/a580ef2b-248f-38f3-990d-f77c9240b059.png)

此时的 `codegenNode` 属性已经变成了一个简单表达式节点，表达式的内容为：`_hoisted_1`。后续执行 `generate` 生成 `render` 函数时，在 `render` 函数中 `h1` 标签就变成了表达式：`_hoisted_1`。

最后再执行 `transform` 函数中的 `root.hoists = context.hoists`，将 `context` 上下文中存的 `hoists` 属性数组赋值给根节点的 `hoists` 属性数组，后面在 `generate` 生成 `render` 函数时会用。

至此 `transform` 阶段已经完成了，主要做了两件事：

将 `h1` 静态节点找出来，将该节点生成 `render` 函数的 `codegenNode` 属性 `push` 到根节点的 `hoists` 属性数组中，后面 `generate` 生成 `render` 函数时会用。

将上一步 `h1` 静态节点的 `codegenNode` 属性替换为一个简单表达式，表达式为：`_hoisted_1`。

### generate 阶段

在 `generate` 阶段主要分为两部分：

- 将原本 `render` 函数内调用 `createElementVNode` 生成 `h1` 标签 `虚拟 DOM` 的代码，提到 `render` 函数外面去执行，赋值给全局变量 `_hoisted_1` 。

- 在 `render` 函数内直接使用 `_hoisted_1` 变量即可。

如下图：

![/e5405a7c-bc74-daba-8f4c-9a70ed49b24c.png](/e5405a7c-bc74-daba-8f4c-9a70ed49b24c.png)

## 生成 `render` 函数外面的 `_hoisted_1` 变量

经过 `transform` 阶段的处理，`根节点` 的 `hoists` 属性数组中存了所有需要 <el-text size="large" type="success">静态提升</el-text> 的静态节点。我们先来看如何处理这些静态节点，生成 h1 标签对应的 `_hoisted_1` 变量的。代码如下：

::: code-group

```js
genHoists(ast.hoists, context);
```

:::

将根节点的 `hoists` 属性数组传入给 `genHoists` 函数，将断点走进 `genHoists` 函数，在我们这个场景中简化后的代码如下：

::: code-group

```js
function genHoists(hoists, context) {
  const { push, newline } = context;
  newline();
  for (let i = 0; i < hoists.length; i++) {
    const exp = hoists[i];
    if (exp) {
      push(`const _hoisted_${i + 1} = ${``}`);
      genNode(exp, context);
      newline();
    }
  }
}
```

:::

`generate` 部分的代码会在后面文章中逐行分析，这篇文章就不细看到每个函数了。简单解释一下 `genHoists` 函数中使用到的那些方法的作用。

- `context.code` 属性：此时的 `render` 函数字符串，可以在 debug 终端看一下执行每个函数后 `render` 函数字符串是什么样的。

- `newline` 方法：向当前的 `render` 函数字符串中插入换行符。

- `push` 方法：向当前的 `render` 函数字符串中插入字符串 `code`。

- `genNode` 函数：在 `transform` 阶段给会每个 `node` 节点生成 `codegenNode` 属性，在 `genNode` 函数中会使用 `codegenNode` 属性生成对应 `node` 节点的 `render` 函数代码。

在刚刚进入 `genHoists` 函数，我们在 debug 终端使用 `context.code` 看看此时的 `render` 函数字符串是什么样的，如下图：

![/82782bd3-a146-55a3-cfd7-9ef93e25cbb0.png](/82782bd3-a146-55a3-cfd7-9ef93e25cbb0.png)

从上图中可以看到此时的 `render` 函数 `code` 字符串只有一行 `import vue` 的代码。

然后执行 `newline` 方法向 `render` 函数 `code` 字符串中插入一个换行符。

接着遍历在 `transform` 阶段收集的需要静态提升的节点集合，也就是 `hoists` 数组。在 debug 终端来看看这个 `hoists` 数组，如下图：

![/f8b6657c-a071-f6b2-5f14-a85855993e2d.png](/f8b6657c-a071-f6b2-5f14-a85855993e2d.png)

从上图中可以看到在 `hoists` 数组中只有一个 `h1` 标签需要静态提升。

在 `for` 循环中会先执行一句 `push` 方法，如下：

::: code-group

```js
push(`const _hoisted_${i + 1} = ${``}`);
```

:::

这行代码的意思是插入一个名为 `_hoisted_1` 的 `const` 变量，此时该变量的值还是空字符串。在 debug 终端使用 `context.code` 看看执行 `push` 方法后的 `render` 函数字符串是什么样的，如下图：

![/8c8de1ae-5e72-4591-e55e-bc6fd28ef05b.png](/8c8de1ae-5e72-4591-e55e-bc6fd28ef05b.png)

从上图中可以看到 `_hoisted_1` 全局变量的定义已经生成了，值还没生成。

接着就是执行 `genNode(exp, context)` 函数生成 `_hoisted_1` 全局变量的值，同理在 debug 终端看看执行 `genNode` 函数后的 `render` 函数字符串是什么样的，如下图：

![/c5c8d670-b1ea-1784-230b-c617f6a6aec5.png](/c5c8d670-b1ea-1784-230b-c617f6a6aec5.png)

从上面可以看到 `render` 函数外面已经定义了一个 `_hoisted_1` 变量，变量的值为调用 `createElementVNode` 生成 `h1` 标 `签虚拟 DOM`。

## 生成 `render` 函数中 `return` 的内容

在 `generate` 中同样也是调用 `genNode` 函数生成 `render` 函数中 `return` 的内容，代码如下：

::: code-group

```js
genNode(ast.codegenNode, context);
```

:::

这里传入的参数 `ast.codegenNode` 是根节点的 `codegenNode` 属性，在 `genNode` 函数中会从根节点开始递归遍历整颗 `AST 抽象语法树`，为每个节点生成自己的 `createElementVNode` 函数，执行 `createElementVNode` 函数会生成这些节点的 `虚拟 DOM`。

我们先来看看传入的第一个参数 `ast.codegenNode`，也就是根节点的 `codegenNode` 属性。如下图：

![/882271ff-d622-deff-b8b7-dd7337619814.png](/882271ff-d622-deff-b8b7-dd7337619814.png)

从上图中可以看到静态节点 `h1` 标签已经变成了一个名为 `_hoisted_1` 的变量，而使用了 `msg` 变量的动态节点依然还是 `p` 标签。

我们再来看看执行这个 `genNode` 函数之前 `render` 函数字符串是什么样的，如下图：

![/776e05c7-5411-affe-b067-5a6b5b43ff8f.png](/776e05c7-5411-affe-b067-5a6b5b43ff8f.png)

从上图中可以看到此时的 `render` 函数字符串还没生成 `return` 中的内容。

执行 `genNode` 函数后，来看看此时的 `render` 函数字符串是什么样的，如下图：

![/326a6e95-3df5-0b9c-b77c-8d0fcdc46646.png](/326a6e95-3df5-0b9c-b77c-8d0fcdc46646.png)

从上图中可以看到，在生成的 `render` 函数中 `h1` 标签静态节点已经变成了 `_hoisted_1` 变量， `_hoisted_1` 变量中存的是静态节点 `h1` 的 `虚拟 DOM`，所以每次页面更新重新执行 `render` 函数时就不会每次都去生成一遍静态节点 `h1` 的 `虚拟 DOM`。

## 总结

![/1921164d-3c49-fb34-9d31-6b7605765390.png](/1921164d-3c49-fb34-9d31-6b7605765390.png)

整个流程主要分为两个阶段：

- 在 `transform` 阶段中：

  - 将 `h1` 静态节点找出来，将静态节点的 `codegenNode` 属性 `push` 到根节点的 `hoists` 属性数组中。

  - 将 `h1` 静态节点的 `codegenNode` 属性替换为一个简单表达式节点，表达式为：`_hoisted_1`。

- 在 `generate` 阶段中：

  - 在 `render` 函数外面生成一个名为 `_hoisted_1` 的全局变量，这个变量中存的是 `h1` 标签的 `虚拟 DOM`。

  - 在 `render` 函数内直接使用 `_hoisted_1` 变量就可以表示这个 `h1` 标签。
