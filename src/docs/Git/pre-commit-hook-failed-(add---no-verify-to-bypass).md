# 报错：pre-commit hook failed (add --no-verify to bypass)

<article-info/>

## 报错图

![/6c683613-e21e-2864-2d5f-c76152cc6315.png](/6c683613-e21e-2864-2d5f-c76152cc6315.png)

## 问题原因

**pre-commit 钩子惹的祸**

当你在终端输入 `git commit -m "XXX"`，提交代码的时候。

`pre-commit`(客户端)钩子，它会在 Git 键入提交信息前运行做代码风格检查。

如果代码不符合相应规则，则报错。

## 解决方式

1. 简单粗暴的方式
   - 进入项目的 `.git` 文件夹下面 hooks 文件夹，手动删除 `pre-commit` 文件
   - 运行命令：`rm -rf ./git/hooks/pre-commit` 删除 `pre-commit` 文件
2. 根据提示在命令中添加 `--no-verify`
   - 将 `git commit -m "XXX"` 改为 `git commit --no-verify –m "XXX"`
3. 代码改到符合标准再提交`（推荐使用这个）`
