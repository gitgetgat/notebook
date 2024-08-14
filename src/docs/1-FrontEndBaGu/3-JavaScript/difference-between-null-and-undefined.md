# null 和 undefined 的区别

<article-info/>

- 作者在设计 `js` 的都是先设计的 `null` (为什么设计了 `null`: 最初设计 `js` 的时候借鉴了 `java` 的语言)
- `null` 会被隐式转换成 `0`，很不容易发现错误
- 先有 `null` 后有 `undefined` ，出来 `undefined` 是为了填补之前的坑
- 具体区别：`JavaScript` 的最初版本是这样区分的: `null` 是一个表示"无"的对象 (空对象指针)，转为数值时为 `0`；`undefined` 是一个表示"无"的原始值，转为数值时为 `NaN`
