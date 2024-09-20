# defineEmits 宏函数编译后是 vue2 的选项式 API

<article-info/>

## 前言

我们每天都在使用 `defineEmits` 宏函数，但是你知道 `defineEmits` 宏函数经过编译后其实就是 `vue2` 的 `选项式 API` 吗？通过回答下面两个问题，我将逐步为你揭秘 `defineEmits` 宏函数的神秘面纱。为什么 `Vue` 的 `defineEmits` 宏函数不需要 `import` 导入就可用？为什么 `defineEmits` 的返回值等同于 `$emit` 方法用于在组件中抛出事件？

## 举两个例子

要回答上面提的几个问题我们先来看两个例子是如何声明事件和抛出事件，分别是 `vue2` 的选项式语法和 `vue3` 的组合式语法。

我们先来看 `vue2` 的选项式语法的例子，`options-child.vue` 文件代码如下：

::: code-group

```vue
<template>
  <button @click="handleClick">放大文字</button>
</template>

<script>
export default {
  name: "options-child",
  emits: ["enlarge-text"],
  methods: {
    handleClick() {
      this.$emit("enlarge-text");
    }
  }
};
</script>
```

:::

使用 `emits` 选项声明了要抛出的事件 `"enlarge-text"`，然后在点击按钮后调用 `this.$emit` 方法抛出 `"enlarge-text"` 事件。这里的 `this` 大家都知道是指向的当前组件的` vue实例`，所以 `this.$emit` 是调用的当前 `vue` 实例的 `$emit` 方法。

::: tip
大家先记住 `vue2` 的选项式语法例子，后面我们讲 `defineEmits` 宏函数编译原理时会用。
:::

我们再来看看 vue3 的组合式语法的例子，`composition-child.vue` 代码如下：

::: code-group

```vue
<template>
  <button @click="handleClick">放大文字</button>
</template>

<script setup lang="ts">
const emits = defineEmits(["enlarge-text"]);
function handleClick() {
  emits("enlarge-text");
}
</script>
```

:::

在这个例子中我们使用了 `defineEmits` 宏函数声明了要抛出的事件`"enlarge-text"`，`defineEmits` 宏函数执行后返回了一个 emits 函数，然后在点击按钮后使用 `emits("enlarge-text")` 抛出 `"enlarge-text"` 事件。

## 通过 `debug` 搞清楚上面几个问题

首先我们要搞清楚应该在哪里打断点，在我之前的文章 [vue 文件是如何编译为 js 文件](./use-debug-to-figure-out-how-a.vue-file-becomes-a.js-file.md) 中已经带你搞清楚了将 `vue` 文件中的 `<script>` 模块编译成浏览器可直接运行的 `js` 代码，底层就是调用 `vue/compiler-sfc` 包的 `compileScript` 函数。

所以我们将断点打在 `vue/compiler-sfc` 包的 `compileScript` 函数中，一样的套路，首先我们在 `vscode` 的打开一个 `debug` 终端。

![/4143bd1e-431c-6327-2847-8b47ce8e6f62.png](/4143bd1e-431c-6327-2847-8b47ce8e6f62.png)

然后在 `node_modules` 中找到 `vue/compiler-sfc` 包的 `compileScript` 函数打上断点，`compileScript` 函数位置在 `/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js`。在 `debug` 终端上面执行 `yarn dev` 后在浏览器中打开对应的页面，比如：`http://localhost:5173/` 。此时断点就会走到 `compileScript` 函数中，由于每编译一个 `vue` 文件都要走到这个 debug 中，现在我们只想 `debug` 看看 `composition-child.vue` 文件，也就是我们前面举的 `vue3` 的组合式语法的例子。所以为了方便我们在 `compileScript` 中加了下面这样一段代码，并且去掉了在 `compileScript` 函数中加的断点，这样就只有编译 `composition-child.vue` 文件时会走进断点。加的这段代码中的 `sfc.fileName` 就是文件路径的意思，后面我们会讲。

![/82c4d02c-565e-9b43-1b35-587b80484e6b.png](/82c4d02c-565e-9b43-1b35-587b80484e6b.png)

## `compileScript` 函数

我们再来回忆一下 `composition-child.vue` 文件中的 `script` 模块代码如下：

::: code-group

```vue
<script setup lang="ts">
const emits = defineEmits(["enlarge-text"]);

function handleClick() {
  emits("enlarge-text");
}
</script>
```

:::

`compileScript` 函数内包含了编译 `script` 模块的所有的逻辑，代码很复杂，光是源代码就接近 1000 行。这篇文章我们同样不会去通读 `compileScript` 函数的所有功能，只讲涉及到 `defineEmits` 流程的代码。这个是根据我们这个场景将 `compileScript` 函数简化后的代码：

::: code-group

```js
function compileScript(sfc, options) {
  const ctx = new ScriptCompileContext(sfc, options);
  const startOffset = ctx.startOffset;
  const endOffset = ctx.endOffset;
  const scriptSetupAst = ctx.scriptSetupAst;

  for (const node of scriptSetupAst.body) {
    if (node.type === "ExpressionStatement") {
      // ...
    }

    if (node.type === "VariableDeclaration" && !node.declare) {
      const total = node.declarations.length;
      for (let i = 0; i < total; i++) {
        const decl = node.declarations[i];
        const init = decl.init;
        if (init) {
          const isDefineEmits = processDefineEmits(ctx, init, decl.id);
          if (isDefineEmits) {
            ctx.s.overwrite(
              startOffset + init.start,
              startOffset + init.end,
              "__emit"
            );
          }
        }
      }
    }

    if (
      (node.type === "VariableDeclaration" && !node.declare) ||
      node.type.endsWith("Statement")
    ) {
      // ....
    }
  }

  ctx.s.remove(0, startOffset);
  ctx.s.remove(endOffset, source.length);

  let runtimeOptions = ``;
  const emitsDecl = genRuntimeEmits(ctx);
  if (emitsDecl) runtimeOptions += `\n  emits: ${emitsDecl},`;

  const def =
    (defaultExport ? `\n  ...${normalScriptDefaultVar},` : ``) +
    (definedOptions ? `\n  ...${definedOptions},` : "");
  ctx.s.prependLeft(
    startOffset,
    `\n${genDefaultAs} /*#__PURE__*/${ctx.helper(
      `defineComponent`
    )}({${def}${runtimeOptions}\n  ${
      hasAwait ? `async ` : ``
    }setup(${args}) {\n${exposeCall}`
  );
  ctx.s.appendRight(endOffset, `})`);

  return {
    //....
    content: ctx.s.toString()
  };
}
```

:::

如果看过我上一篇 [为什么 defineProps 宏函数不需要从 vue 中 import 导入？](./why-defineprops-macro-function-does-not-need-to-be-imported-from-vue.md) 文章的小伙伴应该会很熟悉这个 `compileScript` 函数，`compileScript` 函数内处理 `defineProps` 和 `defineEmits` 大体流程其实很相似的。

### `ScriptCompileContext` 类

我们将断点走到 `compileScript` 函数中的第一部分代码。

::: code-group

```js
function compileScript(sfc, options) {
  const ctx = new ScriptCompileContext(sfc, options);
  const startOffset = ctx.startOffset;
  const endOffset = ctx.endOffset;
  const scriptSetupAst = ctx.scriptSetupAst;
  // ...省略
  return {
    //....
    content: ctx.s.toString()
  };
}
```

:::

这部分代码主要使用 `ScriptCompileContext` 类 `new` 了一个 `ctx` 上下文对象，并且读取了上下文对象中的 `startOffset`、`endOffset`、`scriptSetupAst`、`s` 四个属性。我们将断点走进 `ScriptCompileContext` 类，看看他的 `constructor` 构造函数。下面这个是我简化后的 `ScriptCompileContext` 类的代码：

::: code-group

```js
import MagicString from "magic-string";

class ScriptCompileContext {
  source = this.descriptor.source;
  s = new MagicString(this.source);
  startOffset = this.descriptor.scriptSetup?.loc.start.offset;
  endOffset = this.descriptor.scriptSetup?.loc.end.offset;

  constructor(descriptor, options) {
    this.descriptor = descriptor;
    this.s = new MagicString(this.source);
    this.scriptSetupAst =
      descriptor.scriptSetup &&
      parse(descriptor.scriptSetup.content, this.startOffset);
  }
}
```

:::

在 `compileScript` 函数中 new `ScriptCompileContext` 时传入的第一个参数是 `sfc` 变量，然后在 `ScriptCompileContext` 类的构造函数中是使用 `descriptor` 变量来接收，接着赋值给 `descriptor` 属性。

在之前的 [vue 文件是如何编译为 js 文件](./use-debug-to-figure-out-how-a.vue-file-becomes-a.js-file.md) 文章中我们已经讲过了传入给 `compileScript` 函数的 `sfc` 变量是一个 `descriptor` 对象，`descriptor` 对象是由 `vue` 文件编译来的。`descriptor` 对象拥有 `template 属性`、`scriptSetup 属性`、`style 属性`、`source 属性`，分别对应 vue 文件的 `<template>模块`、`<script setup>模块`、`<style>模块`、源代码 `code` 字符串。在我们这个场景只关注 `scriptSetup` 和 `source` 属性就行了，其中 `sfc.scriptSetup.content` 的值就是 `<script setup>模块` 中 `code` 代码字符串。详情查看下图：

![/6d53cb27-9f4e-7c18-3aef-80e8983c4def.png](/6d53cb27-9f4e-7c18-3aef-80e8983c4def.png)

现在我想你已经搞清楚了 `ctx` 上下文对象 4 个属性中的 `startOffset` 属性和 `endOffset` 属性了，`startOffset` 和 `endOffset` 分别对应的就是 `descriptor.scriptSetup?.loc.start.offset` 和 `descriptor.scriptSetup?.loc.end.offset`。`startOffset` 为 `<script setup>模块` 中的内容开始的位置。`endOffset` 为 `<script setup>模块` 中的内容结束的位置。

我们接着来看构造函数中的 `this.s = new MagicString(this.source)` 这段话，`this.source` 是 `vue` 文件中的 `源代码 code` 字符串，以这个字符串 `new` 了一个 `MagicString` 对象赋值给 `s` 属性。

现在你应该已经明白了 `ctx` 上下文对象中的 `s` 属性了，我们接着来看最后一个属性 `scriptSetupAst`。在构造函数中是由 `parse` 函数的返回值赋值的： `this.scriptSetupAst = descriptor.scriptSetup && parse(descriptor.scriptSetup.content, this.startOffset)`。`parse` 函数的代码如下：

::: code-group

```js
import { parse as babelParse } from '@babel/parser'

function parse(input: string, offset: number): Program {
  try {
    return babelParse(input, {
      plugins,
      sourceType: 'module',
    }).program
  } catch (e: any) {
  }
}
```

:::

我们在前面已经讲过了 `descriptor.scriptSetup.content` 的值就是 `vue` 文件中的 `<script setup>模块` 的代码 `code` 字符串，`parse` 函数中调用了 `babel` 提供的 `parser` 函数，将 `vue` 文件中的 `<script setup>模块` 的代码 `code` 字符串转换成 `AST 抽象语法树`。

在 `ScriptCompileContext` 构造函数中主要做了下面这些事情：

![/89c828fe-c852-2ecd-91ae-be3b2fa6077c.png](/89c828fe-c852-2ecd-91ae-be3b2fa6077c.png)

### `processDefineEmits` 函数

我们接着将断点走到 `compileScript` 函数中的第二部分，`for` 循环遍历 `AST 抽象语法树` 的地方，代码如下：

::: code-group

```js
function compileScript(sfc, options) {
  // ...省略
  for (const node of scriptSetupAst.body) {
    if (node.type === "ExpressionStatement") {
      // ...
    }

    if (node.type === "VariableDeclaration" && !node.declare) {
      const total = node.declarations.length;
      for (let i = 0; i < total; i++) {
        const decl = node.declarations[i];
        const init = decl.init;
        if (init) {
          const isDefineEmits = processDefineEmits(ctx, init, decl.id);
          if (isDefineEmits) {
            ctx.s.overwrite(
              startOffset + init.start,
              startOffset + init.end,
              "__emit"
            );
          }
        }
      }
    }

    if (
      (node.type === "VariableDeclaration" && !node.declare) ||
      node.type.endsWith("Statement")
    ) {
      // ....
    }
  }
  // ...省略
}
```

:::

看过我上一篇 [为什么 defineProps 宏函数不需要从 vue 中 import 导入？](./why-defineprops-macro-function-does-not-need-to-be-imported-from-vue.md) 可能会疑惑了，为什么这里不列出满足 `node.type === "ExpressionStatement"` 条件的代码呢。原因是在上一篇文章中我们没有将 `defineProps` 函数的返回值赋值给一个变量，他是一条表达式语句，所以满足 `node.type === "ExpressionStatement"` 的条件。在这篇文章中我们将 `defineEmits` 函数的返回值赋值给一个 `emits` 变量，他是一条变量声明语句，所以他满足 `node.type === "VariableDeclaration"` 的条件。

::: code-group

```js
// 表达式语句
defineProps({
  content: String
});

// 变量声明语句
const emits = defineEmits(["enlarge-text"]);
```

:::

将断点走进 `for` 循环里面，我们知道在 `script` 模块中第一行代码是变量声明语句 `const emits = defineEmits(["enlarge-text"]);`。在 `console` 中看看由这条变量声明语句编译成的 `node` 节点长什么样子，如下图：

![/97e17b56-7c7f-a7da-cf6b-ada783b9f1a8.png](/97e17b56-7c7f-a7da-cf6b-ada783b9f1a8.png)

从上图中我们可以看到当前的 `node` 节点类型为变量声明语句，并且 `node.declare` 的值为 `undefined`。我们再来看看 `node.declarations` 字段，他表示该节点的所有声明子节点。这句话是什么意思呢？说人话就是表示 `const` 右边的语句。那为什么 `declarations` 是一个数组呢？那是因为 `const` 右边可以有多条语句，比如 `const a = 2, b = 4;`。在我们这个场景 `node.declarations` 字段就是表示 `emits = defineEmits(["enlarge-text"]);`。接着来看 `declarations` 数组下的 `init` 字段，从名字我想你应该已经猜到了他的作用是表示变量的初始化值，在我们这个场景 `init` 字段就是表示 `defineEmits(["enlarge-text"])`。而 `init.start` 表示 `defineEmits(["enlarge-text"]);` 中的开始位置，也就是字符串 `'d'` 的位置，`init.end` 表示 `defineEmits(["enlarge-text"]);` 中的结束位置，也就是字符串 `';'` 的位置。

现在我们将断点走到 `if` 语句内，下面的这些代码我想你应该能够很轻松的理解了：

::: code-group

```js
if (node.type === "VariableDeclaration" && !node.declare) {
  const total = node.declarations.length;
  for (let i = 0; i < total; i++) {
    const decl = node.declarations[i];
    const init = decl.init;
    if (init) {
      const isDefineEmits = processDefineEmits(ctx, init, decl.id);
      // 省略...
    }
  }
}
```

:::

我们在控制台中已经看到了 `node.declare` 的值是 `undefined`，并且这也是一条变量声明语句，所以断点会走到 `if` 里面。由于我们这里只声明了一个变量，所以 `node.declarations` 数组中只有一个值，这个值就是对应的 `emits = defineEmits(["enlarge-text"]);`。接着遍历 `node.declarations` 数组，将数组中的 item 赋值给 `decl` 变量，然后使用 `decl.init` 读取到变量声明语句中的初始化值，在我们这里初始化值就是 `defineEmits(["enlarge-text"]);`。如果有初始化值，那就将他传入给 `processDefineEmits` 函数判断是否在调用 `defineEmits` 函数。我们来看看 `processDefineEmits` 函数是什么样的：

::: code-group

```js
const DEFINE_EMITS = "defineEmits";
function processDefineEmits(ctx, node, declId) {
  if (!isCallOf(node, DEFINE_EMITS)) {
    return false;
  }
  ctx.emitsRuntimeDecl = node.arguments[0];
  return true;
}
```

:::

在 `processDefineEmits` 函数中，我们首先使用 `isCallOf` 函数判断当前的 `AST 语法树` 节点 `node` 是否在调用 `defineEmits` 函数。`isCallOf` 函数的第一个参数是 node 节点，第二个参数在这里是写死的字符串 `"defineEmits"`。`isCallOf` 的代码如下：

::: code-group

```js
export function isCallOf(node, test) {
  return !!(
    node &&
    test &&
    node.type === "CallExpression" &&
    node.callee.type === "Identifier" &&
    (typeof test === "string"
      ? node.callee.name === test
      : test(node.callee.name))
  );
}
```

:::

我们在 debug console 中将 `node.type`、`node.callee.type`、`node.callee.name` 的值打印出来看看。

![/77dc5858-cc9d-e92e-0562-a590fc545a75.png](/77dc5858-cc9d-e92e-0562-a590fc545a75.png)

从图上看到 `node.type`、`node.callee.type`、`node.callee.name` 的值后，我们知道了当前节点确实是在调用 `defineEmits` 函数。所以 `isCallOf(node, DEFINE_EMITS)` 的执行结果为 `true`，在 `processDefineEmits` 函数中我们是对 `isCallOf` 函数的执行结果取反，所以 `!isCallOf(node, DEFINE_EMITS)` 的执行结果为 `false`。

我们接着来看 `processDefineEmits` 函数：

::: code-group

```js
const DEFINE_EMITS = "defineEmits";
function processDefineEmits(ctx, node, declId) {
  if (!isCallOf(node, DEFINE_EMITS)) {
    return false;
  }
  ctx.emitsRuntimeDecl = node.arguments[0];
  return true;
}
```

:::

如果是在执行 `defineEmits` 函数，就会执行接下来的代码 `ctx.emitsRuntimeDecl = node.arguments[0];`。将传入的 `node` 节点第一个参数赋值给 `ctx` 上下文对象的 `emitsRuntimeDecl` 属性，这里的第一个参数其实就是调用 `defineEmits` 函数时给传入的第一个参数。为什么写死成取 `arguments[0]` 呢？是因为 `defineEmits` 函数只接收一个参数，传入的参数可以是一个对象或者数组。比如：

::: code-group

```js
const props = defineEmits({
  "enlarge-text": null
});

const emits = defineEmits(["enlarge-text"]);
```

:::

::: tip
记住这个在 `ctx` 上下文上面塞的 `emitsRuntimeDecl` 属性，后面会用到。
:::

至此我们已经了解到了 `processDefineEmits` 中主要做了两件事：判断当前执行的表达式语句是否是 `defineEmits` 函数，如果是那么就将调用 `defineEmits` 函数时传入的参数转换成的 `node` 节点塞到 `ctx` 上下文的 `emitsRuntimeDecl` 属性中。

我们接着来看 `compileScript` 函数中的代码：

::: code-group

```js
if (node.type === "VariableDeclaration" && !node.declare) {
  const total = node.declarations.length;
  for (let i = 0; i < total; i++) {
    const decl = node.declarations[i];
    const init = decl.init;
    if (init) {
      const isDefineEmits = processDefineEmits(ctx, init, decl.id);
      if (isDefineEmits) {
        ctx.s.overwrite(
          startOffset + init.start,
          startOffset + init.end,
          "__emit"
        );
      }
    }
  }
}
```

:::

将 `processDefineEmits` 函数的执行结果赋值赋值给 `isDefineEmits` 变量，在我们这个场景当然是在调用 `defineEmits` 函数，所以会执行 `if` 语句内的 `ctx.s.overwrite` 方法。`ctx.s.overwrite` 方法我们前面已经讲过了，作用是使用指定的内容替换开始位置到结束位置的内容。在执行 `ctx.s.overwrite` 前我们先在 debug console 中执行 `ctx.s.toString()` 看看当前的 `code` 代码字符串是什么样的。

![/51e61896-8f7d-4eb5-e308-cacbfc06c2a6.png](/51e61896-8f7d-4eb5-e308-cacbfc06c2a6.png)

从上图我们可以看到此时的 `code` 代码字符串还是和我们的源代码是一样的，我们接着来看 `ctx.s.overwrite` 方法接收的参数。第一个参数为 `startOffset + init.start`，`startOffset` 我们前面已经讲过了他的值为 `script` 模块的内容开始的位置。`init` 我们前面也讲过了，他表示 `emits` 变量的初始化值对应的 `node` 节点，在我们这个场景 `init` 字段就是表示 `defineEmits(["enlarge-text"])`。所以 `init.start` 为 `emits` 变量的初始化值在 `script` 模块中开始的位置。而 `ctx.s` 为操纵整个 `vue` 文件的 `code` 代码字符串，所以 `startOffset + init.start` 的值为 `emits` 变量的初始化值的起点在整个 vue 文件的 `code` 代码字符串所在位置。同理第二个参数 `startOffset + init.end` 的值为 `emits` 变量的初始化值的终点在整个 vue 文件的 `code` 代码字符串所在位置，而第三个参数是一个写死的字符串`"__emit"`。所以 `ctx.s.overwrite` 方法的作用是将 `const emits = defineEmits(["enlarge-text"]);` 替换为 `const emits = __emit;`。

关于 `startOffset`、`init.start`、 `init.end` 请看下图：

![/60bcd81a-a138-8042-2daf-d0338184590e.png](/60bcd81a-a138-8042-2daf-d0338184590e.png)

在执行 `ctx.s.overwrite` 方法后我们在 debug console 中再次执行 `ctx.s.toString()` 看看这会儿的 code 代码字符串是什么样的。

![/7319430f-103b-dd92-559e-d871be5a987e.png](/7319430f-103b-dd92-559e-d871be5a987e.png)

从上图中我们可以看到此时代码中已经没有了 `defineEmits` 函数，已经变成了一个 `__emit` 变量。

![/1a9bbd32-a9a8-9d6b-8f7c-b9d4aa08f407.png](/1a9bbd32-a9a8-9d6b-8f7c-b9d4aa08f407.png)

### `genRuntimeEmits` 函数

我们接着将断点走到 `compileScript` 函数中的第三部分，生成运行时的 “声明事件”。我们在上一步将 `defineEmits` 声明事件的代码替换为 `__emit`，那么总得有一个地方去生成 “声明事件”。没错，就是在 `genRuntimeEmits` 函数这里生成的。`compileScript` 函数中执行 `genRuntimeEmits` 函数的代码如下：

::: code-group

```js
ctx.s.remove(0, startOffset);
ctx.s.remove(endOffset, source.length);

let runtimeOptions = ``;
const emitsDecl = genRuntimeEmits(ctx);
if (emitsDecl) runtimeOptions += `\n  emits: ${emitsDecl},`;
```

:::

从上面的代码中我们看到首先执行了两次 `remove` 方法，在前面已经讲过了 `startOffset` 为 `script` 模块中的内容开始的位置。所以 `ctx.s.remove(0, startOffset);` 的意思是删除掉 `template` 模块的内容和 `<script setup>` 开始标签。这行代码执行完后我们再看看 `ctx.s.toString()` 的值：

![/0406a398-56e8-97b0-3d45-019df7255c8b.png](/0406a398-56e8-97b0-3d45-019df7255c8b.png)

从上图我们可以看到此时 `template` 模块和 `<script setup>` 开始标签已经没有了，接着执行 `ctx.s.remove(endOffset, source.length);`，这行代码的意思是删除 `</script >` 结束标签和 `<style>` 模块。这行代码执行完后我们再来看看 `ctx.s.toString()` 的值：

![/b31fbdca-6517-7848-be1f-dea6ff89a83b.png](/b31fbdca-6517-7848-be1f-dea6ff89a83b.png)

从上图我们可以看到，此时只有 `script` 模块中的内容了。

我们接着将 `compileScript` 函数中的断点走到调用 `genRuntimeEmits` 函数处，简化后代码如下：

::: code-group

```js
function genRuntimeEmits(ctx) {
  let emitsDecl = "";
  if (ctx.emitsRuntimeDecl) {
    emitsDecl = ctx.getString(ctx.emitsRuntimeDecl).trim();
  }
  return emitsDecl;
}
```

:::

看到上面的代码是不是觉得和上一篇 `defineProps` 文章中讲的 `genRuntimeProps` 函数很相似。这里的上下文 `ctx` 上面的 `emitsRuntimeDecl` 属性我们前面讲过了，他就是调用 `defineEmits` 函数时传入的参数转换成的 `node` 节点。我们将断点走进 `ctx.getString` 函数，代码如下：

::: code-group

```js
getString(node, scriptSetup = true) {
  const block = scriptSetup ? this.descriptor.scriptSetup : this.descriptor.script;
  return block.content.slice(node.start, node.end);
}
```

:::

我们前面已经讲过了 `descriptor` 对象是由 `vue` 文件编译而来，其中的 `scriptSetup` 属性就是对应的 `<script setup>` 模块。我们这里没有传入 `scriptSetup`，所以 `block` 的值为 `this.descriptor.scriptSetup`。同样我们前面也讲过 `scriptSetup.content` 的值是 `<script setup>` 模块 `code` 代码字符串。请看下图：

![/f12537c5-b12e-6274-fb28-20e0bd7e9f6f.png](/f12537c5-b12e-6274-fb28-20e0bd7e9f6f.png)

这里传入的 `node` 节点就是我们前面存在上下文中 `ctx.emitsRuntimeDecl`，也就是在调用 `defineEmits` 函数时传入的参数节点，`node.start` 就是参数节点开始的位置，`node.end` 就是参数节点的结束位置。所以使用 `content.slice` 方法就可以截取出来调用 `defineEmits` 函数时传入的参数。请看下图：

![alt text](/e1783201-1f05-ac57-b085-cb35ca15db82.png)

现在我们再回过头来看 `compileScript` 函数中的调用 `genRuntimeEmits` 函数的代码你就能很容易理解了：

::: code-group

```js
let runtimeOptions = ``;
const emitsDecl = genRuntimeEmits(ctx);
if (emitsDecl) runtimeOptions += `\n  emits: ${emitsDecl},`;
```

:::

这里的 `emitsDecl` 在我们这个场景中就是使用 `slice` 截取出来的 `emits` 定义，再使用字符串拼接 `emits:`，就得到了 `runtimeOptions` 的值。如图：

![/c2fabe0c-cefc-16c1-4484-dfdc21797bd6.png](/c2fabe0c-cefc-16c1-4484-dfdc21797bd6.png)

看到 `runtimeOptions` 的值是不是就觉得很熟悉了，又有 `name` 属性，又有 `emits` 属性，和我们前面举的两个例子中的 `vue2` 的选项式语法的例子比较相似。

![/f3b553b7-85ed-6d88-25d8-b23b1c264591.png](/f3b553b7-85ed-6d88-25d8-b23b1c264591.png)

### 拼接成完整的浏览器运行时 js 代码

我们接着将断点走到 `compileScript` 函数中的最后一部分：

::: code-group

```js
const def =
  (defaultExport ? `\n  ...${normalScriptDefaultVar},` : ``) +
  (definedOptions ? `\n  ...${definedOptions},` : "");
ctx.s.prependLeft(
  startOffset,
  `\n${genDefaultAs} /*#__PURE__*/${ctx.helper(
    `defineComponent`
  )}({${def}${runtimeOptions}\n  ${
    hasAwait ? `async ` : ``
  }setup(${args}) {\n${exposeCall}`
);
ctx.s.appendRight(endOffset, `})`);

return {
  //....
  content: ctx.s.toString()
};
```

:::

这块代码和我们讲 `defineProps` 文章中是一样的，先调用了 `ctx.s.prependLeft` 方法给字符串开始的地方插入了一串字符串，这串拼接的字符串看着很麻烦的样子，我们直接在 debug console 上面看看要拼接的字符串是什么样的：

![/347b8235-9cad-52db-39ac-2107073fe181.png](/347b8235-9cad-52db-39ac-2107073fe181.png)

看到这串你应该很熟悉，除了前面我们拼接的 `name` 和 `emits` 之外还有部分 `setup` 编译后的代码，但是这里的 `setup` 代码还不完整，剩余部分还在 `ctx.s.toString()` 里面。

将断点执行完 `ctx.s.prependLeft` 后，我们在 debug console 上面通过 `ctx.s.toString()` 看此时操作的字符串变成什么样了：

![/12b96a2c-83f3-d0cd-6edc-bf207e9ad104.png](/12b96a2c-83f3-d0cd-6edc-bf207e9ad104.png)

从上图可以看到此时的 `setup` 函数已经拼接完整了，已经是一个编译后的 `vue` 组件对象的代码字符串了，只差一个 `})` 结束符号，所以执行 `ctx.s.appendRight` 方法将结束符号插入进去。

我们最后再来看看经过 `compileScript` 函数处理后的浏览器可执行的 `js` 代码字符串，也就是 `ctx.s.toString()`

![/723cb353-f75e-ff10-9599-d7edbbe5ace5.png](/723cb353-f75e-ff10-9599-d7edbbe5ace5.png)

::: tip
从上图中我们可以看到编译后的代码中 `声明事件` 还是通过 vue 组件对象上面的 `emits` 选项声明的，和我们前面举的 vue2 的选项式语法的例子一模一样。
:::

### 为什么 `defineEmits` 的返回值等同于 `$emit` 方法用于在组件中抛出事件？

在上一节中我们知道了 `defineEmits` 函数在编译时就被替换为了 `__emit` 变量，然后将 `__emit` 赋值给我们定义的 `emits` 变量。在需要抛出事件时我们是调用的 `emits("enlarge-text");`，实际就是在调用 `__emit("enlarge-text");`。那我们现在通过 `debug` 看看这个 `__emit` 到底是什么东西？

首先我们需要在浏览器的 `source` 面板中找到由 vue 文件编译而来的 `js` 文件，然后给 `setup` 函数打上断点。在我们前面的 [Vue 3 的 setup 语法糖到底是什么东西？](./what-is-vue3-setup-syntax-sugar.md) 文章中已经手把手的教你了怎么在浏览器中找到编译后的 js 文件，所以在这篇文章中就不再赘述了。

给 `setup` 函数打上断点，刷新浏览器页面后，我们看到断点已经走进来了。如图：

![/dcf3e058-3d24-ed98-80a9-3230b1946967.png](/dcf3e058-3d24-ed98-80a9-3230b1946967.png)

从上图中我们可以看见 `defineEmits` 的返回值也就是 `__emit` 变量，实际就是 `setup` 函数的第二个参数对象中的 `emit` 属性。右边的 Call Stack 有的小伙伴可能不常用，他的作用是追踪函数的执行流。比如在这里 `setup` 函数是由 `callWithErrorHandling` 函数内调用的，在 Call Stack 中 `setup` 下面就是 `callWithErrorHandling`。而 `callWithErrorHandling` 函数是由 `setupStatefulComponent` 函数内调用的，所以在 Call Stack 中 `callWithErrorHandling` 下面就是 `setupStatefulComponent`。并且还可以通过点击函数名称跳转到对应的函数中。

为了搞清楚 `setup` 函数的第二个参数到底是什么，所以我们点击右边的 Call Stack 中的 `callWithErrorHandling` 函数，看看在 `callWithErrorHandling` 函数中是怎么调用 `setup` 函数的。代码如下：

::: code-group

```js
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
```

:::

从上面的代码中可以看到这个 `callWithErrorHandling` 函数实际就是用于错误处理的，如果有参数 `args`，那就调用 `fn` 时将参数以`...args` 的形式传入给 `fn`。在我们这里 `fn` 就是 `setup` 函数，我们现在要看传递给 `setup` 的第二个参数，就对应的这里的是 `args` 数组中的第二项。现在我们知道了调用 `callWithErrorHandling` 函数时传入的第四个参数是一个数组，数组的第二项就是调用 `setup` 函数时传入的第二个参数对象。

我们接着来看在 `setupStatefulComponent` 函数中是如何调用 `callWithErrorHandling` 函数的，简化后代码如下：

::: code-group

```js
function setupStatefulComponent(instance, isSSR) {
  const setupContext = (instance.setupContext =
    setup.length > 1 ? createSetupContext(instance) : null);
  const setupResult = callWithErrorHandling(setup, instance, 0, [
    true ? shallowReadonly(instance.props) : instance.props,
    setupContext
  ]);
}
```

:::

从上面的代码中可以看到调用 `callWithErrorHandling` 函数时传入的第四个参数确实是一个数组，数组的第二项是 `setupContext`，这个 `setupContext` 就是调用 `setup` 函数时传入的第二个参数对象。而 `setupContext` 的值是由 `createSetupContext` 函数返回的，在调用 `createSetupContext` 函数时传入了当前的 vue 实例。我们接着来看简化后的 `createSetupContext` 函数是什么样的：

::: code-group

```js
function createSetupContext(instance) {
  return Object.freeze({
    get attrs() {
      return getAttrsProxy(instance);
    },
    get slots() {
      return getSlotsProxy(instance);
    },
    get emit() {
      return (event, ...args) => instance.emit(event, ...args);
    },
    expose
  });
}
```

:::

这里出现了一个我们平时不常用的 `Object.freeze` 方法，在 mdn 上面查了一下他的作用:

::: info
`Object.freeze()` 静态方法可以使一个对象被冻结。冻结对象可以防止扩展，并使现有的属性不可写入和不可配置。被冻结的对象不能再被更改：不能添加新的属性，不能移除现有的属性，不能更改它们的可枚举性、可配置性、可写性或值，对象的原型也不能被重新指定。`freeze()` 返回与传入的对象相同的对象。
:::

从前面我们已经知道了 `createSetupContext` 函数的返回值就是调用 `setup` 函数时传入的第二个参数对象，我们要找的 `__emit` 就是第二个参数对象中的 `emit` 属性。当读取 `emit` 属性时就会走到上面的冻结对象的 `get emit()` 中，当我们调用 `emit` 函数抛出事件时实际就是调用的是 `instance.emit` 方法，也就是 `vue` 实例上面的 `emit` 方法。

现在我想你应该已经反应过来了，调用 `defineEmits` 函数的返回值实际就是在调用 vue 实例上面的 `emit` 方法，其实在运行时抛出事件的做法还是和 vue2 的选项式语法一样的，只是在编译时就将看着高大上的 `defineEmits` 函数编译成 vue2 的选项式语法的样子。

![alt text](/17270e7f-1c46-baf3-6aca-faf07bc8f2c0.png)

## 总结

现在我们能够回答前面提的两个问题了：

### <imp-text-success>为什么 Vue 的 defineEmits 宏函数不需要 import 导入就可用？</imp-text-success>

在遍历 `script` 模块转换成的` AST 抽象语法树` 时，如果当前的 `node` 节点是在调用 `defineEmits` 函数，就继续去找这个 `node` 节点下面的参数节点，也就是调用 `defineEmits` 函数传入的参数对应的 `node` 节点。然后将参数节点对象赋值给当前的 `ctx` 上下文的 `emitsRuntimeDecl` 属性中，接着根据 `defineEmits` 函数对应的 `node` 节点中记录的 `start` 和 `end` 位置对 `vue` 文件的 `code` 代码字符串进行替换。将 `defineEmits(["enlarge-text"])` 替换为 `__emit` ，此时在代码中已经就没有了 `defineEmits` 宏函数了，自然也不需要从 `vue` 中 `import` 导入。当遍历完 ` AST 抽象语法树` 后调用 `genRuntimeEmits` 函数，从前面存的 `ctx` 上下文中的 `emitsRuntimeDecl` 属性中取出来调用 `defineEmits` 函数时传入的参数节点信息。根据参数节点中记录的 `start` 和 `end` 位置，对 script 模块中的 `code` 代码字符串执行 `slice` 方法，截取出调用 `defineEmits` 函数时传入的参数。然后通过字符串拼接的方式将调用 `defineEmits` 函数时传入的参数拼接到 `vue` 组件对象的 `emits` 属性上。

### <imp-text-success>为什么 defineEmits 的返回值等同于$emit 方法用于在组件中抛出事件？</imp-text-success>

`defineEmits` 宏函数在上个问题中我们已经讲过了会被替换为 `__emit` ，而这个 `__emit` 是调用 `setup` 函数时传入的第二个参数对象上的 `emit` 属性。而第二个参数对象是在 `setupStatefulComponent` 函数中调用 `createSetupContext` 函数生成的 `setupContext` 对象。在 `createSetupContext` 函数中我们看到返回的 `emit` 属性其实就是一个箭头函数，当调用 `defineEmits` 函数返回的 `emit` 函数时就会调用这个箭头函数，在箭头函数中其实是调用 `vue` 实例上的 `emit` 方法。

搞明白了上面两个问题我想你现在应该明白了为什么说 <imp-text-success>vue3 的 defineEmits 宏函数编译后其实就是 vue2 的选项式 API</imp-text-success>，`defineEmits` 宏函数声明的事件经过编译后就变成了 `vue` 组件对象上的 `emits` 属性。`defineEmits` 函数的返回值 `emit` 函数，其实就是在调用 `vue` 实例上的 `emit` 方法，这不就是我们在 `vue2` 的 `选项式 API` 中声明事件和触发事件的样子吗。大部分看着高大上的黑魔法其实都是编译时做的事情，<imp-text-success>vue3 中的像 defineEmits 这样的宏函数经过编译后其实还是我们熟悉的 vue2 的选项式 API</imp-text-success>。
