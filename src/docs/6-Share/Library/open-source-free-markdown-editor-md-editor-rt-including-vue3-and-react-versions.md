# 开源免费的 Markdown 编辑器：md-editor-rt，包含 Vue3、React 双版本

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'md-editor-rt Vue3版本',linkUrl:'https://github.com/imzbf/md-editor-v3'},{ linkType: 'git', linkText:'md-editor-rt React版本',linkUrl:'https://github.com/imzbf/md-editor-rt'},{ linkText:'md-editor-rt 文档',linkUrl:'https://imzbf.github.io/md-editor-rt/zh-CN/api'},{ linkText:'md-editor-rt 在线示例',linkUrl:'https://codesandbox.io/s/elated-khorana-65jmr'}]" />

## `md-editor-rt` 是什么？

`Markdown` 富文本编辑器对于开发者的重要性就不用多说了，文档管理、博客和文章编辑都会使用它，今天介绍一款超级好用的开源 `Markdown` 编辑器，让大家可以集成富文本到自己的应用程序中，提供 `Markdown` 编辑功能。

这款编辑器有两个版本：

• `md-editor-v3`：适用于 `Vue3` 项目。

• `md-editor-rt`：适用于 `React` 项目。

两个是同系列项目，使用 `jsx` 和 `typescript` 语法开发，支持在 `tsx` 项目使用。

## 主要特点

- <imp-text-danger>实时预览</imp-text-danger>🚀：编辑器提供了实时预览功能，用户在编写时可以即时看到渲染后的效果，提升编辑体验。

- <imp-text-danger>丰富的编辑功能</imp-text-danger>🚧：支持基本的 Markdown 语法和扩展功能，如标题、列表、代码块、链接和图片以及表格、任务列表和数学公式等。

- <imp-text-danger>高度自定义</imp-text-danger>⛱️：用户可以通过配置选项自定义编辑器的外观和行为。内置的白色和暗黑主题，多种样式预览，多种代码主题等。

- <imp-text-danger>快捷键插入内容</imp-text-danger>🌈：支持快捷键插入内容；支持使用 prettier 格式化内容。

- <imp-text-danger>现代界面设计</imp-text-danger>🔥：采用了现代的界面设计，注重用户体验和操作便捷性，界面清爽且易于使用。

## 预览图

### 亮暗模式

![/e74bff74-ab68-7fd8-4dcc-90c346016646.png](/e74bff74-ab68-7fd8-4dcc-90c346016646.png)

![/363e1915-8e31-c0c8-da87-60a59f353ca7.png](/363e1915-8e31-c0c8-da87-60a59f353ca7.png)

### 多种预览主题

#### default

![/22cff054-d73a-5ddd-e753-dafda58c62f3.png](/22cff054-d73a-5ddd-e753-dafda58c62f3.png)

#### mk-cute

![/4d8d1f2d-6293-966b-150d-94037059f285.png](/4d8d1f2d-6293-966b-150d-94037059f285.png)

### 多种代码风格

![/10a6e597-ac5a-659d-0053-883f8bd753d7.png](/10a6e597-ac5a-659d-0053-883f8bd753d7.png)

### 实时预览

![/59f5ab68-3720-e4c2-4684-43235376e83a.gif](/59f5ab68-3720-e4c2-4684-43235376e83a.gif)

## 快速上手

这里以在 Vue3 中使用为例。

### 安装

::: code-group

```bash
yarn add md-editor-v3
```

:::

使用已存在的语言、主题扩展，例如：日语

::: code-group

```bash
yarn add @vavt/cm-extension
```

:::

使用更多的扩展工具栏组件，例如：导出内容为 PDF

::: code-group

```bash
yarn add @vavt/v3-extension
```

:::

### 组件中使用

#### 编辑器模式

::: code-group

```vue
<template>
  <MdEditor v-model="text" />
</template>

<script setup>
import { ref } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const text = ref("# Hello Editor");
</script>
```

:::

#### 仅预览模式

::: code-group

```vue
<template>
  <MdPreview :editorId="id" :modelValue="text" />
  <MdCatalog :editorId="id" :scrollElement="scrollElement" />
</template>

<script setup>
import { ref } from "vue";
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

const id = "preview-only";
const text = ref("# Hello Editor");
const scrollElement = document.documentElement;
</script>
```

:::
