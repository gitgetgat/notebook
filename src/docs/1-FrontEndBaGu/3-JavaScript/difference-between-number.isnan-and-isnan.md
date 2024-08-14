# Number.isNaN 与 isNaN 的区别

<article-info/>

## NaN

- `NaN` 意指 `“not a number“`，是一个“警戒值”，用于指出数字类型中的错误情况。
- `typeof NaN` 的返回值是 `”number“`。
- `NaN` 是一个特殊值，它与自身不相等，是唯一一个非自反的值。即 `NaN === NaN` 返回 `false`，`NaN !== NaN` 返回 `true`。
- 因此，我们不能简单地通过 `==` 或者 `===` 运算符来判断数值是否非法数值，我们需要 `isNaN()` 或者 `Number.isNaN()` 两个函数进行判断。

::: code-group

```js
typeof NaN; // "number"
NaN === NaN; // false
NaN !== NaN; // true
```

:::

## isNaN()

- `isNaN()` 函数接收一个参数 x，用来检查 x 是否非数字值。
- `isNaN()` 函数接收参数 x 之后，会先把参数 x 转换为数字类型，任何非数字类型的值都会被强制转换为 `NaN`，再做判断。
- 因此，`isNaN()` 函数的参数是 `NaN` 或者其他能够被转换为 `NaN` 的值时，结果都会返回 `true`，其他值的情况下返回 `false`。
- 故，`isNaN()` 函数会影响 `NaN` 的准确判断。

::: code-group

```js
console.log(isNaN(null)); // false  Number(null) => 0
console.log(isNaN(undefined)); // true  Number(undefined) => NaN
console.log(isNaN(1)); // false
console.log(isNaN(" ")); // false  Number(' ') => 0
console.log(isNaN("1")); // false  Number('1') => 1
console.log(isNaN("abc")); // true   Number('abc') => NaN
console.log(isNaN("NaN")); // true   Number('NaN') => NaN
console.log(isNaN([])); // false  Number([]) => 0
console.log(isNaN([1])); // false  Number([1]) => 1
console.log(isNaN(["a"])); // true   Number(['a']) => NaN
console.log(isNaN({})); // true   Number({}) => NaN
console.log(isNaN("2021/5/22")); // true  Number('2021/5/21') => NaN
console.log(isNaN(0 / 0)); // true
console.log(isNaN(NaN)); // true
```

:::

## Number.isNaN()

- `Number.isNaN()` 函数也是接收一个参数 x，判断 x 是否非数字值。
- `Number.isNaN()` 函数在接收参数 x 之后，会首先判断参数 x 是否为数字类型，如果是数字类型则继续判断是否 `NaN`。
- 因此，`Number.isNaN()` 相比全局函数 `isNaN()` 更为精准，只有在参数 x 本身为 `NaN` 的情况下才会返回 `true`。

::: code-group

```js
// 只有参数本身为 NaN 结果才为 true
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(Number.NaN)); // true
console.log(Number.isNaN(0 / 0)); // true

// 以下在全局 isNaN() 函数的结果都为 true，在 Number.isNaN() 结果都为false
console.log(isNaN(undefined)); // true
console.log(isNaN("abc")); // true
console.log(isNaN("NaN")); // true
console.log(isNaN(["a"])); // true
console.log(isNaN({})); // true
console.log(isNaN("2021/5/22")); // true

// 以下仍然为 false
console.log(isNaN(null)); // false
console.log(isNaN(1)); // false
console.log(isNaN(" ")); // false
console.log(isNaN("1")); // false
console.log(isNaN([])); // false
console.log(isNaN([1])); // false
```

:::
