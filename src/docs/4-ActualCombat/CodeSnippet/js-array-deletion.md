# JS 数组删除

<article-info/>

## 使用 `splice()` 方法

`splice()` 方法可以用来添加或删除数组中的元素。它会改变原始数组。

语法：`array.splice(start, deleteCount, item1, item2, ...)`

- `start` 是开始修改数组的索引位置。

- `deleteCount` 是要从数组中删除的元素数量。

- 可选参数 `item1, item2, ...` 是你想要插入到数组中的新元素。

::: code-group

```js
let arr = [1, 2, 3, 4, 5];
// 删除索引为2的元素（即数字3）
arr.splice(2, 1);
console.log(arr); // 输出: [1, 2, 4, 5]
```

:::

## 使用 `filter()` 方法

`filter()` 方法创建一个新数组，其中包含通过提供的函数实现的测试的所有元素。

这个方法不会改变原始数组。

语法：`array.filter(callback(element[, index[, array]])[, thisArg])`

::: code-group

```js
let arr = [1, 2, 3, 4, 5];
// 创建一个新数组，排除值为3的元素
let newArr = arr.filter((item) => item !== 3);
console.log(newArr); // 输出: [1, 2, 4, 5]
```

:::

## 直接赋值 `undefined` 或 `null`

如果你知道要删除的元素的索引，并且不介意在那个位置留下空洞，你可以直接将该位置设置为 `undefined` 或 `null`。

::: code-group

```js
let arr = [1, 2, 3, 4, 5];
// 将索引为2的元素设置为 undefined
arr[2] = undefined;
console.log(arr); // 输出: [1, 2, undefined, 4, 5]
```

:::

## 使用 `delete` 操作符

`delete` 操作符也可以用于删除数组中的元素，但是它会在数组中留下空洞（即 `undefined`）。

::: code-group

```js
let arr = [1, 2, 3, 4, 5];
// 使用 delete 操作符删除索引为2的元素
delete arr[2];
console.log(arr); // 输出: [1, 2, undefined, 4, 5]
```

:::
