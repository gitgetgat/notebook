# bind、apply、call 区别

<article-info/>

在 JavaScript 中，`call`、`apply` 和 `bind` 都是用来绑定函数中 `this` 关键字的方法。它们的作用都是在调用函数时指定函数体内 `this` 的值。然而，它们之间还是有一些区别的。

## call 和 apply

`call` 和 `apply` 的作用是一样的，它们都是在指定函数体内 `this` 的值的同时，调用该函数。

它们的区别在于传递参数的方式不同。`call` 方法接受的是一个参数列表，而 `apply` 方法接受的是一个数组。

### 使用

::: code-group

```js [call]
function.call(thisArg, arg1, arg2, ...)
```

```js [apply]
function.apply(thisArg, [argsArray])
```

:::

## bind

`bind` 方法不会调用函数，而是创建一个新函数，并将其中的 `this` 关键字绑定到指定的值。这个新函数调用时，会以绑定的值作为 `this`。

以下是 `bind` 方法的语法：

::: code-group

```js
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

:::

::: warning ⚠️ 注意
`bind` 方法创建的新函数是可以被调用多次的；但是 `连续调用 bind 只会生效一次`
:::

::: code-group

```js
const obj1 = {
  a: 1
};

const obj2 = {
  a: 10
};

function test() {
  console.log(this.a);
}

var test1 = test.bind(obj1, 3, 4);
test1(); //  1 3 4

var test2 = test1.bind(obj2, 3, 4);
test2(); //  1 3 4

var test3 = test.bind(obj1, 3, 4).bind(obj2, 3, 4);
test3(); //  1 3 4
```

:::

## 总结

- `call` 和 `apply` 的作用是一样的，它们都是在指定函数体内 `this` 的值的同时，调用该函数。它们的区别在于传递参数的方式不同。
- `bind` 方法不会调用函数，而是创建一个新函数，并将其中的 `this` 关键字绑定到指定的值。这个新函数调用时，会以绑定的值作为 `this`。
