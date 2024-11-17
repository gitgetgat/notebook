# SpinKit，一款神奇的 CSS 开源加载动画旋转器

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'SpinKit.js',linkUrl:'https://github.com/tobiasahlin/SpinKit'},{ linkText:'SpinKit.js 官网',linkUrl:'https://tobiasahlin.com/spinkit/'}]" />

## `SpinKit` 是什么？

`SpinKit` 是基于 `CSS3` 的加载动画库，仅使用 `transform` 和 `opacity` 来创建流畅且易用的动画。他利用 `CSS3` 动画的强大功能，创建了一系列流畅、易于定制的动画效果。接下来，我们将一起讨论下 `SpinKit` 的使用方法和应用场景。

`SpinKit` 的主要特点在于它的简洁性和易用性。它不仅提供了多种风格的动画效果，而每种动画都能通过简单的 `HTML` 和 `CSS` 代码轻松集成到项目。另外，通过学习 `SpinKit` 源码实现，可以更好学习和应用 `CSS3` 。

![/2aae7062-5080-e20f-4ca8-eab56755d1f3.gif](/2aae7062-5080-e20f-4ca8-eab56755d1f3.gif)

如上图所示，`SpinKit` 提供 12 种动画效果。

## 快速开始

在项目中使用 `SpinKit` 是比较方便的，可以通过 `npm` 安装也可以直接下载源码到项目中。

::: code-group

```bash [npm]
npm install spinkit
```

:::

引入 spinkit.css 或者 spinkit.min.css 即可。

::: code-group

```html
<div class="example">
  <div class="sk-chase">
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  </div>
</div>
```

:::

默认情况下，加载器的 `width` 和 `height` 均是 `40px`，`background-color` 是 `#333`。通过覆盖 `--sk-size` 调整宽高 `--sk-color` 调整背景色。

::: code-group

```css
:root {
  --sk-color: #fff; // 设置为白色
}
.example {
  padding: 10px;
  background-color: #1abc9c;
}
```

:::

效果如下：

![/5da0c426-366d-41b6-89cc-9d32427cb603.gif](/5da0c426-366d-41b6-89cc-9d32427cb603.gif)

## 实现原理

`SpinKit` 追逐点加载动画实现源码：

::: code-group

```css
/* 定义追逐动画的容器样式 */
.sk-chase {
  width: 40px;
  height: 40px;
  position: relative; /* 将元素定位为相对定位，以便绝对定位的子元素可以基于此元素定位 */
  animation: sk-chase 2.5s infinite linear both; /* 应用名为sk-chase的动画，持续2.5秒，无限循环，线性时间函数，动画前后状态都保留 */
}
/* 定义追逐点的样式 */
.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute; /* 将元素定位为绝对定位，相对于其最近的已定位（非static）祖先元素定位 */
  left: 0;
  top: 0; /* 将点定位到容器的左上角 */
  animation: sk-chase-dot 2s infinite ease-in-out both; /* 应用名为sk-chase-dot的动画，持续2秒，无限循环，ease-in-out时间函数，动画前后状态都保留 */
}
/* 定义追逐点的伪元素样式 */
.sk-chase-dot:before {
  content: ""; /* 创建一个伪元素 */
  display: block; /* 使伪元素显示为块级元素 */
  width: 25%;
  height: 25%;
  background-color: #fff; /* 设置伪元素的背景颜色为白色 */
  border-radius: 100%; /* 设置伪元素的边框为圆形 */
  animation: sk-chase-dot-before 2s infinite ease-in-out both; /* 应用名为sk-chase-dot-before的动画，持续2秒，无限循环，ease-in-out时间函数，动画前后状态都保留 */
}
/* 为每个追逐点设置不同的动画延迟，以创建连续的动画效果 */
.sk-chase-dot:nth-child(1) {
  animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2) {
  animation-delay: -1s;
}
/* ... 其他点的动画延迟设置类似，逐渐减少以创建追逐效果 */
/* 定义sk-chase动画的关键帧 */
@keyframes sk-chase {
  100% {
    transform: rotate(360deg);
  } /* 动画结束时，元素旋转360度 */
}
/* 定义sk-chase-dot动画的关键帧 */
@keyframes sk-chase-dot {
  80%,
  100% {
    transform: rotate(360deg);
  } /* 动画的80%至100%时间，元素旋转360度 */
}
/* 定义sk-chase-dot-before动画的关键帧 */
@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4); /* 动画的50%时间，伪元素缩小到原来的40% */
  }
  100%,
  0% {
    transform: scale(1); /* 动画的开始和结束时，伪元素恢复到原始大小 */
  }
}
```

:::

更多实现细节，请参考源码。
