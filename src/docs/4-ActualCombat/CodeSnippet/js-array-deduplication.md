# JS 数组去重

<article-info/>

## 将数组的每一个元素依次与其他元素做比较，发现重复元素，删除

::: code-group

```js
var arr = [1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5, 5, 5, 5];
function noRepeat(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
var arr2 = noRepeat(arr);
console.log(arr2); //[1, 23, 3, 5, 6, 7, 9, 8]
```

:::

## 借助 indexOf() 方法判断此元素在该数组中首次出现的位置下标与循环的下标是否相等

::: code-group

```js
var arr = [1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5, 5, 5];
function noRepeat(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) != i) {
      arr.splice(i, 1); //删除数组元素后数组长度减1后面的元素前移
      i--; //数组下标回退
    }
  }
  return arr;
}
var newArr = noRepeat(arr);
console.log(newArr); //[1, 23, 3, 5, 6, 7, 9, 8]
```

:::

## 利用数组中的 filter 方法

::: code-group

```js
var arr = ["apple", "banana", "pear", "apple", "orange", "orange"];
var newArr = arr.filter(function (value, index, self) {
  return self.indexOf(value) === index;
});
console.log(newArr); //["apple", "banana", "pear", "orange"]
```

:::

## 借助新数组，通过 indexOf 方判断当前元素在数组中的索引如果与循环的下标相等则添加到新数组中

::: code-group

```js
var arr = [1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5, 5, 5];
function noRepeat(arr) {
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) == i) {
      ret.push(arr[i]);
    }
  }
  return ret;
}
var arr2 = noRepeat(arr);
console.log(arr2); //[1, 23, 3, 5, 6, 7, 9, 8]
```

:::

## 利用空对象来记录新数组中已经存储过的元素

::: code-group

```js
var arr = [1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5];
var obj = {};
var newArr = [];
for (var i = 0; i < arr.length; i++) {
  if (!obj[arr[i]]) {
    obj[arr[i]] = true;
    newArr.push(arr[i]);
  }
}
console.log(newArr); // [1, 23, 3, 5, 6, 7, 9, 8]
```

:::

## 借助新数组，判断新数组中是否存在该元素如果不存在则将此元素添加到新数组中

::: code-group

```js
var arr = [1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5];
function noRepeat(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) == -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
var arr2 = noRepeat(arr);
console.log(arr2); //[1, 23, 3, 5, 6, 7, 9, 8]
```

:::

## 借助新数组，判断新数组中是否存在该元素如果不存在则将此元素添加到新数组中（原数组长度不变但被按字符串顺序排序）

::: code-group

```js
var arr = [1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5];
function noRepeat(arr) {
  var ret = [],
    end; //临时变量用于对比重复元素
  arr.sort(); //将数重新组排序
  end = arr[0];
  ret.push(arr[0]);
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] != end) {
      //当前元素如果和临时元素不等则将此元素添加到新数组中
      ret.push(arr[i]);
      end = arr[i];
    }
  }
  return ret;
}
var arr2 = noRepeat(arr);
console.log(arr2); //[1, 23, 3, 5, 6, 7, 8, 9]
```

:::

## 此方法没有借助新数组直接改变原数组，并且去重后的数组被排序

::: code-group

```js
var arr = [1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5];
function noRepeat(arr) {
  var end; //临时变量用于对比重复元素
  arr.sort(); //将数重新组排序
  end = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] == end) {
      //当前元素如果和临时元素相等则将此元素从数组中删除
      arr.splice(i, 1);
      i--;
    } else {
      end = arr[i];
    }
  }
  return arr;
}
var arr2 = noRepeat(arr);
console.log(arr2); //[1, 23, 3, 5, 6, 7, 8, 9]
```

:::

## 双层循环改变原数组

::: code-group

```js
var arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 4, 3, 1, 2, 6, 6, 6, 6];
function noRepeat(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      if (arr[i] == arr[j] && i != j) {
        //将后面重复的数删掉
        arr.splice(j, 1);
      }
    }
  }
  return arr;
}
var arr2 = noRepeat(arr);
console.log(arr2); //[1, 2, 3, 4, 5, 6]
```

:::

## 借助新数组

::: code-group

```js
var arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 4, 3, 2, 1, 1, 1];
var newArr = [];
for (var i = 0; i < arr.length; i++) {
  var repArr = []; //接收重复数据后面的下标
  //内层循环找出有重复数据的下标
  for (var j = i + 1; j < arr.length; j++) {
    if (arr[i] == arr[j]) {
      repArr.push(j); //找出后面重复数据的下标
    }
  }
  if (repArr.length == 0) {
    //若重复数组没有值说明其不是重复数据
    newArr.push(arr[i]);
  }
}
console.log(newArr); //[5, 4, 3, 2, 1]
```

:::

## 借助 ES6 提供的 Set 结构

::: code-group

```js
var arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 4, 3, 2, 1, 1, 1];
function noRepeat(arr) {
  var newArr = [];
  var myset = new Set(arr); //利用了Set结构不能接收重复数据的特点
  for (var val of myset) {
    newArr.push(val);
  }
  return newArr;
}
var arr2 = noRepeat(arr);
console.log(arr2); //[1, 2, 3, 4, 5]
```

:::

## 利用 includes 去重

::: code-group

```js
//利用Array.includes 去重
//includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。
let list = [
  "你是最棒的1",
  8,
  8,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  "你是最棒的1"
];
let newList2 = [];
list.forEach((item) => {
  // 空数组newList2 不包含item为false ,取反为true 执行数组添加操作
  // 如果数组包含了 item为true 取反为false 不执行数组添加操作
  if (!newList2.includes(item)) {
    newList2.push(item);
  }
});
console.log("newList2", newList2);
```

:::

## 利用 map 去重

::: code-group

```js
//利用 map 去重
//map 数据结构是 es6 中新出的语法，其本质也是键值对，只是其键不局限于普通对象的字符串
let list = [
  "你是最棒的2",
  8,
  8,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  "你是最棒的2"
];
let newList3 = [];
let map = new Map();
list.forEach((item) => {
  // 如果 map.has 指定的 item 不存在，那么就设置 key 和 value 这个 item 就是当前 map 里面不存在的 key ,把这个 item 添加到新数组
  // 如果下次出现重复的 item，那么 map.has(item等于ture 取反 !map.has(item)  不执行
  if (!map.has(item)) {
    map.set(item, true);
    newList3.push(item);
  }
});
console.log("newList3", newList3);
```

:::

## 利用 Array.filter 和 Array.includes 对象数组去重

::: code-group

```js
// 利用 Array.filter 和 Array.includes 去重
let list4 = [
  {
    name: "好先森1",
    id: 1
  },
  {
    name: "好先森1",
    id: 2
  },
  {
    name: "好先森2",
    id: 3
  },
  {
    name: "好先森3",
    id: 3
  }
];

function xxx(arr) {
  let list = [];
  return arr.filter(
    (item) => !list.includes(item.name) && list.push(item.name)
  );
}
console.log("newList9", xxx(list4));
```

:::
