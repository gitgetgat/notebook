# 对 BFC 规范（块级格式化上下文：`block formatting content`）的理解

<article-info/>

`BFC` 就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素

1. 了解 `BFC`：块级格式化上下文。
2. `BFC` 的原则：如果一个元素具有 `BFC`，那么内部元素再怎么弄，都不会影响到外面的元素
3. 如何触发 `BFC`:
   - `float` 的值非 `none`
   - `overflow` 的值非 `visible`
   - `display` 的值为：`inline-block、table-cell...`
   - `position` 的值为：`absoute、fixed`
