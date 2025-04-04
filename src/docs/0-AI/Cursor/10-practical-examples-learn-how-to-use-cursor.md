# 10 个实际例子学习如何使用 Cursor

<article-info/>

## 1. 内联代码生成

我们使用 `Ctrl + Shift + K` 快捷键打开内联代码生成器。这将打开一个小提示窗口，我们在其中插入提示以生成代码。这将生成代码，我们通过单击 `Accept 按钮` 将其添加到我们的项目中，`Reject 按钮` 撤销修改。

![f81cba59-cfdf-e932-0c46-e5e0c83cb4b1.png](/f81cba59-cfdf-e932-0c46-e5e0c83cb4b1.png)

## 2. 与现有代码交互

在使用 `Ctrl + Shift + K` 快捷键之前选择相关代码。这可用于对代码进行更改（例如重构）或询问有关代码的问题。输入提示后，我们单击 `“Submit Edit”` 按钮以获取修改：

![70fc1952-6c92-0de2-f10e-ccd2080d0ae9.png](/70fc1952-6c92-0de2-f10e-ccd2080d0ae9.png)

代码更改以差异形式呈现。红线代表将被更改删除的行，而绿线代表将添加的新更改：

![9c672a40-3ea7-aa0d-3d35-2992a530ae92.png](/9c672a40-3ea7-aa0d-3d35-2992a530ae92.png)

## 3. 询问有关现有代码的问题

同样，我们可以通过选择一段代码并使用 `Ctrl + Shift + K` 快捷键来询问有关该代码的问题。如果有问题，我们点击 `quick question` 按钮提交提示：

![eb40c83a-2c95-06e6-5c6b-9acf1d89dd28.png](/eb40c83a-2c95-06e6-5c6b-9acf1d89dd28.png)

提交问题后，系统将生成答案并以如下方式显示：

![faf3c13f-71a1-f705-139b-7b1072454e87.png](/faf3c13f-71a1-f705-139b-7b1072454e87.png)

## 4. 使用 Tab 自动完成

在编写代码时，Cursor 会建议使用 AI 生成的代码补全。与传统的代码完成类似，我们可以使用 `Tab` 键将这些建议合并到我们的代码中。

## 5. 聊天界面

要打开聊天窗口，请使用 `Ctrl + L` 快捷键。聊天窗口比内联生成器更通用，因为它不仅允许我们生成代码，还允许我们提出问题。

![c8cd8993-224b-d26a-771f-9526ccb11564.png](/c8cd8993-224b-d26a-771f-9526ccb11564.png)

## 6. 通过聊天生成代码

与使用内联聊天生成类似，我们也可以使用聊天功能生成代码。通过单击代码窗口右上角的 `“Apply”` 按钮，可以将聊天中生成的代码集成到项目中。

## 7. 使用@增加查询上下文

也许聊天窗口最重要的功能是 `@` 选项。此选项使我们能够为人工智能提供更多数据来生成响应。其范围从简单的文件和文件夹到网络搜索或授予 AI 对 GitHub 存储库的访问权限。

![f2286f26-9f09-67fb-9d61-ac599d0170ab.png](/f2286f26-9f09-67fb-9d61-ac599d0170ab.png)

例如，我们可以使用 `@Web` 让 AI 在网络上搜索答案。

![5a937a79-e02e-d1da-ee78-7b980df63519.png](/5a937a79-e02e-d1da-ee78-7b980df63519.png)

## 8. 支持图片

聊天还支持图像输入。例如，我们可以为网站绘制 UI 设计草图，并要求它为其生成 HTML 和 CSS 代码。要添加图像，我们可以将其拖放到聊天窗口中。

## 9. 添加文档

Cursor AI 的一个非常有用的功能是能够添加文档参考。这对于本地文档库尤其有用，这些文档可能尚未在人工智能培训过程中使用。

要添加文档条目，我们使用 `@` 符号，然后从下拉菜单中选择 `Docs` ：

![/d22c207f-ece8-4845-8240-19f9667ab665.png](/d22c207f-ece8-4845-8240-19f9667ab665.png)

这将打开一个窗口，请求文档的 `URL`。让我们添加 `Node.js` 文档作为示例：

![9ff53e5b-71b9-ab02-5f78-6fd45a04e004.png](/9ff53e5b-71b9-ab02-5f78-6fd45a04e004.png)

回车后会自动识别该文档，并显示其内容：

![/ac59877f-125d-22f6-c35e-90d6bcb069f1.png](/ac59877f-125d-22f6-c35e-90d6bcb069f1.png)

确认后，我们可以为文档条目命名。在本例中，我们使用 `Node.js` 。然后，我们可以使用此名称在聊天提示中使用 `@Node.js` 来引用此文档。

![/84fb9318-b007-50c9-df7d-98634ce048d5.png](/84fb9318-b007-50c9-df7d-98634ce048d5.png)

还可以在 “功能” 选项卡中的 `“Cursor Settings”` 设置中管理文档参考：

![/e6a3733b-4d68-b039-13b3-2a8d54596950.png](/e6a3733b-4d68-b039-13b3-2a8d54596950.png)

## 10. 设置自定义 AI 规则

Cursor 允许我们使用特定规则来引导人工智能。这些可以在常规设置菜单下访问，这些规则可以作为默认提示，而不需要反复提示。

![/13652b06-94ba-789c-bab1-7b8051e67c01.png](/13652b06-94ba-789c-bab1-7b8051e67c01.png)

## 11. 账号过期后如何处理

再官网登录以后，在用户界面 https://www.cursor.com/cn/settings 中，删除用户，后重新注册

![26c6db95-56ef-63cc-6386-239380cf554d.jpg](/26c6db95-56ef-63cc-6386-239380cf554d.jpg)

### 无法通过删除账户获取试用如何处理

::: warning 解决 Cursor 在免费订阅期间出现以下提示的问题:
You've reached your trial request limit. / Too many free trial accounts used on this machine. Please upgrade to pro. We have this limit in place to prevent abuse. Please let us know if you believe this is a mistake.<link-tag :linkList="[{ linkType: 'git', linkText:'go-cursor-help',linkUrl:'https://github.com/yuaotian/go-cursor-help'}]" />
:::
