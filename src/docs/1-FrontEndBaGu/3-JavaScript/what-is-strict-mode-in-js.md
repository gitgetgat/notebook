# 什么是 JS 的严格模式？

<article-info/>

## 什么事严格模式？

严格模式是在 `ECMAScript5（ES5）` 中引入的，在严格模式下，`JavaScript` 对语法的要求会更加严格，一些在正常模式下能够运行的代码，在严格模式下将不能运行。

添加严格模式，主要有以下几个目的：

- 消除 `JavaScript` 语法中一些不合理、不严谨的地方；
- 消除代码中一些不安全的地方，保证代码的安全运行；
- 提高 `JavaScript` 程序的运行效率；
- 为以后新版本的 `JavaScript` 做好铺垫。

## 如何启用严格模式？

- 要启用严格模式，您只需要在 `JavaScript` 脚本的开头添加 `"use strict";` 或 `'use strict';` 指令即可，如下所示：

  ::: code-group

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>JavaScript</title>
    </head>
    <body>
      <script>
        "use strict";

        x = "http://c.binacheng.net/"; // 此处报错：Uncaught ReferenceError: x is not defined at index.html:11
        console.log(x);
      </script>
    </body>
  </html>
  ```

  :::

- 如果将 `"use strict";` 指令添加到 `JavaScript` 程序的第一行，则表示整个脚本都会处于严格模式。如果在函数的第一行代码中添加 `"use strict";` ， 则表示只在该函数中启用严格模式。如下例所示：

  ::: code-group

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>JavaScript</title>
    </head>
    <body>
      <script>
        x = "http://c.binacheng.net/";
        console.log(x);

        function sayHello() {
          "use strict";
          str = "welcome http://c.binacheng.net/"; // 调用 sayHello() 函数在此处报错：Uncaught ReferenceError: str is not defined at sayHello (index.html:14) at index.html:17
          console.log(str);
        }
        sayHello();
      </script>
    </body>
  </html>
  ```

  :::

  ::: warning ⚠️ 注意
  `"use strict";` 或 `'use strict';` 指令只有在整个脚本第一行或者函数第一行时才能被识别，除了 IE9 以及更低的版本外，所有的浏览器都支持该指令。
  :::

## 严格模式中的变化

相对于普通模式来说，严格模式对 `JavaScript` 的语法都做了一些改变。

### 不允许使用未声明的变量

普通模式下，如果一个变量还没有声明，就直接拿来赋值，`JavaScript` 解释器会自动为您创建这个变量。而在严格模式下，则不允许这么做，所有变量在使用前必须显式的声明，否则将会抛出一个 `ReferenceError` 错误。

::: code-group

```js
"use strict";

v = 1; // 此处报错：Uncaught ReferenceError: v is not defined

for (i = 0; i < 2; i++) {
  // 此处报错：Uncaught ReferenceError: i is not defined
}
```

:::

### 不允许删除变量或函数

在严格模式下，如果您尝试删除一个变量或函数，则会抛出语法错误。而在普通模式下，虽然不会成功，但并不报错。

::: code-group

```js
"use strict";

var person = { name: "Peter", age: 28 };
delete person; // 此处报错：Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.

function sum(a, b) {
  return a + b;
}
delete sum; // 此处报错：Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.
```

:::

### 函数中不允许有同名的参数

在严格模式下，如果函数中有两个或多个同名参数，则会抛出语法错误，而在普通模式下则不会。

::: code-group

```js
"use strict";

function square(a, a) {
  // 此处报错：Uncaught SyntaxError: Duplicate parameter name not allowed in this context
  return a * a;
}
```

:::

### `eval` 语句的作用域是独立的

普通模式下，`eval` 语句的作用域取决于它所在的位置，而在严格模式下，`eval` 语句本身就是一个局部作用域，通过 `eval` 语句生成的变量只能在 `eval` 语句内使用。

::: code-group

```js
"use strict";

eval("var x = 5; console.log(x);");
console.log(x); // 此处报错：Uncaught ReferenceError: x is not defined
```

:::

### 不允许使用 `with` 语句

在严格模式下，不允许使用 `with` 语句。

::: code-group

```js
"use strict";

var radius1 = 5;
var area1 = Math.PI * radius1 * radius1;

var radius2 = 5;
with (Math) {
  // 此处报错：Uncaught SyntaxError: Strict mode code may not include a with statement
  var area2 = PI * radius2 * radius2;
}
```

:::

### 不允许写入只读属性

在严格模式下，不允许为只读或不存在的属性赋值，否则会造成语法错误，而在普通模式下，虽然不会成功，但并不会报错。

::: code-group

```js
"use strict";

var person = { name: "Peter", age: 28 };

Object.defineProperty(person, "gender", { value: "male", writable: false });
person.gender = "female"; // 此处报错：Uncaught TypeError: Cannot assign to read only property 'gender' of object '#<Object>'
```

:::

### 不允许使用八进制数

在严格模式下，不允许使用八进制数（以零为前缀的数字，例如 010、0377），而在普通模式下则可以。

::: code-group

```js
"use strict";

var x = 010; // 此处报错：Uncaught SyntaxError: Octal literals are not allowed in strict mode.
console.log(parseInt(x));
```

:::

### 不能在 `if` 语句中声明函数

在严格模式下，不能在 `if` 语句中声明函数，调用在 `if` 语句中定义的函数时，会提示函数未定义。

::: code-group

```js
"use strict";
//如果在if语句中声明函数，则会产生语法错误
if (true) {
  function demo() {
    // 此处报错：Uncaught ReferenceError: demo is not defined
    console.log("http://c.biancheng.net/");
  }
}
demo();
```

:::

### 禁止使用 `this` 表示全局对象

在普通模式下，`this` 关键字表示全局对象 `window`，而在严格模式下，`this` 关键字则表示 `undefined`。

::: code-group

```js
"use strict";
var name = "http://c.biancheng.net/";
function demoTest() {
  console.log(this);
}
demoTest();
```

:::
