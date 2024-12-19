# 什么是 AST，它是如何构建的？

<article-info/>

## AST 的基础知识

### 什么是 AST？

抽象语法树（Abstract Syntax Tree 或者缩写为 AST），或者语法树（Syntax Tree），是源代码的抽象语法结构的树状表现形式。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。一个 AST 只包含 <imp-text-success>与分析源文本有关的信息</imp-text-success>，而 <imp-text-success>跳过</imp-text-success> 任何其他在解析文本时使用的 <imp-text-success>额外内容</imp-text-success>（例如什么分号，函数参数中的逗号之类的对程序没有意义的东西。

### AST 在编程语言中的作用

AST 运用非常的广泛，比如：

- 编辑器的错误提示、代码格式化、代码高亮、代码自动补全；
- `elint`、`pretiier` 对代码错误或风格的检查；
- `webpack` 打包；
- `TypeScript`、`JSX` 等转化为原生 `Javascript`；
- `vue` 模板编译、`react` 模板编译；

### AST 的生成过程

JavaScript 执行的第一步是读取 JavaScript 文件中的字符流，然后通过词法分析生成 token，之后再通过语法分析( Parser )生成 AST，最后生成机器码执行。
整个解析过程主要分为以下两个步骤：

- <imp-text-danger>词法分析</imp-text-danger>：将整个代码字符串分割成最小语法单元数组
- <imp-text-danger>语法分析</imp-text-danger>：在分词基础上建立分析语法单元之间的关系

::: warning 注释
JS Parser 是 JavaScript 语法解析器，它可以将 JavaScript 源码转成 AST，常见的 Parser 有 esprima、traceur、acorn、shift 等。
:::

#### 词法分析

词法分析，也称之为 <imp-text-success>扫描（scanner）</imp-text-success>，简单来说就是调用 `next()` 方法，一个一个字母的来读取字符，然后与定义好的 JavaScript 关键字符做比较，生成对应的 `Token`。`Token` 是一个不可分割的最小单元。

::: tip 例如
var 这三个字符，它只能作为一个整体，语义上不能再被分解，是最小的单元了，因此它是一个 `Token`。
:::

词法分析器里，每个关键字是一个 `Token` ，每个标识符是一个 `Token`，每个操作符是一个 `Token`，每个标点符号也都是一个 `Token`。除此之外，还会过滤掉源程序中的 <imp-text-success>注释</imp-text-success> 和 <imp-text-success>空白字符</imp-text-success>（<imp-text-success>换行符</imp-text-success>、<imp-text-success>空格</imp-text-success>、<imp-text-success>制表符</imp-text-success>、<imp-text-success>结尾分号</imp-text-success>等等）。词法单元之间都是独立的，也即在该阶段我们并不关心每一行代码是通过什么方式组合在一起的。

#### 语法分析

语法分析会将词法分析出来的 `Token` 转化成有语法含义的抽象语法树结构。同时，验证语法，语法如果有错的话，抛出语法错误。
那抽象语法树结构到底长啥样呢？

### AST 结构大赏

::: tip
语法树试炼场：<link-tag :linkList="[{ linkText:'astexplorer',linkUrl:'astexplorer.net/'}]" />
:::

我们有如下一段代码：

::: code-group

```js
const fn = (a) => a;
```

:::

它转化成对应的 AST 结构 如下（有删减）：

::: code-group

```json
{
  "program": {
    "type": "Program",
    "sourceType": "module",
    "interpreter": null,
    "body": [
      {
        "type": "VariableDeclaration",
        "declarations": [
          {
            "type": "VariableDeclarator",
            "id": {
              "type": "Identifier",
              "name": "fn"
            },
            "init": {
              "type": "ArrowFunctionExpression",
              "id": null,
              "generator": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "name": "a"
                }
              ],
              "body": {
                "type": "Identifier",
                "name": "a"
              }
            }
          }
        ],
        "kind": "const"
      }
    ],
    "directives": []
  },
  "comments": []
}
```

:::

解析：

- `declarations.type=VariableDeclaration`, 表示变量声明，`kind=const`；
- `id.name=fn`，表示变量名称为 `fn`；
- `init.type=ArrowFunctionExpression`, 表示变量初始化的值为箭头函数；
- `init.params=a`, 表示这个箭头函数的参数为 `a`；
- `init.body.name=a.`，表示函数体也是个 `a`；

让我们把上面的解析流程逆向推导，用人话翻译成对应的 js 代码就是：用类型 `const` 声明变量 `fn` 指向一个箭头函数表达式，它的参数是 `a` 函数体也是 `a`。

::: tip
看完整版树结构：<link-tag :linkList="[{ linkText:'astexplorer',linkUrl:'https://astexplorer.net/#/gist/41e20b87801e8585cfcd16e4b7933c79/latest'}]" />
:::

### JavaScript 常见 AST 语法参考:

<Ast />

::: tip
更多语法知识请参考：<link-tag :linkList="[{ linkText:'estree',linkUrl:'https://github.com/estree/estree/blob/master/es2015.md'}]" />
:::

那如果我们想要在代码实现 AST 的结构，该如何做呢？那就不得不借助 AST 相关的一些工具了。

### AST 工具对比

| 名称         |                                                                                                                                                         简介                                                                                                                                                         | 特性                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Esprima      |                                                                开源的工具，拥有解析 JavaScript 代码的广泛应用和成功的案例。速度和兼容性良好，支持 ECMAScript6，并且可透过插件协助封装在其它工具中。它也允许用户自定义插件功能，从而满足更复杂的需求。                                                                | 1️⃣`esprima` 是比较早的一个 parser，高性能、符合标准、支持 es7 <br/>2️⃣ 只支持解析 JavaScript 代码，不支持 ts，flow \* parseModule 支持 parse 一个 es 的 module <br/>3️⃣`parseScript(‘var el= ‘, { jsx: true });` 可以支持解析 jsx，但是没办法 parse 一个含有 jsx 的 module <br/>4️⃣ ast format，从 Mozilla Parser API，继承而来，并且最终扩展为 ESTree format                                                                                                                                                                                                                        |
| Acorn        |                                                                                                                   性能很出色，允许接入更高级的 ES Syntax，最近几年已经成为非常受欢迎的解析器之一。                                                                                                                   | 1️⃣ acorn: A tiny, fast JavaScript parser, written completely in JavaScript <br/>2️⃣ 支持插件扩展，所以可以基于 acorn，扩展出解析各种 JavaScript 代码 <br/>3️⃣ acorn-walk 用来遍历 ast 的 node <br/>4️⃣ AST 格式是 ESTree format                                                                                                                                                                                                                                                                                                                                                      |
| Babel Parser | Babel 的语法分析器，允许支持不同于常见的 JavaScript 语法的开发语言（如 JSX）。兼容 ES6 和 ES7，并已经处理了 TC39 最新的语法变化。同时具有兼容性，易于扩展的优点。而 babel 目前所用的解析器 fork 自 acorn。webpack 的核心 parser 也是 acorn。而 eslint 作为一个可配置的代码规范检查工具，可以任意选择定义解析器来使用 | - `babel/parser`：以前叫 Babylon，底层依赖 acorn，jsx 的支持是也是用的 acorn 的插件 acorn-jsx <br/>- 使用插件的方式，支持最新的 es 语法以及 jsx,flow,ts，所有插件 <br/>- `ast format`：是基于 ESTree 改的。如果要使用 estree 格式，plugins 中传入 estree 即可 <br/>- `@babel/core`：Babel 编译器本身，提供了 babel 的编译 API；<br/>- `@babel/parser`：将 JavaScript 代码解析成 AST 语法树；<br/>- `@babel/traverse`：遍历、修改 AST 语法树的各个节点；<br/>- `@babel/generator`：将 AST 还原成 JavaScript 代码；<br/>- `@babel/types`：判断、验证节点的类型、构建新 AST 节点等。 |
| recast       |                一大特色就是在 print 的时候会尽量的保持源代码的格式，输出时只会重新输出有修改的 ast，未更改过的 ast，会直接按原样输出。所以非常适合那些需要修改源码，并且要把修改后的结果覆写到源码的情况。但是前提是需要使用 recast 的 parser，不要在 print 的时候使用一个用别的工具 parse 出来的 ast                | - `recast` 默认使用 esprima 作为 parser，支持传入自定义 parser，比如 babel/parser，recast 也提供了便捷的方式来使用其他 parser，所有 parser 地址。要使用其他 parser，需自己安装对应的 parser 包，安装 recast 时只会自动安装默认的 exprima <br/>- `print` 支持格式化参数，比如单双引号，换行符之类的。<br/>- 使用 ast-types 作为 ast 的格式，这个是继承自 Mozilla Parser API，但是兼容 esprima 的 <br/>- 因为默认的 esprima 不支持 jsx，所以在 react 项目中，就需要使用 babel 的 parser                                                                                             |

现在一般在前端项目中，绝大多数都是采用 `Babel Parser` 进行解析，可进行多种语法转换处理，使用成本小，学习成本小，前端项目之间没有壁垒。
下面我们就使用 `Babel Parser` 和它相关的库进行实战，来体验一下 AST 的黑魔法。

## 实战

### 实战一：`eslint` 代码格式化，把 `var` 替换成 `const`

假设有这么一段代码：

::: code-group

```js
function example() {
  var a = 1;
  var b = 2;
  return a + b;
}
```

:::

需求：把代码中的 `var` 全部格式化成 `const` 分析：首先我们需要把上面的这一段代码转化成 `AST` ，可以利用 <imp-text-danger>@babel/parse</imp-text-danger>。然后利用 <imp-text-danger>@babel/traverse</imp-text-danger> 遍历 `AST` ，找到对应的 `Token`，也就是 `var` ，然后替换成 `const`。最后利用 <imp-text-danger>@babel/generator</imp-text-danger> 将修改后的 `AST` 转化成一份新的 `js` 代码。综上所述，我们需要的工具有下面三个：

- <imp-text-danger>@babel/parser</imp-text-danger> : 将 `js` 代码 ------->>> `AST` 抽象语法树；
- <imp-text-danger>@babel/traverse</imp-text-danger> 对 `AST` 节点进行递归遍历；
- <imp-text-danger>@babel/generator</imp-text-danger> : `AST` 抽象语法树 ------->>> 新的 `js` 代码；

首先安装这三个依赖：

::: code-group

```bash
npm install @babel/parser @babel/traverse @babel/generator
```

:::

新建一个 `varTraverseToLet.js` 文件

::: code-group

```js
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

const code = `function example() {
  var a = 1;
  var b = 2;
  return a + b;
}`;

// 使用babel解析器解析源码为AST
const ast = parser.parse(code);
console.log(JSON.stringify(ast, null, 2));
```

:::

我们首先将 code 转换成了 AST，看看它的结构：

![/5707ca25-b21a-d30e-25cd-fd659762b437.png](/5707ca25-b21a-d30e-25cd-fd659762b437.png)

结构有点长，截图不全，我们直接在 astexplorer 去看，生成的结构是一样的：

<link-tag :linkList="[{ linkText:'astexplorer.net',linkUrl:'https://astexplorer.net/#/gist/0e1131b141d8b5107a2e8769c350b906/latest'}]" />

得到 AST 以后，我们需要对 AST 进行遍历并进行修改，最后将其转化成 js 代码：

::: code-group

```js
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

const code = `function example() {
  var a = 1;
  var b = 2;
  return a + b;
}`;

// 使用babel解析器解析源码为AST
const ast = parser.parse(code);
// console.log(JSON.stringify(ast, null, 2));

// 定义一个遍历AST的访问器对象，也就是访问到目标节点【这里是VariableDeclaration】的时候会做什么处理
const visitor = {
  VariableDeclaration(context) {
    // 这里的 path 是指当前的上下文，而不是路径
    if (context.node.kind === "var") {
      context.node.kind = "const";
    }
  }
};

// 使用traverse遍历AST并应用访问器，也就是遍历并应用刚才那个 visitor 规则
traverse(ast, visitor);

// 使用generate根据修改后的AST生成新的代码
const output = generate(ast, {});

// 打印修改后的代码
console.log(output.code);
```

:::

使用 node 来跑一个试试，最终得到的结果为：

![/09abe546-51cb-fc5c-e551-4bedabeb981e.png](/09abe546-51cb-fc5c-e551-4bedabeb981e.png)

已成功将 var 全部转化成了 const。

### 实战二：打印日志添加函数名

示例：

::: code-group

```js
// 源代码
function getData() {
  console.log("data");
}

// --------------------

// 转化后代码
function getData() {
  console.log("getData", "data");
}
```

:::

这里我们需要安装另一个包，`@babel/types` 对具体的 AST 节点进行进行修改（不用也能实现其实）

::: code-group

```bash
npm install @babel/types -D
```

:::

开始实现：

::: code-group

```js
// log.js
const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const types = require("@babel/types");

function compile(code) {
  // 1.parse 将代码解析为抽象语法树（AST）
  const ast = parser.parse(code);

  // 2,traverse 转换代码
  traverse.default(ast, {});

  // 3. generator 将 AST 转回成代码
  return generator.default(ast, {}, code);
}

const code = `
function getData() {
  console.log("data")
}
`;
const newCode = compile(code);
console.log(newCode.code);
```

:::

完善 compile 方法：

::: code-group

```js
function compile(code) {
  // 1.parse
  const ast = parser.parse(code);

  // 2,traverse
  const visitor = {
    CallExpression(path) {
      // 拿到 callee 数据
      const { callee } = path.node;
      // 判断是否是调用了 console.log 方法
      // 1. 判断是否是成员表达式节点，上面截图有详细介绍
      // 2. 判断是否是 console 对象
      // 3. 判断对象的属性是否是 log
      const isConsoleLog =
        types.isMemberExpression(callee) &&
        callee.object.name === "console" &&
        callee.property.name === "log";
      if (isConsoleLog) {
        // 如果是 console.log 的调用 找到上一个父节点是函数
        const funcPath = path.findParent((p) => {
          return p.isFunctionDeclaration();
        });
        // 取函数的名称
        const funcName = funcPath.node.id.name;
        // 将名称通过 types 来放到函数的参数前面去
        path.node.arguments.unshift(types.stringLiteral(funcName));
      }
    }
  };
  // traverse 转换代码
  traverse.default(ast, visitor);

  // 3. generator 将 AST 转回成代码
  return generator.default(ast, {}, code);
}
```

:::

运行查看结果：

![/f75e0305-86ab-3d4f-6a19-47ff03b0fc19.png](/f75e0305-86ab-3d4f-6a19-47ff03b0fc19.png)

### 实战三：接口请求添加 catch

::: code-group

```js
const parser = require("@babel/parser"); // 用于将代码转换为 AST
const traverse = require("@babel/traverse").default; // 用于对 AST 的遍历，包括节点增删改查、作用域等处理
const generate = require("@babel/generator").default; // 用于将 AST 转换成代码

const sourceCode = `
postApi('/install-repairer/api/sign-in', params)
  .then(res => {
    if (res && res.code === 2000) {
      Toast.info('成功', 1)
    } else {
      Toast.info(res.message || '网络异常，请重试')
    }
  }).catch(e => {
    Toast.info(e.message || '签到失败，请稍后重试')
  })
 
 
loginApi.getUserList({ keyWord: value }).then(res => {
  if (res && res.code === 2000) {
    Toast.info('成功', 1)
  } else {
    Toast.info(res.message || '请求异常，请稍后重试', 1)
  }
})
`;

const insertCode = `
test().then().catch(e => {
    Toast.info(e.message || '请求异常，请稍后重试')
  })`;

const ast = parser.parse(sourceCode, { sourceType: "module" });
traverse(ast, {
  CallExpression(nodePath) {
    const memberExp = nodePath.get("callee");
    const memberProperty = memberExp.get("property");
    if (
      memberProperty.node &&
      memberProperty.node.name === "then" &&
      nodePath.parent.type !== "MemberExpression"
    ) {
      const insertAst = parser.parse(insertCode, { sourceType: "module" });
      traverse(insertAst, {
        CallExpression(nodePathInsert) {
          const memberExpInsert = nodePathInsert.get("callee");
          const memberPropertyInsert = memberExpInsert.get("property");

          if (
            memberPropertyInsert.node &&
            memberPropertyInsert.node.name === "catch" &&
            memberExpInsert.node.type === "MemberExpression"
          ) {
            nodePathInsert.node.callee.object = { ...nodePath.node };
            nodePath.container.expression = nodePathInsert.node;
          }
        }
      });
    }
  }
});

const newCode = generate(ast).code;
console.log(newCode);
```

:::

![/831897b6-41c0-998f-7ce5-3b0e2e68bd22.png](/831897b6-41c0-998f-7ce5-3b0e2e68bd22.png)

### 实战四：移除死代码

::: code-group

```js
/**
 * 移除无用代码
 */

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

// 输入的 JavaScript 代码
const code = `
import fs from 'fs';
import unusedLib from 'unused-lib';

const a = 1;
const b = 2;
const c = 3;
const sum = (x, y) => x + y;
const unusedFunc = () => 'I am not used';

sum(a, b);
`;

// 解析代码为 AST
const ast = parser.parse(code, {
  sourceType: "module"
});

// 遍历 AST，移除无用代码
traverse(ast, {
  // 移除未使用的变量
  VariableDeclarator(path) {
    const binding = path.scope.getBinding(path.node.id.name);
    if (!binding.referenced) {
      path.remove();
    }
  },
  // 移除未被调用的函数
  FunctionDeclaration(path) {
    const binding = path.scope.getBinding(path.node.id.name);
    if (!binding.referenced) {
      path.remove();
    }
  },
  // 移除未被使用的导入
  ImportDeclaration(path) {
    const specifiers = path.node.specifiers.filter((specifier) => {
      const binding = path.scope.getBinding(specifier.local.name);
      return binding.referenced;
    });
    // 如果没有任何有效导入，则移除整个 import 语句
    if (specifiers.length === 0) {
      path.remove();
    }
  }
});

// 生成优化后的代码
const { code: optimizedCode } = generate(ast);

console.log(optimizedCode);
```

:::

功能说明：

- <imp-text-danger>移除未使用的变量</imp-text-danger>：

  通过 VariableDeclarator 节点遍历，检查变量是否被引用（binding.referenced），如果没有引用则删除该变量声明。

- <imp-text-danger>移除未被调用的函数</imp-text-danger>：

  类似于变量，通过 FunctionDeclaration 节点检查函数声明是否被引用（即是否被调用）。未被引用的函数将被移除。

- <imp-text-danger>移除未被使用的导入</imp-text-danger>：

  在 ImportDeclaration 中遍历导入的所有标识符，通过检查每个标识符的引用情况来决定是否保留它们。如果某个 import 语句中的所有导入项都未被引用，则整个 import 语句将被移除。

![/29c072d7-6fb1-4dfa-47d0-fe491d68382f.png](/29c072d7-6fb1-4dfa-47d0-fe491d68382f.png)

## 开发 Bebel 插件

我们上面已经做了很多实战，已经初步掌握了利用 `AST` 去修改代码的能力。下面我们就开发一个 `Babel` 插件，开发一个基于 `Babel` 的插件可以帮助你在编译 JavaScript 代码时对 `AST` 进行自定义的转换和优化。还是以实战四-移除死代码的案例为例。

### 设置开发环境

新建目录 `babel-unused-plugin`
首先，初始化项目，然后安装 `Babel` 的核心依赖：

::: code-group

```bash
npm init -y
npm install @babel/core @babel/cli @babel/preset-env -D
```

:::

如果你还需要一些额外的工具，比如用于测试的 Babel 运行时和其他插件，也可以安装：

::: code-group

```bash
npm install @babel/plugin-transform-arrow-functions
```

:::

### 创建文件结构

在项目目录下，创建一个 `plugins` 目录，并在其中创建一个 `JavaScript` 文件 `remove-unused.js`：

::: code-group

```shell
babel-unused-plugin/
├── plugins/
│   └── remove-unused.js
└── package.json
```

:::

### 编写 Babel 插件

在 `remove-unused.js` 文件中，编写 `Babel` 插件。以下是 `Babel` 插件示例，它会移除未被引用的变量声明和函数声明：

::: code-group

```js
module.exports = function ({ types: t }) {
  return {
    visitor: {
      VariableDeclarator(path) {
        const binding = path.scope.getBinding(path.node.id.name);
        if (!binding.referenced) {
          path.remove();
        }
      },
      FunctionDeclaration(path) {
        const binding = path.scope.getBinding(path.node.id.name);
        if (!binding.referenced) {
          path.remove();
        }
      },
      ImportDeclaration(path) {
        const specifiers = path.node.specifiers.filter((specifier) => {
          const binding = path.scope.getBinding(specifier.local.name);
          return binding.referenced;
        });
        if (specifiers.length === 0) {
          path.remove();
        }
      }
    }
  };
};
```

:::

### 使用 Babel 插件

现在我们来使用一下刚刚开发的插件，在 `.babelrc` 文件中配置它：

::: code-group

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["./plugins/remove-unused"]
}
```

:::

### 测试 Babel 插件

在项目根目录下创建一个 test.js 文件，下面是一些测试代码：

::: code-group

```js
import fs from "fs";
import unusedLib from "unused-lib";

const a = 1;
const b = 2;
const sum = (x, y) => x + y;
const unusedFunc = () => "I am not used";

sum(a, b);
```

:::

我们使用 `Babel CLI` 来编译这个文件，并验证插件是否正确移除了无用代码：

::: code-group

```shell
npx babel test.js --out-file test.output.js
```

:::

编译后的 `test.output.js` 文件只包含有效的代码：

::: code-group

```js
import fs from "fs";

const a = 1;
const sum = (x, y) => x + y;

sum(a, b);
```

:::

### 插件扩展与优化

在实际项目中，你还可以根据需要去扩展这个插件：

- <imp-text-danger>处理更多类型的无用代码</imp-text-danger>：如类声明、对象字面量等。
- <imp-text-danger>支持自定义配置</imp-text-danger>：允许用户通过插件选项启用或禁用特定的优化规则。
- <imp-text-danger>添加测试用例</imp-text-danger>：使用 Jest 等测试框架来确保插件的稳定性。

## 实现 Webpack Loader 和 Plugin

创建一个基于 `AST` 处理的 `Webpack Loader` 和 `Plugin` 是一种非常强大的技术，可以让你在构建过程中对 JavaScript 代码进行自定义的转换和优化。下面我们利用实战四-移除死代码的案例实现一下实现 `Webpack Loader` 和 `Plugin`， 来展示一下如何使用 `Babel` 解析和修改 `AST`。

### 项目设置

首先，创建一个新的项目目录，并初始化项目：

::: code-group

```bash
mkdir webpack-unused-plugin
cd webpack-unused-plugin
npm init -y
```

:::

安装 Webpack 及其相关依赖：

::: code-group

```bash
npm install webpack webpack-cli babel-core @babel/parser @babel/traverse @babel/generator --save-dev
```

:::

### 创建自定义 Webpack Loader

自定义 `Loader` 将在构建过程中对每个 `JavaScript` 文件进行 `AST` 转换。
在项目根目录下，创建 `loaders` 目录，并在其中创建一个文件 `unused-loader.js`：

::: code-group

```bash
webpack-unused-plugin/
│
├── loaders/
│   └── unused-loader.js
│
└── package.json
```

:::

在 `ast-loader.js` 中，编写以下代码：

::: code-group

```js
const { getOptions } = require("loader-utils");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

module.exports = function (source) {
  const options = getOptions(this);

  // 解析源代码为 AST
  const ast = parse(source, {
    sourceType: "module"
  });

  // 遍历并修改 AST
  traverse(ast, {
    VariableDeclarator(path) {
      const binding = path.scope.getBinding(path.node.id.name);
      if (!binding.referenced) {
        path.remove();
      }
    },
    FunctionDeclaration(path) {
      const binding = path.scope.getBinding(path.node.id.name);
      if (!binding.referenced) {
        path.remove();
      }
    }
  });

  // 生成新的代码
  const output = generate(ast, {}, source);

  return output.code;
};
```

:::

### 创建自定义 Webpack Plugin

接下来，我们将创建一个 `Webpack Plugin`，在构建的特定阶段对所有模块应用 `AST` 处理。
在项目根目录下，创建 `plugins` 目录，并在其中创建一个文件 `unused-plugin.js`：

::: code-group

```bash
webpack-ast-example/
│
├── loaders/
│   └── unused-loader.js
│
├── plugins/
│   └── unused-plugin.js
│
└── package.json
```

:::

在 `unused-plugin.js` 中，编写以下代码：

::: code-group

```js
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

class ASTPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync("ASTPlugin", (compilation, callback) => {
      // 遍历所有输出的资源
      for (const filename in compilation.assets) {
        if (filename.endsWith(".js")) {
          const source = compilation.assets[filename].source();

          // 解析源代码为 AST
          const ast = parse(source, {
            sourceType: "module"
          });

          // 遍历并修改 AST
          traverse(ast, {
            VariableDeclarator(path) {
              const binding = path.scope.getBinding(path.node.id.name);
              if (!binding.referenced) {
                path.remove();
              }
            },
            FunctionDeclaration(path) {
              const binding = path.scope.getBinding(path.node.id.name);
              if (!binding.referenced) {
                path.remove();
              }
            }
          });

          // 生成新的代码
          const { code } = generate(ast, {}, source);

          // 更新编译后的代码
          compilation.assets[filename] = {
            source: () => code,
            size: () => code.length
          };
        }
      }
      callback();
    });
  }
}

module.exports = ASTPlugin;
```

:::

### 配置 Webpack

接下来，配置 `Webpack` 来使用我们创建的 `Loader` 和 `Plugin`。
在项目根目录下创建一个 `webpack.config.js` 文件：

::: code-group

```js
const path = require("path");
const ASTPlugin = require("./plugins/ast-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: path.resolve("./loaders/ast-loader.js")
        }
      }
    ]
  },
  plugins: [new ASTPlugin()]
};
```

:::

### 创建示例代码

在项目根目录下创建 `src` 目录，并添加一个 `index.js` 文件：

::: code-group

```js
import _ from "lodash";

const a = 1;
const b = 2;

function unusedFunction() {
  console.log("This will be removed");
}

function usedFunction() {
  console.log("This will be kept");
}

usedFunction();
```

:::

### 构建项目

使用 Webpack 构建项目：

::: code-group

```bash
npx webpack --config webpack.config.js
```

:::

`Webpack` 会运行 `Loader` 和 `Plugin`，生成的 `dist/bundle.js` 文件将会移除未使用的变量和函数。

### 查看结果

检查 dist/bundle.js 文件，你会发现未使用的代码已经被移除了，只剩下有效的代码。

::: code-group

```js
function usedFunction() {
  console.log("This will be kept");
}
usedFunction();
```

:::

## `AST` 在 `webpack` 中的广泛应用场景

### 代码优化与死代码移除

移除未使用的代码（Dead Code Elimination）是一个常见的场景。通过解析代码生成 AST，遍历语法树，找到未被引用的变量、函数或模块，并将其移除。这可以显著减少最终输出包的大小。示例：

- <imp-text-danger>Terser Plugin</imp-text-danger>: Webpack 内置的 Terser Plugin 就是一个使用 AST 来进行代码压缩和优化的插件。它会分析 AST 来识别和删除无用代码，压缩变量名，移除注释等。

### 代码转换与兼容性处理

AST 可以用于代码转换，使得现代 JavaScript 特性能够在不支持这些特性的环境中运行。例如，将 ES6+ 语法转换为 ES5 语法，确保在旧版浏览器中运行。示例：

- <imp-text-danger>Babel Loader</imp-text-danger>: Babel 是一个著名的 JavaScript 编译器，使用 AST 来将现代 JavaScript 代码转换为更广泛兼容的版本。在 Webpack 中，通过 `babel-loader` 可以在构建过程中自动进行这些转换。

### 代码拆分与模块化

Webpack 可以通过 AST 分析模块依赖关系，并进行代码拆分（Code Splitting）。这种方法允许 Webpack 将代码分成多个 bundle，从而提高应用的性能和加载速度。示例：

- <imp-text-danger>Dynamic Imports</imp-text-danger>: 当 Webpack 遇到动态导入（如 `import()`）时，它会通过 AST 分析这些导入点，并将相应的代码拆分到不同的 bundle 中。

### 代码注入与分析

AST 可以用于分析和注入代码，比如在代码中自动注入调试信息、埋点、性能监控代码，或是为特定代码段添加额外的逻辑。示例：

- <imp-text-danger>DefinePlugin</imp-text-danger>: Webpack 的 DefinePlugin 可以注入全局常量，这也是通过修改 AST 实现的。它在构建过程中会替换掉代码中对应的变量名称，将其替换为实际的值或表达式。

### Tree Shaking

Tree Shaking 是 Webpack 的一个重要特性，用于移除 JavaScript 中的未使用部分。它通过分析 AST 来识别哪些模块和函数实际在项目中被使用，并移除那些没有被使用的部分，从而减小打包后的文件大小。示例：

- <imp-text-danger>ES Modules</imp-text-danger>: 当使用 ES Modules 时，Webpack 可以通过静态分析（基于 AST）来有效进行 Tree Shaking，确保只打包真正需要的代码。

### 代码风格检查与修复

通过 AST，可以编写自定义的 Webpack Loader 或 Plugin，用于检查代码风格并进行自动修复。这在大型团队中非常有用，确保代码风格的一致性。示例：

- <imp-text-danger>ESLint Loader</imp-text-danger>: 使用 eslint-loader，你可以在 Webpack 构建过程中对代码进行静态检查，并且可以通过 AST 修改代码以自动修复某些代码风格问题。

### 代码注入（Code Injection）

开发者可以通过 Webpack Plugin 利用 AST 在特定的代码位置注入代码。例如，在模块加载前后注入日志或性能监控代码。示例：

- <imp-text-danger>BannerPlugin</imp-text-danger>: Webpack 的 BannerPlugin 可以在每个输出文件的头部注入特定的文本内容，如版权声明等。它也是通过对代码的 AST 进行处理来实现的。

### 代码转译与多态支持

AST 使得 Webpack 可以支持代码的转译，比如将 JSX 语法转译成纯 JavaScript，或是将 TypeScript 转译为 JavaScript。示例：

- <imp-text-danger>TS Loader</imp-text-danger>: 使用 ts-loader 可以将 TypeScript 转换为 JavaScript，Webpack 使用 AST 来进行这类语法转换。

## 总结

`AST` 是 `Webpack` 生态系统中许多功能背后的关键技术。通过解析代码生成 `AST`，`Webpack` 可以在构建过程中进行代码分析、优化、转换等操作，从而确保生成的代码高效、兼容性好，并符合预期的行为。这种方法为开发者提供了极大的灵活性，使得 `Webpack` 能够成为一个功能强大的构建工具。

::: tip
感兴趣的可以去看看 `webpack` 生态中源码是如何实现，让你的 `AST` 能力更上层楼。
:::

## 缺点总结

1. 转换过程复杂: AST 需要将 JavaScript 代码转换为树形结构，这需要大量的计算和处理，因此转换过程可能比较耗时。
2. 不支持部分转换:AST 只能转换整个代码块，不能对代码块进行部分转换。这意味着如果代码块包含复杂的结构，如嵌套函数或条件语句，则可能需要对代码块进行拆分，以便在不同的部分中使用 AST。
3. 可能会丢失信息:AST 是一种抽象结构，它不会保留原始 JavaScript 代码中的所有信息。例如，函数调用语句中的参数不会在 AST 中显示，只会保留函数名和调用点。
4. 节点查找困难，由于 ast 使用树形结构，针对复杂一点的代码模块想要针对某一个代码进行解析或替换操作比较困难，操作路径太长
5. 难以调试：使用 AST 进行解析可能会导致代码难以理解和调试。因为 AST 是一种抽象结构，它不会显示原始 JavaScript 代码中的所有信息，因此需要对代码进行进一步的解析和理解，以便进行调试。
6. 对源代码书写格式要求相对严格，虽然对于正则匹配来说 AST 也可以针对代码进行不同类型参数查找，会相对简单，但是由于一些项目不同的业务逻辑导致不同的使用方式，比如针对接口请求会有 post 请求方式，proxy 代理请求方式，有些方法名会有变量赋值或者逻辑判断等，都会增加代码查找或者替换的复杂度

## 参考链接

<link-tag :linkList="[{ linkText:'语法树试炼场',linkUrl:'https://astexplorer.net/'},{ linkText:'JavaScript 常见 AST 语法参考',linkUrl:'https://github.com/estree/estree/blob/master/es2015.md'},{ linkText:'esprima',linkUrl:'https://esprima.org/'},{ linkText:'acorn',linkUrl:'https://github.com/acornjs/acorn'},{ linkText:'acorn-walk',linkUrl:'https://github.com/acornjs/acorn/tree/master/acorn-walk'},{ linkText:'babel-parser',linkUrl:'https://babeljs.io/docs/babel-parser'},{ linkText:'ast format',linkUrl:'https://github.com/babel/babylon/blob/master/ast/spec.md'},{ linkText:'recast',linkUrl:'https://github.com/benjamn/recast'}]" />
