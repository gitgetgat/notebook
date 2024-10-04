# 原来 vue3 的 setup 语法糖中组件无需组册因为这个

<article-info/>

## 前言

众所周知，在 vue2 的时候使用一个 vue 组件要么全局注册，要么局部注册。但是在 `setup` 语法糖中直接将组件 `import` 导入无需注册就可以使用，你知道这是为什么呢？注：本文中使用的 vue 版本为 <imp-text-success>3.4.19</imp-text-success>。

## 看个 demo

我们先来看个简单的 demo，代码如下：

::: code-group

```vue
<template>
  <Child />
</template>

<script lang="ts" setup>
import Child from "./child.vue";
</script>
```

:::

上面这个 demo 在 `setup` 语法糖中 `import` 导入了 `Child` 子组件，然后在 `template` 中就可以直接使用了。

我们先来看看上面的代码编译后的样子，在之前的文章中已经讲过很多次如何在浏览器中查看编译后的 vue 文件，这篇文章就不赘述了。编译后的代码如下：

::: code-group

```js
import {
  createBlock as _createBlock,
  defineComponent as _defineComponent,
  openBlock as _openBlock,
} from "/node_modules/.vite/deps/vue.js?v=23bfe016";
import Child from "/src/components/setupComponentsDemo/child.vue";

const _sfc_main = _defineComponent({
  __name: "index",
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { Child };
    return __returned__;
  },
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock($setup["Child"]);
}

_sfc_main.render = _sfc_render;
export default _sfc_main;
```

:::

从上面的代码可以看到，编译后 `setup` 语法糖已经没有了，取而代之的是一个 `setup` 函数。在 `setup` 函数中会 `return` 一个对象，对象中就包含了 `Child` 子组件。

有一点需要注意的是，我们原本是在 `setup` 语法糖中 `import` 导入的 `Child` 子组件，但是经过编译后 `import` 导入的代码已经被提升到 `setup` 函数外面去了。

在 `render` 函数中使用 `$setup["Child"]` 就可以拿到 `Child` 子组件，并且通过 `_createBlock($setup["Child"]);` 就可以将子组件渲染到页面上去。从命名上我想你应该猜到了$setup对象和上面的 `setup` 函数的 `return` 对象有关，其实这里的 `$setup["Child"]`就是 `setup`函数的`return`对象中的`Child`组件。至于在`render`函数中是怎么拿到`setup` 函数返回的对象可以看这一篇文章： [Vue 3 的 setup 语法糖到底是什么东西？](./what-is-vue3-setup-syntax-sugar.md)

接下来我将通过 debug 的方式带你了解编译时是如何将 `Child` 塞到 `setup` 函数的 `return` 对象中，以及怎么将 `import` 导入 `Child` 子组件的语句提升到 `setup` 函数外面去的。

## `compileScript` 函数

在上一篇文章 [template 可以直接使用 setup 语法糖中的变量原来是因为这个](./the-template-can-directly-use-the-variables-in-the-setup-syntax-sugar-because-of-this.md) 中我们已经详细讲过了 `setup` 语法糖是如何编译成 `setup` 函数，以及如何根据将顶层绑定生成 `setup` 函数的 `return` 对象。所以这篇文章的重点是 `setup` 语法糖如何处理里面的 `import` 导入语句。

还是一样的套路启动一个 <imp-text-danger>debug 终端</imp-text-danger>。这里以 vscode 举例，打开终端然后点击终端中的 `+` 号旁边的下拉箭头，在下拉中点击 <imp-text-danger>Javascript Debug Terminal</imp-text-danger> 就可以启动一个 <imp-text-danger>debug 终端</imp-text-danger>。

![/how-to-open-javascript-debug-terminal-in-vscode.png](/how-to-open-javascript-debug-terminal-in-vscode.png)

然后在 `node_modules` 中找到 `vue/compiler-sfc` 包的 `compileScript` 函数打上断点，`compileScript` 函数位置在 `/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js`。接下来我们来看看简化后的 `compileScript` 函数源码，代码如下：

::: code-group

```js
function compileScript(sfc, options) {
  const ctx = new ScriptCompileContext(sfc, options);
  const setupBindings = Object.create(null);
  const scriptSetupAst = ctx.scriptSetupAst;

  for (const node of scriptSetupAst.body) {
    if (node.type === "ImportDeclaration") {
      // 。。。省略
    }
  }

  for (const node of scriptSetupAst.body) {
    // 。。。省略
  }

  let returned;
  const allBindings = {
    ...setupBindings,
  };
  for (const key in ctx.userImports) {
    if (!ctx.userImports[key].isType && ctx.userImports[key].isUsedInTemplate) {
      allBindings[key] = true;
    }
  }
  returned = `{ `;
  for (const key in allBindings) {
    // ...遍历allBindings对象生成setup函数的返回对象
  }

  return {
    // ...省略
    content: ctx.s.toString(),
  };
}
```

:::

我们先来看看简化后的 `compileScript` 函数。

在 `compileScript` 函数中首先使用 `ScriptCompileContext` 类 `new` 了一个 `ctx 上下文对象`，在 `new` 的过程中将 `compileScript` 函数的入参 `sfc` 传了过去，`sfc` 中包含了 `<script setup>模块` 的位置信息以及源代码。

`ctx.scriptSetupAst` 是 `<script setup>模块` 中的 code 代码字符串对应的 <imp-text-success>AST 抽象语法树</imp-text-success> 。

接着就是遍历 <imp-text-success>AST 抽象语法树</imp-text-success> 的内容，如果发现当前节点是一个 `import` 语句，就会将该 `import` 收集起来放到 `ctx.userImports` 对象中（具体如何收集接下来会讲）。

然后会再次遍历 <imp-text-success>AST 抽象语法树</imp-text-success> 的内容，如果发现当前节点上顶层声明的 <imp-text-danger>变量</imp-text-danger>、<imp-text-danger>函数</imp-text-danger>、<imp-text-danger>类</imp-text-danger>、<imp-text-danger>枚举声明</imp-text-danger>，就将其收集到 `setupBindings` 对象中。

最后就是使用扩展运算符.`..setupBindings` 将 `setupBindings` 对象中的属性合并到 `allBindings` 对象中。

对于 `ctx.userImports` 的处理就不一样了，不会将其全部合并到 `allBindings` 对象中。而是遍历 `ctx.userImports` 对象，如果当前 `import` 导入不是 `ts` 的类型导入，并且导入的东西在 `template` 模版中使用了，才会将其合并到 `allBindings` 对象中。

经过前面的处理 `allBindings` 对象中已经收集了 `setup` 语法糖中的所有顶层绑定，然后遍历 `allBindings` 对象生成 `setup` 函数中的 `return` 对象。

我们在 <imp-text-danger>debug 终端</imp-text-danger> 来看看生成的 return 对象，如下图：

![/05a4d1b9-b041-5a5c-990f-78fc3131fb0d.png](/05a4d1b9-b041-5a5c-990f-78fc3131fb0d.png)

从上图中可以看到 `setup` 函数中已经有了一个 `return` 对象了，`return` 对象的 `Child` 属性值就是 `Child` 子组件的引用。

## 收集 `import` 导入

接下来我们来详细看看如何将 `setup` 语法糖中的全部 `import` 导入收集到 `ctx.userImports` 对象中，代码如下：

::: code-group

```js
function compileScript(sfc, options) {
  // 。。。省略
  for (const node of scriptSetupAst.body) {
    if (node.type === "ImportDeclaration") {
      hoistNode(node);
      for (let i = 0; i < node.specifiers.length; i++) {
        // 。。。省略
      }
    }
  }
  // 。。。省略
}
```

:::

遍历 `scriptSetupAst.body` 也就是 `<script setup>模块` 中的 code 代码字符串对应的 <imp-text-success>AST 抽象语法树</imp-text-success>，如果当前节点类型是 `import` 导入，就会执行 `hoistNode` 函数将当前 `import` 导入提升到 `setup` 函数外面去。

## `hoistNode` 函数

将断点走进 `hoistNode` 函数，代码如下：

::: code-group

```js
function hoistNode(node) {
  const start = node.start + startOffset;
  let end = node.end + startOffset;
  while (end <= source.length) {
    if (!/\s/.test(source.charAt(end))) {
      break;
    }
    end++;
  }
  ctx.s.move(start, end, 0);
}
```

:::

编译阶段生成新的 code 字符串是基于整个 vue 源代码去生成的，而不是仅仅基于 `<script setup>模块` 中的 js 代码去生成的。我们来看看此时的 code 代码字符串是什么样的，如下图：

![/0257b6a5-f910-7a2b-b8ac-dc3291a1c144.png](/0257b6a5-f910-7a2b-b8ac-dc3291a1c144.png)

从上图中可以看到此时的 code 代码字符串还是和初始的源代码差不多，没什么变化。

首先要找到当前 `import` 语句在整个 vue 源代码中开始位置和结束位置在哪里。`node.start` 为当前 `import` 语句在 `<script setup>模块` 中的开始位置，`startOffset` 为 `<script setup>模块` 中的内容在整个 vue 源码中的开始位置。所以 `node.start + startOffset` 就是当前 `import` 语句在整个 vue 源代码中开始位置，将其赋值给 `start` 变量。

同理 `node.end + startOffset` 就是当前 `import` 语句在整个 vue 源代码中结束位置，将其赋值给 `end` 变量。由于 `import` 语句后面可能会有空格，所以需要使用 `while` 循环将 `end` 指向 `import` 语句后面非空格前的位置，下一步 `move` 的时候将空格一起给 `move` 过去。

最后就是调用 `ctx.s.move` 方法，这个方法接收三个参数。第一个参数是要移动的字符串开始位置，第二个参数是要移动的字符串结束位置，第三个参数为将字符串移动到的位置。

所以这里的 `ctx.s.move(start, end, 0)` 就是将 `import` 语句移动到最前面的位置，执行完 `ctx.s.move` 方法后，我们在 debug 终端来看看此时的 code 代码字符串，如下图：

![/2af1be6c-b9be-15f6-48ee-04f93fb899b4.png](/2af1be6c-b9be-15f6-48ee-04f93fb899b4.png)

从上图中可以看到 `import` 语句已经被提升到了最前面去了。

## 遍历 `import` 导入说明符

我们接着来看前面省略的遍历 `node.specifiers` 的代码，如下：

::: code-group

```js
function compileScript(sfc, options) {
  // 。。。省略

  for (const node of scriptSetupAst.body) {
    if (node.type === "ImportDeclaration") {
      hoistNode(node);
      for (let i = 0; i < node.specifiers.length; i++) {
        const specifier = node.specifiers[i];
        const local = specifier.local.name;
        const imported = getImportedName(specifier);
        const source2 = node.source.value;
        registerUserImport(
          source2,
          local,
          imported,
          node.importKind === "type" ||
            (specifier.type === "ImportSpecifier" &&
              specifier.importKind === "type"),
          true,
          !options.inlineTemplate
        );
      }
    }
  }

  // 。。。省略
}
```

:::

我们先在 <imp-text-danger>debug 终端</imp-text-danger> 看看 `node.specifiers` 数组是什么样的，如下图：

![/9539952f-d527-bf9d-722e-2da1c094e87e.png](/9539952f-d527-bf9d-722e-2da1c094e87e.png)

从上图中可以看到 `node.specifiers` 数组是一个导入说明符，那么为什么他是一个数组呢？原因是 `import` 导入的时候可以一次导入 多个变量进来，比如 `import {format, parse} from "./util.js"`

`node.source.value` 是当前 `import` 导入的路径，在我们这里是 `./child.vue`。

`specifier.local.name` 是将 `import` 导入进来后赋值的变量，这里是赋值为 `Child` 变量。

`specifier.type` 是导入的类型，这里是 `ImportDefaultSpecifier`，说明是 `default` 导入。

接着调用 `getImportedName` 函数，根据导入说明符获取当前导入的 `name`。代码如下：

::: code-group

```js
function getImportedName(specifier) {
  if (specifier.type === "ImportSpecifier")
    return specifier.imported.type === "Identifier"
      ? specifier.imported.name
      : specifier.imported.value;
  else if (specifier.type === "ImportNamespaceSpecifier") return "*";
  return "default";
}
```

:::

大家都知道 `import` 导入有三种写法，分别对应的就是 `getImportedName` 函数中的三种情况。如下：

::: code-group

```js
import { format } from "./util.js"; // 命名导入
import * as foo from "module"; // 命名空间导入
import Child from "./child.vue"; // default导入的方式
```

:::

如果是命名导入，也就是 `specifier.type === "ImportSpecifier"`，就会返回导入的名称。

如果是命名空间导入，也就是 `specifier.type === "ImportNamespaceSpecifier"`，就会返回字符串 `*`。

否则就是 `default` 导入，返回字符串 `default`。

最后就是拿着这些 `import` 导入相关的信息去调用 `registerUserImport` 函数。

## `registerUserImport` 函数

将断点走进 `registerUserImport` 函数，代码如下：

::: code-group

```js
function registerUserImport(
  source2,
  local,
  imported,
  isType,
  isFromSetup,
  needTemplateUsageCheck
) {
  let isUsedInTemplate = needTemplateUsageCheck;
  if (
    needTemplateUsageCheck &&
    ctx.isTS &&
    sfc.template &&
    !sfc.template.src &&
    !sfc.template.lang
  ) {
    isUsedInTemplate = isImportUsed(local, sfc);
  }
  ctx.userImports[local] = {
    isType,
    imported,
    local,
    source: source2,
    isFromSetup,
    isUsedInTemplate,
  };
}
```

:::

`registerUserImport` 函数就是将当前 `import` 导入收集到 `ctx.userImports` 对象中的地方，我们先不看里面的那块 `if` 语句，先来在 <imp-text-danger>debug 终端</imp-text-danger> 中来看看 `ctx.userImports` 对象中收集了哪些 `import` 导入的信息。如下图：

![/70da84cd-99ae-2485-f1d0-f0e90a6df136.png](/70da84cd-99ae-2485-f1d0-f0e90a6df136.png)

从上图中可以看到收集到 `ctx.userImports` 对象中的 `key` 就是 `import` 导入进来的变量名称，在这里就是 `Child` 变量。

- <imp-text-success>imported</imp-text-success>: `'default'` 表示当前 `import` 导入是个 `default` 导入的方式。

- <imp-text-success>isFromSetup</imp-text-success>: `true` 表示当前 `import` 导入是从 `setup` 函数中导入的。

- <imp-text-success>isType</imp-text-success>: `false` 表示当前 `import` 导入不是一个 `ts` 的类型导入，后面生成 `return` 对象时判断是否要将当前 `import` 导入加到 `return` 对象中，会去读取 `ctx.userImports[key].isType` 属性，其实就是这里的 `isType`。

- <imp-text-success>local</imp-text-success>: `'Child'` 表示当前 `import` 导入进来的变量名称。

- <imp-text-success>source</imp-text-success>: `'./child.vue'` 表示当前 `import` 导入进来的路径。

- <imp-text-success>isUsedInTemplate</imp-text-success>: `true` 表示当前 `import` 导入的变量是不是在 `template` 中使用。

上面的一堆变量大部分都是在上一步 <imp-text-danger>"遍历 import 导入说明符"</imp-text-danger> 时拿到的，除了 `isUsedInTemplate` 以外。这个变量是调用 `isImportUsed` 函数返回的。

## `isImportUsed` 函数

将断点走进 isImportUsed 函数，代码如下：

::: code-group

```js
function isImportUsed(local, sfc) {
  return resolveTemplateUsedIdentifiers(sfc).has(local);
}
```

:::

这个 `local` 你应该还记得，他的值是 `Child` 变量。`resolveTemplateUsedIdentifiers(sfc)` 函数会返回一个 `set` 集合，所以 `has(local)` 就是返回的 `set` 集合中是否有 `Child` 变量，也就是 `template` 中是否有使用 `Child` 组件。

## `resolveTemplateUsedIdentifiers` 函数

接着将断点走进 `resolveTemplateUsedIdentifiers` 函数，代码如下：

::: code-group

```js
function resolveTemplateUsedIdentifiers(sfc): Set<string> {
  const { ast } = sfc.template!;
  const ids = new Set<string>();
  ast.children.forEach(walk);

  function walk(node) {
    switch (node.type) {
      case NodeTypes.ELEMENT:
        let tag = node.tag;
        if (
          !CompilerDOM.parserOptions.isNativeTag(tag) &&
          !CompilerDOM.parserOptions.isBuiltInComponent(tag)
        ) {
          ids.add(camelize(tag));
          ids.add(capitalize(camelize(tag)));
        }
        node.children.forEach(walk);
        break;
      case NodeTypes.INTERPOLATION:
      // ...省略
    }
  }
  return ids;
}
```

:::

`sfc.template.ast` 就是 vue 文件中的 `template 模块` 对应的 <imp-text-success>AST 抽象语法树</imp-text-success> 。遍历 <imp-text-success>AST 抽象语法树</imp-text-success> ，如果当前节点类型是一个 `element` 元素节点，比如 `div` 节点、又或者 `<Child />` 这种节点。

`node.tag` 就是当前节点的名称，如果是普通 `div` 节点，他的值就是 `div`。如果是 `<Child />` 节点，他的值就是 `Child`。

然后调用 `isNativeTag` 方法和 `isBuiltInComponent` 方法，如果当前节点标签既不是原生 `html` 标签，也不是 vue 内置的组件，那么就会执行两行 `ids.add` 方法，将当前自定义组件变量收集到名为 `ids` 的 `set` 集合中。

我们先来看第一个 `ids.add(camelize(tag))` 方法，`camelize` 代码如下：

::: code-group

```js
const camelizeRE = /-(\w)/g;
const camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
};
```

:::

`camelize` 函数使用正则表达式将 `kebab-case` 命名法，转换为首字母为小写的驼峰命名法。比如 `my-component` 经过 `camelize` 函数的处理后就变成了 `myComponent`。这也就是为什么以 `myComponent` 为名注册的组件，在模板中可以通过 `<myComponent>` 或 `<my-component>` 引用。

再来看第二个 `ids.add(capitalize(camelize(tag)))` 方法，经过 `camelize` 函数的处理后已经变成了首字母为小写的小驼峰命名法，然后执行 `capitalize` 函数。代码如下：

::: code-group

```js
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
```

:::

`capitalize` 函数的作用就是将首字母为小写的驼峰命名法转换成首字母为大写的驼峰命名法。这也就是为什么以 `MyComponent` 为名注册的组件，在模板中可以通过 `<myComponent>`、`<my-component>`或者是 `<myComponent>` 引用。

我们这个场景中是使用 `<Child />` 引用子组件，所以 `set` 集合中就会收集 `Child`。再回到 `isImportUsed` 函数，代码如下：

::: code-group

```js
function isImportUsed(local, sfc) {
  return resolveTemplateUsedIdentifiers(sfc).has(local);
}
```

:::

前面讲过了 `local` 变量的值是 `Child，resolveTemplateUsedIdentifiers(sfc)`返回的是包含 `Child` 的 `set` 集合，所以 `resolveTemplateUsedIdentifiers(sfc).has(local)` 的值是 `true`。也就是 `isUsedInTemplate` 变量的值是 `true`，表示当前 `import` 导入变量是在 `template` 中使用。后面生成 `return` 对象时判断是否要将当前 `import` 导入加到 `return` 对象中，会去读取 `ctx.userImports[key].isUsedInTemplate` 属性，其实就是这个 `isUsedInTemplate` 变量。

## 总结

执行 `compileScript` 函数会将 `setup` 语法糖编译成 `setup` 函数，在 `compileScript` 函数中会去遍历 `<script setup>` 对应的 <imp-text-success>AST 抽象语法树</imp-text-success> 。

如果是 <imp-text-success>顶层变量</imp-text-success>、<imp-text-success>函数</imp-text-success>、<imp-text-success>类</imp-text-success>、<imp-text-success>枚举声明</imp-text-success>，就会将其收集到 `setupBindings` 对象中。

如果是 `import` 语句，就会将其收集到 `ctx.userImports` 对象中。还会根据 `import` 导入的信息判断当前 `import` 导入是否是 `ts` 的类型导入，并且赋值给 `isType` 属性。然后再去递归遍历 `template 模块` 对应的 <imp-text-success>AST 抽象语法树</imp-text-success> ，看 `import` 导入的变量是否在 `template` 中使用，并且赋值给 `isUsedInTemplate` 属性。

遍历 `setupBindings` 对象和 `ctx.userImports` 对象中收集的所有顶层绑定，生成 `setup` 函数中的 `return` 对象。在遍历 `ctx.userImports` 对象的时候有点不同，会去判断当前 `import` 导入不是 `ts` 的类型导入并且在还在 `template` 中使用了，才会将其加到 `setup` 函数的 `return` 对象中。在我们这个场景中 `setup` 函数会返回 `{ Child }` 对象。

在 `render` 函数中使用 `$setup["Child"]` 将子组件渲染到页面上去，而这个 `$setup["Child"]` 就是在 `setup` 函数中返回的 `Child` 属性，也就是 `Child` 子组件的引用。
