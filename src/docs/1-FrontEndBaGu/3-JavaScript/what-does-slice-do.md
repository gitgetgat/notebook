# slice 是干嘛的？splice 是否会改变原数组？

<article-info/>

## slice

`slice()` 方法可从已有的数组中返回选定的元素。

`slice()` 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。

::: warning ⚠️ 注意
`slice()` 方法不会改变原始数组
:::

::: code-group

```js [示例一]
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var myBest = fruits.slice(-3, -1); // 截取倒数第三个（包含）到倒数第一个（不包含）的两个元素
var myBest = fruits.slice(-3); // 截取最后三个元素
// myBest 结果输出: Lemon,Apple
```

```js [示例二]
var str = "www.runoob.com!";
document.write(str.slice(4) + "<br>"); // 从第 5 个字符开始截取到末尾
document.write(str.slice(4, 10)); // 从第 5 个字符开始截取到第10个字符
```

:::

## splice

`splice()` 方法用于添加或删除数组中的元素。

::: warning ⚠️ 注意
这种方法会改变原始数组
:::

::: code-group

```js [示例一]
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 1, "Lemon", "Kiwi");
// fruits 输出结果：Banana,Orange,Lemon,Kiwi,Mango
```

```js [示例二]
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 2);
// fruits 输出结果：Banana,Orange
```

```js [示例三]
const array = [2, 5, 9];

document.write(array);

const index = array.indexOf(5); // 移除元素5
if (index > -1) {
  // 移除找到的指定元素
  array.splice(index, 1); // 移除元素
}
document.write("<br>");
// array = [2, 9]
document.write(array);
```

```js [示例四]
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0);
// 删除 0 个，返回空数组
```

:::
