# 报错：fatal: unable to access 'https://github.com/.......': OpenSSL SSL_read: Connection was reset

<article-info/>

## 报错图

![/v2-81f33931b4cc06e8dccb78eecb73b296_r.png](/v2-81f33931b4cc06e8dccb78eecb73b296_r.png)

## 问题原因

一般是这是因为服务器的 SSL 证书没有经过第三方机构的签署，所以才报错

参考网上解决办法：解除 SSL 验证后，再次 git 即可

## 解决方式

::: code-group

```bash
git config --global http.sslVerify "false"
```

:::
