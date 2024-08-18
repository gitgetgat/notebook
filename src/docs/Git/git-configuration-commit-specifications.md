# Git 配置：提交规范（Angular 篇）

<article-info/>

## 说明

因为本规则是由前端框架 Angular 提出的 Angular 提交信息规范， 所以也称为 Angular 规范。

## 安装

::: code-group

```bash
npm install -g commitizen
npm install cz-customizable --save-dev
```

:::

## 使用

1. 添加以下配置到 `package.json` 中

   ::: code-group

   ```json
   {
     "config": {
       "commitizen": {
         "path": "node_modules/cz-customizable"
       }
     }
   }
   ```

   :::

2. 项目根目录下创建 `.cz-config.js` 文件

   `将以下配置贴入 .cz-config.js 文件中`

   ::: code-group

   ```js
   module.exports = {
     // 可选类型
     types: [
       {
         name: "✨ feat: 新功能",
         value: ":sparkles: feat"
       },
       {
         name: "🐛 fix: 修复",
         value: ":bug: fix"
       },
       {
         name: "📝 docs: 文档变更",
         value: ":memo: docs"
       },
       {
         name: "💄 style: 代码样式/格式(不影响代码运行的变动)",
         value: ":lipstick: style"
       },
       {
         name: "♻️  refactor: 重构 (既不增加feature, 也不是修复bug)",
         value: ":recycle: refactor"
       },
       {
         name: "⚡️ perf: 性能优化",
         value: ":zap: perf"
       },
       {
         name: "✅ test: 增加测试",
         value: ":white_check_mark: test"
       },
       {
         name: "🔨 chore: 重新打包或更新依赖工具等",
         value: ":wrench: chore"
       },
       {
         name: "🎡 ci: 更改持续集成文件和脚本",
         value: "ci"
       },
       {
         name: "⏪️ revert: 代码回退",
         value: ":rewind: revert"
       },
       {
         name: "📦️ build: 打包",
         value: ":rocket: build"
       }
     ],
     // scope 类型（定义之后，可通过上下键选择）
     scopes: [
       ["components", "组件相关"],
       ["hooks", "hook 相关"],
       ["utils", "utils 相关"],
       ["element-ui", "对 element-ui 的调整"],
       ["styles", "样式相关"],
       ["deps", "项目依赖"],
       ["config", "配置相关"],
       ["other", "其他修改"],
       // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
       ["custom", "以上都不是？我要自定义"]
     ].map(([value, description]) => {
       return {
         value,
         name: `${value.padEnd(30)} (${description})`
       };
     }),
     // 步骤消息提示
     messages: {
       type: "确保本次提交遵循规范！\n选择你要提交的类型：",
       scope: "\n选择一个 scope（可选）：",
       customScope: "请输入修改范围（可选）：",
       subject: "请输入变更描述（必填）：",
       body: "填写更加详细的变更描述（可选）：",
       footer: "请输入要关闭的 ISSUES （可选）：",
       confirmCommit: "确认要使用以上信息提交？(y/n)"
     },
     // 允许自定义范围
     allowCustomScopes: true,
     // 要跳过的问题
     // skipQuestions: ['footer'],
     // subject文字默认值是 100
     subjectLimit: 100
   };
   ```

   :::

3. 运行 `git cz` 命令时就可以看到

   ::: info
   一定要保证本地仓库有内容（即 执行过 git add 命令， 或者 vscode 中的 “暂存”）
   :::

   ![/068aac60-57c4-11bd-bf47-401083d18b97.png](/068aac60-57c4-11bd-bf47-401083d18b97.png)

   ![/34537b6d-3da3-fc2b-1500-ebe5d9f94769.png](/34537b6d-3da3-fc2b-1500-ebe5d9f94769.png)

   1. 选择类型

      ![/9c9f730d-c245-73d7-3387-c79ca3ca5fc7.png](/9c9f730d-c245-73d7-3387-c79ca3ca5fc7.png)

   2. 选择修改的文件类型

      ![/1ce3b591-02b5-1d65-7461-6edc6aec1f08.png](/1ce3b591-02b5-1d65-7461-6edc6aec1f08.png)

   3. 输入变更描述（简介）

      ::: info
      这里一般是书写一些简介， 比如干了点啥、升级了啥，等等。
      :::

      ![/22a61add-505d-4c97-8269-e149c899b2b9.png](/22a61add-505d-4c97-8269-e149c899b2b9.png)

   4. 输入详细描述

      ::: info
      这里一般是更加详细的描述， 如果是新增（或者修改）需求，可以把需求日期（或 版本/地址连接）写上， 方便后续追踪。
      :::

      ![/581268b1-95e5-0f47-032b-a573d99fd2cc.png](/581268b1-95e5-0f47-032b-a573d99fd2cc.png)

      ::: warning ⚠️ 注意
      换行符为 “|”。 但是在 gitlab 中也是识别 \n 的。
      :::

   5. bug 编号

      ::: warning ⚠️ 注意
      如果是新增页面或者是修改需求， 那么不用管。 直接敲回车

      如果有 bug， 并且改了多个， 那中间用 逗号 “,” 隔开。
      :::

      ![/5ccf0396-ef1e-230d-56dc-1e2d66aae225.png](/5ccf0396-ef1e-230d-56dc-1e2d66aae225.png)

   6. 提交到本地仓库

      ![/7fe94b34-e408-67a0-41b7-4bd2869dbff1.png](/7fe94b34-e408-67a0-41b7-4bd2869dbff1.png)

   7. 输入 git push 推到远程仓库即可观察提交内容

      ![/2f993423-b53e-eae4-68dd-f99fa5516e11.png](/2f993423-b53e-eae4-68dd-f99fa5516e11.png)

      ![/bd9c4ab6-c781-10b2-bda5-94d973b49005.png](/bd9c4ab6-c781-10b2-bda5-94d973b49005.png)

   8. 完整流程

      ![/3fd0d289-8211-6218-10bd-53beaffe1713.png](/3fd0d289-8211-6218-10bd-53beaffe1713.png)
