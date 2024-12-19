# watermark-js-plus：高级的水印插件

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'watermark-js-plus',linkUrl:'https://github.com/zhensherlock/watermark-js-plus'},{  linkText:'watermark-js-plus 官方文档',linkUrl:'https://zhensherlock.github.io/watermark-js-plus/zh/'}]" />

![/a08e6742-2241-d043-2371-5c7da082ae54.png](/a08e6742-2241-d043-2371-5c7da082ae54.png)

## 什么是 watermark-js-plus

这是一个基于 canvas 画布的水印库，作用于浏览器中。

## 功能

- 创建水印和暗水印
- 支持文本、多行文本、图片、富文本
- 支持监听 DOM 改动行为，可防止水印被手动删除
- 支持 TS
- 丰富的配置项

## 开始

通过 npm、yarn 或者 Browser 安装：

::: code-group

```bash [npm]
npm install watermark-js-plus
```

```bash [yarn]
yarn add watermark-js-plus
```

```html [Browser]
<script src="https://cdn.jsdelivr.net/npm/watermark-js-plus/dist/index.iife.min.js"></script>
<script src="https://unpkg.com/watermark-js-plus/dist/index.iife.min.js"></script>
```

:::

## 示例

::: code-group

```vue [文本水印]
<script>
import { Watermark } from "watermark-js-plus"; // 引入水印插件

const watermark = new Watermark({
  content: "hello my watermark",
  width: 200,
  height: 200,
  rotate: 22,
  layout: "grid",
  gridLayoutOptions: {
    rows: 2,
    cols: 2,
    gap: [20, 20],
    matrix: [
      [1, 0],
      [0, 1]
    ]
  },
  advancedStyle: {
    type: "linear",
    colorStops: [
      {
        offset: 0,
        color: "red"
      },
      {
        offset: 1,
        color: "blue"
      }
    ]
  },
  onSuccess: () => {
    // success callback
  }
});

watermark.create(); // 添加水印

watermark.destroy(); // 删除水印
</script>
```

```vue [图片水印]
<template>
  <img class="text-watermark-image" />
</template>
<script>
import { ImageWatermark } from "watermark-js-plus"; // import watermark plugin

const imgDom = document.querySelector(".text-watermark-image");

const watermark = new ImageWatermark({
  content: "my text watermark",
  width: imgDom.width,
  height: imgDom.height,
  dom: imgDom,
  rotate: 0,
  translatePlacement: "bottom-end",
  fontColor: "#fff",
  globalAlpha: 0.5,
  fontSize: "30px"
});

watermark.create(); // add watermark

watermark.destroy(); // remove watermark
</script>
```

:::

## 总结

- <imp-text-danger>丰富的功能</imp-text-danger>：支持文本、多行文本、图片、富文本和暗水印。
- <imp-text-danger>完全类型化的 API</imp-text-danger>：灵活的 API 和完整的 TypeScript 类型。
- <imp-text-danger>极致轻量化</imp-text-danger>：大小只有 5kb 左右，你甚至可能忘记它的存在！
