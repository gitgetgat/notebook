# 行盒排列空隙在上线后消失的问题——图片间隙变小

<article-info/>

## 问题描述：

代码经由运维发布后，图片之间的间隙比起本地开发时变窄了

## 问题原因：

::: code-group

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      img {
        width: 200px;
        height: 200px;
        margin: 0 10px;
      }
    </style>
  </head>
  <body>
    <img src="./test.png" alt="" /> <!-- 后面的换行符 -->
    <img src="./test.png" alt="" />
    <img src="./test.png" alt="" />
  </body>
</html>
```

:::

![/dbbb2086-fa68-df6e-f686-4c545a382371.png](/dbbb2086-fa68-df6e-f686-4c545a382371.png)

但是在运维发布时，会将代码里的换行符、空格删掉，导致比起本地少了这个间隙。

::: tip
**而且浏览器的这个问题只会在行盒、行块盒排列是起作用。**
:::

## 解决方案：

使用弹性布局，或者浮动
