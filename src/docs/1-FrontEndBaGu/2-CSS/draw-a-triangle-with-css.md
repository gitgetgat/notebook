# 用 CSS 画一个三角形

<article-info/>

主要运用了 `border` 属性

在宽高均为 0 的时候，每个边框其实都是一个三角形，边框重合，由 `边角` 向盒子 `中心` 分开

::: code-group

```css
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #000;
}
```

:::
