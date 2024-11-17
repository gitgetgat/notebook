---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "My Awesome Project"
  text: "A VitePress Site"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /docs/git/use-git-for-the-first-time
  # image:
  #   src: /zzz-logo-mini.png
  #   alt: VitePress

features:
  - title: Feature A 😇
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<script setup>
import { useData } from 'vitepress'
const { theme } = useData()
console.log('theme',theme)
</script>

## Getting Started

You can get started using VitePress right away using `npx`!

```sh
npm init
npx vitepress init
```

### vitepress 打包构建时：ReferenceError: document is not defined

![/18fa7b9e-e5d6-d617-c421-d69616b66831.jpg](/18fa7b9e-e5d6-d617-c421-d69616b66831.jpg)

根据官方引入方式做出改变：
::: code-group

```vue [修改前"报错"]
<template>
  <!-- https://github.com/sampotts/plyr -->
  <slot name="bilibili"></slot>
  <video class="player" v-if="type === 'self'" :id="eleId" controls>
    <source :src="src" />
  </video>
</template>

<script>
import { toRefs, onMounted } from "vue";
import Plyr from "plyr"; // [!code focus]
[];
export default {
  props: {
    type: {
      type: String,
      default: "self",
    },
    eleId: {
      type: String,
      default: "myPlayer",
    },
    src: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { eleId, src } = toRefs(props);

    onMounted(() => {
      const player = new Plyr(`#${eleId.value}`);
    });
  },
};
</script>

<style scoped>
.player {
  margin: 30px 0;
  width: 100%;
  height: auto;
}
</style>
```

```vue [修改后"正常"]
<template>
  <!-- https://github.com/sampotts/plyr -->
  <slot name="bilibili"></slot>
  <video class="player" v-if="type === 'self'" :id="eleId" controls>
    <source :src="src" />
  </video>
</template>

<script>
import { toRefs, onMounted } from "vue";
// import Plyr from 'plyr'; // [!code focus]
export default {
  props: {
    type: {
      type: String,
      default: "self",
    },
    eleId: {
      type: String,
      default: "myPlayer",
    },
    src: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let Plyr = null;
    const { eleId, src } = toRefs(props);
    // [!code focus:7]
    onMounted(() => {
      import("plyr").then((module) => {
        Plyr = module.default;
        const player = new Plyr(`#${eleId.value}`);
      });
    });
  },
};
</script>

<style scoped>
.player {
  margin: 30px 0;
  width: 100%;
  height: auto;
}
</style>
```

:::

### vitepress 打包构建时第三方包 pdf.js 其源码内动态引入的问题

![/75723587-aa7b-6e85-7467-155e72142581.jpg](/75723587-aa7b-6e85-7467-155e72142581.jpg)

这里 pdf.js 里的只是针对 webpack 写了注释，无法修改源码，尝试了 vite 里的插件 `vite-plugin-dynamic-import` 无效，最后还是只能降低 pdf.js 的版本到 `3.11.174`

::: warning ⚠️ 注意
更改版本以后，注意更改相对应的 pdf.worker.js，可将对应的文件复制到 public 目录下，作为静态资源文件，锁死 pdf.js 的版本，避免更新后出现兼容性问题
:::

### vitepress 静态资源找不到的问题

根据配置文件 `.vitepress/config.js` 内配置的 `base` 的路径，源码内也写成相对应路径，例如：

::: code-group

```js [.vitepress/config.js]
import { defineConfig } from "vitepress";
export default defineConfig({
  base: "/notebook/", //指定资源基础路径 // [!code focus]
});
```

```vue [src/components/pdf-viewer.vue]
<template>
  <div class="flex padding-box">
    <canvas id="canvasContainer"></canvas>
    <el-button @click="previousPage">previousPage</el-button>
    <el-button @click="nextPage">nextPage</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as pdfjs from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc = "/notebook/pdf.worker.min.js"; // [!code focus:2]
const pdfUrl = "/notebook/你不知道的JavaScript（上卷）.pdf";
</script>
```

:::

### vitepress 打包构建时：TypeError: Promise.withResolvers is not a function

升级 node 版本到 22 以上

### vitepress 打包构建时引用第三方包出问题

![/f2e882b9-dfe7-761e-9150-7c9c3bfd53f1.png](/f2e882b9-dfe7-761e-9150-7c9c3bfd53f1.png)

这个时候要通过 script 标签动态加载 CDN 文件：

::: code-group

```vue
<script setup>
import { onMounted, ref } from "vue";

const scriptLoaded = ref(false);

const loadScript = async (src, callback) => {
  if (!scriptLoaded.value) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script.onload = () => {
      console.log("Script loaded successfully.");
      scriptLoaded.value = true;
      callback();
    };
    script.onerror = () => {
      console.error("Script loading error.");
    };
    document.head.appendChild(script);
  } else {
    console.log("Script already loaded.");
  }
};

function fn() {
  // 业务逻辑
}

onMounted(() => {
  loadScript("https://cdn.jsdelivr.net/npm/@mojs/core", fn);
});
</script>
```

:::

### vitepress 打包构建时 pdf 等不在默认支持的静态文件需要一起打包

要明确一点，VitePress 不能展示 PDF 的原因是在 build 打包时，除图像、媒体和字体文件外的静态资源要放在 public 下。这是因为 VitePress 默认将静态资源放在 public 目录下，而 PDF 文件并不在这个范围内，所以在构建时会出现问题。

#### 使用插件

可以使用一个名为 `vite-plugin-static-assets-external` 的插件来解决这个问题。这个插件可以在构建时将指定的静态资源（如 PDF 文件）复制到 public 目录下。这样，就可以在不修改源代码的情况下解决这个问题。

#### 使用配置文件

除了使用插件，还可以通过修改 `VitePress` 的配置文件来解决这个问题。可以在 `vite.config.js` 文件中添加以下代码：

::: code-group

```js [vite.config.js]
// vite.config.js
export default {
  // ...
  optimizeDeps: {
    include: ["pdf"], // 将pdf文件添加到include数组中
    exclude: [], // 排除其他不需要优化的文件类型
  },
  // ...
};
```

:::

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

--vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
--vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
:root {
--vp-home-hero-image-filter: blur(56px);
}
}

@media (min-width: 960px) {
:root {
--vp-home-hero-image-filter: blur(68px);
}
}
</style>
