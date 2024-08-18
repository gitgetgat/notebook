# Git 配置：文件名字母大小写敏感

<article-info/>

## 说明

Git 对 文件名字母大小写 不敏感，会忽略文件名字母大小写的变化，导致版本管理异常。

## 示例

对文件重命名后，如果只改了字母大小写（如：user.json 改为 User.json），默认情况，Git 会认为没有变化，不会加入版本控制中。

![/9e793ac3-595f-f41a-56a4-fff31ff3c015.png](/9e793ac3-595f-f41a-56a4-fff31ff3c015.png)

![/edc012e6-c74b-fd6e-a3a8-7903508b9abe.png](/edc012e6-c74b-fd6e-a3a8-7903508b9abe.png)

![/d54837c3-b57e-6343-4557-c20a4aa027f0.png](/d54837c3-b57e-6343-4557-c20a4aa027f0.png)

## 查看 Git 配置

Git 的默认配置，是忽略文件名大小写的。下面是配置查询结果：

![/edd9b16f-4c6f-d86c-da10-178b2fae021d.png](/edd9b16f-4c6f-d86c-da10-178b2fae021d.png)

## 解决方案

设置 Git 仓库对文件名大小写敏感，不再忽略大小写。

- 配置命令

  ::: code-group

  ```bash
  git config core.ignorecase false
  ```

  :::

- 配置修改后效果

  ![/45702bda-3354-0b64-229f-58aa13ddd3c2.png](/45702bda-3354-0b64-229f-58aa13ddd3c2.png)

  ![/351a14fb-08a1-257a-a116-ec5747fa2461.png](/351a14fb-08a1-257a-a116-ec5747fa2461.png)

## 特别注意

::: warning
这种配置是 `仓库级别` 的，不支持全局配置。因此，每一个仓库克隆到本地后，都需要配置一遍。
:::
