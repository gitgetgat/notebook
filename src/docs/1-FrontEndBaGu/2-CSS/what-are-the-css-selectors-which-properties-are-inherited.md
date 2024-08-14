# CSS 选择符有哪些？哪些属性可以继承？

<article-info/>

## CSS 选择符

|     描述     |     选择器      |
| :----------: | :-------------: |
|     通配     |       `*`       |
|  id 选择器   |       `#`       |
|   类选择器   |       `.`       |
|  标签选择器  | `div、p、h1...` |
|  相邻选择器  |       `+`       |
|  后代选择器  |     `ul li`     |
| 子元素选择器 |       `>`       |
|  属性选择器  |    `a[href]`    |

## 可以被继承的 CSS 属性

1. 字体系列属性：`font`、`font-family`、`font-weight`、`font-size`、`fontstyle`；
2. 文本系列属性：
   - 内联元素：`color`、`line-height`、`word-spacing（设置单词之间的间距）`、`letter-spacing（设置文本字符间距）`、 `text-transform（用于设置文本的大小写：uppercase 所有字符强制转为大写，lowercase 转小写，capitalize 首字符强制转为大写）`；
   - 块级元素：`text-indent`、`text-align`；
3. 元素可见性：`visibility`
4. 表格布局属性：`caption-side（标题位置）`、`border-collapse（设置边框分离还是合并）`、`border-spacing（边框分离状态下设置边框间距）`、`empty-cells（定义如何渲染无可视内容的单元格边框和背景）`、`table-layout（定义用于布局单元格行和列的算法）`;
5. 列表布局属性：`list-style`

## 不可以被继承的 CSS 属性

1. display：规定元素应该生成的框的类型；
2. 文本属性：vertical-align、text-decoration（用于设置文本的修饰线外观包括上/下划线，管穿线，删除线，闪烁）；
3. 盒子模型的属性：width、height、margin、border、padding；
4. 背景属性：background、background-color、background-image；
5. 定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、maxwidth、max-height、overflow、clip；
