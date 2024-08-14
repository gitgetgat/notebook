# 说一下闭包，闭包有什么特点？

<article-info/>

## 先来看一下各个经典书籍的定义：

::: code-group

```js [犀牛书]
// 函数变量可以保存在函数作用域内
function foo() {
  var n = 0;
}
console.log(n);
```

```js [高级程序设计]
// 闭包是指有权访问另一个函数作用域中的变量（函数没导出）
function foo() {
  var n = 0;

  function bar() {
    console.log(n);
  }
  bar();
}
```

```js [你不知道的 JavaScript（上）]
// 当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行
function foo() {
  var n = 0;

  function bar() {
    console.log(n);
  }
  return bar;
}
foo()();
```

```text [MDN]
   一个函数和对其周围状态（lexical enviroment，词法环境）的引用捆绑在一起，这样的组合就是闭包
```

:::

- 总结：当函数的执行，导致函数被定义；闭包和函数的定义有关，函数在定义时，会决定它的词法作用域。

## 闭包的几种形式

::: code-group

```js [函数的返回值是函数]
function foo() {
  var n = 0;

  return function bar() {
    // ...
  };
}
```

```js [返回的变量是函数]
function foo() {
  var n = function bar() {
    // ...
  };
  return n;
}
```

```js [全局变量定义的闭包]
var outter;

function foo() {
  var a = 10;
  outter = function () {
    console.log(a);
  };
}

foo();
outter();
```

```js [函数的参数方式]
var inner = function (fn) {
  console.log(fn());
};

function foo() {
  var a = 10;
  var n = function () {
    console.log(a);
  };
  inner(n);
}

foo();
```

```js [循环赋值的问题]
function foo() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    arr[i] = function () {
      console.log(i);
    };
  }

  return arr;
}

var bar = foo();
bar[0](); // 10

// 改动一下

function foo() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    arr[i] = (function (j) {
      return function () {
        console.log(j);
      };
    })(i);
  }

  return arr;
}

var bar = foo();
bar[0](); // 10
```

```js [迭代器]
var add = function () {
  var count = 0;
  return function () {
    return ++count;
  };
};

console.log(add()); // 1
console.log(add()); // 2
console.log(add()); // 3
```

:::

## 闭包的特点有以下几点：

1. 闭包可以访问外部函数作用域内的变量和函数，即使外部函数已经执行完毕并返回了结果，这些变量和函数仍然可以被内部函数引用。
2. 闭包可以保存外部函数作用域的状态，因此可以在后续调用中继续访问和操作其状态。
3. 闭包可以被用来实现模块化，通过将变量和函数封装在闭包内部，可以防止其被外部代码访问和修改，从而实现私有化变量和函数。
4. 闭包的缺点是容易造成内存泄漏，因为闭包中引用的外部变量不会被垃圾回收器回收，除非闭包本身被销毁。

## 面试题

::: code-group

```js []
function fun(n, o) {
  cnsole.log(o);
  return {
    fun: function (m) {
      return fun(m, n);
    }
  };
}

var a = fun(0);
a.fun(1);
a.fun(2);
a.fun(3);

var b = fun(0).fun(1).fun(2).fun(3);

var c = fun(0).fun(1);
c.fun(2);
c.fun(3);
```

:::
