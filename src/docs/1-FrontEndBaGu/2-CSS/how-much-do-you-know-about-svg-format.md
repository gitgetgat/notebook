# svg 格式了解多少 ？

<article-info/>

<script setup>
import ExpSvg from '../../../../components/example/exp-svg.vue'
</script>

## SVG 是什么

SVG 英文全称为 Scalable vector Graphics，意思为可缩放的矢量图。基于 XML 语法格式的图像格式，其他图像是基于像素的，SVG 是属于对图像形状（路径）的描述，本质是文本文件，体积小，并且不管放大多少倍都不会失真

- SVG 可直接插入页面中，成为 DOM 一部分，然后用 JS 或 CSS 进行操作；SVG 有多种绘制路径、框、园、文本和图形图像的方法。

  ::: code-group

  ```html
  <svg width="220" height="220">
    <!-- x:水平坐标轴 -->
    <!-- y：垂直坐标轴 -->
    <!-- rx：矩形圆角是以r为半径画圆 -->
    <!-- fill="nono"：无填充颜色 -->
    <rect
      x="5"
      y="5"
      width="200"
      height="200"
      fill="none"
      stroke="green"
      stroke-width="5"
      rx="5"
    ></rect>
  </svg>
  ```

  :::

  示例如下 :point_down:

  <ExpSvg type="rect" />

::: code-group

```html
<svg width="500" height="340">
  <!-- 绘制圆形：使用 circle  还可以使用 rect 标签结合圆角的值实现圆形或椭圆形的绘制 -->
  <!-- cx: 圆形的中心点x轴坐标 -->
  <!-- cy: 圆形的中心点y轴坐标 -->
  <!-- r: 圆的半径 -->
  <!-- fill-opacity: 设置填充的透明度 -->
  <!-- stroke-opacity: 设置线条得透明度 -->
  <!-- 绘制圆形 circle -->
  <circle
    cx="380"
    cy="200"
    r="100"
    fill="red"
    stroke="green"
    stroke-width="10"
    stroke-opacity="0.3"
  ></circle>
  <!-- 绘制椭圆ellipse -->
  <ellipse cx="200" cy="100" rx="108" ry="50"></ellipse>
</svg>
```

:::

示例如下 :point_down:

  <ExpSvg type="circle" />

::: code-group

```html
<svg width="200" height="200">
  <!-- 绘制折线 polyline 多段线-->
  <polyline
    points="20,0,20,120,70,120"
    stroke="green"
    stroke-width="5"
    fill="none"
  ></polyline>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <!-- x1 属性在 x 轴定义线条的开始-->
  <!-- y1 属性在 y 轴定义线条的开始-->
  <!-- x2 属性在 x 轴定义线条的结束-->
  <!-- y2 属性在 y 轴定义线条的结束-->
  <line
    x1="0"
    y1="0"
    x2="200"
    y2="200"
    style="stroke:rgb(255,0,0);stroke-width:5"
  />
</svg>
```

:::

示例如下 :point_down:

  <ExpSvg type="line" />

## SVG 动画

1.  SVG 中提供三种常用动画标记

    `<animate>`基础动画

    `<animateTransform>`形变动画

    `<animatenMotion>`路径动画

2.  SVG 动画使用方式

    创建动画，告诉动画标记哪个元素需要执行动画

    创建元素，在元素中说明需要执行什么动画

3.  SVG 动画属性

    attributeType：CSS/XML 规定的属性值的名称空间

    attributeName：规定元素的哪个属性会产生动画效果

    from/to：从哪到哪

    dur：动画时长

    fill：动画结束之后的状态，保持 freeze 结束状态/remowe 回复初始状态

4.  基础动画

    ::: code-group

    ```html
    <svg width="200" height="200">
      <circle cx="100" cy="100" r="5">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          attributeType="XML"
          from="0"
          to="100"
          dur="5"
          fill="freeze"
        ></animate>
        <animate
          attributeName="fill"
          attributeType="XML"
          from="red"
          to="green"
          dur="5"
          fill="freeze"
        />
      </circle>
    </svg>
    ```

    :::

    示例如下 :point_down:

    <ExpSvg type="animate1" />

    ::: code-group

    ```html
    <svg width="800" height="800">
      <circle cx="100" cy="100" r="5">
        <!-- 点击后动画开始执行 -->
        <animate
          attributeName="r"
          repeatCount="indefinite"
          attributeType="XML"
          from="0"
          to="100"
          begin="click"
          dur="5"
          fill="freeze"
        ></animate>
        <animate
          attributeName="fill"
          attributeType="XML"
          from="red"
          to="green"
          begin="3"
          dur="5"
          fill="freeze"
        ></animate>
        <animate
          id="to"
          attributeName="cx"
          attributeType="XML"
          from="100"
          to="500"
          begin="click"
          dur="5"
          fill="freeze"
        ></animate>
        <animate
          id="toLeft"
          attributeName="cx"
          attributeType="XML"
          from="500"
          to="100"
          begin="to.end"
          dur="5"
          fill="freeze"
        ></animate>
      </circle>
    </svg>
    ```

    :::

    示例如下 :point_down:

    ::: tip
    点击后动画开始执行
    :::

    <ExpSvg type="animate2" />

5.  SVG 动画常用属性

    `repeatCount="次数/indefinite"` 规定动画重复的次数

    `repeatDur="持续时间/indefinite"`规定动画重复总时长

    `begin`：规定动画开始的时间

    - `begin="1s"`
    - `begin="click"`
    - `begin="click + 1s"`
    - `restart`：规定元素开始动画后，是否可以被重新开始执行
    - `always`：动画可以在任何时候被重置。默认值
    - `whnNoActive`：只有在动画没有被激活的时候才能被重置，例如在动画结束之后
    - `never`：在整个 SVG 自行过程中，元素动画不能被重置

    `calcMode`：非连续动画。没有动画效果瞬间完成

    `linear`：默认属性，匀速动画

    `discrele`：非连续动画，没有动画效果瞬间完成

    `paced`：规定整个动画效果始终以扫同的速度进行，设置 keyTimes 属性无效

    `spline`：配合 `ksyplines` 属性来定义各个动画过渡，自定义动画

    `keyTimes`：划分动画时间片段，取值 0-1

    `values`：划分对应取值片段的值

6.  `Path` 设置路径时每个字母代表的含义：

    - `M = moveto`

    - `L = lineto`

    - `H = horizontal lineto`

    - `V = vertical lineto`

    - `C = curveto 弯曲`

    - `S = smooth curveto 平滑曲线`

    - `Q = quadratic Bézier curve`

    - `T = smooth quadratic Bézier curveto`

    - `A = elliptical Arc 椭圆弧`

    - `Z = closepath 闭合路径`

7.  SVG 路径动画

    ::: code-group

    ```html
    <svg width="500" height="350" viewBox="-100 -100 500 350">
      <path
        d="M0 0 c0 300 300 300 300 0"
        stroke="red"
        stroke-width="2"
        fill="none"
      ></path>
      <rect x="0" y="0" width="40" height="40" fill="lightgreen">
        <animateMotion
          path="M0 0 c0 300 300 300 300 0"
          dur="5s"
          begin="click"
          fill="freeze"
          rotate="auto"
        />
      </rect>
    </svg>
    ```

    :::

    示例如下 :point_down:

    ::: tip
    点击方块后动画开始执行
    :::

    <ExpSvg type="animate3" />

## SVG 可作为文件被引入

::: code-group

```html
<img src="pic.svg”/>
```

:::

## SVG 优势

与其他图像格式相比（比如 `JPEG` 和 `GIF`），使用 `SVG` 的优势在于:

- SVG 图像可通过文本编辑器来创建和修改
- SVG 图像可被搜索、索引、脚本化或压缩
- SVG 是可伸缩的
- SVG 图像可在任何的分辨率下被高质量地打印
- SVG 可在图像质量不下降的情况下被放大

## Canvas 与 SVG 的比较

- Canvas

  依赖分辨率 不支持事件处理器 弱的文本渲染能力 能够以`.png` 或 `.jpg` 格式保存结果图像 最适合囵像密集型的游戏，其中的许多对象会被频繁重绘

- SVG

  不依赖分辨率 支持事件处理器 最适合带有大型渲染区域的应用程序（比如谷歌地图）复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快） 不适合游戏应用

## SVG 可以转为 base64 引入页面
