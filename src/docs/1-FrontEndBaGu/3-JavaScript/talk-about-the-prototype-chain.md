# 说一下原型链（全貌图）

<article-info/>

## 掌握名称对应和它们的从属关系

- 对应名称
  - `prototype`：原型
  - `__proto__`：原型链（链接点）
- 从属关系
  - `prototype`：函数的一个属性 ⇒ 本质是一个对象 {}
  - `__proto__`：对象 Object 的一个属性 ⇒ 本质是一个对象 {}
  - 对象的 `__proto__` 保存着该对象的构造函数的 `prototype`

::: code-group

```js
function Test() {}
console.log(Test.prototype); // { __proto__ }

const test = new Test();
console.log(test.__proto__);

console.log(test.__proto__ === Test.prototype); // true

console.log(Test.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null 最顶端了
```

:::

## 原型链：

以一个对象为基准，以 `__proto__` 为链接点，以 `Object.prototype.__proto__` 为终点的链条。当找一个对象的属性没找到时，会顺着原型链找，知道找到或者找不到为止，这个称谓原型链继承

## Object（对象） 和 Function（函数）：

::: code-group

```js
console.log(Test.__proto__ === Function.prototype); // true

// const Test = new Function()
console.log(Function.__proto__ === Function.prototype); // true

// const obj = {} => const obj = new Object()
// Object => 函数（function）

console.log(typeof Object); // function
console.log(Object.__proto__ === Function.prototype); // true
console.log(Object.__proto__ === Function.__proto__); // true
```

:::

## 判断属性是否存在的方法

::: code-group

```js
function Test() {
  this.a = 1;
}
console.log(Test.prototype);

Test.prototype.b = 222;

Object.prototype.c = 333;

const test = new Test();

// hasOwnProperty 判断是不是本身的属性
console.log(test.hasOwnProperty("a")); // true
console.log(test.hasOwnProperty("b")); // false
console.log(test.hasOwnProperty("c")); // false

// in 判断是否可以访问到（包括原型链）
console.log("a" in test); // true
console.log("b" in test); // true
console.log("c" in test); // true
console.log("d" in test); // false
```

:::

## constructor

`constructor` 是指实例化对象的构造函数，是可以手动更改的
