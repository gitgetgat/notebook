# date-fns 一款神奇的 JavaScript 开源模块化日期工具库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'date-fns',linkUrl:'https://github.com/date-fns/date-fns'},{ linkText:'date-fns 官网',linkUrl:'https://date-fns.org'}]" />

在前端开发中，日期处理是一个常见的任务。JavaScript 中的 Date 对象虽然功能强大，但使用起来并不总是那么直观。date-fns 是一个现代的 JavaScript 日期库，它提供了简单、一致且全面的日期操作工具集。它类似于日期处理方面的 Lodash，拥有超过 200 个函数来满足各种需求。

![/cbb6763e-372a-8d4f-f89e-2a96fe697969.png](/cbb6763e-372a-8d4f-f89e-2a96fe697969.png)

## 为什么选择 `date-fns`？

1. <imp-text-danger>模块化</imp-text-danger>：`date-fns` 采用了模块化的设计，你可以根据需要导入特定的函数，而不是整个库。按需导入的方式有助于减少最终打包的体积，在使用模块打包器如 `webpack`、`Browserify` 或 `Rollup` 时，配合 `tree-shaking` 功能可以进一步减小体积。

2. <imp-text-danger>不可变性和纯函数</imp-text-danger>：`date-fns` 中的函数是不可变的，不会改变传入的日期对象，而是返回一个新的日期实例。这种设计有助于防止错误并避免长时间的调试会话。

3. <imp-text-danger>`TypeScript` 支持</imp-text-danger>：`date-fns` 完全支持 TypeScript，提供了手写的类型定义，确保了类型安全。

4. <imp-text-danger>国际化（i18n）</imp-text-danger>：`date-fns` 支持多种语言环境，可以根据需要导入特定语言的本地化资源。

5. <imp-text-danger>性能</imp-text-danger>：`date-fns` 专注于性能，每个函数都经过优化，以确保用户体验。

## 如何使用 `date-fns`？

首先，你需要通过 `npm` 或 `yarn` 安装 `date-fns`：

::: code-group

```bash [npm]
npm install date-fns --save
```

```bash [yarn]
yarn add date-fns
```

:::

然后，你可以在你的 `JavaScript` 文件中导入所需的函数。例如，如果你需要格式化日期和计算日期差，你可以这样做：

::: code-group

```js
import { format, formatDistance } from "date-fns";

const now = new Date();
const daysAgo = formatDistance(new Date(now - 24 * 60 * 60 * 1000), now);

console.log(format(now, "yyyy-MM-dd")); // 输出格式化的日期
console.log(daysAgo); // 输出 "1 day ago"
```

:::

## 深入 `date-fns` 的一些高级用法

### 日期比较

`date-fns` 提供了 `compareAsc` 和 `compareDesc` 函数，用于比较两个日期并按升序或降序排列。

::: code-group

```js
import { compareAsc, compareDesc } from "date-fns";

const date1 = new Date(2024, 0, 1);
const date2 = new Date(2024, 0, 2);

console.log(compareAsc(date1, date2) === -1); // true
console.log(compareDesc(date1, date2) === 1); // true
```

:::

### 处理日期范围

在处理日期范围时，`date-fns` 提供了如 `eachDay` 这样的函数，它可以生成一个包含范围内每一天的数组。

::: code-group

```js
import { eachDay } from "date-fns";

const start = new Date(2024, 0, 1);
const end = new Date(2024, 0, 7);
const range = eachDay(start, end);

console.log(range); // 输出从 2024-01-01 到 2024-01-07 的每一天
```

:::

### 格式化和解析日期

`date-fns` 支持多种日期格式，你可以使用 `format` 函数来格式化日期，使用 `parseISO` 来解析 `ISO` 格式的日期字符串。

::: code-group

```js
import { format, parseISO } from "date-fns";

const now = new Date();
const formatted = format(now, "yyyy-MM-dd");
const parsed = parseISO("2024-01-01");

console.log(formatted); // 输出格式化的日期
console.log(parsed); // 输出解析后的日期对象
```

:::

## 同类库比较

比较 `Moment.js`、`Day.js` 和 `date-fns` 的特点：

- `Moment.js` 曾经是最受欢迎的日期处理库之一，由于其已经宣布停止开发，且库文件较大，对于新项目来说可能不是最佳选择。它提供了丰富的功能，但体积较大，可能会增加应用程序的加载时间和内存占用。

- `Day.js` 是一个轻量级的库，设计为 `Moment.js` 的替代品，API 与 `Moment.js` 高度相似，易于迁移。它提供了不可变的对象和链式操作，适合需要高性能和轻量级解决方案的项目。`Day.js` 也支持插件系统，可以通过插件来扩展其功能 。

- `date-fns` 提供了大约 200 多种功能，适用于所有场合，并且是模块化的，允许只导入需要的部分，可以显著减少应用程序的大小。函数式编程风格使得代码更易于理解和测试，非常适合并发环境。`date-fns` 还支持国际化和时区处理 。

`Day.js` 和 `date-fns` 都能很好地满足常见的日期处理需求，并且可以大幅减小应用的体积。如果考虑到兼容性，可以优先考虑 `Day.js`；喜欢模块化的朋友可以考虑 date-fns。
