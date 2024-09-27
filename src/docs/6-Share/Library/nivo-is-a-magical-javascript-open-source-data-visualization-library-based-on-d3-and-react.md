# Nivo.js 一款基于 D3.js 和 React 的神奇 JavaScript 开源数据可视化库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Nivo.js',linkUrl:'https://github.com/plouc/nivo'},{ linkText:'Nivo.js 官网',linkUrl:'https://nivo.rocks/'}]" />

在数据驱动的项目中，将复杂的数据集转化为直观、美观的图表是常见功能之一。

`Nivo.js`，一个基于 `D3.js` 和 `React` 的开源库，为前端开发者提供了一个强大的工具集，用于创建各种交互式和可定制的数据可视化图表。本文将深入探讨 `Nivo.js` 的核心特性、安装方法、基本用法以及如何将其集成到现代 Web 应用中。

![/86676616-e3a5-3de3-3729-b5645c34543a.png](/86676616-e3a5-3de3-3729-b5645c34543a.png)

## `Nivo.js` 是什么？

`Nivo.js` 是由 <imp-text-danger>@plouc</imp-text-danger> 维护的一个开源项目，它提供了丰富的数据可视化组件，构建在 `D3.js` 和 `React` 之上。`Nivo.js` 的设计理念是提供高度可定制化、交互式且支持服务器端渲染的图表组件。它不仅支持 `SVG` 、`HTML` 和 `Canvas` 三种不同类型的图表，还内置了图案（`patterns`）和渐变（`gradients`），使得数据可视化作品更具视觉吸引力 。

项目特点

- 高度可定制：`Nivo.js` 允许开发者深入调整图表的每一个细节，包括颜色、样式和布局。

- 流畅动画：利用 `react-spring` 库实现平滑的过渡效果，提升用户体验。

- 服务器端渲染 (`SSR`)：支持 `SSR`，优化 `SEO` 和首屏加载时间。

- 全面的文档：详细的 `API` 文档和示例，助你快速上手。

- 多类型图表：覆盖各种常见和特殊图表类型，如 <imp-text-danger>条形图</imp-text-danger> 、<imp-text-danger>折线图</imp-text-danger> 、<imp-text-danger>饼图</imp-text-danger> 、<imp-text-danger>热力图</imp-text-danger> 、<imp-text-danger>桑基图</imp-text-danger> 等。

- 响应式设计：适配不同屏幕尺寸，确保在任何设备上的良好显示。

## 安装方法

`Nivo.js` 可以通过 `npm` 或 `yarn` 进行安装。首先，确保你的开发环境中已经安装了 `Node.js` 和 `React`。然后，可以通过以下命令安装 `Nivo.js` 的相关组件：

::: code-group

```bash [npm]
npm install @nivo/core @nivo/bar
```

```bash [yarn]
yarn add @nivo/core @nivo/bar
```

:::

## 基本用法

以条形图（Bar Chart）为例，下面是如何在 React 应用中使用 Nivo.js 创建一个简单的条形图：

1. 引入所需的组件：

::: code-group

```js
import { ResponsiveBar } from "@nivo/bar";
```

:::

2. 准备数据：

::: code-group

```js
const data = [
  { country: "USA", value: 45 },
  { country: "UK", value: 25 },
  { country: "Canada", value: 35 }
];
```

:::

3. 使用组件：

::: code-group

```js
const MyResponsiveBar = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={['value']}
    indexBy="country"
    margin={{ transform: translateY( 50, right: 130, bottom: 50, left: 60 }}
    colors={{ schem)e: 'nivo' }}
  />
);

export default MyResponsiveBar;
```

:::

4. 在父组件中使用：

::: code-group

```js
import React from "react";
import MyResponsiveBar from "./MyResponsiveBar";

const App = () => {
  const data = [
    { country: "USA", value: 45 },
    { country: "UK", value: 25 },
    { country: "Canada", value: 35 }
  ];

  return (
    <div>
      <h1>Nivo.js Bar Chart Example</h1>
      <MyResponsiveBar data={data} />
    </div>
  );
};

export default App;
```

:::
