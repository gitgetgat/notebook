# Git 报错合集

## 报错：pre-commit hook failed (add --no-verify to bypass)

### 报错图

![/6c683613-e21e-2864-2d5f-c76152cc6315.png](/6c683613-e21e-2864-2d5f-c76152cc6315.png)

### 问题原因

**pre-commit 钩子惹的祸**

当你在终端输入 `git commit -m "XXX"`，提交代码的时候。

`pre-commit`(客户端)钩子，它会在 Git 键入提交信息前运行做代码风格检查。

如果代码不符合相应规则，则报错。

### 解决方式

1. 简单粗暴的方式
   - 进入项目的 `.git` 文件夹下面 hooks 文件夹，手动删除 `pre-commit` 文件
   - 运行命令：`rm -rf ./git/hooks/pre-commit` 删除 `pre-commit` 文件
2. 根据提示在命令中添加 `--no-verify`
   - 将 `git commit -m "XXX"` 改为 `git commit --no-verify –m "XXX"`
3. 代码改到符合标准再提交`（推荐使用这个）`

## 报错：fatal: unable to access 'https://github.com/.../': Failed to connect to github

### 报错图

![/520d3b79ef589f62dce373a6b520e00c.png](/520d3b79ef589f62dce373a6b520e00c.png)

### 问题原因

通常是由于电脑设置的代理无法连接到 github.com 导致的

### 解决方式

1.  DNS 解析出现问题

    在 cmd 窗口输入

    ::: code-group

    ```bash
    ​ipconfig/flushdns
    ```

    :::

2.  防火墙或代理设置

    取消代理

    需要取消 git 对 http 和 https 的代理

    ::: code-group

    ```bash
    // 取消http的代理
    git config --global --unset http.proxy

    // 取消 https 的代理
    git config --global --unset https.proxy

    ```

    :::

## 报错：fatal: unable to access 'https://github.com/.......': OpenSSL SSL_read: Connection was reset

### 报错图

![/v2-81f33931b4cc06e8dccb78eecb73b296_r.png](/v2-81f33931b4cc06e8dccb78eecb73b296_r.png)

### 问题原因

一般是这是因为服务器的 SSL 证书没有经过第三方机构的签署，所以才报错

参考网上解决办法：解除 SSL 验证后，再次 git 即可

### 解决方式

::: code-group

```bash
git config --global http.sslVerify "false"
```

:::
