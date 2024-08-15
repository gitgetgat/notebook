# 报错：fatal: unable to access 'https://github.com/.../': Failed to connect to github

<article-info/>

## 报错图

![/520d3b79ef589f62dce373a6b520e00c.png](/520d3b79ef589f62dce373a6b520e00c.png)

## 问题原因

通常是由于电脑设置的代理无法连接到 github.com 导致的

## 解决方式

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
