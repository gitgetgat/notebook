# JavaScript 图片浏览工具 —— viewer.js

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'viewer.js',linkUrl:'https://github.com/fengyuanchen/viewerjs'},{ linkText:'viewer.js Demo',linkUrl:'https://fengyuanchen.github.io/viewerjs/'}]" />

## 简介

`viewer.js` 是一个轻量级的 JavaScript 图片浏览工具，它可以在网页上实现图片的放大、缩小、旋转、翻转等功能。`viewer.js` 的特点包括：

- 轻量级：`viewer.js` 的体积非常小，只有几 KB，不会对网页的性能造成影响。
- 简单易用：`viewer.js` 的 API 非常简单，只需要几行代码就可以实现图片浏览功能。
- 支持多种图片格式：`viewer.js` 支持常见的图片格式，包括 `JPEG`、`PNG`、`GIF` 等。

## 安装

```bash
npm install viewerjs
```

## 使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>viewerjs</title>
    <link href="/path/to/viewer.css" rel="stylesheet" />
    <script src="/path/to/viewer.js"></script>
  </head>
  <body>
    <!-- a block container is required -->
    <div>
      <img id="image" src="picture.jpg" alt="Picture" />
    </div>

    <div>
      <ul id="images">
        <li><img src="picture-1.jpg" alt="Picture 1" /></li>
        <li><img src="picture-2.jpg" alt="Picture 2" /></li>
        <li><img src="picture-3.jpg" alt="Picture 3" /></li>
      </ul>
    </div>
  </body>
  <script>
    // You should import the CSS file.
    // import 'viewerjs/dist/viewer.css';
    import Viewer from "viewerjs";

    // View an image.
    const viewer = new Viewer(document.getElementById("image"), {
      inline: true,
      viewed() {
        viewer.zoomTo(1);
      }
    });
    // Then, show the image by clicking it, or call `viewer.show()`.

    // View a list of images.
    // Note: All images within the container will be found by calling `element.querySelectorAll('img')`.
    const gallery = new Viewer(document.getElementById("images"));
    // Then, show one image by click it, or call `gallery.show()`.
  </script>
</html>
```

## 扩充

### Vue 图片浏览组件 v-viewer

::: tip
blog：[https://mirari.cc/posts/vue3-viewer](https://mirari.cc/posts/vue3-viewer)

git：[https://github.com/mirari/v-viewer](https://github.com/mirari/v-viewer)

demo：[https://vue3-viewer.mirari.cc/](https://vue3-viewer.mirari.cc/)
:::

::: warning ⚠️ 注意
在使用 v-viewer 的 vue3 版本的 api 调用方式时，引用方式按照官方写，会在构建时报错，大致说是 v-viewer 是一个 commonjs 库，无法找到 `api`。我们需要修改下引用方式
::: code-group

```vue [官方]
<template>
  <div>
    <button type="button" class="button" @click="previewURL">URL Array</button>
    <button type="button" class="button" @click="previewImgObject">
      Img-Object Array
    </button>
  </div>
</template>
<!-- Options API -->
<script lang="ts">
import { defineComponent } from "vue";
import "viewerjs/dist/viewer.css";
import { api as viewerApi } from "v-viewer"; // [!code focus]
export default defineComponent({
  data() {
    return {
      sourceImageURLs: [
        "https://picsum.photos/200/200?random=1",
        "https://picsum.photos/200/200?random=2"
      ],
      sourceImageObjects: [
        {
          src: "https://picsum.photos/200/200?random=3",
          "data-source": "https://picsum.photos/800/800?random=3"
        },
        {
          src: "https://picsum.photos/200/200?random=4",
          "data-source": "https://picsum.photos/800/800?random=4"
        }
      ]
    };
  },
  methods: {
    previewURL() {
      // If you use the `app.use` full installation, you can use `this.$viewerApi` directly like this
      const $viewer = this.$viewerApi({
        images: this.sourceImageURLs
      });
    },
    previewImgObject() {
      // Or you can just import the api method and call it.
      const $viewer = viewerApi({
        options: {
          toolbar: true,
          url: "data-source",
          initialViewIndex: 1
        },
        images: this.sourceImageObjects
      });
    }
  }
});
</script>
<!-- Composition API -->
<!-- <script lang="ts" setup>
import 'viewerjs/dist/viewer.css'
import { api as viewerApi } from 'v-viewer'
const sourceImageURLs = [
  'https://picsum.photos/200/200?random=1',
  'https://picsum.photos/200/200?random=2'
]
const sourceImageObjects = [
  {
    src: 'https://picsum.photos/200/200?random=3',
    'data-source': 'https://picsum.photos/800/800?random=3'
  },
  {
    src: 'https://picsum.photos/200/200?random=4',
    'data-source': 'https://picsum.photos/800/800?random=4'
  }
]
const previewURL = () => {
  // If you use the `app.use` full installation, you can use `this.$viewerApi` directly like this
  const $viewer = this.$viewerApi({
    images: sourceImageURLs
  })
}
const previewImgObject = () => {
  // Or you can just import the api method and call it.
  const $viewer = viewerApi({
    options: {
      toolbar: true,
      url: 'data-source',
      initialViewIndex: 1
    },
    images: sourceImageObjects
  })
}
</script> -->
```

```vue [需要修改引用方式]
<!-- .vitepress/theme/Layout.vue -->

<script setup lang="ts">
import { useData, onContentUpdated, useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, provide, onUpdated } from "vue";
// import { api as viewerApi } from "v-viewer"
import * as Viewer from "v-viewer"; // [!code focus]
// [!code focus]
const { api: viewerApi } = Viewer; // [!code focus]

const { isDark } = useData();

const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

provide("toggle-appearance", async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`
    }
  );
});
onContentUpdated(() => {
  // 添加自定义类名
  document.querySelectorAll(".vp-code-group").forEach((ele) => {
    if (ele.querySelectorAll(".tabs label").length <= 1) {
      ele.classList.add("tabs-hide");
    }
  });
  // 添加图片点击查看大图
  document.querySelectorAll(".vp-doc p img").forEach((ele) => {
    if (ele.classList.contains("isHasViewered")) return;
    ele.addEventListener("click", function () {
      console.log(this.src);
      viewerApi({
        images: [this.src]
      });
    });
    ele.classList.add("isHasViewered");
  });
});
</script>

<template>
  <DefaultTheme.Layout />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
```

:::
