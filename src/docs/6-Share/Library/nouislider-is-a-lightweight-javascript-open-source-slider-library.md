# noUiSlider 一款轻量级的 JavaScript 开源滑块库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'noUiSlider',linkUrl:'https://github.com/leongersen/noUiSlider'},{  linkText:'noUiSlider 官方文档',linkUrl:'https://refreshless.com/nouislider/'}]" />

![/6b929ba0-c9c7-bfe5-bbe0-a474ad07f3a2.png](/6b929ba0-c9c7-bfe5-bbe0-a474ad07f3a2.png)

## `noUiSlider` 是什么？

`noUiSlider` 是一个轻量级的、响应式的 JavaScript 范围滑块库，它支持多点触控和键盘操作。它利用 GPU 加速，无需重新流式布局，因此在旧设备上也能保持流畅的性能。此外，它不需要任何外部依赖，能够完美适应响应式设计 。

特点

• <imp-text-danger>轻量级</imp-text-danger>：压缩后的 JS 文件大小仅为几 KB。

• <imp-text-danger>无障碍支持</imp-text-danger>：遵循 `WCAG 2.0` 指南，提供键盘导航和 `ARIA` 属性。

• <imp-text-danger>跨浏览器兼容</imp-text-danger>：支持 `IE9` 及以上版本，以及所有现代浏览器。

• <imp-text-danger>响应式设计</imp-text-danger>：基于 `CSS3` 和 `HTML5`，能够自动适应不同的屏幕尺寸。

• <imp-text-danger>灵活性</imp-text-danger>：支持连续和非连续的值，以及步长设置。

• <imp-text-danger>事件处理</imp-text-danger>：提供丰富的事件监听选项，方便与应用程序的其他部分进行交互。

• <imp-text-danger>API 友好</imp-text-danger>：提供清晰的 `JavaScript API`，易于初始化和控制滑块 。

## 快速开始

你可以通过 npm 或 CDN 安装 noUiSlider：

::: code-group

```bash [npm]
npm install nouislider --save
```

```html [CDN]
<script src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/14.6.3/nouislider.min.js"></script>
```

:::

在 Vue 中使用示例：

<script setup>
import ExpUseNoUiSlider from '../../../../components/example/exp-use-noUiSlider.vue'
</script>

<exp-use-noUiSlider/>

## 进阶功能

### 滑块类型

noUiSlider 支持的多种滑块样式类型，常用的有以下几种

![/c4f952b5-e64d-8997-cd95-b340e54cb8e4.png](/c4f952b5-e64d-8997-cd95-b340e54cb8e4.png)

### 多手柄滑块

![/f948842a-757f-d733-f9dc-68ece0a899f0.png](/f948842a-757f-d733-f9dc-68ece0a899f0.png)

### 非线性滑块

![/15bda76d-1ca0-9e97-1cbe-534cf5201c23.png](/15bda76d-1ca0-9e97-1cbe-534cf5201c23.png)

`noUiSlider` 还提供了丰富的 `API`，包括事件监听、值的获取和设置、滑块的启用和禁用等。支持响应式设计，可以很好地适应不同的屏幕尺寸和设备。`noUiSlider` 的样式可以通过 `CSS` 进行定制，来满足项目的需求。可以使用预定义的类或者直接通过 `CSS` 来改变滑块的外观

## 应用场景

应用于各种 Web 应用程序中，以增强用户界面的交互性和视觉吸引力。以下是一些实际应用案例：

• <imp-text-danger>在线预订系统</imp-text-danger>：在酒店或航班预订网站上，可以用来让用户选择入住日期或飞行时间的范围。

• <imp-text-danger>价格过滤器</imp-text-danger>：电子商务网站常用 `noUiSlider` 作为价格筛选工具，允许用户滑动以选择特定价格区间内的产品。

• <imp-text-danger>音量控制</imp-text-danger>：音乐播放器或视频平台可能会使用 `noUiSlider` 来提供精细的音量调节。

• <imp-text-danger>颜色选择器</imp-text-danger>：图形设计软件或在线配色工具中，`noUiSlider` 可以用来选择颜色的亮度或饱和度。

• <imp-text-danger>自定义表单</imp-text-danger>：在需要用户输入数值范围的表单中，`noUiSlider` 提供了一种直观的输入方式。
