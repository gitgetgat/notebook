# 文本溢出处理

<article-info/>

## 单行溢出

::: code-group

```css
.single-line {
  border: 2px solid #ccc;
  width: 200px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 90px;
  color: #f40;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

:::

## 多行溢出（`-webkit-box` 有些兼容问题）

::: code-group

```css
.single-line {
  border: 2px solid #ccc;
  width: 200px;
  height: 150px;
  line-height: 30px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
```

:::
