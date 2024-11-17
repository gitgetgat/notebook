# FullCalendar.js 一款神奇的 JavaScript 开源全尺寸拖放事件日历

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'FullCalendar.js',linkUrl:'https://github.com/fullcalendar/fullcalendar'},{ linkText:'FullCalendar.js 官网',linkUrl:'https://fullcalendar.io/'}]" />

![/86a717b8-3f7e-cc1c-4ae5-bd5b3f736ae5.gif](/86a717b8-3f7e-cc1c-4ae5-bd5b3f736ae5.gif)

## `FullCalendar.js` 是什么？

`FullCalendar.js` 是一个开源的 `JavaScript` 库，用于在网页上展示交互式的日程和事件日历。它由 `Adam Shaw` 创建并维护，提供了简单、灵活的方式来展示和管理时间数据，适用于各种类型的应用程序，如会议安排、活动管理和个人规划。

`FullCalendar.js` 的主要特点包括<imp-text-danger>实时更新</imp-text-danger>、<imp-text-danger>多视图支持（日、周、月等）</imp-text-danger>、<imp-text-danger>可拖放事件</imp-text-danger>、<imp-text-danger>丰富的 `API` 接口以及可扩展性</imp-text-danger>。可以接受多种数据源，包括 `JSON`、`XML`、`JSONP`，甚至是纯文本。还支持通过 `CSS` 类名和主题系统进行样式定制。

## 快速开始

### 安装

支持包管理工具、CDN 安装，可以选择需要安装的包。

::: code-group

```bash [npm]
npm install --save fullcalendar @fullcalendar/core @fullcalendar/vue
```

```bash [yarn]
yarn add fullcalendar
```

:::

<script setup>
import ExpUseFullcalendar from '../../../../components/example/exp-use-fullcalendar-js.vue'
</script>

<exp-use-fullcalendar/>

<imp-text-danger>@fullcalendar</imp-text-danger> 包含一些模块：

- <imp-text-danger>@fullcalendar/interaction</imp-text-danger> （用于日期选择、事件拖动和调整大小）

- <imp-text-danger>@fullcalendar/daygrid</imp-text-danger> （用于月份和日期网格视图）

- <imp-text-danger>@fullcalendar/timegrid</imp-text-danger> （用于 timeGrid 视图）

- <imp-text-danger>@fullcalendar/list</imp-text-danger> （用于列表视图）

- <imp-text-danger>@fullcalendar/multimonth</imp-text-danger> （用于多月视图）

## 插件系统

`FullCalendar.js` 的插件系统是其核心功能之一，它允许开发者扩展日历的功能，以满足特定的需求。`FullCalendar` 的插件系统设计得非常灵活，可以通过添加不同的插件来增加新的视图、功能和交互方式。

- <imp-text-danger>模块化</imp-text-danger>：`FullCalendar` 基于现代 `JavaScript` 模块化标准，允许开发者只加载和使用所需的功能，从而减少最终打包的体积。

- <imp-text-danger>视图插件</imp-text-danger>：视图插件添加了新的日历视图类型，例如 `dayGrid`、`timeGrid` 和 `list` 视图。这些插件定义了如何在日历上展示日期和事件。

- <imp-text-danger>功能插件</imp-text-danger>：功能插件添加了新的日历功能，如事件拖放、选择日期范围、打印视图等。

- <imp-text-danger>主题插件</imp-text-danger>：主题插件可以改变日历的外观和风格，以适应不同的设计需求，例如 Bootstrap 主题。

- <imp-text-danger>本地化和国际化</imp-text-danger>：`FullCalendar` 支持多种语言，并且可以通过插件来添加或修改语言支持。

通过插件系统，`FullCalendar` 能够灵活地适应各种复杂的应用场景，同时保持核心库的轻量级。可以根据项目需求选择需要的插件。
