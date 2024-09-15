# 一款神奇的 JavaScript 开源新手交互引导库 Driver.js

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Driver.js',linkUrl:'https://github.com/kamranahmedse/driver.js'},{ linkText:'Driver.js 官网',linkUrl:'https://driverjs.com/'}]" />

## `Driver.js` 是什么？

`Driver.js` 是一个轻量级、无依赖的原生 JavaScript 库，用于在页面中创建用户引导功能。它可以帮助开发者在网页上添加引导步骤，指导用户完成特定任务或了解新功能。`Driver.js` 的主要特点包括简单易用、高度可定制、能够突出显示页面上的任意元素，以及提供了一系列强大的 `API` 来满足不同的引导需求。

![/0e004814-83aa-5500-04d6-9cbda5194414.png](/0e004814-83aa-5500-04d6-9cbda5194414.png)

<el-text size="large" type="danger">特点</el-text>

- <el-text size="large" type="danger">轻量级</el-text>：`Driver.js` 的大小仅约为 4kb，使用简单，独立无依赖。

- <el-text size="large" type="danger">可定制</el-text>：提供丰富的 `API`，可以根据需求自定义各种引导效果。

- <el-text size="large" type="danger">交互性</el-text>：支持动画过渡，提供流畅的用户体验。

- <el-text size="large" type="danger">显示任何内容</el-text>：通过 `Driver.js` 可以突出显示页面上的任何 `DOM` 元素；支持几乎所有浏览器，包含 `IE`。

## 快速开始

在项目使用 `Driver.js`，需要通过 `npm` 和 `yarn` 进行安装：

::: code-group

```bash [npm]
npm install driver.js
```

```bash [yarn]
yarn add driver.js
```

:::

然后在项目中引入 `Driver.js` 和他的 `css` 文件：

::: code-group

```js
import { onMounted } from "vue";
// 引入 Driver.js 和 样式
import { driver as Driver } from "driver.js";
import "driver.js/dist/driver.css";
// 创建 driver 对象
const driver = Driver({
  showProgress: true, // 显示进度
  steps: [
    // 定义 Steps
    {
      element: ".animated-tour",
      popover: {
        title: "新手导航",
        description: "这是新手导航",
        side: "left",
        align: "start"
      }
    },
    {
      element: ".line:nth-child(1)",
      popover: {
        title: "新手导航",
        description: "第一步",
        side: "bottom",
        align: "start"
      }
    }
    // ...
  ]
});
onMounted(() => {
  driver.drive(); // 开始预览 “步骤”
});
```

:::

![/b2543c3d-8386-bdcc-6944-73e39032644a.gif](/b2543c3d-8386-bdcc-6944-73e39032644a.gif)

## 常见属性

![alt text](/d2aab6cd-c6b0-9552-0a8f-74c2ff7c2e64.png)

<el-text size="large" type="danger">全局配置</el-text>：可以通过传递配置对象到 `driver` 函数调用或使用 `setConfig` 方法来全局配置 `Driver.js`。

::: code-group

```js
const driver = new Driver({
  className: "scoped-class", // 用于包裹 Driver.js 弹窗的类名
  animate: true, // 是否启用动画
  opacity: 0.75, // 背景透明度
  padding: 10, // 元素与边缘的距离
  allowClose: true, // 是否允许点击遮罩关闭
  doneBtnText: "完成" // 完成按钮上的文本
  // ... 其他配置选项
});
```

:::

<el-text size="large" type="danger">配置选项</el-text>：

- `steps`: 步骤数组，用于设置产品导览。

- `animate`: 是否对产品导览进行动画效果，默认为 true。

- `overlayColor`: 覆盖层颜色，默认为黑色。

- `smoothScroll`: 是否平滑滚动到突出显示的元素，默认为 false。

- `allowClose`: 是否允许通过点击背景关闭弹出窗口，默认为 true。

- `overlayOpacity`: 背景的不透明度，默认为 0.5。

- `stagePadding`: 突出显示元素与裁剪区域之间的距离，默认为 10。

- `stageRadius`: 突出显示元素周围裁剪区域的半径，默认为 5。

- `allowKeyboardControl`: 是否允许键盘导航，默认为 true。

- `disableActiveInteraction`: 是否禁用与突出显示元素的交互，默认为 false。

- `popoverClass`: 为弹出窗口添加自定义类。

- `popoverOffset`: 弹出窗口与突出显示元素之间的距离，默认为 10。

- `showButtons`: 弹出窗口中显示的按钮数组，默认为 `["next", "previous", "close"]`。

- `disableButtons`: 禁用的按钮数组。

- `showProgress`: 是否在弹出窗口中显示进度文本，默认为 false。

- `progressText`: 进度文本模板。

- `nextBtnText`, `prevBtnText`, `doneBtnText`: 按钮文本。

- 各种回调函数和钩子（`hooks`），用于在不同阶段执行自定义逻辑。

<el-text size="large" type="danger">Popover 配置</el-text>：`Popover` 是 `Driver.js` 的主要 UI 元素，用于突出显示目标元素并显示步骤内容。可以全局或针对每个步骤配置 `Popover`。

<el-text size="large" type="danger">Drive Step 配置</el-text>：传递给 `highlight` 方法或 `drive` 方法的 `steps` 数组的配置对象。可以为每个步骤配置 `Popover` 和目标元素。

<el-text size="large" type="danger">状态访问</el-text>：可以通过调用 `getState` 方法访问 `Driver.js` 的当前状态，状态对象也传递给钩子和回调。
