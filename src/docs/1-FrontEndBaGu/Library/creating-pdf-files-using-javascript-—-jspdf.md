# 使用 jsPDF-AutoTable 库生成带表格的 PDF 文件

<article-info/>

## 基础使用

首先先放 git 地址：

[https://github.com/parallax/jsPDF](https://github.com/parallax/jsPDF)

::: tip
看官方文档就好，基础的使用非常简单
:::

## 使用 jsPDF-AutoTable 插件生成表格

::: tip git 及 官方文档
[https://github.com/simonbengtsson/jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)

[https://github.com/faker-js/faker](https://github.com/faker-js/faker)

[JSPDF 官方文档](https://raw.githack.com/MrRio/jsPDF/master/docs/index.html)[jsPDF-AutoTable 样例在线演示](https://simonbengtsson.github.io/jsPDF-AutoTable/)（示例代码在项目/examples/examples.js 里，数据来自 faker.js 生成的随机数据）
:::

::: tip 其他人编写的技术文档

[JS - 使用 jsPDF-AutoTable 库生成带表格的 PDF 文件 1（安装配置、基本属性设置）](https://www.hangge.com/blog/cache/detail_2208.html)

[JS - 使用 jsPDF-AutoTable 库生成带表格的 PDF 文件 2（全局、局部样式修改）](https://www.hangge.com/blog/cache/detail_2212.html)

[JS - 使用 jsPDF-AutoTable 库生成带表格的 PDF 文件 3（进阶用法、中文乱码解决）](https://www.hangge.com/blog/cache/detail_2213.html)
:::

最后说下难点：

### 中文乱码的问题

使用官方提供的 [网址](https://rawgit.com/MrRio/jsPDF/master/fontconverter/fontconverter.html) 进行字体转换

![/18061475-91c9-044e-6de4-52c796a6076a.png](/18061475-91c9-044e-6de4-52c796a6076a.png)

将字体文件转换为 `二进制数据的 base64 字符串`，官方提供了使用方式

::: code-group

```js
const doc = new jsPDF();

const myFont = ... // load the *.ttf font file as binary string

// add the font to jsPDF
doc.addFileToVFS("MyFont.ttf", myFont);
doc.addFont("MyFont.ttf", "MyFont", "normal");
doc.setFont("MyFont");
```

:::

这个网址就是干这个的，选中一个字体文件会生成一个类似下面的一个文件 `simsun-normal.js`

::: code-group

```js
// simsun-normal.js

import { jsPDF } from "jspdf";
var font = ""; // load the *.ttf font file as binary string
var callAddFont = function () {
  this.addFileToVFS("simsun-normal.ttf", font);
  this.addFont("simsun-normal.ttf", "simsun", "normal");
};
jsPDF.API.events.push(["addFonts", callAddFont]);
```

:::

::: warning ⚠️ 注意
注意这里有个坑：选择的汉字字体文件要注意，我是从 C:\Windows\Fonts 下选择的 “黑体 常规”，这个字体经过尝试没有问题，别的汉字字体在测试后仍然乱码，是那种编码 ID 不对应的问题，输入的字和展示的字不是一样。
:::

在 vue2 中使用

::: code-group

```js
import { jsPDF } from "jspdf";
import "./config/simhei-normal.js";
import "jspdf-autotable";

// use font

var doc = new jsPDF("p", "pt");
doc.setFont("simhei");
doc.text("测试", 50, 50);
doc.autoTable({
  styles: { font: "simhei" }, // 这里必须再次声明，否则表格里依旧会乱码
  startY: 40,
  body: allDataList,
  theme: "grid"
});
```

:::

- 关于单元格合并，单元格在设计时首先考虑列数，其次可以像栅格使用类似，确定栅格数，然后每一项占用几个格子

  比如，我有三列数据，每一行的数据是一个数组，数组里的每个元素是这个单元格的数据

  ```jsx
  data = ["测试1", "测试2", "测试3"];
  ```

  加入我第一个元素要跨整行（3 列），那个，后两个元素虽然有，也不会显示

  ::: code-group

  ```js
  data = [
    {
      content: "测试1",
      colSpan: 3, // 要跨的列数
      styles: { cellWidth: "warp" }
    },
    "测试2",
    "测试3"
  ];
  ```

  :::

- 其次就是这个单元格宽度问题，如果是 `styles: { cellWidth: "warp" }` 是不会严格按照跨列设置的比例走的，这也许和内部的文字计算长度并换行有关；如果是 `styles: { cellWidth: 368 }` 设置了具体宽度，这个又是会报错，也是和内部计算文字宽度并截取换行有关，这个问题目前无法完全解决，只能用 `colSpan: 3, styles: { cellWidth: "warp" }` 两两结合测试来确定，可以把总栅格数确定的大一些，然后来回测试比例

- 添加水印

  ::: code-group

  ```json
  let doc = new jsPDF('p', 'pt');
  let totalPages = doc.internal.getNumberOfPages();
  for (i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("simhei");
    //   doc.setFont("simhei", "bold"); // 英文这个粗体设置可以生效，中文会造成乱码
    doc.setFontSize(40) // 设置字体大小
    doc.saveGraphicsState() // 保存图形状态
    doc.setGState(doc.GState({ opacity: 0.1 })) // 设置透明度为0.3
    const watermarkText = Array.from({ length: 30 }, () => '中指数据 CREIS').join("     ") // 构建水印文字超长字符串
    let beginHeight = -20 // 文字开始的高度
    const widthGap = 120 // 每行文字x的间隔
    const heightGap = 220 // 每行文字y的间隔
    const pageHeight = doc.internal.pageSize.height
    let id = 0 // 计数器
    while (beginHeight < (pageHeight * 2)) {// 文字绘制满页面
      doc.text(watermarkText, (0 - id * (widthGap)), beginHeight, {
        angle: 30
      }, 30) // 水印文本, 横向坐标， 纵向坐标， 倾斜角度
      beginHeight = beginHeight + heightGap
      id++
    }
    doc.restoreGraphicsState() // 设置完毕之后，清除图形状态，防止影响其他内容
  }
  doc.save(`table.pdf`);
  ```

  :::

  ::: warning ⚠️ 注意
  写这篇文章时，jspdf 最新版本为 `2.5.1`，这个版本有 bug，text 方法里的 旋转配置不生效，降版本到 `2.3.1` 就好了
  :::
