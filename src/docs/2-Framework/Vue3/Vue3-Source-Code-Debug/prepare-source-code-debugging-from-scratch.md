# 从零开始准备源码调试

<article-info/>

本系列 `Vue3` 源码解读文章基于 `3.5.6` 版本 <link-tag :linkList="[{ linkType: 'git', linkText:'vuejs/core',linkUrl:'https://github.com/vuejs/core'}]" />

## 目录结构

::: code-group

```bash
git clone https://github.com/vuejs/core.git
```

:::

进入到文件夹内，我们可以看到、以下目录结构

::: code-group

```bash
.
├── .eslintrc.cjs              // eslint代码风格检查工具的配置文件
├── .prettierignore            // Pretttier格式化工具忽略文件的配置文件
├── .prettierrc                // Pretttier格式化工具配置文件
├── BACKERS.md                 // 支持者列表
├── CHANGELOG.md               // 代码版本变更日志
├── LICENSE                    // 软件许可证，vue3遵循The MIT License (MIT)协议
├── README.md                  // 本项目说明
├── SECURITY.md                // 安全相关信息说明
├── changelogs                 // 存放版本变更日志的文件夹
│   ├── CHANGELOG-3.0.md
│   ├── CHANGELOG-3.1.md
│   └── CHANGELOG-3.2.md
├── netlify.toml               // Netlify 部署工具的配置文件
├── package.json               // 项目依赖和脚本的配置文件
├── packages
│   ├── compiler-core          // 编译器核心，独立于平台
│   ├── compiler-dom           // 针对浏览器的 DOM 模板编译器
│   ├── compiler-sfc           // 单文件组件(.vue)编译器的实现
│   ├── compiler-ssr           // 服务端渲染编译器的实现
│   ├── dts-test               // TypeScript 类型声明测试
│   ├── global.d.ts            // 全局 TypeScript 类型声明文件
│   ├── reactivity             // 响应式系统的实现
│   ├── reactivity-transform   // 实验性代码，会在 3.4 中从 Vue 核心中删除
│   ├── runtime-core           // 运行时核心实例相关代码
│   ├── runtime-dom            // 针对浏览器的运行时实现
│   ├── runtime-test           // 运行时测试相关代码
│   ├── server-renderer        // 服务端渲染的实现
│   ├── sfc-playground         // 单文件组件在线调试器
│   ├── shared                 // package 之间共享的工具库
│   ├── template-explorer      // 模板代码在线编译器
│   ├── vue                    // vue编译后dist产物，不同场景的引入文件
│   └── vue-compat             // 兼容旧版 API 的代码
├── pnpm-lock.yaml             // pnpm 包管理器的依赖锁定文件
├── pnpm-workspace.yaml        // pnpm 包管理器的工作区配置文件
├── rollup.config.js           // Rollup 打包工具的配置文件
├── rollup.dts.config.js       // Rollup 打包工具用于生成 TypeScript 类型声明文件的配置文件
├── scripts                    // 存放脚本文件的文件夹
│   ├── aliases.js
│   ├── build.js
│   ├── const-enum.js
│   ├── dev.js
│   ├── pre-dev-sfc.js
│   ├── release.js
│   ├── setupVitest.ts
│   ├── size-report.ts
│   ├── usage-size.ts
│   ├── utils.js
│   └── verifyCommit.js
├── tsconfig.build.json         // 用于编译打包后的代码的 TypeScript 配置文件
├── tsconfig.json               // 项目 TypeScript 配置文件
├── vitest.config.ts            // Vitest 测试工具的基础配置文件
├── vitest.e2e.config.ts        // Vite 测试工具的端到端测试配置文件
└── vitest.unit.config.ts       // Vite 构建工具的单元测试配置文件
```

:::

## 模块依赖关系图

Vue3 源码都放在 packages 目录下。

::: code-group

```bash
├── packages
│   ├── compiler-core          // 编译器核心，独立于平台
│   ├── compiler-dom           // 针对浏览器的 DOM 模板编译器
│   ├── compiler-sfc           // 单文件组件(.vue)编译器的实现
│   ├── compiler-ssr           // 服务端渲染编译器的实现
│   ├── global.d.ts            // 全局 TypeScript 类型声明文件
│   ├── reactivity             // 响应式系统的实现
│   ├── runtime-core           // 运行时核心实例相关代码
│   ├── runtime-dom            // 针对浏览器的运行时实现
│   ├── runtime-test           // 运行时测试相关代码
│   ├── server-renderer        // 服务端渲染的实现
│   ├── shared                 // package 之间共享的工具库
│   ├── template-explorer      // 模板代码在线编译器
│   ├── vue                    // vue编译后dist产物，不同场景的引入文件
│   └── vue-compat             // 兼容旧版 API 的代码
```

:::

根据模块之间的调用关系，可以得出如下的模块关系图如下：

![/392370ae-6110-30cd-c0fc-e173fdc8e4f6.png](/392370ae-6110-30cd-c0fc-e173fdc8e4f6.png)

## 构建版本

可以通过以下命令进行构建，构建出 Vue3 所有的版本：

::: code-group

```bash
npm run build
```

:::

构建好的文件在目录: core\packages\vue\dist，生成的文件有：

::: code-group

```bash
// cjs（用于服务端渲染）
vue.cjs.js
vue.cjs.prod.js（生产版，代码进行了压缩）

// global（用于浏览器<script src="" />标签导入，导入之后会增加一个全局的Vue对象）
vue.global.js
vue.global.prod.js（生产版，代码进行了压缩，包含编译器）
vue.runtime.global.js
vue.runtime.global.prod.js（生产版，代码进行了压缩）

// browser（用于支持ES 6 Modules浏览器<script type="module" src=""/>标签导入）
vue.esm-browser.js
vue.esm-browser.prod.js（生产版，代码进行了压缩，包含编译器）
vue.runtime.esm-browser.js
vue.runtime.esm-browser.prod.js（生产版，代码进行了压缩）

// bundler（这两个版本没有打包所有的代码，只会打包使用的代码，需要配合打包工具来使用，会
让Vue体积更小）
vue.esm-bundler.js
vue.runtime.esm-bundler.js
```

:::

![/88ea2cf7-5be2-2264-2707-33afdc86d9a9.png](/88ea2cf7-5be2-2264-2707-33afdc86d9a9.png)

先介绍一下这个表中一些词的意思

- <imp-text-danger>完整版</imp-text-danger>：包括编译器和运行时版本
- <imp-text-danger>编译器（只集成在完整版中）</imp-text-danger>：用来将模板字符串编译成渲染函数
- <imp-text-danger>运行时版本</imp-text-danger>：由于不包括编译器，如果导入的 vue 是运行时版本，则要求在构建期间就要编译好
- <imp-text-danger>cjs</imp-text-danger>：CommonJs，有常用在 nodejs 服务端的一种模块导入标准，
- <imp-text-danger>esm</imp-text-danger>：ES6 模块化标准
- <imp-text-danger>esm-browser</imp-text-danger>：用于浏览器通过原生 ES 模块导入使用 (在浏览器中通过 `<script type="module">`)
- <imp-text-danger>esm-bundler</imp-text-danger>：用于构建工具（webpack，rollup 等）使用原生 ES 模块导入
- <imp-text-danger>global</imp-text-danger>：全局变量版本

官方文档上对于这部分解释在 [这里](https://cn.vuejs.org/guide/quick-start#using-vue-from-cdn)，它上对于不同版本的使用是这样分的

- 通过 `CDN` 导入，使用 `vue(.runtime).global(.prod).js` 版本
- 通过 `ES6` 模块导入使用 `vue(.runtime).esm-browser(.prod).js` 版本
- 通过构建工具进行模块化开发使用 `vue(.runtime).esm-bundler.js` 版本
- 用于 `Node.js` 的服务器端渲染使用 `vue.cjs(.prod).js` 版本

### 开启 `sourceMap`

为了研究源码，可以开启 `sourceMap`，这样在浏览器中调试的时候，可以查看到源码，但是会增加代码体积

通过构建时输入的指令和 `package.json` 中的配置，可以知道，在构建时，会调用 `build.js` 文件，在结合 `rollup` 的配置文件 `rollup.config.js`，可以通过 `ctrl + F` 搜索 `sourcemap` 相关的配置可以看到以下搜索结果：

::: code-group

```js [build.js]
// ...省略
const { values, positionals: targets } = parseArgs({
  allowPositionals: true,
  options: {
    // [!code focus:5]
    sourceMap: {
      type: "boolean",
      short: "s"
    }
    // ...省略
  }
});
// ...省略
async function build(target) {
  // ...省略
  await exec(
    "rollup",
    [
      "-c",
      "--environment",
      [
        `COMMIT:${commit}`,
        `NODE_ENV:${env}`,
        `TARGET:${target}`,
        formats ? `FORMATS:${formats}` : ``,
        prodOnly ? `PROD_ONLY:true` : ``,
        sourceMap ? `SOURCE_MAP:true` : `` // [!code focus]
      ]
        .filter(Boolean)
        .join(",")
    ],
    { stdio: "inherit" }
  );
}
// ...省略
```

```js [rollup.config.js]
// ...省略
function createConfig(format, output, plugins = []) {
  // ...省略
  return {
    // ...省略
    plugins: [
      // ...省略
      esbuild({
        // ...省略
        sourceMap: output.sourcemap // [!code focus]
        //...省略
      })
      //...省略
    ]
    //...省略
  };
}
// ...省略
```

:::

可以看到 `build.js` 中通过读取命令行输入的指令来获取传递的参数从而控制是否开启 `sourceMap`，然后在 `rollup.config.js` 中通过配置 `esbuild` 的 `sourceMap` 参数来控制是否开启 `sourceMap`

所以我们需要命令行里增加相应参数：`sourceMap` 或者 `s`

::: warning 这里有个注意的点，我们是直接在命令行输入时增加吗？
比如 `npm run build --sourceMap`，你会发现这样是没用的，为什么我们可以在 package.json 中看到运行 `npm run build` 实际运行的是 `node scripts/build.js` 所以我们实际上应该修改的是这里，所以修改 package.json 里的指令，改为 `node scripts/build.js -s` 或 `node scripts/build.js --sourceMap`
:::

## 不同构件文件的不同引用方式

### CDN 方式引入

`cdn` 引入你可以理解为从网络上加载 js 文件加载完成后就执行这个文件中的代码，引入的写法是 `<script src="文件地址"></script>`

::: code-group

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@3.0.0-rc.1/dist/vue.global.js"></script>
    <!-- <script src="./dist/vue.global.js"></script> -->
  </head>
  <body>
    <div id="app"></div>
    <script>
      const App = {
        data() {
          return {
            message: "Hello Vue!"
          };
        },
        template: "<h1>{{message}}</h1>"
      };
      Vue.createApp(App).mount("#app");
    </script>
    //或者是如下写法
    <!-- <script type="text/x-template" id="Message">
      <h1 style="color:red;">{{message}}</h1>
    </script>
    <script>
      const App = {
        data() {
          return {
            message: "Hello Vue!",
          };
        },
        template: "#Message",
      };
      Vue.createApp(App).mount("#app");
    </script> -->
  </body>
</html>
```

:::

完成代码后我们用浏览器打开这个 `html` 文件，屏幕上显示是了 `Hello Vue!`。我们来看一下这个构建版本的代码，在 `VS Code` 中打开 `dist/vue.global.js` 文件

::: code-group

```js
var Vue = (function (exports) {
  "use strict";
  // 许多的代码......
  return exports;
})({});
```

:::

我们可以看到这是一个 `IIFE(立即执行函数)`，当浏览器加载完这个文件后便立即执行其中的代码，我们可以看到它定义了一个全局变量，值是一个通过 `IIFE` 导出的一个对象。因此我们能在其他的 `script` 代码中直接访问 `Vue` 这个变量。

### 完整版和运行时版本的区别

如果我们将上面 `cdn-index.html` 中 `vue` 引入的地址改变一下，把 `vue.global.js` 改成 `vue.runtime.global.js`，会发生什么?

::: code-group

```html
<script src="https://cdn.jsdelivr.net/npm/vue@3.0.0-rc.1/dist/vue.runtime.global.js"></script>
```

:::

刷新浏览器，`Hello Vue!` 没了，控制台打印了一行错误，`Component provided template option but runtime compilation is not supported in this build of Vue. Use “vue.global.js” instead（组件提供了模板选项，但是此 Vue 构建不支持运行时编译。请改用“ vue.global.js”）`

这是因为我们在 `App` 对象中提供了 `template` 属性，这就是需要 当我们 `Vue.createApp(App)` 时，需要 `Vue` 把我们的字符串模板编译成 `vue` 认识的渲染函数。但是 `vue.runtime.global.js` 版本的没有包含编译器，所以报错了。

我们也可以直接编写渲染函数，把下面的代码替换掉之前的代码

::: code-group

```html
<script>
  const App = {
    data() {
      return {
        message: "Hello Vue!"
      };
    },
    render() {
      return Vue.h("h1", {}, this.message);
    }
  };
  Vue.createApp(App).mount("#app");
</script>
```

:::

保存后刷新页面，`Hello Vue!` 又显示了。其他仅运行时的版本也是如此。

### 在浏览器中通过原生 ES 模块导入使用

::: code-group

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.0.0/dist/vue.esm-browser.js";
      const App = {
        data() {
          return {
            message: "Hello Vue!"
          };
        },
        template: "<h1>{{message}}</h1>"
      };
      Vue.createApp(App).mount("#app");
    </script>
  </body>
</html>
```

:::

::: warning 浏览器使用 es6 的模块需要有几点注意的地方

- 需要在 `script` 标签显式的声明 `type=”module”`
- 通过 `import` 导入模块时，路径不支持“裸”路径，也就是 `from "dist/vue.esm-browser.js"`，必须显式的生命当前路径 `from “./dist/vue.esm-browser.js”`,可以使用绝对路径。
- `type=”module”` 中 文件的加载默认是 `defer` 方式，`defer` 和 `async` 的区别
- 还有一点值得注意的，如果我们引入路径是这样写的 `import * as Vue from "./dist/vue.esm-browser.js"` 那么直接在浏览器打开文件是不行的，因为对于 `type=”module”` 中导入模块必须使用 `http/https` 等协议，我们直接在浏览器打开这个文件，并用相对路径请求文件是 `file` 协议，会有跨域报错。常规的脚本引入不受此限制。

  因此要是要通过相对路径导入的话需要在本地启动一个服务器，这里 `VS Code` 的话推荐使用 `Live Server` 插件，安装后右键点击 `esm-browser-index.html` 文件，选择 `open width live server`。

:::

我们来看一下 `esm-browser` 版本的实现，打开 `dist/vue.esm-browser.js`，我们可以看到在前面代码中定义了非常多的函数和对象，最后一行通过 `export {****}` 一次性导出所有变量，这正是 `ES6` 的模块化的使用方式。然后我们通过 `import` 的方式导入模块。

## 通过构建工具使用 Vue

通过构建工具使用的 `Vue` 版本是 `vue(.runtime).esm-bundler.js`。通过名字我们可以看出模块规范是 `es6` 标准。我们对比完整版和运行时版本可以发现，完整版比运行时版本多引入了一个 `@vue/compiler-dom` 包，并新增了一个函数 `compileToFunction` 通过 `@vue/compiler-dom` 中的 `compile` 将其编译成 `render` 函数。这也就是完整版多的功能，支持在运行时编译模板。

代码很短，只有几十行，`Vue` 的核心代码被重新分到了 `@vue/runtime-dom`，`@vue/compiler-dom`，`@vue/reactivity` 等等，而这些包只有通过 `npm i vue@next` 安装 `vue` 时才会被作为依赖下载到 `node_modules` 目录下。`vue(.runtime).esm-bundler.js` 这个文件的作用仅仅是间接导出这个核心功能以及做一些简单的处理。

## 在服务器端使用 Vue

服务器端使用 `vue` 是使用 `vue.cjs.js`，我们打开文件可以看到，它和构建工具使用的版本在处理上是类似的，也是分别导入了 `@vue/runtime-dom`，`@vue/compiler-dom`，`@vue/shared` 这几个包，然后间接的导出了 `Vue` 的核心功能。最重要的一个区别是服务器端渲染是没有运行时版本的。

为什么没有仅运行时的版本呢？我们捋一下，

如果我们在常规的前端项目中使用了 `vue` 文件来编写代码进行组价化开发，首先 `.vue` 文件会用到 `vue-loader` 将 `vue` 文件分割为 `template`、`script`、`style` 三个部分。其中 `template` 部分会继续通过 `@vue/compiler-sfc（单文件组件编译包）` 中的功能编译为渲染函数，最后打包生成的代码只包含渲染函数，因此在客户端运行时只需要 `@vue/runtime-dom` 中功能就可以了。如果没有用到 `vue` 文件，那么模板编译成渲染函数的功能就由 `@vue/compiler-dom` 这个包中的功能进行，实际上 `@vue/compiler-sfc` 也是引用了这个包。

## 浏览器中如何调试

我们调试一些功能，比如以下代码：

::: code-group

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="../dist/vue.global.js"></script>
  </head>

  <body>
    <div id="app"></div>
    <script>
      const { reactive, effect } = Vue;

      const obj = reactive({
        name: "张三"
      });

      effect(() => {
        document.querySelector("#app").innerHTML = obj.name;
      });

      setTimeout(() => {
        obj.name = "李四";
      }, 2000);
    </script>
  </body>
</html>
```

:::

比如这里我们调试 `reactive`、`effect`，所以我们在 `vscode` 里右键找到选项 `“Open With Live Server” (前提是安装 Live Server 插件)`。

![/bfc1f860-6acc-3234-85f8-4a5571547ff2.png](/bfc1f860-6acc-3234-85f8-4a5571547ff2.png)

然后 vscode 会开启一个本地服务器，浏览器会打开一个页面（http://127.0.0.1:5500/packages/vue/test/1-test.html），F12 打开调试工具，然后我们点击 `网络` 按钮，找到我们这个页面 `1-test.html`，右键点击第一个 `在“来源”面板中打开`，

![/e474b03b-67c3-fa05-597a-a29f8a9328db.png](/e474b03b-67c3-fa05-597a-a29f8a9328db.png)

`“源代码/来源”` 面板界面如下，左侧是 `代码目录结构` ，可以看到开启 `sourceMap` 以后，可以清晰的看到 Vue3 源代码目录结构，中间是 `文件内容区` ，可以看到我们打开的文件的源码，右侧是 `调试面板` 和运行时的堆栈消息和一些变量信息。

![/a6e8a629-d4d2-6e6d-8496-34aad25cadd5.png](/a6e8a629-d4d2-6e6d-8496-34aad25cadd5.png)

中间代码内容区，点击代码行数，可以打断点，刷新页面，代码会运行到断点处，暂停下来

![/a7f53dd8-4fc6-6cab-b973-8cfd7c2b89ba.png](/a7f53dd8-4fc6-6cab-b973-8cfd7c2b89ba.png)

右侧的调试按钮是重点调试工具

![/60be4b2b-f3e5-d151-0c7d-cd9bbc127518.png](/60be4b2b-f3e5-d151-0c7d-cd9bbc127518.png)

从左到右依次是：

- 暂停脚本执行 `F8`
- 跳过下一个函数调用 `F10`
- 进入下一个函数调用 `F11`
- 跳出当前函数 `Shift + F11`
- 单步调试 `F9`
- 停用断点 `Ctrl + F8`

至此我们已经做好准备了，下面可以开始调试源码了
