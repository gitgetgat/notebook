# 一款神奇的 JavaScript 开源文件上传库 Uppy.js

<article-info/>

<link-tag :linkList="[{linkType:'git', linkText:'Uppy.js',linkUrl:'https://github.com/transloadit/uppy'},{ linkText:'官方文档',linkUrl:'https://uppy.io/'}]"></link-tag>

## Uppy.js 是什么？

`Uppy.js` 是一个现代化的、模块化的 `JavaScript` 文件上传器，它可以无缝地集成到任何应用程序中。它具备轻量级、易于使用的特点，并支持从本地磁盘、远程 URL、云存储服务等多种途径获取文件，并通过相机捕获和记录自拍等方式上传文件。`Uppy.js` 提供了丰富的功能，如漂亮的界面预览和编辑元数据，以及可选择的文件处理和编码后端，如 `Transloadit`。它还支持断点续传，避免了因网络不稳定而导致的大文件上传失败问题。

### 特性:

- `模块化`：采用模块化的架构设计，根据项目需求选择合适的功能插件，保持代码的简洁性。

- `断点续传`：基于 tus 标准实现了断点续传功能，保证在网络不稳定的情况下提升大文件传输的可靠性。

- `多来源文件`：除本地文件，还支持从远程 URL 获取文件。可实现绕过用户设备，直接服务器间同步文件。

- `预览和编辑`：良好的用户界面，允许预览文件并编辑元信息。

## 快速开始

在项目中使用 `Uppy.js`，首先需要通过 `npm` 或 `yarn` 安装它：

::: code-group

```bash [npm]
npm install @uppy/core @uppy/dashboard @uppy/tus
```

```bash [yarn]
yarn add @uppy/core @uppy/dashboard @uppy/tus
```

```html [CDN]
<!-- 1. Add CSS to `<head>` -->
<link
  href="https://releases.transloadit.com/uppy/v4.2.0/uppy.min.css"
  rel="stylesheet"
/>

<!-- 2. Initialize -->
<div id="uppy"></div>

<script type="module">
  import { Uppy } from "https://releases.transloadit.com/uppy/v4.2.0/uppy.min.mjs";
  const uppy = new Uppy();
</script>
```

:::

然后在项目中引入 `js` 文件和 `css`。

::: code-group

```js
// main.js
import Uppy from "@uppy/core"; // 核心库
import Dashboard from "@uppy/dashboard"; // 仪表盘
import zh_CN from "@uppy/locales/lib/zh_CN"; // 国际化中文

// 引入样式
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
```

:::

创建 `Uppy` 对象和引入 `Dashboard` 并添加配置

::: code-group

```js
const uppy = new Uppy({
  debug: true,
  autoProceed: false, // 自动上传
  locale: zh_CN, // 国际化
  restrictions: {
    maxFileSize: 1000,
    maxNumberOfFiles: 10,
    allowedFileTypes: ["image/*"]
  }
});

uppy.use(Dashboard, {
  inline: true, // 内联页面
  target: "#app", // 挂载的目标元素
  theme: "dark", // 主题 dark
  note: "最多上传 10 个文件，仅支持图片" // 上传文件的说明
});

// 监听 complete 事件，该事件在所有文件上传后触发。
uppy.on("complete", (result) => {
  if (result.failed.length === 0) {
    console.log("上传成功 😀");
  } else {
    console.warn("上传失败 😞");
  }
  console.log("成功文件:", result.successful);
  console.log("失败文件:", result.failed);
});
```

:::

![/72581329-c9a3-6452-90d9-b752afc12335.png](/72581329-c9a3-6452-90d9-b752afc12335.png)

`Uppy` 常用包

- `@uppy/core` : `Uppy` 的核心是插件的协调器；通过它构建自己的 UI 或者进行 `Dashboard` 集成。

- `@uppy/dashboard`：通用 UI，带有预览、进度条、元数据编辑器和所有很酷的东西。

- `@uppy/drag-drop`：插件呈现一个用于文件选择的拖放区域。

- `@uppy/webcam`：插件可让您使用桌面和移动设备上的内置摄像头拍照和录制视频。

- `@uppy/screen-capture`：插件可以录制您的屏幕或应用程序并将其保存为视频。

- `@uppy/url`：插件允许用户从互联网导入文件。粘贴任何 URL，它将被添加！

- `@uppy/tus`：插件通过包装 `tus-js-client` 为 `Uppy` 带来了 `Tus` 的可断点续传文件上传功能。

- `@uppy/xhr-upload`：插件用于定期上传到 HTTP 服务器。

- `@uppy/transloadit`：插件可用于将文件直接上传到 `Transloadit` 进行各种处理，例如转码视频、调整图像大小、压缩/解压缩等等。

- `@uppy/progress-bar`: 上传进度时自动填充的最小进度条

- `@uppy/status-bar`：插件显示上传进度和速度、预计时间、预处理和后处理信息，并允许用户控制（暂停/恢复/取消）上传。

- `@uppy/informer` 插件是一个弹出栏，用于显示 `Dashboard` 的通知。

- `@uppy/thumbnail-generator` 为添加到 `Uppy` 的图像生成比例缩略图（文件预览）。

- `@uppy/drop-target` 插件允许用户将文件拖放到页面上的任何元素上，例如整个页面 `document.body` 。

- `@uppy/image-editor` 当您希望允许用户裁剪、旋转、缩放和翻转添加到 `Uppy` 的图像时。

另外，`Uppy` 可以无缝对接到现有的技术栈中，例如：`@uppy/vue` 、`@uppy/react`、`@uppy/svelte` 和 `@uppy/angular`。

## 和其他库对比

`Uppy.js` 和 `Filepond.js` 对比都是现代的、功能丰富的 `JavaScript` 文件上传库，它们各有特色和适用场景。`Uppy.js` 强调模块化和高度的可定制性，适合需要高度个性化的复杂项目。而 `Filepond` 则侧重于易用性和响应式设计，更适合追求快速集成的项目。

## 总结

日常开发，可以通过 `Uppy.js` 的插件系统来扩展 `Uppy` 的功能，可以根据需要选择合适的插件来增强文件上传体验。如果想创建自己的插件，可以参考 `Uppy.js` 的插件开发指南。总的来说，`Uppy.js` 是一个功能强大、易于使用的文件上传组件，可以帮助你轻松处理复杂的文件上传需求。
