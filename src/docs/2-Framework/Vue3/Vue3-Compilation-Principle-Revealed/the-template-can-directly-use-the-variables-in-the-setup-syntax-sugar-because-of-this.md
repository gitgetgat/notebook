# template 可以直接使用 setup 语法糖中的变量原来是因为这个

<article-info/>

## 前言

我们每天写 vue3 代码的时候都会使用到 `setup 语法糖` ，那你知道为什么 `setup 语法糖` 中的顶层绑定可以在 template 中直接使用的呢？`setup 语法糖` 是如何编译成 setup 函数的呢？本文将围绕这些问题带你揭开 `setup 语法糖` 的神秘面纱。注：本文中使用的 vue 版本为 <imp-text-success>3.4.19</imp-text-success>。

## 看个 demo

看个简单的 demo，代码如下：

::: code-group

```vue
<template>
  <h1>{{ msg }}</h1>
  <h2>{{ format(msg) }}</h2>
  <h3>{{ title }}</h3>
  <Child />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Child from "./child.vue";
import { format } from "./util.js";

const msg = ref("Hello World!");

let title;

if (msg.value) {
  const innerContent = "xxx";
  console.log(innerContent);
  title = "111";
} else {
  title = "222";
}
</script>
```

:::

在上面的 demo 中定义了四个顶层绑定：`Child 子组件`、从 `util.js` 文件中导入的 `format` 方法、使用 `ref` 定义的 `msg` 只读常量、使用 `let` 定义的 `title` 变量。并且在 `template` 中直接使用了这四个顶层绑定。

由于 `innerContent` 是在 if 语句里面的变量，不是 `<script setup>` 中的顶层绑定，所以在 `template` 中是不能使用 `innerContent` 的。

但是你有没有想过为什么 `<script setup>` 中的顶层绑定就能在 `template` 中使用，而像 `innerContent` 这种非顶层绑定就不能在 `template` 中使用呢？

我们先来看看上面的代码编译后的样子，在之前的文章中已经讲过很多次如何在浏览器中查看编译后的 vue 文件，这篇文章就不赘述了。编译后的代码如下：

::: code-group

```js
import { defineComponent as _defineComponent } from "/node_modules/.vite/deps/vue.js?v=23bfe016";
import { ref } from "/node_modules/.vite/deps/vue.js?v=23bfe016";
import Child from "/src/components/setupDemo2/child.vue";
import { format } from "/src/components/setupDemo2/util.js";

const _sfc_main = _defineComponent({
  __name: "index",
  setup(__props, { expose: __expose }) {
    __expose();
    const msg = ref("Hello World!");
    let title;
    if (msg.value) {
      const innerContent = "xxx";
      console.log(innerContent);
      title = "111";
    } else {
      title = "222";
    }
    const __returned__ = {
      msg,
      get title() {
        return title;
      },
      set title(v) {
        title = v;
      },
      Child,
      get format() {
        return format;
      },
    };
    return __returned__;
  },
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  // ...省略
}
_sfc_main.render = _sfc_render;
export default _sfc_main;
```

:::

从上面的代码中可以看到编译后已经没有了 `<script setup>`，取而代之的是一个 `setup` 函数，这也就证明了为什么说 `setup` 是一个编译时语法糖。

`setup` 函数的参数有两个，第一个参数为组件的 `props`。第二个参数为 `Setup 上下文对象`，上下文对象暴露了其他一些在 `setup` 中可能会用到的值，比如：`expose` 等。

再来看看 `setup` 函数中的内容，其实和我们的源代码差不多，只是多了一个 `return`。使用 `return` 会将组件中的那四个顶层绑定暴露出去，所以在 `template` 中就可以直接使用 `<script setup>` 中的顶层绑定。

值的一提的是在 `return` 对象中 `title` 变量和 `format` 函数有点特别。`title`、`format` 这两个都是属于 <imp-text-success>访问器属性</imp-text-success>，其他两个 `msg`、`Child` 属于常见的数据属性。

`title` 是一个 <imp-text-success>访问器属性</imp-text-success>，同时拥有 `get` 和 `set`，读取 `title` 变量时会走进 `get` 中，当给 `title` 变量赋值时会走进 `set` 中。

`format` 也是一个 <imp-text-success>访问器属性</imp-text-success>，他只拥有 `get` ，调用 `format` 函数时会走进 `get` 中。由于他没有 `set`，所以不能给 `format` 函数重新赋值。其实这个也很容易理解，因为 `format` 函数是从 `util.js` 文件中 `import` 导入的，当然不能给他重新赋值。

看到这里有的小伙伴会有疑问了，不是还有一句 `import { ref } from "vue"` 也是顶层绑定，为什么里面的 `ref` 没有在 `setup` 函数中使用 `return` 暴露出去呢？还有在 `return` 对象中是如何将 `title`、`format` 识别为 <imp-text-success>访问器属性</imp-text-success>呢？

## `compileScript` 函数

在之前的 [通过 debug 搞清楚 .vue 文件怎么变成.js](./use-debug-to-figure-out-how-a.vue-file-becomes-a.js-file.md) 文件文章中已经讲过了 `vue` 的 `script` 模块中的内容是由 `@vue/compiler-sfc` 包中的 `compileScript` 函数处理的，当然你没看过那篇文章也不会影响这篇文章的阅读。

首先我们需要启动一个 <imp-text-danger>debug 终端</imp-text-danger> 。这里以 vscode 举例，打开终端然后点击终端中的 `+` 号旁边的下拉箭头，在下拉中点击 <imp-text-danger>Javascript Debug Terminal</imp-text-danger> 就可以启动一个 <imp-text-danger>debug 终端</imp-text-danger> 。

![/how-to-open-javascript-debug-terminal-in-vscode.png](/how-to-open-javascript-debug-terminal-in-vscode.png)

然后在 `node_modules` 中找到 `vue/compiler-sfc` 包的 `compileScript` 函数打上断点，`compileScript` 函数位置在 `/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js`。接下来我们先看看简化后的 `compileScript` 函数源码。

## 简化后的 `compileScript` 函数

在 <imp-text-danger>debug 终端</imp-text-danger> 上面执行 `yarn dev` 后在浏览器中打开对应的页面，比如：`http://localhost:5173/` 。此时断点就会走到 `compileScript` 函数中，在我们这个场景中简化后的 `compileScript` 函数代码如下：

::: code-group

```js [整体（全部）]
function compileScript(sfc, options) {
  // ---- 第一部分 ----
  // 根据<script setup>中的内容生成一个ctx上下文对象
  // 在ctx上下文对象中拥有一些属性和方法
  const ctx = new ScriptCompileContext(sfc, options);
  const { source, filename } = sfc;
  // 顶层声明的变量、函数组成的对象
  const setupBindings = Object.create(null);
  // script标签中的内容开始位置和结束位置
  const startOffset = ctx.startOffset;
  const endOffset = ctx.endOffset;
  // script setup中的内容编译成的AST抽象语法树
  const scriptSetupAst = ctx.scriptSetupAst;

  // ---- 第二部分 ----
  // 遍历<script setup>中的内容，处理里面的import语句、顶层变量、函数、类、枚举声明还有宏函数
  for (const node of scriptSetupAst.body) {
    if (node.type === "ImportDeclaration") {
      // ...省略
    }
  }
  for (const node of scriptSetupAst.body) {
    if (
      (node.type === "VariableDeclaration" ||
        node.type === "FunctionDeclaration" ||
        node.type === "ClassDeclaration" ||
        node.type === "TSEnumDeclaration") &&
      !node.declare
    ) {
      // 顶层声明的变量、函数、类、枚举声明组成的setupBindings对象
      // 给setupBindings对象赋值，{msg: 'setup-ref'}
      // 顶层声明的变量组成的setupBindings对象
      walkDeclaration(
        "scriptSetup",
        node,
        setupBindings,
        vueImportAliases,
        hoistStatic
      );
    }
  }

  // ---- 第三部分 ----
  // 移除template中的内容和script的开始标签
  ctx.s.remove(0, startOffset);
  // 移除style中的内容和script的结束标签
  ctx.s.remove(endOffset, source.length);

  // ---- 第四部分 ----
  // 将<script setup>中的顶层绑定的元数据存储到ctx.bindingMetadata对象中
  // 为什么要多此一举存储一个bindingMetadata对象呢？答案是setup的return的对象有时会直接返回顶层变量，有时会返回变量的get方法，有时会返回变量的get和set方法，
  // 所以才需要一个bindingMetadata对象来存储这些顶层绑定的元数据。
  for (const [key, { isType, imported, source: source2 }] of Object.entries(
    ctx.userImports
  )) {
    if (isType) continue;
    ctx.bindingMetadata[key] =
      imported === "*" ||
      (imported === "default" && source2.endsWith(".vue")) ||
      source2 === "vue"
        ? "setup-const"
        : "setup-maybe-ref";
  }
  for (const key in setupBindings) {
    ctx.bindingMetadata[key] = setupBindings[key];
  }
  // 生成setup方法的args参数;
  let args = `__props`;
  const destructureElements =
    ctx.hasDefineExposeCall || !options.inlineTemplate
      ? [`expose: __expose`]
      : [];
  if (destructureElements.length) {
    args += `, { ${destructureElements.join(", ")} }`;
  }

  // ---- 第五部分 ----
  // 根据<script setup>中的顶层绑定生成return对象中的内容
  let returned;
  const allBindings = {
    ...setupBindings,
  };
  for (const key in ctx.userImports) {
    // 不是引入ts中的类型并且import导入的变量还需要在template中使用
    if (!ctx.userImports[key].isType && ctx.userImports[key].isUsedInTemplate) {
      allBindings[key] = true;
    }
  }
  returned = `{ `;
  for (const key in allBindings) {
    if (
      allBindings[key] === true &&
      ctx.userImports[key].source !== "vue" &&
      !ctx.userImports[key].source.endsWith(".vue")
    ) {
      returned += `get ${key}() { return ${key} }, `;
    } else if (ctx.bindingMetadata[key] === "setup-let") {
      const setArg = key === "v" ? `_v` : `v`;
      returned += `get ${key}() { return ${key} }, set ${key}(${setArg}) { ${key} = ${setArg} }, `;
    } else {
      returned += `${key}, `;
    }
  }
  returned = returned.replace(/, $/, "") + ` }`;
  ctx.s.appendRight(
    endOffset,
    `
const __returned__ = ${returned}
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
return __returned__
}
`
  );

  // ---- 第六部分 ----
  // 生成setup函数
  ctx.s.prependLeft(
    startOffset,
    `
${genDefaultAs} /*#__PURE__*/${ctx.helper(
      `defineComponent`
    )}({${def}${runtimeOptions}
${hasAwait ? `async ` : ``}setup(${args}) {
${exposeCall}`
  );
  ctx.s.appendRight(endOffset, `})`);

  // ---- 第七部分 ----
  // 插入import vue语句
  if (ctx.helperImports.size > 0) {
    ctx.s.prepend(
      `import { ${[...ctx.helperImports]
        .map((h) => `${h} as _${h}`)
        .join(", ")} } from 'vue'
`
    );
  }

  return {
    // ...省略
    bindings: ctx.bindingMetadata,
    imports: ctx.userImports,
    content: ctx.s.toString(),
  };
}
```

```js [第一部分]
// ---- 第一部分 ----
// 根据<script setup>中的内容生成一个ctx上下文对象
// 在ctx上下文对象中拥有一些属性和方法
const ctx = new ScriptCompileContext(sfc, options);
const { source, filename } = sfc;
// 顶层声明的变量、函数组成的对象
const setupBindings = Object.create(null);
// script标签中的内容开始位置和结束位置
const startOffset = ctx.startOffset;
const endOffset = ctx.endOffset;
// script setup中的内容编译成的AST抽象语法树
const scriptSetupAst = ctx.scriptSetupAst;
```

```js [第二部分]
// ---- 第二部分 ----
// 遍历<script setup>中的内容，处理里面的import语句、顶层变量、函数、类、枚举声明还有宏函数
for (const node of scriptSetupAst.body) {
  if (node.type === "ImportDeclaration") {
    // ...省略
  }
}
for (const node of scriptSetupAst.body) {
  if (
    (node.type === "VariableDeclaration" ||
      node.type === "FunctionDeclaration" ||
      node.type === "ClassDeclaration" ||
      node.type === "TSEnumDeclaration") &&
    !node.declare
  ) {
    // 顶层声明的变量、函数、类、枚举声明组成的setupBindings对象
    // 给setupBindings对象赋值，{msg: 'setup-ref'}
    // 顶层声明的变量组成的setupBindings对象
    walkDeclaration(
      "scriptSetup",
      node,
      setupBindings,
      vueImportAliases,
      hoistStatic
    );
  }
}
```

```js [第三部分]
// ---- 第三部分 ----
// 移除template中的内容和script的开始标签
ctx.s.remove(0, startOffset);
// 移除style中的内容和script的结束标签
ctx.s.remove(endOffset, source.length);
```

```js [第四部分]
// ---- 第四部分 ----
// 将<script setup>中的顶层绑定的元数据存储到ctx.bindingMetadata对象中
// 为什么要多此一举存储一个bindingMetadata对象呢？答案是setup的return的对象有时会直接返回顶层变量，有时会返回变量的get方法，有时会返回变量的get和set方法，
// 所以才需要一个bindingMetadata对象来存储这些顶层绑定的元数据。
for (const [key, { isType, imported, source: source2 }] of Object.entries(
  ctx.userImports
)) {
  if (isType) continue;
  ctx.bindingMetadata[key] =
    imported === "*" ||
    (imported === "default" && source2.endsWith(".vue")) ||
    source2 === "vue"
      ? "setup-const"
      : "setup-maybe-ref";
}
for (const key in setupBindings) {
  ctx.bindingMetadata[key] = setupBindings[key];
}
// 生成setup方法的args参数;
let args = `__props`;
const destructureElements =
  ctx.hasDefineExposeCall || !options.inlineTemplate
    ? [`expose: __expose`]
    : [];
if (destructureElements.length) {
  args += `, { ${destructureElements.join(", ")} }`;
}
```

```js [第五部分]
// ---- 第五部分 ----
// 根据<script setup>中的顶层绑定生成return对象中的内容
let returned;
const allBindings = {
  ...setupBindings,
};
for (const key in ctx.userImports) {
  // 不是引入ts中的类型并且import导入的变量还需要在template中使用
  if (!ctx.userImports[key].isType && ctx.userImports[key].isUsedInTemplate) {
    allBindings[key] = true;
  }
}
returned = `{ `;
for (const key in allBindings) {
  if (
    allBindings[key] === true &&
    ctx.userImports[key].source !== "vue" &&
    !ctx.userImports[key].source.endsWith(".vue")
  ) {
    returned += `get ${key}() { return ${key} }, `;
  } else if (ctx.bindingMetadata[key] === "setup-let") {
    const setArg = key === "v" ? `_v` : `v`;
    returned += `get ${key}() { return ${key} }, set ${key}(${setArg}) { ${key} = ${setArg} }, `;
  } else {
    returned += `${key}, `;
  }
}
returned = returned.replace(/, $/, "") + ` }`;
ctx.s.appendRight(
  endOffset,
  `
const __returned__ = ${returned}
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
return __returned__
}
`
);
```

```js [第六部分]
// ---- 第六部分 ----
// 生成setup函数
ctx.s.prependLeft(
  startOffset,
  `
${genDefaultAs} /*#__PURE__*/${ctx.helper(
    `defineComponent`
  )}({${def}${runtimeOptions}
${hasAwait ? `async ` : ``}setup(${args}) {
${exposeCall}`
);
ctx.s.appendRight(endOffset, `})`);
```

```js [第七部分]
// ---- 第七部分 ----
// 插入import vue语句
if (ctx.helperImports.size > 0) {
  ctx.s.prepend(
    `import { ${[...ctx.helperImports]
      .map((h) => `${h} as _${h}`)
      .join(", ")} } from 'vue'
`
  );
}
```

:::

首先我们来看看 `compileScript` 函数的第一个参数 sfc 对象，在之前的文章 [通过 debug 搞清楚 .vue 文件怎么变成 .js 文件](./use-debug-to-figure-out-how-a.vue-file-becomes-a.js-file.md) 中我们已经讲过了 sfc 是一个 `descriptor` 对象，`descriptor` 对象是由 vue 文件编译来的。

`descriptor` 对象拥有 <imp-text-success>template 属性</imp-text-success>、<imp-text-success>scriptSetup 属性</imp-text-success>、<imp-text-success>style 属性</imp-text-success>，分别对应 vue 文件的 `<template>模块`、`<script setup>模块`、`<style>模块`。

在我们这个场景只关注 `scriptSetup` 属性，`sfc.scriptSetup.content` 的值就是 `<script setup>模块` 中 `code` 代码字符串，

`sfc.source` 的值就是 `vue` 文件中的源代码 `code` 字符串。`sfc.scriptSetup.loc.start.offset` 为 `<script setup>` 中内容开始位置，`sfc.scriptSetup.loc.end.offset` 为 `<script setup>` 中内容结束位置。详情查看下图：

![/07f379b3-7876-eaff-a786-fe8db8658a9a.png](/07f379b3-7876-eaff-a786-fe8db8658a9a.png)

我们再来看 `compileScript` 函数中的内容，在 `compileScript` 函数中包含了从 `<script setup>` 语法糖到 `setup` 函数的完整流程。乍一看可能比较难以理解，所以我将其分为七块。

- 根据 `<script setup>` 中的内容生成一个 `ctx` 上下文对象。

- 遍历 `<script setup>` 中的内容，处理里面的 <imp-text-success>import 语句</imp-text-success>、<imp-text-success>顶层变量</imp-text-success>、<imp-text-success>顶层函数</imp-text-success>、<imp-text-success>顶层类</imp-text-success>、<imp-text-success>顶层枚举声明</imp-text-success>等。

- 移除 `template` 和 `style` 中的内容，以及 `script` 的开始标签和结束标签。

- 将 `<script setup>` 中的顶层绑定的元数据存储到 `ctx.bindingMetadata` 对象中。

- 根据 `<script setup>` 中的顶层绑定生成 `return` 对象。

- 生成 `setup` 函数定义

- 插入 `import vue` 语句

在接下来的文章中我将逐个分析这七块的内容。

### 第一部分: 生成一个 `ctx` 上下文

我们来看第一块的代码，如下：

::: code-group

```js
// 根据<script setup>中的内容生成一个ctx上下文对象
// 在ctx上下文对象中拥有一些属性和方法
const ctx = new ScriptCompileContext(sfc, options);
const { source, filename } = sfc;
// 顶层声明的变量、函数组成的对象
const setupBindings = Object.create(null);
// script标签中的内容开始位置和结束位置
const startOffset = ctx.startOffset;
const endOffset = ctx.endOffset;
// script setup中的内容编译成的AST抽象语法树
const scriptSetupAst = ctx.scriptSetupAst;
```

:::

在这一块的代码中主要做了一件事，使用 `ScriptCompileContext` 构造函数 `new` 了一个 `ctx` 上下文对象。在之前的 [为什么 defineProps 宏函数不需要从 vue 中 import 导入？](./why-defineprops-macro-function-does-not-need-to-be-imported-from-vue.md)文章中我们已经讲过了 `ScriptCompileContext` 构造函数里面的具体代码，这篇文章就不赘述了。

本文只会讲用到的 `ScriptCompileContext` 类中的 `startOffset`、`endOffset`、`scriptSetupAst`、`userImports`、`helperImports`、`bindingMetadata`、`s` 等属性。

- `startOffset`、`endOffset` 属性是在 `ScriptCompileContext` 类的 `constructor` 构造函数中赋值的。其实就是 `sfc.scriptSetup.loc.start.offset` 和 `sfc.scriptSetup.loc.end.offset`，`<script setup>` 中内容开始位置和 `<script setup>` 中内容结束位置，只是将这两个字段塞到 `ctx` 上下文中。

- `scriptSetupAst` 是在 `ScriptCompileContext` 类的 `constructor` 构造函数中赋值的，他是 `<script setup> 模块`的代码转换成的 <imp-text-success>AST 抽象语法树</imp-text-success>。在 `ScriptCompileContext` 类的 `constructor` 构造函数中会调用 `@babel/parser` 包的 `parse` 函数，以 `<script setup>` 中的 `code` 代码字符串为参数生成 <imp-text-success>AST 抽象语法树</imp-text-success>。

- `userImports` 在 `new` 一个 `ctx` 上下文对象时是一个空对象，用于存储 `import` 导入的顶层绑定内容。

- `helperImports` 同样在 `new` 一个 `ctx` 上下文对象时是一个空对象，用于存储需要从 <imp-text-success>vue</imp-text-success> 中 `import` 导入的函数。

- `bindingMetadata` 同样在 `new` 一个 `ctx` 上下文对象时是一个空对象，用于存储所有的 `import` 顶层绑定和变量顶层绑定的元数据。

- <imp-text-success>s</imp-text-success> 属性是在 <code>ScriptCompileContext</code> 类的 <code>constructor</code> 构造函数中赋值的，以 <imp-text-success>vue</imp-text-success> 文件中的源代码 <code>code</code> 字符串为参数 <code>new</code> 了一个 <code>MagicString</code> 对象赋值给 <imp-text-success>s</imp-text-success> 属性。

`magic-string` 是由 `svelte` 的作者写的一个库，用于处理字符串的 JavaScript 库。感兴趣可以去这里了解：[一款高效的 JavaScript 开源字符串处理库 Magic-String](../../../6-Share/Library/magic-string-an-efficient-javascript-open-source-string-processing-library.md)

除了上面说的那几个属性，在这里定义了一个 `setupBindings` 变量。初始值是一个空对象，用于存储顶 <imp-text-success>层声明的变量</imp-text-success>、<imp-text-success>函数</imp-text-success> 等。

### 第二部分: 遍历 `<script setup> body` 中的内容

将断点走到第二部分，代码如下：

::: code-group

```js
// 遍历<script setup>中的内容，处理里面的import语句、顶层变量、函数、类、枚举声明还有宏函数
for (const node of scriptSetupAst.body) {
  if (node.type === "ImportDeclaration") {
    // ...省略
  }
}
for (const node of scriptSetupAst.body) {
  if (
    (node.type === "VariableDeclaration" ||
      node.type === "FunctionDeclaration" ||
      node.type === "ClassDeclaration" ||
      node.type === "TSEnumDeclaration") &&
    !node.declare
  ) {
    // 顶层声明的变量、函数、类、枚举声明组成的setupBindings对象
    // 给setupBindings对象赋值，{msg: 'setup-ref'}
    // 顶层声明的变量组成的setupBindings对象
    walkDeclaration(
      "scriptSetup",
      node,
      setupBindings,
      vueImportAliases,
      hoistStatic
    );
  }
}
```

:::

在这一部分的代码中使用 `for` 循环遍历了两次 `scriptSetupAst.body`，`scriptSetupAst.body` 为 `script` 中的代码对应的 <imp-text-success>AST 抽象语法树</imp-text-success> 中 `body` 的内容，如下图：

![/ac22a409-d629-f332-620c-eff0d654e36d.png](/ac22a409-d629-f332-620c-eff0d654e36d.png)

从上图中可以看到 `scriptSetupAst.body` 数组有 6 项，分别对应的是 `script` 模块中的 6 块代码。

第一个 `for` 循环中使用 `if` 判断 `node.type === "ImportDeclaration"`，也就是判断是不是 `import` 语句。如果是 `import` 语句，那么 `import` 的内容肯定是顶层绑定，需要将 `import` 导入的内容存储到 `ctx.userImports` 对象中。注：后面会专门写一篇文章来讲如何收集所有的 `import` 导入。

通过这个 `for` 循环已经将所有的 `import` 导入收集到了 `ctx.userImports` 对象中了，在 <imp-text-danger>debug 终端</imp-text-danger> 看看此时的 `ctx.userImports`，如下图：

![/bbe6e9ba-e37a-7e07-d6d4-6f9f0e360ba3.png](/bbe6e9ba-e37a-7e07-d6d4-6f9f0e360ba3.png)

从上图中可以看到在 `ctx.userImports` 中收集了三个 `import` 导入，分别是 <imp-text-success>Child 组件</imp-text-success>、<imp-text-success>format 函数</imp-text-success>、<imp-text-success>ref 函数</imp-text-success>。

在里面有几个字段需要注意，`isUsedInTemplate` 表示当前 `import` 导入的东西是不是在 `template` 中使用，如果为 `true` 那么就需要将这个 `import` 导入塞到 `return` 对象中。

`isType` 表示当前 `import` 导入的是不是 `type` 类型，因为在 `ts` 中是可以使用 `import` 导入 `type` 类型，很明显 `type` 类型也不需要塞到 `return` 对象中。

我们再来看第二个 `for` 循环，同样也是遍历 `scriptSetupAst.body`。如果当前是<imp-text-success>变量定义</imp-text-success>、<imp-text-success>函数定义</imp-text-success>、<imp-text-success>类定义</imp-text-success>、<imp-text-success>ts 枚举定义</imp-text-success>，这四种类型都属于顶层绑定（除了 `import` 导入以外就只有这四种顶层绑定了）。需要调用 `walkDeclaration` 函数将这四种顶层绑定收集到 `setupBindings` 对象中。

从前面的 `scriptSetupAst.body` 图中可以看到 `if` 模块的 `type` 为 `IfStatement`，明显不属于上面的这四种类型，所以不会执行 `walkDeclaration` 函数将里面的 `innerContent` 变量收集起来后面再塞到 `return` 对象中。<imp-text-success>这也就解释了为什么非顶层绑定不能在 `template` 中直接使用</imp-text-success>。

我们在 <imp-text-danger>debug 终端</imp-text-danger> 来看看执行完第二个 `for` 循环后 `setupBindings` 对象是什么样的，如下图：

![/5bcd19a7-4ec1-9a37-c282-d1f66cc81e77.png](/5bcd19a7-4ec1-9a37-c282-d1f66cc81e77.png)

从上图中可以看到在 `setupBindings` 对象中收集 `msg` 和 `title` 这两个顶层变量。其中的 `setup-ref` 表示当前变量是一个 `ref` 定义的变量，`setup-let` 表示当前变量是一个 `let` 定义的变量。

### 第三部分: 移除 `template 模块` 和 `style 模块`

接着将断点走到第三部分，代码如下：

::: code-group

```js
// 移除template中的内容和script的开始标签
ctx.s.remove(0, startOffset);
// 移除style中的内容和script的结束标签
ctx.s.remove(endOffset, source.length);
```

:::

这块代码很简单，`startOffset` 为 `<script setup>` 中的内容开始位置，`endOffset` 为 `<script setup>` 中的内容结束位置，`ctx.s.remove` 方法为删除字符串。

所以 `ctx.s.remove(0, startOffset)` 的作用是：移除 `template` 中的内容和 `script` 的开始标签。

`ctx.s.remove(endOffset, source.length)` 的作用是：移除 `style` 中的内容和 `script` 的结束标签。

我们在 <imp-text-danger>debug 终端</imp-text-danger> 看看执行这两个 `remove` 方法之前的 `code` 代码字符串是什么样的，如下图：

![/213b8945-8e69-68e1-064f-71c8ee7f65cb.png](/213b8945-8e69-68e1-064f-71c8ee7f65cb.png)

从上图中可以看到此时的 `code` 代码字符串和我们源代码差不多，唯一的区别就是那几个 `import` 导入已经被提取到 `script` 标签外面去了（这个是在前面第一个 `for` 循环处理 `import` 导入的时候处理的）。

将断点走到执行完这两个 `remove` 方法之后，在 <imp-text-danger>debug 终端</imp-text-danger> 看看此时的 `code` 代码字符串，如下图：

![/6ef0feb8-b9db-c7bd-bf09-9486f8de6c87.png](/6ef0feb8-b9db-c7bd-bf09-9486f8de6c87.png)

从上图中可以看到执行这两个 `remove` 方法后 <imp-text-success>template 模块</imp-text-success> 、<imp-text-success>style 模块</imp-text-success> （虽然本文 demo 中没有写 style 模块）、<imp-text-success>script 开始标签</imp-text-success> 、<imp-text-success>script 结束标签</imp-text-success> 都已经被删除了。唯一剩下的就是 <imp-text-success>script 模块</imp-text-success> 中的内容，还有之前提出去的那几个 `import` 导入。

### 第四部分: 将顶层绑定的元数据存储到 `ctx.bindingMetadata`

接着将断点走到第四部分，代码如下：

::: code-group

```js
// 将<script setup>中的顶层绑定的元数据存储到ctx.bindingMetadata对象中
// 为什么要多此一举存储一个bindingMetadata对象呢？答案是setup的return的对象有时会直接返回顶层变量，有时会返回变量的get方法，有时会返回变量的get和set方法，
// 所以才需要一个bindingMetadata对象来存储这些顶层绑定的元数据。
for (const [key, { isType, imported, source: source2 }] of Object.entries(
  ctx.userImports
)) {
  if (isType) continue;
  ctx.bindingMetadata[key] =
    imported === "*" ||
    (imported === "default" && source2.endsWith(".vue")) ||
    source2 === "vue"
      ? "setup-const"
      : "setup-maybe-ref";
}
for (const key in setupBindings) {
  ctx.bindingMetadata[key] = setupBindings[key];
}
// 生成setup方法的args参数;
let args = `__props`;
const destructureElements =
  ctx.hasDefineExposeCall || !options.inlineTemplate
    ? [`expose: __expose`]
    : [];
if (destructureElements.length) {
  args += `, { ${destructureElements.join(", ")} }`;
}
```

:::

上面的代码主要分为三块，第一块为 `for` 循环遍历前面收集到的 `ctx.userImports` 对象。这个对象里面收集的是所有的 `import` 导入，将所有 `import` 导入塞到 `ctx.bindingMetadata` 对象中。

第二块也是 `for` 循环遍历前面收集的 `setupBindings` 对象，这个对象里面收集的是顶层声明的 <imp-text-success>变量</imp-text-success>、<imp-text-success>函数</imp-text-success>、<imp-text-success>类</imp-text-success>、<imp-text-success>枚举</imp-text-success>，同样的将这些顶层绑定塞到 `ctx.bindingMetadata` 对象中。

::: warning 为什么要多此一举存储一个 `ctx.bindingMetadata` 对象呢？
答案是 `setup` 的 `return` 的对象有时会直接返回顶层变量（比如 <imp-text-primary>demo</imp-text-primary> 中的 `msg` 常量）。有时只会返回变量的访问器属性 `get`（比如 <imp-text-primary>demo</imp-text-primary> 中的 `format` 函数）。有时会返回变量的访问器属性 `get` 和 `set`（比如 <imp-text-primary>demo</imp-text-primary> 中的 `title` 变量）。所以才需要一个 `ctx.bindingMetadata` 对象来存储这些顶层绑定的元数据。
:::

将断点走到执行完这两个 `for` 循环的地方，在 <imp-text-danger>debug 终端</imp-text-danger> 来看看此时收集的 `ctx.bindingMetadata` 对象是什么样的，如下图：

![/adf55f8b-e0be-512a-95e9-d9c26db42496.png](/adf55f8b-e0be-512a-95e9-d9c26db42496.png)

最后一块代码也很简单进行字符串拼接生成 `setup` 函数的参数，第一个参数为组件的 `props`、第二个参数为 `expose` 方法组成的对象。如下图：

![/ec13ea79-22e0-9db8-d6f3-3a81610d1f70.png](/ec13ea79-22e0-9db8-d6f3-3a81610d1f70.png)

### 第五部分: 生成 `return` 对象

接着将断点走到第五部分，代码如下：

::: code-group

```js
// 根据<script setup>中的顶层绑定生成return对象中的内容
let returned;

const allBindings = {
  ...setupBindings,
};

for (const key in ctx.userImports) {
  // 不是引入ts中的类型并且import导入的变量还需要在template中使用
  if (!ctx.userImports[key].isType && ctx.userImports[key].isUsedInTemplate) {
    allBindings[key] = true;
  }
}

returned = `{ `;

for (const key in allBindings) {
  if (
    allBindings[key] === true &&
    ctx.userImports[key].source !== "vue" &&
    !ctx.userImports[key].source.endsWith(".vue")
  ) {
    returned += `get ${key}() { return ${key} }, `;
  } else if (ctx.bindingMetadata[key] === "setup-let") {
    const setArg = key === "v" ? `_v` : `v`;
    returned += `get ${key}() { return ${key} }, set ${key}(${setArg}) { ${key} = ${setArg} }, `;
  } else {
    returned += `${key}, `;
  }
}

returned = returned.replace(/, $/, "") + ` }`;

ctx.s.appendRight(
  endOffset,
  `
const __returned__ = ${returned}
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
return __returned__
}
`
);
```

:::

这部分的代码看着很多，其实逻辑也非常清晰，我也将其分为三块。

在第一块中首先使用扩展运算符 `...setupBindings` 将 `setupBindings` 对象中的属性合并到 `allBindings` 对象中，因为 `setupBindings` 对象中存的顶层声明的变量、函数、类、枚举都需要被 `return` 出去。

然后遍历 `ctx.userImports` 对象，前面讲过了 `ctx.userImports` 对象中存的是所有的 `import` 导入（包括从 vue 中 `import` 导入 `ref` 函数）。在循环里面执行了 `if` 判断 `!ctx.userImports[key].isType && ctx.userImports[key].isUsedInTemplate`，这个判断的意思是如果当前 `import` 导入的不是 `ts` 的 `type` 类型并且 `import` 导入的内容在 `template` 模版中使用了。才会去执行 `allBindings[key] = true`，执行后就会将满足条件的 `import` 导入塞到 `allBindings` 对象中。

后面生成 `setup` 函数的 `return` 对象就是通过遍历这个 `allBindings` 对象实现的。这也就解释了为什么从 vue 中 `import` 导入的 `ref` 函数也是顶层绑定，为什么他没有被 `setup` 函数返回。因为只有在 `template` 中使用的 `import` 导入顶层绑定才会被 `setup` 函数返回。

将断点走到遍历 `ctx.userImports` 对象之后，在 <imp-text-danger>debug 终端</imp-text-danger> 来看看此时的 `allBindings` 对象是什么样的，如下图：

![/68036d80-498c-24ef-bc6e-b165e7ce3cfb.png](/68036d80-498c-24ef-bc6e-b165e7ce3cfb.png)

从上图中可以看到此时的 `allBindings` 对象中存了四个需要 `return` 的顶层绑定。

接着就是执行 `for` 循环遍历 `allBindings` 对象生成 `return` 对象的字符串，这循环中有三个 `if` 判断条件。我们先来看第一个，代码如下：

::: code-group

```js
if (
  allBindings[key] === true &&
  ctx.userImports[key].source !== "vue" &&
  !ctx.userImports[key].source.endsWith(".vue")
) {
  returned += `get ${key}() { return ${key} }, `;
}
```

:::

`if` 条件判断是：如果当前 `import` 导入不是从 vue 中，并且也不是 `import` 导入一个 vue 组件。那么就给 `return` 一个只拥有 `get` 的 <imp-text-success>访问器属性</imp-text-success>，对应我们 `demo` 中的就是 `import { format } from "./util.js"` 中的 `format` 函数。

我们再来看第二个 `else if` 判断，代码如下：

::: code-group

```js
else if (ctx.bindingMetadata[key] === "setup-let") {
  const setArg = key === "v" ? `_v` : `v`;
  returned += `get ${key}() { return ${key} }, set ${key}(${setArg}) { ${key} = ${setArg} }, `;
}
```

:::

这个 `else if` 条件判断是：如果当前顶层绑定是一个 `let` 定义的变量。那么就给 `return` 一个同时拥有 `get` 和 `set` 的 <imp-text-success>访问器属性</imp-text-success>，对应我们 demo 中的就是 `let title` 变量。

最后就是 `else`，代码如下：

::: code-group

```js
else {
  returned += `${key}, `;
}
```

:::

这个 `else` 中就是普通的数据属性了，对应我们 demo 中的就是 `msg` 变量和 `Child` 组件。

将断点走到生成 `return` 对象之后，在 <imp-text-danger>debug 终端</imp-text-danger> 来看看此时生成的 `return` 对象是什么样的，如下图：

![/3b0bf930-85be-f81c-0ff6-e0bba9243eae.png](/3b0bf930-85be-f81c-0ff6-e0bba9243eae.png)

从上图中可以看到此时已经生成了 `return` 对象啦。

前面我们只生成了 `return` 对象，但是还没将其插入到要生成的 `code` 字符串中，所以需要执行 `ctx.s.appendRight` 方法在末尾插入 `return` 的代码。

将断点走到执行完 `ctx.s.appendRight` 方法后，在 <imp-text-danger>debug 终端</imp-text-danger> 来看看此时的 `code` 代码字符串是什么样的，如下图：

![/96f5fded-b2ed-d0d3-ce62-18a12b60112d.png](/96f5fded-b2ed-d0d3-ce62-18a12b60112d.png)

从上图中可以看到此时的 `code` 代码字符串中多了一块 `return` 的代码。

### 第六部分: 生成 setup 函数定义

接着将断点走到第六部分，代码如下：

::: code-group

```js
ctx.s.prependLeft(
  startOffset,
  `
${genDefaultAs} /*#__PURE__*/${ctx.helper(
    `defineComponent`
  )}({${def}${runtimeOptions}
${hasAwait ? `async ` : ``}setup(${args}) {
${exposeCall}`
);
ctx.s.appendRight(endOffset, `})`);
```

:::

这部分的代码很简单，调用 `ctx.s.prependLeft` 方法从左边插入一串代码。插入的这串代码就是简单的字符串拼接，我们在 <imp-text-danger>debug 终端</imp-text-danger> 来看看要插入的代码是什么样的，如下图：

![/50040ea8-f0d3-23d7-09a6-2cef7a3fddfc.png](/50040ea8-f0d3-23d7-09a6-2cef7a3fddfc.png)

是不是觉得上面这块需要插入的代码看着很熟悉，他就是编译后的 `_sfc_main` 对象除去 `setup` 函数内容的部分。将断点走到 `ctx.s.appendRight` 方法执行之后，再来看看此时的 `code` 代码字符串是什么样的，如下图：

![/4c43807b-b87d-42d8-0a6c-b6a4f8f412f6.png](/4c43807b-b87d-42d8-0a6c-b6a4f8f412f6.png)

从上图中可以看到此时的 `setup` 函数基本已经生成完了。

### 第七部分: 插入 import vue 语句

上一步生成的 `code` 代码字符串其实还有一个问题，在代码中使用了 `_defineComponent` 函数，但是没有从任何地方去 `import` 导入。

第七块的代码就会生成缺少的 `import` 导入，代码如下：

::: code-group

```js
// 插入import vue语句
if (ctx.helperImports.size > 0) {
  ctx.s.prepend(
    `import { ${[...ctx.helperImports]
      .map((h) => `${h} as _${h}`)
      .join(", ")} } from 'vue'
`
  );
}
```

:::

将断点走到 `ctx.s.prepend` 函数执行后，再来看看此时的 `code` 代码字符串，如下图：

![/c2fc3ed6-e3a3-247c-b5fd-ddc42aeed35f.png](/c2fc3ed6-e3a3-247c-b5fd-ddc42aeed35f.png)

从上图中可以看到已经生成了完整的 `setup` 函数啦。

## 总结

整个流程图如下：

![/1f27f82e-9c19-8453-e6a3-6f3b3f156b28.png](/1f27f82e-9c19-8453-e6a3-6f3b3f156b28.png)

- 遍历 `<script setup>` 中的代码将所有的 `import` 导入收集到 `ctx.userImports` 对象中。

- 遍历 `<script setup>` 中的代码将所有的顶层 <imp-text-success>变量</imp-text-success>、<imp-text-success>函数</imp-text-success>、<imp-text-success>类</imp-text-success>、<imp-text-success>枚举</imp-text-success> 收集到 `setupBindings` 对象中。

- 调用 `ctx.s.remove` 方法移除 `template`、`style 模块` 以及 `script 开始标签` 和 `结束标签`。

- 遍历前面收集的 `ctx.userImports` 和 `setupBindings` 对象，将所有的顶层绑定元数据存储到 `bindingMetadata` 对象中。

- 遍历前面收集的 `ctx.userImports` 和 `setupBindings` 对象，生成 `return` 对象中的内容。在这一步的时候会将没有在 `template` 中使用的 `import` 导入给过滤掉，这也就解释了为什么从 vue 中导入的 `ref` 函数不包含在 `return` 对象中。

- 调用 `ctx.s.prependLeft` 方法生成 `setup` 的函数定义。

- 调用 `ctx.s.prepend` 方法生成完整的 `setup` 函数。
