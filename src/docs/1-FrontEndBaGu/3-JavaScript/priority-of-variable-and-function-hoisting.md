# 变量提升和函数提升的优先级？

<article-info/>

### 变量提升

变量提升即将变量声明提升到它所在作用域的最开始的部分。

- 通过 `var` 定义（声明）的变量，在定义语句之前就可以访问到；
- 值：`undefined`；

::: code-group

```js
console.log(a); //undefined
var a = 1;
```

:::

因为有变量提升的缘故，上面代码实际的执行顺序为：

::: code-group

```js
var a;
console.log(a);
a = 1;
```

:::

### 函数提升

js 中创建函数有两种方式：`函数声明式` 和 `函数表达式`

### 函数声明提升

::: code-group

```js
function fun() {
  console.log("函数声明式");
}
```

:::

js 在执行之前，会把 foo 函数提升到最前面，所以我们在 fun 函数定义之前就可以使用 fun 函数。

举个栗子来说明下：

::: code-group

```js
fun();
function fun() {
  console.log("aa");
}
```

:::

### 函数表达式提升

::: code-group

```js
var fun = function () {
  console.log("函数表达式");
};
```

:::

此种声明方式我们可以理解为 `**一个普通变量的提升**`，在 js 代码执行之前会把 fun 提升带最前面，**`在函数赋值之前`**，fun 是 undefined，如果调用 fun()，将会报错。只提升声明，不提升赋值。

再举个栗子来理解下：

::: code-group

```js
fun(); // Uncaught TypeError: fun is not a function
var fun = function () {
  console.log("aa");
};
```

:::

此时打印的结果为报错 `Uncaught TypeError: fun is not a function`，因为在 js 代码执行之前，会把 fun 提升到最前面，值为 undefined，不是一个函数，以函数的形式来进行调用时将会报错。

### 面试题

把上面这些基本知识理清楚后，在看几道面试题，检测是否真的学明白了。

1. 第一题

   ::: code-group

   ```js
   var a = 4;
   function fn() {
     console.log(a);
     var a = 5;
   }
   fn();
   ```

   :::

   输出结果：`undefined`

   ::: tip 说明
   在上面这段代码中有两个作用域，`window *全局作用域` 和 `fn 函数作用域`，在打印变量 a 时，会先在 fn 函数作用域里面查找，因为在执行 fn 函数时，在函数内部也会先进行变量提升，所以最终的打印结果为 `undefined` 。
   :::

   代码实际的执行顺序为：

   ::: code-group

   ```js
   var a = 4;
   function fn() {
     var a;
     console.log(a); //undefined
     a = 5;
   }
   fn();
   ```

   :::

2. 第二题

   ::: code-group

   ```js
   function a() {}
   var a;
   console.log(typeof a);
   ```

   :::

   输出结果：`function`

   ::: code-group

   ```js
   function a() {}
   var a = 1;
   console.log(typeof a);
   ```

   :::

   输出结果：`number`

   ::: tip 说明
   函数提升优先级高于变量提升，且不会被同名变量声明时覆盖，但是会被同名变量赋值后覆盖。
   :::

3. 第三题

   ::: code-group

   ```js
   console.log(typeof a);
   function a() {}
   var a = 1;
   ```

   :::

   输出结果：`function`

   ::: tip 说明
   函数提升的优先级高于变量提升。
   :::

4. 第四题

   大家可以看下这个例子最后的输出结果，检测下自己理解的如何。至于打印输出的结果我就不透露了，大家可以在控制台打印输出下，看看是否和自己预想的一样。

   ::: code-group

   ```js
   console.log(v1);
   var v1 = 100;
   function foo() {
     console.log(v1);
     var v1 = 200;
     console.log(v1);
   }
   foo();
   console.log(v1);
   ```

   :::

   代码实际的执行顺序为：

   ::: code-group

   ```js
   function foo() {
     var v1;
     console.log(v1);
     v1 = 200;
     console.log(v1);
   }
   var v1;
   console.log(v1); // undefined
   v1 = 100;
   foo();
   // undefined
   // 200
   console.log(v1);
   ```

   :::

5. 第五题

   ::: code-group

   ```js
   console.log(a);
   console.log(a());
   var a = 1;
   function a() {
     console.log(2);
   }
   a = 3;
   console.log(a);
   console.log(a());
   ```

   :::

   代码实际的执行顺序为：

   ::: code-group

   ```js
   function a() {
     console.log(2);
   }
   var a;
   console.log(a);
   // ƒ a() {
   //    console.log(2)
   // }
   console.log(a());
   // 2
   // undefined 这里是因为 console.log 的嵌套
   a = 1;
   a = 3;
   console.log(a); // 3
   console.log(a()); // Uncaught TypeError: a is not a function
   ```

   :::
