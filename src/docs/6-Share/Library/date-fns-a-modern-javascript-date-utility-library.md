# date-fns - 现代 JavaScript 日期实用工具库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'date-fns',linkUrl:'https://github.com/date-fns/date-fns'},{  linkText:'date-fns 文档',linkUrl:'https://date-fns.org/'}]" />

![/d7ca9fb6-5368-9b7d-a957-60013bdb090e.png](/d7ca9fb6-5368-9b7d-a957-60013bdb090e.png)

## `date-fns` 是什么？

用官网的话来说，`date-fn.js` 就是一个现代 `JavaScript` 日期实用程序库，`date-fns` 为在浏览器和 Node.js 中操作 `JavaScript` 日期提供了最全面、但最简单和一致的工具集。那实际用起来像它说的那么神奇呢，下面就一起来看看吧。

## 安装

安装的话就非常简单了，你可以用 npm/cnpm，或者你还可以用 yarn 安装。

::: code-group

```bash [npm]
npm install date-fns --save
```

```bash [cnpm]
cnpm install date-fns --save
```

```bash [yarn]
yarn add date-fns
```

:::

## 使用

### 引用

::: code-group

```js
import { format, addYears } from "date-fns"; // 根据需要引入方法
```

:::

### 日期格式转换字符串格式

::: code-group

```js
let dateTime = new Date();
console.log(dateTime); // Tue Sep 20 2022 16:08:58 GMT+0800 (中国标准时间)
let currentTime = format(dateTime, "yyyy-MM-dd HH:mm:ss");
console.log(currentTime); // 2022-09-20 16:09:33
```

:::

### 字符串格式转换日期格式

::: code-group

```js
let dateTime = "2022-09-20 16:09:33";
let currentTime = parseISO(dateTime);
console.log(currentTime); // Tue Sep 20 2022 16:09:33 GMT+0800 (中国标准时间)
```

:::

### 现有日期做加/减

|    方法    |  描述  |
| :--------: | :----: |
|  addYears  |  加年  |
|  subYears  |  减年  |
| addMonths  |  加月  |
| subMonths  |  减月  |
|  addWeeks  |  加周  |
|  subWeeks  |  减周  |
|  addDays   |  加天  |
|  subDays   |  减天  |
|  addHours  | 加小时 |
|  subHours  | 减小时 |
| addMinutes | 加分钟 |
| subMinutes | 减分钟 |

::: code-group

```js
// 当前日期减一天
let dateTime = new Date("2022-09-20 16:09:33");
let currentTime = format(subDays(dateTime, 1), "yyyy-MM-dd HH:mm:ss");
console.log(currentTime); // 2022-09-19 16:09:33
```

:::

### 日期之间的比较

::: code-group

```js
// 若 timeOne 大于 timeTwo ，返回 1；反之返回 -1，如果相等则返回 0
let timeOne = new Date("2022-09-20 16:09:33");
let timeTwo = new Date("2022-01-20 21:19:53");
let currentTime = compareAsc(timeOne, timeTwo);
console.log(currentTime); // 1
```

:::

### 日期之间的差值

|        方法         | 描述 |
| :-----------------: | :--: |
|  differenceInYears  |  年  |
| differenceInMonths  |  月  |
|  differenceInWeeks  |  周  |
|  differenceInDays   |  日  |
|  differenceInHours  |  时  |
| differenceInMinutes |  分  |

::: code-group

```js
// 相差多少年
let timeOne = new Date("2022");
let timeTwo = new Date("2015");
let currentTime = differenceInYears(timeOne, timeTwo);
console.log(currentTime); // 7
```

:::

### 判断日期是否为今/昨/明天

判断成立返回 true，反之返回 false

|    方法     | 描述 |
| :---------: | :--: |
|   isToday   | 今天 |
| isYesterday | 昨天 |
| isTomorrow  | 明天 |

::: code-group

```js
// 判断是否为今天
let dateTime = new Date("2022-09-20");
const currentTime = isToday(dateTime);
console.log(currentTime); // true
```

:::

### 获取当天的开始/结束时间

|    方法    |   描述   |
| :--------: | :------: |
| startOfDay | 开始时间 |
|  endOfDay  | 结束时间 |

::: code-group

```js
// 获取今天开始时间
let dateTime = new Date("2022-09-20 16:09:33");
let currentTime = format(startOfDay(dateTime), "yyyy-MM-dd HH:mm:ss");
console.log(currentTime); // 2022-09-20 00:00:00
```

:::

### 获取当月月份的第一天/最后一天

|     方法     |     描述     |
| :----------: | :----------: |
| startOfMonth |  当月第一天  |
|  endOfMonth  | 当月最后一天 |

::: code-group

```js
// 获取当月第一天
let dateTime = new Date("2022-09-20");
let currentTime = format(startOfMonth(dateTime), "yyyy-MM-dd");
console.log(currentTime); // 2022-09-01
```

:::

### 获取传入的日期是哪一年/月/周几/几号

|    方法    |                          描述                          |
| :--------: | :----------------------------------------------------: |
|  getYear   |                         哪一年                         |
|  getMonth  | 哪一个月 注意：因为是从 0 开始，所以最终的结果需要加 1 |
|   getDay   |                          周几                          |
|  getDate   |                          几号                          |
|  getHours  |                          小时                          |
| getMinutes |                          分钟                          |

::: code-group

```js
// 获取传入的日期是哪一年
let dateTime = new Date("2022-12-20");
let currentTime = getYear(dateTime);
console.log(currentTime); // 2022
```

:::

### 获取传入日期所在一年当中的第几周

::: code-group

```js
let dateTime = new Date("2020-01-11");
let currentTime = getISOWeek(dateTime);
console.log(currentTime); // 2
```

:::

### 判断传入的日期是否相等

::: code-group

```js
//  若返回 true，则是相等的，反之若为 false 则不相等
let timeOne = new Date("2020-12-31");
let timeTwo = new Date("2020-11-31");
let currentTime = isEqual(timeOne, timeTwo);
console.log(currentTime); // false
```

:::
