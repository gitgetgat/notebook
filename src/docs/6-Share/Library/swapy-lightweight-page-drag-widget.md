# Swapy 轻量级页面拖拽小工具

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Swapy',linkUrl:'https://github.com/TahaSh/swapy'},{ linkText:'Swapy 官网',linkUrl:'https://swapy.tahazsh.com/'}]" />

![/3fb5c928-9a31-afb6-baeb-4957fe15f824.png](/3fb5c928-9a31-afb6-baeb-4957fe15f824.png)

## `Swapy` 是什么？

`Swapy` 是由 `TahaSh` 开发的一款开源 `JavaScript` 工具。它的核心功能是将静态布局转换为可以拖拽交换的动态布局。

![/829250e2-bf18-e784-68cc-9d062faa0c13.gif](/829250e2-bf18-e784-68cc-9d062faa0c13.gif)

因此，`Swapy` 的使用场景和 `Vue Draggable Plus` 还是有点差异的。

`Swapy` 是一个与框架无关的工具。它几乎可以和市面上常用的所有框架衔接使用。

![/a0a31ba3-9d78-2766-3df4-eb7e55e0f6bb.png](/a0a31ba3-9d78-2766-3df4-eb7e55e0f6bb.png)

你可以在不大幅修改原有项目结构的情况下，快速的通过增加 `Swapy`，来对页面中的图片、文字等各种内容增加拖拽布局。

## `Swapy` 的主要特点

- <imp-text-danger>简单易用</imp-text-danger>：`Swapy` 的设计哲学是简单性。它不需要复杂的配置或大量的代码，使得开发者可以快速上手。

- <imp-text-danger>高度可定制</imp-text-danger>：通过 `CSS` 和 `JavaScript`，开发者可以轻松地定制拖拽项的外观和行为。

- <imp-text-danger>跨浏览器兼容性</imp-text-danger>：`Swapy` 在所有主流浏览器上都能正常工作，包括 `Chrome`、`Firefox`、`Safari` 和 `Edge`。

- <imp-text-danger>开源</imp-text-danger>：`Swapy` 是一个开源项目，开发者可以自由地下载、使用和修改源代码。

## 安装使用

### 安装

我们可以直接在文件中通过 `npm` 和 `CDN` 的方式来安装 `Swapy`，可以参考如下：

::: code-group

```bash [npm]
npm install @nivo/core @nivo/bar
```

```html [CDN]
<script src="<https://unpkg.com/swapy/dist/swapy.min.js>"></script>
<script>
  // You can then use it like this
  const swapy = Swapy.createSwapy(container);
</script>
```

:::

### 使用

使用 `Swapy` 前，需要在 `HTML` 中定义 `插槽(slot)` 和 `项目(item)`。

`插槽(slot)` 是放置项目的容器。通过在容器中添加 `data-swapy-slot` 属性来指定。

`项目(item)` 则是可以被拖拽的元素。通过属性 `data-swapy-item` 来标识。

下面是官方的示例：

::: code-group

```html
<div class="container">
  <div class="section-1" data-swapy-slot="foo">
    <div class="content-a" data-swapy-item="a">
      <!-- Your content for content-a goes here -->
    </div>
  </div>

  <div class="section-2" data-swapy-slot="bar">
    <div class="content-b" data-swapy-item="b">
      <!-- Your content for content-b goes here -->
      <div class="handle" data-swapy-handle></div>
    </div>
  </div>

  <div class="section-3" data-swapy-slot="baz">
    <div class="content-c" data-swapy-item="c">
      <!-- Your content for content-c goes here -->
    </div>
  </div>
</div>
```

:::

一个 `data-swapy-slot` 包含一个 `data-swapy-item`，就这么简单！

接着，就可以使用 `Swapy` 方法了。获取包含 `插槽(slot)` 和 `项目(item)` 的容器元素，并将该元素传递给 `createSwapy()` 函数。

::: code-group

```js
import { createSwapy } from "swapy";

const container = document.querySelector(".container");

const swapy = createSwapy(container, {
  animation: "dynamic" // or spring or none
});
```

:::

默认情况下，`Swapy` 将使用 `dynamic` 动画。当然，你也可以使用 `spring` 或者 `none` 进行配置。

最后，调用 `enable` 函数来触发。

::: code-group

```js
//可以随时打开或关闭这儿拖拽布局
swapy.enable(true);
```

:::

至此，一个简单的拖拽布局示例就完成了。此外，官方还提供了事件监听的函数，用于监听和获取拖拽中的数据变化。

::: code-group

```js
import { createSwapy } from "swapy";

const container = document.querySelector(".container");

const swapy = createSwapy(container);

swapy.onSwap((event) => {
  console.log(event.data.object);
  console.log(event.data.array);
  console.log(event.data.map);

  // event.data.object:
  // {
  //   'foo': 'a',
  //   'bar': 'b',
  //   'baz': 'c'
  // }

  // event.data.array:
  // [
  //   { slot: 'foo', item: 'a' },
  //   { slot: 'bar', item: 'b' },
  //   { slot: 'baz', item: 'c' }
  // ]

  // event.data.map:
  // Map(3) {
  // 'foo' => 'a',
  // 'bar' => 'b',
  // 'baz' => 'c'
  // }
});
```

:::
