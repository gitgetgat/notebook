# CSS 优先级算法如何计算？

<article-info/>

- 优先级比较：!important > 内联样式 > id > class > 标签 > 通配
- CSS 权重计算（从上至下）：

  ::: code-group

  ```text
  !important 权重值：♾️
  内联样式 (style) 权重值：1000
  id 选择器 # 权重值：100
  类选择器 . 权重值：10
  标签&伪元素选择器 权重值：1
  通配、>、+ 权重值：0
  ```

  :::
