# 开源瀑布流插件 Masonry.js

<article-info />

<link-tag :linkList="[{linkType:'git', linkText:'Masonry.js',linkUrl:'https://github.com/desandro/masonry?tab=readme-ov-file'},{ linkText:'Masonry.js 官方文档',linkUrl:'https://masonry.desandro.com/'}]"></link-tag>

## 什么是 Maronry

![/8a03c7bd-653e-0ec7-bedf-93e6e2a8bd83.png](/8a03c7bd-653e-0ec7-bedf-93e6e2a8bd83.png)

Masonry 是一个 JavaScript 网格布局库。它的工作原理是根据可用的垂直空间将元素放置在最佳位置，有点像泥瓦匠在墙上安装石头。我们在互联网上也许看到过很多瀑布流的案例.

接下来给大家演示一个使用案例:

![alt text](/9d37cb72-d7aa-20a9-4519-29d173932ead.gif)

另一个比较有意思的案例:

![/c89b7cf2-c266-bb27-f55a-ca04ca2e69d7.gif](/c89b7cf2-c266-bb27-f55a-ca04ca2e69d7.gif)

当我们动态添加元素的时候, 它可以智能的安排好元素的位置.

再联想一下, 我们玩的消消乐小游戏和拼图类小游戏, 是不是也能用它一键实现呢?

![/fb0ebd50-7671-7c51-3d80-7bb3dbe35ec0.gif](/fb0ebd50-7671-7c51-3d80-7bb3dbe35ec0.gif)

## 如何使用 Maronry

`Maronry` 支持 `CDN` 导入和 `npm` 安装使用, 这里我介绍一下 `npm` 的安装和使用方式.

::: code-group

```bash
 npm install masonry-layout
```

:::

我们安装好之后可以先编写一下 `html` 结构:

::: code-group

```html
<div class="grid">
  <div class="grid-item">FlowMix</div>
  <div class="grid-item grid-item--width2">H5</div>
  <div class="grid-item">Dooring</div>
</div>
```

:::

接下来我们就可以直接使用这个库来初始化瀑布流布局了:

::: code-group

```js
var elem = document.querySelector(".grid");
var msnry = new Masonry(elem, {
  // options
  itemSelector: ".grid-item",
  columnWidth: 200
});

// 元素参数是一个选择器字符串
var msnry = new Masonry(".grid", {
  // options
});
```

:::

参考官网有一些注册时间的方法和监听回调的使用方式, 这里就不再赘述了.
