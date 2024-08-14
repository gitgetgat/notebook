# 一个盒子不给宽度和高度如何水平垂直居中？

<article-info/>

::: code-group

```html [方式一]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 300px;
        border: 5px solid #ccc;
      }

      .main {
        background: red;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="main">main</div>
    </div>
  </body>
</html>
```

```html [方式二]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .container {
        position: relative;
        width: 300px;
        height: 300px;
        border: 5px solid #ccc;
      }

      .main {
        position: absolute;
        left: 50%;
        top: 50%;
        background: red;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="main">main</div>
    </div>
  </body>
</html>
```

:::
