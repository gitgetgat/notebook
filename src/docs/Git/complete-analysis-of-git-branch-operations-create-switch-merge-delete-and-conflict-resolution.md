# Git 分支操作全解析：创建、切换、合并、删除及冲突解决

<article-info/>

## 分支简介

管理代码的时候，在集中式管理（比如 SVN）中会创建 Trunk、Branches、Tag 等一些目录，分别放置开发代码、代码分支以及代码的里程碑。那么在 Git 中也使用分支和 tag 来管理代码。分支就是就是一个代码的副本，可以基于分支进行独立开发。比如我们创建 Bug 分支或者 Feature 分支，等开发好了再合并到主干上。使用 Git 可以非常方便灵活地管理分支和基于分支工作：

::: code-group

```bash
git branch   # 查看分支
git branch develop  # 创建develop分支
git checkout –b feature/FT-123456  # 创建FT-123456的一个feature分支
git checkout develop   # 切换分支
git merge feature/FT-123456   # 合并分支
git branch –d feature/FT-123456   # 删除FT-123456的feature分支
git push –u origin hotfix/ISSUE-345678    # 推送分支
```

:::

版本管理的标准流程：

- `Master` ：稳定压倒一切，禁止尚 `review` 和测试过的代码提交到这个分支上，Master 上的代码是可以随时部署到线上生产环境的。

- `Develop` ：开发分支，我们的持续集成工作在这里，`code review` 过的代码合入到这里，我们以下要讲的 `bug fix` 和 `feature` 开发都可以基于 `develop` 分支拉取，修改完之后合入到 `develop` 分支。

- `Feature` ：功能开发和 `change request` 的分支，也即我们每一个 `feature` 都可以从 `devlop` 上拉取一个分支，开发、review 和测试完之后合入 `develop` 分支。

- `Hotfix` ：紧急修改的分支，在 `master` 发布到线上出现某个问题的时候，算作一个紧急布丁。从 `master` 分支上拉取代码，修改完之后合入 `develop` 和 `master` 分支。

- `Release` ：预发布分支，比如 0.1、0.2、1.12 版本，我们一般说的系统测试就是基于这些分支做的，如果出现 bug，则可以基于该 `release` 分支拉取一个临时 bug 分支。

- `Bug` ：`bug fix` 的分支，当我们定位、解决后合入 `develop` 和 `release` 分支，然后让测试人员回归测试，回归测试后由 close 这个 bug。

![/c6feb3c9-99f5-bdd0-f40d-5cc4ebc19d21.png](/c6feb3c9-99f5-bdd0-f40d-5cc4ebc19d21.png)

## 查看分支

首先要知道怎么去查看分支，使用 `git branch` 命令，这个命令只打印本地仓库的分支；如果想把远端的分支也查看一番，可以使用 `git branch -a`命令。其中其星号 `*` 表示当前在哪个分支。示例：

::: code-group

```bash
fly@LAPTOP-V34UPA81:~/workspace/fly-mem-test$ git branch
* master
fly@LAPTOP-V34UPA81:~/workspace/fly-mem-test$ git branch -a
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
fly@LAPTOP-V34UPA81:~/workspace/fly-mem-test$
```

:::

## 创建、切换分支

创建分支有两种方式：

::: code-group

```bash
git branch 分支名
git checkout -b 分支名
```

:::

它们的不同：

- `git branch` 分支名虽然创建了分支，但不会自动切换到新建的分支；而且是在本地创建的分支，远端没有这个分支。

- `git checkout -b` 也会创建分支，而且会自动切换到新的分支上。

切换分支也有两种方式：

::: code-group

```bash
git checkout 分支名
git switch 分支名
```

:::

`git check` 命令的功能很多，除了切换分支，还可以做版本回退等操作，因此，后来 `Git` 又增加了一个 `git switch` 命令。

`git checkout -b` 可以理解为两个命令的结合，即 创建分支 + 切换分支两个操作合成一个命令。

## ✨ 合并分支 <el-tag type="danger" size="small" style="vertical-align: top;margin-left: 5px">重点</el-tag>

合并分支有两个命令：

- `git merge`

- `git rebase`，不推荐使用。`git rebase` 不仅可以合并提交，还可以合并分支。

合并分支的主要作用：通常，在实际项目开发过程中，会有多个分支，而且都是基于某个主分支进行开发。最终，所有的分支实现的功能都要合并到主分支，所有人都可以看到项目的修改。我们要把自己分支的修改应用到主分支，就需要合并分支。

![/46a4f845-1492-8270-fcb2-df7a96b2cc36.png](/46a4f845-1492-8270-fcb2-df7a96b2cc36.png)

### `git merge`

`git merge` 合并 Git 分支的步骤：

1.  切换到目标分支：这是你希望将更改合并到的分支。例如，如果你想将 feature-branch 合并到 main，需要首先切换到 main 分支，拉取该分支的最新代码。

    ::: code-group

    ```bash
    git checkout main
    git pull
    ```

    :::

2.  合并分支：使用 `git merge` 命令将另一个分支合并到当前分支。例如，将 `feature-branch` 合并到 `main`：

    ::: code-group

    ```bash
    git merge feature-branch
    ```

    :::

3.  处理冲突（如果有）：如果存在冲突，Git 会提示你解决冲突。你需要手动编辑冲突的文件，然后添加更改并完成合并。

    ::: code-group

    ```bash
    # 编辑冲突文件
    vim 冲突的文件
    # 解决冲突后，添加已解决的文件
    git add <file-with-conflict>

    # 完成合并
    git commit . -i -m "merge fix conflicts."
    ```

    :::

    冲突文件示例：

    ![/27db7beb-e1af-aa6e-6ebb-9192ada20f3f.png](/27db7beb-e1af-aa6e-6ebb-9192ada20f3f.png)

4.  测试代码并推送更改（如果需要）：将合并后的更改推送到远程仓库。

    ::: code-group

    ```bash
    git push origin main
    ```

    :::

### `git rebase`（不推荐使用）

使用 `git rebase` 进行分支合并的步骤如下：

1.  切换到需要更新的分支：假设要将 `feature-branch` 的更改应用到 main 分支上，首先需要切换到 `feature-branch`。

    ::: code-group

    ```bash
    git checkout feature-branch
    ```

    :::

2.  执行 rebase 操作：将 `feature-branch` 的更改应用到 main 分支上。

    ::: code-group

    ```bash
    git rebase main
    ```

    :::

    这会将 `feature-branch` 上的提交“移到” `main` 分支的顶部。`feature-branch` 上的更改将会被逐个应用到 `main` 上的最新提交之后。

3.  解决冲突（如果有）：如果在 `rebase` 过程中出现冲突，Git 会提示解决冲突。解决冲突后，继续 `rebase` 操作。注意，`git rebase` 解决完冲突后并不会增加一次提交。

    ::: code-group

    ```bash
    # 编辑冲突文件
    vim 冲突的文件
    # 解决冲突后，添加已解决的文件
    git add <file-with-conflict>

    # 继续 rebase
    git rebase --continue
    ```

    :::

    `rebase` 示例：

    ![/28018473-a357-270e-658d-576a66339db2.png](/28018473-a357-270e-658d-576a66339db2.png)

4.  推送更改（如果需要）：由于 `rebase` 操作会改变提交历史，如果已经将 `feature-branch` 推送到远程仓库，需要强制推送更新。

    ::: code-group

    ```bash
    git push --force origin feature-branch
    ```

    :::

    ::: warning ⚠️ 注意
    强制推送会覆盖远程仓库中的 `feature-branch`，在共享仓库中使用时请小心。
    :::

    不推荐使用 `git rebase` 的原因：虽然 `git rebase` 让提交记录非常整洁，它整体上比 `git merge` 上一个提交记录，但是它会让人造成混淆（时间线错乱），无法辨别真正的版本依赖关系。

    `git merge` 更加符合实际开发的时间线。

    ![/f125016a-ea64-0032-96a1-c628e5a9bd48.png](/f125016a-ea64-0032-96a1-c628e5a9bd48.png)

    什么时候使用 `git rebase` ?

    依据是：是否有其他人依赖我当前 `rebase` 的这个分支。如果有依赖，则应当采用 `git merge` 进行合并，否则可以 使用 `git rebase` 命令。因为 `git rebase` 会改变提交日志（即 commit id），如果有人依赖我的分支，就可能出现异常。

    `git rebase` 原理：从两个分支的共同祖先开始提取当前分支上的修改，提取的提交应用到目标分支的最新提交的后面，将当前分支指向目标分支的最新提交，可能引发其他人基底发生改变。

## 删除分支

删除本地分支：

1. 切换到其他分支：在删除分支之前，确保不在要删除的分支上。例如，如果要删除 `feature-branch`，可以切换到 main 或其他分支。

   ::: code-group

   ```bash
   git checkout main
   ```

   :::

2. 删除本地分支：使用 `-d` 选项删除本地分支，如果分支上有未合并的更改，Git 会警告你。

   ::: code-group

   ```bash
   git branch -d feature-branch
   ```

   :::

   如果你确定要删除分支，即使它有未合并的更改，可以使用 `-D`（强制删除）：

   ::: code-group

   ```bash
   git branch -D feature-branch
   ```

   :::

删除远程分支：使用 `git push` 命令并指定 `--delete` 选项来删除远程分支。例如，删除远程 `feature-branch`。

::: code-group

```bash
git push origin --delete feature-branch
# or
git push origin -d feature-branch
```

:::

## 解决冲突

冲突产生原因：不同分支修改了同一文件的同一行或者相邻行。

解决原则：不要影响其他人提交的功能，也不能破坏自己提交的功能。也可以跟其他人协商解决。

建议：提交前先 `pull` 更新最新代码。

![/11ae2436-2393-600a-170c-feb969fd1fe3.png](/11ae2436-2393-600a-170c-feb969fd1fe3.png)

`git merge` 和 `git rebase` 解决冲突的不同：

`git merge` 先解决冲突文件，然后使用 `git add`，最后 `git commit . -i -m "...."`，完成。

`git rebase` 先解决冲突文件，然后使用 `git add .` 标记解决，最后 `git rebase --continue`，完成。

![/ff840d89-f954-8781-85f0-fa5c7b3b3c9e.png](/ff840d89-f954-8781-85f0-fa5c7b3b3c9e.png)
