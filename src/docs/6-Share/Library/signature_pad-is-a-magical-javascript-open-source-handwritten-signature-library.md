# Signature_Pad，一款神奇的 JavaScript 开源手写签名库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Signature_Pad',linkUrl:'https://github.com/szimek/signature_pad'},{  linkText:'Signature_Pad CDN JSDeliver',linkUrl:'https://www.jsdelivr.com/package/npm/signature_pad'}]" />

今天，和大家分享一款神奇的 `JavaScript` 开源手写签名库 —— `Signature_Pad`。它为网页带来便捷的手写签名体验。用户可轻松在浏览器上绘制个性化签名，并支持多种格式导出，简化了电子文档的签署流程。

## `Signature_Pad` 是什么？

`Signature_Pad` 允许用户在网页上进行丝滑的手写签名。设计理念是简单易用，同时保持高度的定制性，满足不同用户的需求。通过 `Signature_Pad` 可以轻松地将手写签名功能集成到任何应用中，无论是在线合同签署、电子表格提交，还是个性化的用户交互体验。支持触摸和鼠标输入，不同设备上都能提供流畅的签名。`Signature_Pad` 还提供签名的保存、加载和导出功能，支持 `SVG`、`PNG` 等格式。

![/efbd1b79-14f7-1791-981c-22862a18609d.gif](/efbd1b79-14f7-1791-981c-22862a18609d.gif)

## 核心特点

`Signature Pad` 的核心特点：

1. <imp-text-danger>基于 Canvas</imp-text-danger>：使用 `HTML5` 的 `canvas` 元素进行绘图，确保了良好的兼容性和性能。优化的算法和渲染技术，确保了即使在高分辨率设备上也能提供流畅的签名体验。

2. <imp-text-danger>平滑的签名体验</imp-text-danger>：采用可变宽度的 `Bézier` 曲线插值算法，提供类似于真实签名的流畅体验。

3. <imp-text-danger>跨平台兼容性</imp-text-danger>：支持所有现代的桌面和移动浏览器，包括触摸屏和非触摸屏设备。基于 MT 许可证，允许商用。

4. <imp-text-danger>数据序列化</imp-text-danger>：签名可以被序列化为 `JSON` 格式，便于在客户端和服务器之间传输。

5. <imp-text-danger>多种输出格式</imp-text-danger>：支持将签名保存为多种格式，包括 `PNG`、`JPEG` 和 `SVG`。

## 快速开始

### 安装

使用 `npm` 或 `yarn` 安装

::: code-group

```bash [npm]
npm install --save signature_pad
```

```bash [yarn]
yarn add signature_pad
```

```html [CDN]
<script src="https://cdn.jsdelivr.net/npm/signature_pad@5.0.2/dist/signature_pad.umd.min.js"></script>
```

:::

### 基本使用

在 `HTML` 中添加一个 `<canvas>` 元素，并设置 `DOM` 结构和样式。

::: code-group

```js
document.querySelector("#app").innerHTML = `
<div id="signature-pad" class="signature-pad">
    <div class="signature-pad--body">
        <canvas id="signature-canvas"></canvas>
    </div>
    <div class="signature-pad--footer">
        <button type="button" class="buttonclear clear" id="clear" data-action="clear">重签</button>
        <button type="button" class="buttonclear clear" id="save" data-action="clear">确定</button>
    </div>
</div>
`;
```

:::

初始化 `Signature Pad`

::: code-group

```js
// 获取容器
const canvas = document.getElementById("signature-canvas");
// 创建对象
const signaturePad = new SignaturePad(canvas, {
  backgroundColor: "#DEDEDE",
  penColor: "rgb(0, 0, 0)"
});
```

:::

属性说明：

1. <imp-text-danger>penColor</imp-text-danger>：设置签名笔触的颜色。默认是白色 (#fff)。

2. <imp-text-danger>backgroundColor</imp-text-danger>：设置画布的背景颜色。默认是黑色 (#000)。

3. <imp-text-danger>minWidth</imp-text-danger>：设置签名笔触的最小宽度（以像素为单位）。默认是 0.5px。

4. <imp-text-danger>maxWidth</imp-text-danger>：设置签名笔触的最大宽度（以像素为单位）。默认是 2.5px。

5. <imp-text-danger>minDistance</imp-text-danger>：设置绘制时的最小距离（以像素为单位），即连续两个点之间的最小距离。默认是 5px。

6. <imp-text-danger>dotSize</imp-text-danger>：设置点的大小，影响在屏幕上点击时留下的点的大小。

7. <imp-text-danger>velocityFilterWeight</imp-text-danger>：根据速度控制线的宽度，这个参数决定了速度对笔触宽度的影响程度。默认是 0.7。

### 操作事件

![/3a68e5ad-fd60-bd81-c450-351a36b767f4.png](/3a68e5ad-fd60-bd81-c450-351a36b767f4.png)

## 应用场景

`Signature Pad` 可用于电子商务、在线合同签署、医疗电子记录、物流签名捕获、金融服务、教育作业、政府服务、艺术创作、法律文档、移动应用和企业内部流程等多种场景，提供跨平台的电子签名解决方案。
