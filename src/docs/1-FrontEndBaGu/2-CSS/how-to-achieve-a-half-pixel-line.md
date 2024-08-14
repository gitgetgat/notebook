# 如何实现一个 0.5px 的线条？

<article-info/>

## 单边框

::: code-group

```html [#️⃣透明到指定颜色的 1px 渐变]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .border {
        width: 200px;
        height: 200px;
        background-color: red;
        margin: 0 auto;
        border-bottom: 1px solid transparent;
        border-image: linear-gradient(to bottom, transparent 50%, Green 50%) 0 0
          100% 0;
      }
    </style>
  </head>
  <body>
    <div class="border"></div>
  </body>
</html>
```

```html [#️⃣伪元素 + background-image]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .border {
        width: 200px;
        height: 200px;
        background-color: red;
        margin: 0 auto;
        position: relative;
      }

      .border::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to bottom, transparent 50%，blue 50%);
      }
    </style>
  </head>
  <body>
    <div class="border"></div>
  </body>
</html>
```

```html [#️⃣定位 + 伪元素 + transfrom 缩放 （scale）]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .border {
        width: 200px;
        height: 200px;
        background-color: red;
        margin: 0 auto;
        position: relative;
      }

      .border::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0px;
        width: 100%;
        height: 1px;
        background: blue;
        transform: scaleY(0.5);
        transform-origin: top;
      }
    </style>
  </head>
  <body>
    <div class="border"></div>
  </body>
</html>
```

:::

## 多边框

::: code-group

```html [#️⃣定位 + 伪元素 + transfrom 缩放 （scale）]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .border {
        width: 200px;
        height: 200px;
        background-color: red;
        margin: 0 auto;
        position: relative;
      }

      .border::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        border: 1px solid blue;
        transform-origin: 0 0;
        transform: scale(0.5);
      }
    </style>
  </head>
  <body>
    <div class="border"></div>
  </body>
</html>
```

:::
