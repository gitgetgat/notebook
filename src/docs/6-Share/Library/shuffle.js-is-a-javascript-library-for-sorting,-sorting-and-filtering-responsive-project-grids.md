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

<script setup>
import ExpUseShuffle from '../../../../components/example/exp-use-shuffle-js.vue'
</script>

<exp-use-shuffle/>
