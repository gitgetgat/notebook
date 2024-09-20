# 判断对象中是否存在某属性的几种方式的区别

<article-info/>

## `Object.keys(obj).includes(key)`

判断一个 key 是否在 obj 的 `可枚举` 的属性集合内，注意，`可枚举` 的属性集合，

如果通过以下方式添加的属性就判断不到。

```jsx
/**
 * 判断对象中是否存在某属性
 * @param {Object} obj 对象
 * @param {String} key 属性名
 */
function hasProperty(obj, key) {
  return Object.keys(obj).includes(key);
}
var obj = { a: undefined, b: 1 };
Object.defineProperty(obj, "c", {
  enumerable: false, // 是否可枚举，选填项，默认false
  value: 1
});
console.log(obj.c); // 1
console.log(Object.keys(obj)); // [ 'a', 'b' ]
console.log(hasProperty(obj, "c")); // false
```

## `obj.hasOwnProperty(key)`

表示对象自有属性（而不是`继承来的属性`）中是否具有指定的属性

::: code-group

```js
/**
 * 判断对象中是否存在某属性
 * @param {Object} obj 对象
 * @param {String} key 属性名
 */
function hasProperty(obj, key) {
  return obj.hasOwnProperty(key);
}
var obj = { a: undefined, b: 1 };

console.log(obj.toString); // [Function: toString]
console.log(hasProperty(obj, "toString")); // false
```

:::

## `key in obj`

如果指定的属性在指定的对象或其原型链中，则  `in` <imp-text-success>运算符</imp-text-success> 返回  `true`。
