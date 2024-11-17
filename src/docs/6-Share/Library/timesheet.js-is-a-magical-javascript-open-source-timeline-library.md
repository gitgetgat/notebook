# Timesheet.js，一款神奇的 JavaScript 开源时间轴库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Timesheet.js',linkUrl:'https://github.com/sbstjn/timesheet.js'}]" />

## `Timesheet.js` 是什么？

`Timesheet.js` 是一个轻量级的 `JavaScript` 库用于创建时间表。它基于 `HTML5` 和 `CSS3` 能够创建吸引视觉呈现数据和时间轴。该库的优势在于其简洁性和用户友好性。仅需几行少量 `JavaScript` 代码即可以快速生成一个时间标布局，并且可以不依赖任何框架。

<imp-text-danger>功能特点</imp-text-danger>

- <imp-text-danger>简洁的 API</imp-text-danger>：`Timesheet.js` 提供一个简洁的 `API`，通过几行简单的代码即可创建时间表。

- <imp-text-danger>高度可定制化</imp-text-danger>：通过 `CSS` 样式调整，可以创建不同主题和布局进行个性化定制。

- <imp-text-danger>轻量化</imp-text-danger>：体积小，性能高，不会对页面加载速度产生过大影响。

## 快速开始

由于 `Timesheet.js` 不支持 `npm` 引入，从 `github` 中下载源码引入到项目中。

::: code-group

```html
<link rel="stylesheet" href="./libs/timesheet.js/dist/timesheet.min.css" />
<div id="app">
  <div id="timesheet"></div>
</div>
<script src="./libs/timesheet.js/dist/timesheet.min.js"></script>
<script>
  const timesheet = new Timesheet("timesheet", 2000, 2020, [
    ["09/2000", "07/2006", "某某小学", "default"],
    ["09/2006", "07/2009", "某某初级中学", "ipsum"],
    ["09/2009", "07/2012", "某某高级中学", "dolor"],
    ["09/2012", "07/2016", "清华大学", "lorem"]
  ]);
</script>
```

:::

`['09/2012', '07/2016', '清华大学', 'lorem']`，其中参数，开始时间: 支持日期格式，例如：`2002 、02/2012` ；结束时间；标题；配色：取值 `default` 红色，`lorem` 绿色、ipsum 蓝色、`dolor` 黄色、`sit` 青色。

![/a123ad82-e5b4-0115-22e1-5872e8c98a7a.png](/a123ad82-e5b4-0115-22e1-5872e8c98a7a.png)

## 应用场景

- <imp-text-danger>个人简历网站</imp-text-danger>：展示个人的工作经历和项目周期，使简历更加直观和具有吸引力。

- <imp-text-danger>历史事件展示</imp-text-danger>：制作互动式的历史时间线，通过 `Timesheet.js` 展示不同历史事件的发生时间，增加用户互动体验。

- <imp-text-danger>教育应用</imp-text-danger>：在教育相关的网站或应用中，使用 `Timesheet.js` 展示课程安排或学术研究的时间序列，帮助学生更好地规划学习进度。

- <imp-text-danger>数据分析</imp-text-danger>：将时间相关的数据通过 `Timesheet.js` 进行可视化展示，便于分析和理解数据随时间的变化趋势。
