# 小数运算不精确

<article-info/>

## 问题描述

js 在计算小数计算如 1-0.2 的时候会丢失精度，即 1-0.2 = 0.19999999999999996；

例如：

::: code-group

```js
console.log(1 - 0.8); //输出 0.19999999999999996
console.log(6 * 0.7); //输出 4.199999999999999
console.log(0.1 + 0.2); //输出 0.30000000000000004
console.log(0.1 + 0.7); //输出 0.7999999999999999
console.log(1.2 / 0.2); //输出 5.999999999999999
```

:::

## 产生原因

计算机能读懂的是二进制，进行运算的时候，实际上是把数字转换为了二进制进行的 这个过程 丢失了精度

数字存储二进制，是遵循 `乘2取整，顺序排列` 原则

::: code-group

```js [正常转换]
0.125(10进制) =》 001(2进制)

0.125 * 2 = 0.25    0
0.25  * 2 = 0.5     0
0.5   * 2 = 1.0     1
0.0                结束
```

```js ["错误"转换]
0.2(10进制) =》 0011 0011 ...(2进制)

0.2 * 2 = 0.4    0
0.4 * 2 = 0.8    0
0.8 * 2 = 1.6    1
0.6 * 2 = 1.2    1
... 无限循环
```

:::

## 解决方案

1. 通用解决办法：根据上述原理 做一下修改小数点截取转数字在计算，可以封装一些方法出来解决此类问题。如下所示（Math.pow(x, y);表示求 x 的 y 次方）

   ::: code-group

   ```js
   function floatAdd(arg1, arg2) {
     var r1, r2, m;
     try {
       r1 = arg1.toString().split(".")[1].length;
     } catch (e) {
       r1 = 0;
     }
     try {
       r2 = arg2.toString().split(".")[1].length;
     } catch (e) {
       r2 = 0;
     }
     m = Math.pow(10, Math.max(r1, r2));
     return (arg1 * m + arg2 * m) / m;
   }

   //减
   function floatSub(arg1, arg2) {
     var r1, r2, m, n;
     try {
       r1 = arg1.toString().split(".")[1].length;
     } catch (e) {
       r1 = 0;
     }
     try {
       r2 = arg2.toString().split(".")[1].length;
     } catch (e) {
       r2 = 0;
     }
     m = Math.pow(10, Math.max(r1, r2));
     //动态控制精度长度
     n = r1 >= r2 ? r1 : r2;
     return ((arg1 * m - arg2 * m) / m).toFixed(n);
   }

   //乘
   function floatMul(arg1, arg2) {
     var m = 0,
       s1 = arg1.toString(),
       s2 = arg2.toString();
     try {
       m += s1.split(".")[1].length;
     } catch (e) {}
     try {
       m += s2.split(".")[1].length;
     } catch (e) {}
     return (
       (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
       Math.pow(10, m)
     );
   }

   //除
   function floatDiv(arg1, arg2) {
     var t1 = 0,
       t2 = 0,
       r1,
       r2;
     try {
       t1 = arg1.toString().split(".")[1].length;
     } catch (e) {}
     try {
       t2 = arg2.toString().split(".")[1].length;
     } catch (e) {}

     r1 = Number(arg1.toString().replace(".", ""));

     r2 = Number(arg2.toString().replace(".", ""));
     return (r1 / r2) * Math.pow(10, t2 - t1);
   }
   ```

   :::

2. 补充解决方案：

   使用 `toFixed()`，假如丢失精度之前是三位小数，就 `a.toFixed(3)`，表示保留三位小数，`toFixed()` 函数会四舍五入（保留三位小数的话假如第四位大于等于 5，第三位会加一）。

   在特定情况下会存在问题，`（105.1 * 10000）/ 12 = 12511.905`，但是丢失精度会变成 `12511.9049999`，如果保留两位小数会错误

3. 最有效方案：

   ::: code-group

   ```jsx
   const $math = require("mathjs");

   function comp(_func, args) {
     let t = $math.chain($math.bignumber(args[0]));
     for (let i = 1; i < args.length; i++) {
       t = t[_func]($math.bignumber(args[i]));
     }
     // 防止超过6位使用科学计数法
     return parseFloat(t.done());
   }

   // 处理精度丢失问题
   export const math = {
     // 加法运算
     add() {
       return comp("add", arguments);
     },
     // 减法运算
     subtract() {
       return comp("subtract", arguments);
     },
     // 乘法运算
     multiply() {
       return comp("multiply", arguments);
     },
     // 除法运算
     divide() {
       return comp("divide", arguments);
     }
   };
   ```

   :::
