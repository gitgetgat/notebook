# JS 中的数据类型有哪些？

<article-info/>

JavaScript 是一种`动态、弱类型`语言，它提供了各种数据类型，包括：

## 基础数据类型

- `数字(number)`： 表示数字值。例如，`1`、`2.5`、`3` 等。
- `字符串(string)`： 表示文本。例如，`"Hello World"`、`'JavaScript'` 等。
- `布尔(boolean)`： 表示逻辑值，只有两个值：`true` 和 `false`。
- `undefined`： 表示变量未定义、表示没有任何值，如果变量声明但未赋值，则该变量的值为 `undefined`。
- `null`： 表示空值、表示没有任何对象。如果变量被赋值为 `null`，则该变量为空。
- `Symbol`： 表示唯一的、不可变的值。它可以用作对象属性的键名，以防止键名冲突。
- `BigInt`：表示任意大小的整数，可以安全地存储和操作巨大的整数，甚至超过 `Number` 的安全整数限制

## 引用数据类型（复杂数据类型）

- `对象(object)`： 表示复杂数据结构，除基本数据类型外都是对象。例如，`{name: "Tom", age: 20}`、`[1, 2, 3]` 等。
- `函数(function)`： 表示可重复使用的代码块，本质上也是对象。
- `数组(array)`：标识多个元素的集合，本质上也是对象。
