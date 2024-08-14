# 隐藏元素的方法有哪些？

<article-info/>

::: code-group

```css
.hide {
  display: none; /* 元素在页面上消失，不占据空间 */
  opacity: 0; /* 设置了元素的透明度为 0，元素不可见，占据空间位置 */
  visibility: hidden; /* 让元素消失，占据空间位置，一种不可见的状态 */
  position: absolute;
  left: -2000px;
  top: -2000px; /* 脱离文档流，扔到页面不可见区域 */
  clip-path: polygon(
    0px 0px,
    0px 0px,
    0px 0px,
    0px 0px
  ); /* 剪切出要展示的部分，其余部分隐藏，占据空间位置 */
  transfrom: scale(0); /* 元素缩放为 0，默认缩放原点为中心，占据空间位置 */
}
```

:::
