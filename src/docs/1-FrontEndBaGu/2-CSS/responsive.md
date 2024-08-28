# 响应式

<article-info/>

<link-tag :linkList="[{ linkType: 'zhihu', linkText:'传送门：自适应方案和高清方案',linkUrl:'https://zhuanlan.zhihu.com/p/498604865'}]" />

## 自适应方案

### rem

- 适配思路
  - 选择一个尺寸作为设计和开发基准
  - 定义一套适配规则，自动适配剩余的尺寸
  - 特殊适配效果给出设计效果
- 属于 **`历史产物`**，CSS 视窗单位未得到主流浏览器的支持
- 原理
  - 根据视窗宽度动态调整根元素 `html` 的 `font-size` 的值
  - 把总宽度设置为 100 份，每一份被称为一个单位 x，同时设置  `1rem`  单位为  `10x`
- 缺点
  - 需要加载 js 脚本，而且根据设备的视窗宽度进行计算，影响性能
- 影响力：从 2015 年出世至今，在 H5 适配领域占据一定比例
- 相关技术库：<link-tag :linkList="[{ linkType: 'git', linkText:'flexible',linkUrl:'https://link.zhihu.com/?target=https%3A//github.com/amfe/lib-flexible'},{ linkType: 'git', linkText:'px2rem',linkUrl:'https://link.zhihu.com/?target=https%3A//github.com/songsiqi/px2rem'}]" />

### vw

- 适配思路（如上）
- 原理
  - 利用 CSS 视窗的特性，总宽度为  `100vw`，每一份为一个单位  `1vw`，设置  `1rem`  单位为  `10vw`
- 缺点
  - 因为是根据视图的宽度计算，所以不适用 平板 和 PC
- 影响力：2018 年出的方案，目前 H5 适配主流
- 相关技术库：<link-tag :linkList="[{ linkType: 'git', linkText:'postcss-px-to-viewport',linkUrl:'https://link.zhihu.com/?target=https%3A//github.com/evrone/postcss-px-to-viewport'}]" />

### px + calc + clamp

- 适配思路
  - 根据 CSS 的新特性：css 变量、calc()函数、clamp()、@container 函数实现
- 特点
  - 解决了 rem、vw 布局的致命缺点：<el-text type="success" size="large">失去像素的完美性，而且一旦屏幕低于或高于某个阈值，通常就会出现布局的移动或文字内容的溢出</el-text>
  - 大漠在 2021 年提出，最先进，但没看到大厂使用（clamp 函数浏览器支持率暂且不高），具体可以看看大漠的这篇：<link-tag :linkList="[{ linkType: 'zhihu', linkText:'传送门：如何构建一个完美缩放的UI界面',linkUrl:'https://link.zhihu.com/?target=https%3A//www.w3cplus.com/css/how-to-get-a-pixel-perfect-and-linearly-scaled-ui.html'}]" />
- 缺点
  - 因为方案先进，暂没看到大厂使用

## 高清方案

- 1 像素问题的解决方案
- 不同 DPR 下图片的高清解决方案

综上，自适应方案是解决 **`各终端的适配问题`**，高清方案是解决 **`Retina屏的细节处理`**

## 写在前面

在说移动端适配方案之前先整明白一些技术概念

### 设备独立像素

`设备独立像素（DIP）=== CSS 像素 === 逻辑像素`，在 Chrome 中能直接看到 375\* 667

![/9d2d2808-e7b7-456b-f891-797bfbc53a54.png](/9d2d2808-e7b7-456b-f891-797bfbc53a54.png)

当你看到设备独立像素时，不要慌，它表示 CSS 像素，而它的长宽就是在 Chrome 中所查到的。可这样记忆，“设备独立像素”，字数长，文绉绉就是 CSS 像素，也是理论上人为给定的指标，也叫逻辑像素

### 物理像素

物理像素可以理解为手机厂商在卖手机时宣传的分辨率，即物理像素 = 分辨率，它表示垂直和水平上所具有的像素点数

也就是说设备屏幕的水平方向上有 1920 像素点，垂直方向有 1080 像素点（假设屏幕分辨率为 1920\*1080），即屏幕分辨率表示物理像素，它在出厂时就定下来，单位为 pt，`1pt=0.376mm`

![/d38343f7-5fad-a44b-fbe3-738310a66f18.png](/d38343f7-5fad-a44b-fbe3-738310a66f18.png)

物理像素，又被称为设备像素，即表示 `设备像素 === 物理像素`。可这样记忆，设备在物理世界能测量的长度

### DPR（Device Pixel Ratio）

而设备像素比（`DPR`）是什么？

`DPR = 设备像素 / 设备独立像素`，它通常与视网膜屏（Retina 屏）有关

以 iPhone7 为例子，iPhone7 的 `DPR = iPhone7 物理像素 / iPhone7 设备独立像素 = 2`

::: info
宽 1334 / 667 = 2

750 / 375 = 2
:::

得到 iPhone7 的 DPR 为 2，也就是我们常说的视网膜屏幕，而这就是营销术语，它就是因为技术的进步，使得一个 CSS 像素塞入更多的物理像素

- CSS 像素（设备独立像素）就像一个容器，以前是一比一塞入，所以 DPR 为 1，后来技术发展进步了，一个容器中能塞入更多的真实像素（物理像素）
- DPR = 设备像素 / 设备独立像素
- DPR = 物理像素（真实）/ CSS 像素（虚的）

在视网膜屏幕中，以 DPR = 2 为例，把 4（2x2）个物理像素当一个 CSS 像素使用，这样让屏幕看起来更加清晰（精致），但是元素的大小（CSS 像素）本身不会改变

![/6033efd2-ecdc-1214-63ce-d86cbae7f154.png](/6033efd2-ecdc-1214-63ce-d86cbae7f154.png)

随着硬件的发展，像 iPhone13 Pro 等手机的 DPR 已经为 3，未来 DPR 突破 4 不是问题

说回来，DPR 为 2 或 3 会有什么问题？我们以 CSS 为最小单位来写代码的，展示在屏幕上也是以 CSS 为最小单位来展示，也就是说在 DPR 为 2 时，我们想要模拟  `1 单位物理像素`是做不到的（如果浏览器支持用  `0.5px` CSS 的话，可以模拟，但是 DPR 为 3 呢，用  `0.333px`？）；又因为手机的设备独立像素（CSS 像素）固定，使用传统静态布局（固定 px）时，会出现样式的错位

::: info
iPhone 5/SE: 320 \* 568 DPR: 2

iPhone 6/7/8: 375 \* 667 DPR: 2

iPhone 6/7/8 Plus: 414\* 736 DPR: 3

iPhone X: 375 \* 812 DPR: 3
:::

所以我们要适配各终端的 CSS 像素以及不同 DPR 下，出现的 1 像素问题、图片高清问题等。随着技术的发展，前端们摆脱了 IE 的兼容，同时陷入了各大手机品牌的兼容沼泽

## 自适应方案

### Rem 布局——天下第二

简介：rem 就是相对于根元素 html 的 font-size 来做计算

与 rem 相关联的是 em：

::: tip
em 作为 font-size 单位时，其代表父元素的字体大小，em 作为其它属性单位时，代表自身字体大小

rem 作用于非根元素时，相对于根元素字体大小，rem 作用于根元素字体时，相对于其初始字体大小
:::

本质：<el-text type="success" size="large">等比缩放</el-text>，是通过 JavaScript 来模拟 vw 的特性

假设将屏幕宽度平均分为 100 份，每一份的宽度用 x 表示，x = 屏幕宽度 / 100，如果将 x 作为单位，x 前面的数值就代表屏幕宽度的百分比

::: code-group

```css
p {
  width: 50x;
} /* 屏幕宽度的 50% */
```

:::

如果想要页面元素随着屏幕宽度等比变化，我们就需要上面的 x，这个 x 就是 vw，但是 vw 是在浏览器支持后才大规模使用，在此之前，js + rem 可模拟这种效果

之前说了，rem 作用于非根元素时，相对于根元素字体大小，所以我们设置根元素单位后，非根元素使用 rem 做相对单位

::: code-group

```css
html {
  font-size: 16px;
}
p {
  width: 2rem;
} /* 32px */

html {
  font-size: 32px;
}
p {
  width: 2rem;
} /* 64px */
```

:::

问题来了，我们要获取到一个动态的根元素 font-size，并以此变化各个元素大小

::: tip
有趣的是，我司两个项目目前的做法是通过媒体查询设置根元素，分为四档，默认 16px

笔者对这种做法表示不理解，原开发人员说我们这套运行了 6 年，UI 适配也没人说什么问题。这里就有个疑问了，真的如他所说 UI 适配的很好吗，”媒体查询根元素+rem“也能适配好吗？是否完美呢？
:::

但是根元素的 font-size 怎么变化，它不可能一直是 16px，在中大屏下还可以，但是在小屏下字体就太大了，所以它的大小也应该是动态获取的。如何让其动态化，就是上文所说，让根元素的 font-size 大小恒等于屏幕宽度的 1/100

::: code-group

```css
html {
  font-size: width / 100;
}
```

:::

如何设置 html 的字体大小恒等于屏幕宽度的百分之一呢？可以通过 js 来设置，一般需在页面 dom ready、resize 和屏幕旋转中设置

::: code-group

```js
document.documentElement.style.fontSize =
  document.documentElement.clientWidth / 100 + "px";
```

:::

> <link-tag :linkList="[{ linkType: 'zhihu', linkText:'flexible 源码',linkUrl:'https://link.zhihu.com/?target=https%3A//github.com/amfe/lib-flexible/blob/2.0/index.js%23L18'}]" /> 就如以上思路写的

我们设置了百分之一的宽度后，在写 css 时，就需要利用 scss/less 等 css 处理器来对 css 编译处理。假设给出的设计图为 750 \* 1334，其中一个元素宽度为 200 px，根据公式：

::: code-group

```css
width: 200 / 750 * 100 = 26.67 rem;
```

:::

在 sass 中，需要设置设计图宽度来做换算：

::: code-group

```css
@use "sass:math";

$width: 750px;

@function px2rem($px) {
  @return #{math.div($px, $width) * 100}rem;
}
```

:::

上面编译完后

::: code-group

```css
div {
  width: 26.667rem;
}
```

:::

在不同尺寸下，它的宽度不同

| 机型              | 尺寸       | width              |
| ----------------- | ---------- | ------------------ |
| iPhone 5/SE       | 320 \* 568 | 170 \* 170         |
| iPhone 6/7/8      | 375 \* 667 | 200 \* 200         |
| iPhone 6/7/8 Plus | 414 \* 736 | 220.797 \* 220.797 |
| iPhone X          | 375 \* 812 | 200 \* 200         |

效果如下（特意说明：图中演示的是引入 flexible 库，它的根元素的 font-size 为屏幕的 1/10）

![https://pic2.zhimg.com/v2-6b8f21729d04aa5a5933e4dea6bb6fc9_b.webp](https://pic2.zhimg.com/v2-6b8f21729d04aa5a5933e4dea6bb6fc9_b.webp)

<link-tag :linkList="[{ linkType: 'zhihu', linkText:'传送门：REM 布局(flexible) DEMO',linkUrl:'https://link.zhihu.com/?target=https%3A//demo.azhubaby.com/%25E8%2587%25AA%25E9%2580%2582%25E5%25BA%2594%25E6%2596%25B9%25E6%25A1%2588/flexible/index.html'}]" />

优点：rem 的兼容性能低到 ios 4.1，android 2.1

缺点：

- 等比放大（可以说优点也可以理解为缺点，不同场景下使用）
  - 用户选择大屏幕有几个出发点，有些人想要更大的字体，更大的图片，有些人想要更多的内容，并不想要更大的图标
- 字体大小不能使用 rem（一般使用媒体查询控制 font-size 大小）
- 在 PC 端浏览破相，一般设置一个最大宽度

::: code-group

```js
var clientWidth = document.documentElement.clientWidth;
clientWidth = clientWidth < 780 ? clientWidth : 780;
document.documentElement.style.fontSize = clientWidth / 100 + 'px';

body {
 margin: auto;
 width: 100rem;
}
```

:::

- 如果用户禁止 js 怎么办？
  - 添加 `noscripe` 标签提示用户
  - `<noscript>开启JavaScript，获得更好的体验</noscript>`
  - 给 HTML 添加一个 默认字体大小

相关技术方案：flexible（`amfe-flexible`  或者  `lib-flexible`） + `postcss-pxtorem`

### Viewport 布局——天不生我 VW，适配万古如长夜

`vw` 是基于 `Viewport` 视窗的长度单位，这里的视窗（`Viewport`） 指的是浏览器可视化的区域，而这个可视区域是 `window.innerWidth/window.innerHeight` 的大小

根据 CSS Values and Units Module Level 4： `vw` 等于初始包含块（html 元素）宽度的 `1%`，也就是

- `1vw`  等于  `window.innerWidth`  的数值的 `1%`
- `1vh`  等于  `window.innerHeight`  的数值的 `1%`

看图理解

![/627e507d-249f-9dcb-4c18-b76089970a79.png](/627e507d-249f-9dcb-4c18-b76089970a79.png)

在说 `rem` 布局时，曾经举过 x 的例子，x 就是 vw

::: code-group

```css
/* rem 方案 */
html {
  font-size: width / 100;
}
div {
  width: 26.67rem;
}

/* vw 方案 */
div {
  width: 26.67vw;
}
vw 还可以和 rem 方案结合，这样计算 html 字体大小就不需要 js 了 html {
  font-size: 1vw;
}
div {
  width: 26.67rem;
}
```

:::

效果如下：

![https://pic4.zhimg.com/v2-fa55caf8c417b1ba789dc96d07079937_b.webp](https://pic4.zhimg.com/v2-fa55caf8c417b1ba789dc96d07079937_b.webp)

`vw` 适配是 `CSS` 原生支持，而且目前兼容性大多数手机是支持的，也不需要加载 `js` ，也不会因为 `js` 引发性能问题

`vw` 确实看上去很不错，但是也存在一些问题

- 也没能很好的解决 1px 边框在高清屏下的显示问题，需要自行处理
- 由于 `vw` 方案是完全的等比缩放，在 PC 端上会破相（和 rem 一样）

相关技术方案：`postcss-px-to-viewport`

<link-tag :linkList="[{ linkType: 'zhihu', linkText:'传送门：VW 布局 demo',linkUrl:'https://link.zhihu.com/?target=https%3A//demo.azhubaby.com/%25E8%2587%25AA%25E9%2580%2582%25E5%25BA%2594%25E6%2596%25B9%25E6%25A1%2588/vw/index.html'}]" />

### px 适配——一力降十会

不用 `rem/vw`，用传统的响应式布局也能在移动端布局中使用，需要设计规范

使用 <el-text class="mx-1" type="success" size="large">css 变量</el-text> 适配（篇幅原因暂不详细介绍，可直接看<link-tag :linkList="[{ linkType: 'git', linkText:'代码',linkUrl:'https://link.zhihu.com/?target=https%3A//github.com/johanazhu/demo/blob/master/%25E8%2587%25AA%25E9%2580%2582%25E5%25BA%2594%25E6%2596%25B9%25E6%25A1%2588/px/index.scss%23L3'}]" />）

使用场景：新闻、内容型的网站，不太适用 `rem`，因为大屏用户想要看到更多的内容，如网易新闻、知乎、taptap

<link-tag :linkList="[{ linkType: 'zhihu', linkText:'传送门：PX + CSS 变量 demo',linkUrl:'https://link.zhihu.com/?target=https%3A//demo.azhubaby.com/%25E8%2587%25AA%25E9%2580%2582%25E5%25BA%2594%25E6%2596%25B9%25E6%25A1%2588/px/index.html'}]" />

### 媒体查询——可有我一席？

上文讲到我司原先 H5 端采用媒体查询的方式来做适配，笔者尝试复刻了下，只能说大差不差，能看出媒体查询想做成这件事，但还是心有余而力不足

采用 `rem`、`vw`、`px` 等方法能实现非标准尺寸（375 _ 667 设计稿）下 `header` 的高度为  `165.59px`，而 media 因为大屏，将根 `font-size` 设置为 17px，结果 `header` 的高度成为  `159.38px`（17 _ 9.375rem）

如下 GIF 所示：

![https://pic3.zhimg.com/v2-d0a6ed653cfdd615d66a68911d8a6682_b.webp](https://pic3.zhimg.com/v2-d0a6ed653cfdd615d66a68911d8a6682_b.webp)

所以说仅用媒体查询还是差强人意

<link-tag :linkList="[{ linkType: 'zhihu', linkText:'传送门：媒体查询布局 demo',linkUrl:'https://link.zhihu.com/?target=https%3A//demo.azhubaby.com/%25E8%2587%25AA%25E9%2580%2582%25E5%25BA%2594%25E6%2596%25B9%25E6%25A1%2588/media/index.html'}]" />

### 各种适配的对比

`vw`、`rem` 适配的本质都是等比例缩放，`px` 直接写，孰优孰劣看自己

| REM 布局          | VW 布局                                                                                               | PX + css 变量布局                  |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------- |
| 容器最小宽度      | 支持                                                                                                  | 不支持                             |
| 容器最大宽度      | 支持                                                                                                  | 不支持                             |
| 高清设备 1px 边框 | 支持                                                                                                  | 支持                               |
| 容器固定纵横比    | 支持                                                                                                  | 支持                               |
| 优点              | 1.老牌方案 2.支持高清设备 1px 边框时，可按以往方式直接写                                              | 1.无需引入 js2. 天然支持，写法规范 |
| 缺点              | 1. 需要引入 js 设置 html 的 font-size2. 字体大小不能使用 rem3. 在 PC 端浏览会破相，一般需设置最大宽度 | 1.在 PC 端会破相 2.不支持老旧手机  |

除此之外，还有搭配 `vw` 和 `rem` 的方案

- 给根元素大小设置随着视窗变化而变化的 `vw` 单位，动态变化各元素大小
- 限制根元素字体大小的最大最小值，配合 `body` 加上最大宽度和最小宽度

::: code-group

```css
// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
$vm_fontsize: 75; // iPhone 6尺寸的根元素大小基准值
@function rem($px) {
  @return ($px / $vm_fontsize) * 1rem;
}
// 根元素大小使用 vw 单位
$vm_design: 750;
html {
  font-size: ($vm_fontsize / ($vm_design / 2)) * 100vw;
  // 同时，通过Media Queries 限制根元素最大最小值
  @media screen and (max-width: 320px) {
    font-size: 64px;
  }
  @media screen and (min-width: 540px) {
    font-size: 108px;
  }
}
// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
body {
  max-width: 540px;
  min-width: 320px;
}
```

:::

## 高清方案

### 1 像素问题

1 像素指在 Retina 屏显示  `1单位物理像素`

很好理解，CSS 像素（设备独立像素）是我们人为规定的，当 `DPR` 为 1 时，1 像素（指我们写的 CSS 像素） 等于 1 物理像素；但当 `DPR` 为 3 时，1 像素就为 3 物理像素

- `DPR = 1`，此时 1 物理像素 等于 1 CSS 像素
- `DPR = 2`，此时 1 物理像素等于 0.5 CSS 像素
  - `border-width: 1px`，这里的 1px 其实是 1 CSS 像素宽度，等于 2 物理像素，设计师其实想要的是 `border-width: 0.5px`
- `DPR = 3`，此时 1 物理像素等于 0.33 CSS 像素
  - 设计师想要的是 `border-width: 0.33px`

![/a98b0a33-7e85-bead-799e-4dd3f2bc6b70.png](/a98b0a33-7e85-bead-799e-4dd3f2bc6b70.png)

### 解决思路

使用  `0.5px` 。有局限性，iOS 8 及以上，苹果系统支持，但是 iOS 8 以下和 Android（部分低端机），会将`0.5px`  显示为  `0px`

既然 1 个 CSS 像素代表 2（`DPR` 为 2）、3（`DPR` 为 3）物理像素，设备又不认识 0.5px 的写法，那就画 1px，然后想办法将宽度减少一半

### 方案

- 渐变实现
  - `background-image: linear-gradient(to top, ,,,)`
- 使用缩放实现
  - `transform: scaleY(0.333)`
- 使用图片实现
  - `base64`
- 使用 SVG 实现
  - 嵌入 `background url`
- `border-image`
  - 低端机下支持度不好

以上都是通过 CSS 的媒体查询来实现的

::: code-group

```css
@media only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min-device-pixel-ratio: 2) {
}
@media only screen and (-webkit-min-device-pixel-ratio: 3),
  only screen and (min-device-pixel-ratio: 3) {
}
```

:::

### 图片适配和优化

图像通常占据了网页上下载资源绝大部分，优化图像通常可以最大限度地减少从网站下载的字节数以及提高网站性能

通常可以，有一些通用的优化手段：为不同 DPR 屏幕提供最适合的图片尺寸

### 各大厂商的适配分析

看了不少文章，类似如：<link-tag :linkList="[{ linkType: 'zhihu', linkText:'传送门：大厂是怎么做移动端适配的',linkUrl:'https://link.zhihu.com/?target=https%3A//www.jianshu.com/p/2d2d1dfd196f'}]" />

各大厂，有用 `rem` 适配的、也有用 `vm` 适配的、也有 `vm+rem` 结合适配的，纯用 px 方案的也有

- 新闻、社区等可阅读内容较多的场景：px+flex+百分比
  - 如携程、知乎、TapTap
- 对视觉组件种类较多，依赖性较强的移动端页面：vw+rem
  - 如电商、论坛

### 总结

rem 方案，引入  `amfe-flexible`  库

设计：设计出图是 750 \* 1334，设计切好图后，上传蓝湖，按照尺寸写 px。

开发：

- 使用 rem 方案
  - 引入  `amfe-flexible`  库
  - 安装  `px2rem`  之类的 px 转 rem 工具
  - 配置  `px2rem`
  - 在项目中写 px ，输出时是 rem
  - 适用任何场景
- 使用 vw 方案
  - 安装  `px2vw`  之类的 px 转 vw 工具
  - 配置  `px2vw`
  - 在项目中写 px，输出时是 vw
  - 适用任何场景
- 使用 px 方案
  - 该怎么样就怎么写，不过因为有设计规划，按钮的大中小尺寸固定、icon 的尺寸有标准、TabBar 的高度也是写死的，当一切都有标准后，写页面就方便了
  - 例如
    - 左边固定 100 \* 50，右边 flex 布局
    - 左边固定 100 \* 50，右边 calc(100% - 100px)（使用 CSS3 中的 calc 计算）

### 其他

<link-tag :linkList="[{  linkText:'caniuse',linkUrl:'https://caniuse.com/'}]" /> 网站测试 CSS 属性与浏览器的兼容性问题

### 疑问

Q：<link-tag :linkList="[{ linkType: 'zhihu', linkText:'传送门：为什么 H5 移动端 UI 库单位大都是用 px？这样不会有适配问题吗？',linkUrl:'https://www.zhihu.com/question/275803537/answer/383675406'}]" />

其实我们写好 px 后，如果项目采用 rem 写业务，引入  <link-tag :linkList="[{ linkType: 'git', linkText:'px2rem',linkUrl:'https://link.zhihu.com/?target=https%3A//github.com/songsiqi/px2rem'}]" />（已经六年没有维护了） 即可转换。

在有赞 vant 库中，它对浏览器适配的介绍是：

::: tip Viewport 布局
Vant 默认使用  `px`  作为样式单位，如果需要使用  `viewport`  单位（vw、vh、vmin、vmax），推荐使用 postcss-px-to-viewport 进行转换

postcss-px-to-viewport 是一款 PostCSS 插件，用于将 px 单位转化为 vw/vh 单位
:::

::: tip Rem 布局
如果需要使用  `rem`  单位进行适配，推荐使用以下两个工具：

- `postcss-pxtorem` 是一款 `PostCSS` 插件，用于将 px 单位转化为 rem 单位
- `lib-flexible` 用于设置 `rem` 基准值

:::

demo 合集：<link-tag :linkList="[{ linkType: 'zhihu', linkText:'传送门：线上 demo',linkUrl:'https://link.zhihu.com/?target=https%3A//demo.azhubaby.com'}]" />

## **参考资料**

- <link-tag :linkList="[{ linkType: 'git', linkText:'前端基础知识概述 -- 移动端开发的屏幕、图像、字体与布局的兼容适配',linkUrl:'https://link.zhihu.com/?target=https%3A//github.com/chokcoco/cnblogsArticle/issues/25'}]" />
- <link-tag :linkList="[{ linkType: 'zhihu', linkText:'传送门：Rem 布局的原理解析',linkUrl:'https://link.zhihu.com/?target=https%3A//yanhaijing.com/css/2017/09/29/principle-of-rem-layout/'}]" />
- <link-tag :linkList="[{ linkType: 'juejin', linkText:'传送门：再谈 Retina 下 1px 的解决方案',linkUrl:'https://juejin.cn/post/6844903571129892878'}]" />
- <link-tag :linkList="[{ linkType: 'juejin', linkText:'传送门：如何在 Vue 项目中使用 vw 实现移动端适配',linkUrl:'https://juejin.cn/post/6844903571096338439'}]" />
- <link-tag :linkList="[{ linkType: 'zhihu', linkText:'传送门：细说移动端 经典的 REM 布局 与 新秀 VW 布局',linkUrl:'https://link.zhihu.com/?target=https%3A//www.cnblogs.com/imwtr/p/9648233.html'}]" />
