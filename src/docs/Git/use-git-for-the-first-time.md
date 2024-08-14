# Git

<article-info/>

![/7a31a73600bf3bdf6f4ec15172c42674.jpeg](/7a31a73600bf3bdf6f4ec15172c42674.jpeg)

::: tip Git 基本使用详情点击跳转查看 :point_down:
[https://www.cnblogs.com/zjm-1/p/11032842.html](https://www.cnblogs.com/zjm-1/p/11032842.html)
:::

## 首次在电脑上使用 git bash

1. 在电脑上 `Win + R` 打开 `cmd` 窗口，输入以下命令创建 `ssh` 公钥，引号内的 [xxxxx@xxxxx.com](mailto:xxxxx@xxxxx.com) 只是生成的 `sshkey` 的名称，并不约束或要求具体命名为某个邮箱。按三次回车，会创建好 `sshkey`，保存在 `C:/Users/Administrator/.ssh/id_rsa.pub` 里面

   ::: code-group

   ```bash
   C:\Users\Administrator>ssh-keygen -t rsa -C "xxxxx@xxxxx.com"
   ```

   :::

2. 查看 `sshkey`，网上给出的命令是这样的
   ::: code-group

   ```bash
   C:\Users\Administrator>cat ~/.ssh/id_rsa.pub
   ```

   :::

   但是在 `Win 10` 的 `cmd` 中 `cat` 命令无法使用，所以用一下代替，但是上面的可以再 `Linux` 上使用，
   ::: code-group

   ```bash
   C:\Users\Administrator>cd .ssh
   C:\Users\Administrator>more id_rsa.pub
   ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAA.......
   ```

   :::

3. 在 `gittee` 上添加公钥到指定输入位置，点击确定就好了

   ![09f61188-a534-3835-31b4-7638fab708a2.png](/09f61188-a534-3835-31b4-7638fab708a2.png)

4. 下载并安装 `git bash`，默认安装就好了
5. 初次上传时会需要输入 `gittee` 账号的用户名密码，输入正确即可正常使用了
6. 下面演示下如何克隆修改上传一个项目的基本方法
   ::: code-group
   ```bash
   打开git bash，先进入到一个目录
   git clone https://gitee.com/heyingjie007/vue.git
   cd vue
   对克隆项目修改
   git status
   git add .
   git commit -m 'commit'
   git push
   ```
   :::

## 首次创建仓库

1. 创建 .gitignore 文件，里面填写要忽略的文件或者文件夹，例如：
   ::: code-group

   ```bash
   node_modules
   *.ipynb
   *.code-workspace
   ```

   :::

2. 通过 git status 反复查看经过忽略后剩下的文件及目录
3. 初始化本地 git 仓库
   ::: code-group

   ```bash
   git init
   ```

   :::

4. 添加上传的文件到本地仓库
   ::: code-group

   ```bash
   git add .
   ```

   :::

5. 配置用户名
   ::: code-group

   ```bash
   git config user.name 用户名
   ```

   :::

6. 添加注释
   ::: code-group

   ```bash
   git commit -m '内容'
   ```

   :::

7. 连接远程仓库
   ::: code-group

   ```bash
    git remote add origin 仓库地址
   ```

   :::

8. 查看远程仓库链接
   ::: code-group

   ```bash
   git remote -v
   ```

   :::

9. 推送到远程仓库
   ::: code-group

   ```bash
   git push origin master
   ```

   :::

### 创建分支

1. 创建分支
   ::: code-group

   ```bash
   git branch branchname
   ```

   :::

2. 查看分支
   ::: code-group

   ```bash
   git branch
   ```

   :::

3. 切换分支
   ::: code-group

   ```bash
   git checkout branchname
   ```

   :::

4. 创建分支的同时切换到该分支
   ::: code-group

   ```bash
   git checkout -b branchname
   ```

   :::
