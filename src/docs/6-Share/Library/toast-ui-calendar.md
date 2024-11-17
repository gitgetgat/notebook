# TOAST UI Calendar 日历组件

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'TOAST UI Calendar',linkUrl:'https://github.com/nhn/tui.calendar/tree/main?tab=readme-ov-file'}]" />

![/ed3cbb47-cbdf-de34-9618-bcf9f4b5d1e2.png](/ed3cbb47-cbdf-de34-9618-bcf9f4b5d1e2.png)

## `TOAST UI Calendar` 是什么？

`TOAST UI Calendar` 是由 `NHN Cloud` 开发并维护的开源项目，拥有 12k 颗星，是一个能满足不同需求的日历组件。它支持多种前端框架，包括纯 `JavaScript`、`React` 和 `Vue2`。

这个日历组件的使命很明确：为你的应用提供全面的日程安排和任务管理功能，无论是简单的会议安排还是复杂的多任务日历。

## 核心特点

`TOAST UI Calendar` 拥有丰富的特性，开发者们绝对不会失望：

- <imp-text-danger>多视图模式</imp-text-danger>：支持月、周、日视图，甚至支持 2 周和 3 周的自定义视图，满足不同显示需求。

- <imp-text-danger>拖拽与调整</imp-text-danger>：用户可以轻松拖动或调整日程，互动性极强。

- <imp-text-danger>内置弹窗</imp-text-danger>：提供默认的创建和详情弹窗，减少开发者自定义界面的时间。

- <imp-text-danger>高度可定制</imp-text-danger>：可调整网格单元的页眉页脚，完全控制日历的 UI，甚至可以根据需求定制主题。

- <imp-text-danger>高效的任务和里程碑管理</imp-text-danger>：方便用户组织复杂的日程安排。

- <imp-text-danger>支持窄屏设计</imp-text-danger>：如周末缩窄等功能，方便在不同设备上查看。

- <imp-text-danger>自定义开始日期</imp-text-danger>：灵活设置日历周的开始日期。

## 技术信息

- <imp-text-danger>主要技术</imp-text-danger>：`TOAST UI Calendar` 使用 TypeScript 编写，确保了良好的类型安全和可维护性。依赖于 `Preact`、`Immer` 以及 `DOMPurify`，部分功能需要 `tui-date-picker` 和 `tui-time-picker`。

- <imp-text-danger>浏览器支持</imp-text-danger>：兼容性非常广，支持最新版本的 Chrome、Edge、Safari、Firefox 和 Internet Explorer 11+（是的，你没看错，IE 也能运行！）。

- <imp-text-danger>许可证</imp-text-danger>：基于 MIT 许可，使用灵活，不限于商业或非商业项目。

## 快速上手

### 安装

::: code-group

```bash
npm install @toast-ui/vue-calendar # latest version
npm install @toast-ui/vue-calendar@<version> # specific version
```

:::

### 引用

::: code-group

```js [JavaScript]
/* ES6 module in Node.js environment */
import Calendar from "@toast-ui/vue-calendar";
/* CommonJS in Node.js environment */
const Calendar = require("@toast-ui/vue-calendar");
/* in the browser environment namespace */
const Calendar = tui.VueCalendar;
/* ES6 module in Node.js environment */
import Calendar from "@toast-ui/vue-calendar/ie11";
/* CommonJS in Node.js environment */
const Calendar = require("@toast-ui/vue-calendar/ie11");
```

```html [CSS]
<script>
  /* ES6 module in Node.js environment */
  import "@toast-ui/calendar/dist/toastui-calendar.min.css"; // Stylesheet for calendar

  /* CommonJS in Node.js environment */
  require("@toast-ui/calendar/dist/toastui-calendar.min.css");
</script>

<!-- CDN -->
<link
  rel="stylesheet"
  href="https://uicdn.toast.com/calendar/latest/toastui-calendar.min.css"
/>
```

:::

### 示例代码

::: code-group

```vue [但组件使用]
<template>
  <Calendar style="height: 800px" />
</template>

<script>
import Calendar from "@toast-ui/vue-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

export default {
  name: "YourComponent",
  components: {
    Calendar
  }
};
</script>
```

```js [全局注册组件]
import Calendar from "@toast-ui/vue-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

new Vue({
  el: "#app",
  components: {
    Calendar
  }
});
```

:::

深入使用可以继续看文档 <link-tag :linkList="[{  linkText:'Vue2 使用 TOAST UI Calendar',linkUrl:'https://github.com/nhn/tui.calendar/blob/main/apps/vue-calendar/docs/en/guide/getting-started.md#props'}]" />
