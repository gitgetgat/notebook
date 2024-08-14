# 双飞翼（圣杯）布局

<article-info/>

::: code-group

```css
.parent {
  height: 300px;
}
.left,
.right,
.center {
  height: 300px;
  float: left;
}
.left,
.right {
  width: 300px;
}
.left {
  background-color: brown;
  margin-left: -100%;
}
.center {
  width: 100%;
  background-color: darkgoldenrod;
}
.right {
  background-color: purple;
  margin-left: -300px;
}
.inner {
  height: 300px;
  background-color: skyblue;
  margin-left: 300px;
  margin-right: 300px;
}
```

:::

::: code-group

```html
<div class="parent">
  <div class="center">
    <div class="inner"></div>
  </div>
  <div class="left"></div>
  <div class="right"></div>
</div>
```

:::
