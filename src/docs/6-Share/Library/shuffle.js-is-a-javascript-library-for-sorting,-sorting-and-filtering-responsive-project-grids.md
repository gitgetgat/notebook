# Shuffle.js 一款神奇的对响应式项目网格进行分类、排序和过滤的 JavaScript 库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Shuffle.js',linkUrl:'https://github.com/Vestride/Shuffle'},{ linkText:'Shuffle.js 官网',linkUrl:'https://vestride.github.io/Shuffle/'}]" />

## `Shuffle.js` 是什么？

`Shuffle.js` 是一个 JavaScript 库，专门用于简化响应式设计的网格布局，通过它可以轻松实现网格布局，元素排序、过滤、动画等功能。核心功能主要包括：

1. <imp-text-danger>网格布局</imp-text-danger>: 可以将一组项目排列成一个响应式的网格布局，并根据窗口大小自动调整布局。

2. <imp-text-danger>排序</imp-text-danger>: 允许你根据不同的条件对网格中的项目进行排序，例如字母顺序、数字顺序或自定义的排序规则。

3. <imp-text-danger>过滤</imp-text-danger>: 支持根据不同的条件对网格中的项目进行过滤，例如类别、标签或自定义的过滤规则。

4. <imp-text-danger>动画</imp-text-danger>: 提供流畅的动画效果，可以使网格布局的更新更加自然和美观。

## 效果预览

### 动态网格布局

![/61d5432b-0871-1925-08e8-f45a5b527710.png](/61d5432b-0871-1925-08e8-f45a5b527710.png)

### 条件排序

![/e258e7b1-7a87-9aa1-feeb-d033a1afa317.gif](/e258e7b1-7a87-9aa1-feeb-d033a1afa317.gif)

### 元素过滤

![/e1aa01bb-8902-f5e5-33dd-64397626d133.gif](/e1aa01bb-8902-f5e5-33dd-64397626d133.gif)

## 快速开始

首先，安装 Shuffle.js 通过包管理工具 npm 或 yarn。执行下面命令：

::: code-group

```bash [npm]
npm install shufflejs
```

```bash [yarn]
yarn add shufflejs
```

:::

使用 `Vite` 创建一个 Vanilla JavaScript 演示项目，下面是核心代码

::: code-group

```js
// 根据图片对象生成tile的HTML字符串
const tile = (obj) => {
  return `
  <figure class="js-item column ${obj.variant || ""}">
      <div class="aspect aspect--${ratio(obj.variant)}">
          <div class="aspect__inner">
              <img src="${obj.src}" alt="${obj.alt}">
          </div>
      </div>
  </figure>`;
};
// 获取页面元素并设置其内部HTML为生成的Shuffle布局
document.querySelector("#page").innerHTML = `
  <div class="container">
    <h1>
        <a href="https://vestride.github.io/Shuffle/" target="_blank" rel="noopener">Shuffle</a>模板
    </h1>
    <div class="js-grid my-shuffle">${images
      .map((item) => tile(item))
      .join("")}</div>
  </div>
`;
```

:::

不引入 `Shuffle.js` 效果，明显看出图像元素排列存在空位。

![/8d710905-c5a5-a875-74cc-18f4f104ba72.png](/8d710905-c5a5-a875-74cc-18f4f104ba72.png)

初始化 `Shuffle` 示例对象及配置选项。

::: code-group

```js
// 创建Shuffle实例并配置选项
const shuffle = new Shuffle(document.querySelector(".my-shuffle"), {
  itemSelector: ".js-item",
  sizer: ".js-sizer",
  buffer: 1
});
```

:::

`container` 一个 `DOM` 元素，表示要进行排序和过滤的容器。 `options` 一个可选的对象，用于配置 `Shuffle.js` 的行为，例如：`itemSelector` 一个 `CSS` 选择器，用于选择容器中的项目元素。`sizer` 一个 `DOM` 元素，用于确定网格布局的尺寸。

![/712d6cc0-bdd5-c558-1c3f-9e643b975e1f.png](/712d6cc0-bdd5-c558-1c3f-9e643b975e1f.png)

## 核心 API

`Shuffle.js` 核心 `API` 包含几个部分：

### 排序项目

每个项目都有一个 `data-title` 属性，用于排序。例如：

::: code-group

```js
// 根据图片对象生成tile的HTML字符串
const tile = (obj) => {
  return `
  <figure class="js-item column ${obj.variant || ""}" data-title="${obj.alt}">
  // ...
  </figure>`;
};
// 定义排序
const addSorting = () => {
  document
    .querySelector(".sort-options")
    .addEventListener("change", (event) => {
      const value = event.target.value;
      function sortByTitle(element) {
        return element.dataset.title.toLowerCase();
      }
      let options = {};
      if (value === "title") {
        options = {
          by: sortByTitle
        };
      }
      shuffle.sort(options);
    });
};
addSorting();
```

:::

定义排序规则，其中 `by` 以元素作为参数的函数。`randomize` 随机顺序排序；`reverse` 对排序结果进行反转。

## 示例

<!-- <script setup>
import ExpUseShuffle from '../../../../components/example/exp-use-shuffle-js.vue'
</script>

<exp-use-shuffle/> -->

::: code-group

```vue
<template>
  <div id="shuffle-page">
    <div class="container">
      <div>
        <el-select
          v-model="value"
          placeholder="Select"
          size="small"
          style="width: 240px"
          @change="changeSorting"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="js-grid my-shuffle">
        <figure
          v-for="image in images"
          :key="image.src"
          class="js-item column"
          :class="image.variant || ''"
          :data-title="image.alt"
        >
          <div class="aspect" :class="`aspect--${ratio(image.variant)}`">
            <div class="aspect__inner">
              <img :src="image.src" :alt="image.alt" />
            </div>
          </div>
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup>
import Shuffle from "shufflejs";
import { onMounted, ref } from "vue";

let shuffle = null;

const value = ref("default");

const options = [
  {
    value: "default",
    label: "默认排序"
  },
  {
    value: "title",
    label: "标题排序"
  },
  {
    value: "reverse",
    label: "反转排序"
  },
  {
    value: "randomize",
    label: "随机排序"
  }
];

const images = [
  {
    alt: "Mount Bromo, Indonesia",
    src: "https://images.unsplash.com/uploads/141310026617203b5980d/c86b8baa?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=882e851a008e83b7a80d05bdc96aa817"
  },
  {
    alt: "Transmission towers in fog, Bled, Slovenia",
    src: "https://images.unsplash.com/photo-1484402628941-0bb40fc029e7?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=6237e62a10fa079d99b088b0db0144ac"
  },
  {
    alt: "Tourists on the Canadian coast",
    src: "https://images.unsplash.com/uploads/1413142095961484763cf/d141726c?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=86dc2dcb74588b338dfbb15d959c5037"
  },
  {
    alt: "Burj Khalifa, Dubai, United Arab Emirates",
    src: "https://images.unsplash.com/photo-1465414829459-d228b58caf6e?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=7ab1744fe016fb39feb2972244246359"
  },
  {
    variant: "row-span",
    alt: "A foggy Golden Gate Bridge",
    src: "https://images.unsplash.com/photo-1416184008836-5486f3e2cf58?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=169&fit=crop&s=5f1f1ffba05979d4248cc16d8eb82f0a"
  },
  {
    alt: "A car crossing a wood bridge in Big Sur",
    src: "https://images.unsplash.com/photo-1478033394151-c931d5a4bdd6?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=57a00aabcfaa1b04fd268ea3ad4a4cbb"
  },
  {
    variant: "col-span",
    alt: "A large sand dune overshadows grasslands",
    src: "https://images.unsplash.com/photo-1473175494278-d83ed8459089?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=300&h=85&fit=crop&s=fd1cf1e8eddf88ef87015314f85ce3fb"
  },
  {
    alt: "Epcot center Spaceship Earth",
    src: "https://images.unsplash.com/photo-1434144893279-2a9fc14e9337?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=d2f930bbb91de7e19e6436f5b03897b0"
  },
  {
    alt: "Fresh strawberries in outstreched hands",
    src: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=eda14f45e94e9024f854b1e06708c629"
  },
  {
    alt: "Fog rushing through the trees in Yosemite Valley",
    src: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=70dabb0dcc604c558245b72f3109bbbb"
  },
  {
    alt: "The surface of the moon",
    src: "https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=4e19022724205e38e491961f50e47d32"
  },
  {
    alt: "Austere rhinoceros",
    src: "https://images.unsplash.com/photo-1430026996702-608b84ce9281?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=363a88755a7b87635641969a8d66f7aa"
  }
];

const ratio = (variant) => {
  if (variant == "col-span") return "32x9";
  if (variant == "row-span") return "9x80";
  return "16x9";
};

function sortByTitle(element) {
  return element.dataset.title.toLowerCase();
}

function changeSorting(val) {
  let options = {};
  if (val === "title") {
    options = {
      by: sortByTitle
    };
  } else if (val === "reverse") {
    options = {
      reverse: true
    };
  } else if (val === "randomize") {
    options = {
      randomize: true
    };
  }

  shuffle.sort(options);
}

onMounted(() => {
  // 创建Shuffle实例并配置选项
  shuffle = new Shuffle(document.querySelector(".my-shuffle"), {
    itemSelector: ".js-item",
    sizer: ".js-sizer",
    buffer: 1
  });
});
</script>
<style scoped>
/* quick grid */
.container {
  margin: auto;
}

/* Bootstrap-style v3 columns */
.column {
  position: relative;
  float: left;
  min-height: 1px;
  width: 25%;
  padding-left: 4px;
  padding-right: 4px;

  /* Space between tiles */
  margin-top: 8px;
}

.col-span {
  width: 50%;
}

.my-sizer-element {
  width: 8.33333%;
}

/* default styles so shuffle doesn't have to set them (it will if they're missing) */
.my-shuffle {
  position: relative;
  overflow: hidden;
}

/* Ensure images take up the same space when they load */
/* https://vestride.github.io/Shuffle/images */
.aspect {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
}

.aspect__inner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.aspect--16x9 {
  padding-bottom: 56.25%;
}

.aspect--9x80 {
  padding-bottom: calc(112.5% + 8px);
}

.aspect--32x9 {
  padding-bottom: calc(28.125% - 3px);
}

img {
  display: block;
  width: 100%;

  max-width: none;
  height: 100%;
  object-fit: cover;
}

figure {
  margin: 0;
  padding: 0;
}
</style>
```

:::
