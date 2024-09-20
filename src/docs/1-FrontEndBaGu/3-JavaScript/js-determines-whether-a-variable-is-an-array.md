# JS 判断变量是不是数组，你能写出哪些方法？

<article-info/>

## Array.isArray()

- `Array.isArray()` 用于确定传递的值是否是一个 `Array`；返回 `boolean` 类型，如果值是 `Array` 则为 `true`；否则为 `false`

::: code-group

```js
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray(new Array());
// 鲜为人知的事实：其实 Array.prototype 也是一个数组，会打印出原型链上的所有方法
Array.isArray(Array.prototype);
```

:::

![/29a01fbf-a4d7-0fba-5b1e-3588d63e4696.png](/29a01fbf-a4d7-0fba-5b1e-3588d63e4696.png)

## instanceof 运算符

- 判断一个变量是否是数组的实例对象，如果变量是 `Array` 的实例对象，则为 `true`; 否则为 `false`
- 当检测 `Array` 实例时，`Array.isArray` 优于 `instanceof`，因为 `Array.isArray` 能检测 `iframes`

::: code-group

```js
var iframe = document.createElement("iframe");
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length - 1].Array;
var arr = new xArray(1, 2, 3); // [1,2,3]

Array.isArray(arr); // true
arr instanceof Array; // false
```

:::

## Object.prototype.toString.call()

- `Object.prototype.toString.call()` 方法判断一个变量数据类型，返回字符串数组，如 `'[object Object]'`
- 假如不存在 `Array.isArray()` 方法，封装以下函数

::: code-group

```js
function isArray(arr) {
  // return Object.prototype.toString.call(arr) === '[object Array]'
  return Object.prototype.toString.call(arr).indexOf("Array") > -1;
}
const res = isArray([]);
console.log(res);
```

:::

## Array.prototype.isPrototypeOf()

- `isPrototypeOf()` 是 `Object` 函数（类）的下的一个方法，用于判断当前对象是否为另外一个对象的原型，如果是就返回 `true`，否则就返回 `false`。
- 这个函数理解的关键是在 <imp-text-success>原型链</imp-text-success> 上，这个据说是 JavaScript 的三座大山之一。
  1.  函数对象，都会天生自带一个 <imp-text-success>prototype</imp-text-success> 原型属性。
  2.  每一个对象也天生自带一个属性 <imp-text-success>proto</imp-text-success> 指向生成它的函数对象的 <imp-text-success>prototype</imp-text-success>。
  3.  函数对象的 <imp-text-success>prototype</imp-text-success> 也有 <imp-text-success>proto</imp-text-success> 指向生成它的函数对象的 <imp-text-success>prototype</imp-text-success>。

::: code-group

```js
let arr = [];
console.log(Array.prototype.isPrototypeOf(arr)); // true
let o = new Object();
console.log(Object.prototype.isPrototypeOf(o)); // true
// 因为o对象是Object的实例，所以o对象的原型（__proto__）指向Object的原型（prototype），上面会输出true。
```

:::

## constructor

::: code-group

```js
let arr = [1, 2, 3];
console.log(arr.constructor.toString().indexOf("Array") > -1);
```

:::
