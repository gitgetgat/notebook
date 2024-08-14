# 前端下载利器——FileSaver

<article-info/>

## 地址

npm: [**https://www.npmjs.com/package/file-saver**](https://www.npmjs.com/package/file-saver)

Homepage: [**https://github.com/eligrey/FileSaver.js#readme**](https://github.com/eligrey/FileSaver.js#readme)

## 安装

::: code-group

```bash
# Basic Node.JS installation
npm install file-saver --save
bower install file-saver
```

:::

## 使用

::: code-group

```js
// 引入
import { saveAs } from "file-saver";

// 保存文本
// 生成blob文本
const blob = new Blob(["您好!"], { type: "text/plain;charset=utf-8" });
// 第二个参数指定保存的文件名
saveAs(blob, "hello.txt");

// 保存url
saveAs("https://httpbin.org/image", "image.jpg");

// 把canvas保存成一个图片
const canvas = document.getElementById("myCanvas");
canvas.toBlob(function (blob) {
  // canvas.toBlob 有兼容性问题
  saveAs(blob, "image.png");
});
// canvas-toBlob.js 是一个跨浏览器的 polyfills canvas.toBlob()。

// 保存纯文件
const file = new File(["您好!"], "hello.txt", {
  type: "text/plain;charset=utf-8"
});
saveAs(file);
```

:::

此外，可以通过以下方式安装 TypeScript 定义：

::: code-group

```bash
# Additional typescript definitions
npm install @types/file-saver --save-dev
```

:::

## 例子

::: code-group

```js
handleDownload() {
    this.$axios.downloadTemplate({}, {
        responseType: "blob"
    }).then(res => {
        saveAs(res.data)
    })
},
```

:::

接口返回的是文件流，通过设置 `responseType: "blob"` 可以拿到以下 Blob 格式数据

![/01ac3ecf-a637-d576-ab10-90041fcaeb82.png](/01ac3ecf-a637-d576-ab10-90041fcaeb82.png)

调用 `saveAs(res.data)` 即可保存 blob。
