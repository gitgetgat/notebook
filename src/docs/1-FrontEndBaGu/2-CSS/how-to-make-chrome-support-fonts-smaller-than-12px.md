# 怎么让 Chrome 支持小于 12px 的字体？

<article-info/>

Chrome 默认最小 12px，可以通过缩放实现

::: code-group

```html
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <style type="text/css">
      div {
        font-size: 10px;
      }
      div span {
        display: inline-block;
        -webkit-transform: scale(0.6);
      }
    </style>
  </head>
  <body>
    <div><span>你好呀~</span></div>
  </body>
</html>
```

:::
