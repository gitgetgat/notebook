# JS 对数据类的检测方法有哪些？

<article-info/>

JavaScript 作为一种动态类型语言，存在多种数据类型，因此对数据类型的检测尤为重要。以下是 JS 对数据类型的检测方法：

- `typeof` 操作符：用于检测变量的数据类型。返回值为字符串，包含以下几种类型：`undefined`、`boolean`、`number`、`string`、`object`、`function`、`symbol`。

  ::: code-group

  ```js
  console.log(typeof /\d/); //object
  console.log(typeof {}); //object
  console.log(typeof []); //object
  console.log(typeof null); //object
  console.log(typeof 123); //number
  console.log(typeof true); //boolean
  console.log(typeof function () {}); //function
  console.log(typeof undefined); //undefined
  console.log(typeof Symbol("123")); //symbol
  ```

  :::

- `instanceof` 操作符：用于检测某个变量是否属于某个对象的实例。返回值为布尔值，如果该变量是该对象实例，则返回 `true`，否则返回 `false`。

  ::: code-group

  ```js
  function b() {}
  let a = new b();
  console.log(a instanceof b); //true
  console.log(b instanceof Object); //true
  let arr = [1, 2, 3, 4];
  console.log(arr instanceof Array); //true
  ```

  :::

- `Object.prototype.toString.call()` 方法：可以检测变量的数据类型，返回值为字符串。该方法可以区分对象、数组、函数等类型。

  ::: code-group

  ```js
  //"[boject Boolean]"
  //"[object Number]"
  //"[object String]"
  //"[object Object]"
  //"[object Function]"
  //"[object Undefined]"
  //"[object Null]"
  //"[object RegExp]"
  //"[object Boolean]"
  ```

  :::

- `constructor` 属性：每个对象都有 `constructor` 属性，该属性返回创建该对象的构造函数。可以通过该属性来判断该对象的数据类型。
- `Array.isArray()` 方法：用于检测变量是否为数组类型。返回值为布尔值，如果该变量是数组类型，则返回 `true`，否则返回 `false`。
- `hasOwnporperty` 检测当前属性是否为对象的私有属性
