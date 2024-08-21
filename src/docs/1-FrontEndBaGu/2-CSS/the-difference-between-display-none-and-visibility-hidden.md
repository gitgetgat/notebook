# display：none 与 visibility：hidden 的区别？

<article-info/>

## 继承：

`display` 不是继承属性，而 `visibility` 是继承属性。

后代元素的 `visibility` 属性若存在，则不会继承； 若不存在，则会继承父元素的 `visibility` 的值。

父元素的 `visibility` 为 `hidden` 但是子元素的 `visibility` 为 `visble` ，那么子元素依旧可见，子元素 `visibility` 属性不存在则子元素不可见。而父元素 `display` 属性设为 `none` 后，子元素全部不可见。

## 作用不同

- `display：none` 作用是将元素设置为无，即此时不占任何位置

- `visibility：hidden` 作用是将该元素隐藏，仍然占据宽度

## 使用 HTML 之后元素的不同

- `display：none` 使用之后元素不占据页面的位置，即 width 和 height 高度等属性为 0

- `visibility: hidden` 使用仍然占据元素的大小，即只是显示隐藏，实际仍然占据文档页面的位置，width、height 属性部不为 0。

## 定义不同

- `visibility` 属性指定一个元素是否是可见的。
- `display` 这个属性用于定义建立布局时元素生成的显示框类型。

## 渲染

页面相关属性改值后是否重新渲染：display: none 渲染，visibility:hidden 不渲染。
