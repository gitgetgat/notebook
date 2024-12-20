# Git 版本回退操作详解

<article-info />

## Git 的工作流程

在讲这个版本回退之前，我们要温习一下 `Git` 的原理。下面这张图就是 `Git` 的整个工作流程，也是 `Git` 抽象出来的几个概念。

![/2e88d7b8-94ad-54ff-af9a-bdb17e55da23.jpg](/2e88d7b8-94ad-54ff-af9a-bdb17e55da23.jpg)

### Git 的四个区域：

- workspace：本地工作区，就是你平时存放项目代码的地方。比如你拉取代码 `git clone ssh://fly@192.168.31.91:/home/fly/srcs`，`srcs` 目录就是本地工作区了。开发者就在工作区里写代码。

- `Index / Stage`：暂存区，用于临时存放你的改动，事实上它只是一个文件，保存即将提交到文件列表信息。值得一提的是，SVN 是没有暂存区概念的。暂存区允许把多次修改统一放在暂存区中，然后再由暂存区统一提交到本地仓库，确保提交记录清晰。

- `Repository`：本地仓库区（或版本库），就是安全存放数据的位置，这里面有你提交到所有版本的数据。其中 HEAD 指向最新放入仓库的版本。

- `Remote`：远程仓库，托管代码的服务器，可以简单的认为是你项目组中的一台电脑用于远程数据交换。

### `Git` 的 工作流程

一般是这样的：

![/08d65f4d-3f25-2dce-5959-f167aba37cd5.png](/08d65f4d-3f25-2dce-5959-f167aba37cd5.png)

1. 在工作区目录中添加、修改文件；产生数据变更。

2. 将需要进行版本管理的文件 `add` 到暂存区域；

3. 将暂存区域的文件 `commit` 到 `git` 仓库；

4. 本地的修改 `push` 到远程仓库，如果失败则执行第 5 步；

5. `git pull` 将远程仓库的修改拉取到本地，如果有冲突需要修改冲突，回到第三步。

因此，git 管理的文件至少有三种状态：`已修改(modified)`、`已暂存(staged)`、`已提交(committed)`。

## 回退 尚未 commit 的修改

本地做了一些修改，包括修改了某些文件，增加了某些文件，删除了一些目录，也添加了一些目录，有些内容添加到了暂存区，有些没有。情况很复杂，但是、总之，这些修改没有 `commit` 到本地仓库，那此时我们说的版本回退就是指丢弃修改。那如何操作呢？

从原理图中，看到 `git checkout` 命令就是从本地仓库中或暂存区检出文件，并且覆盖工作目录的内容。比如：

::: code-group

```bash
# 检出到 branches/stable-1.14 分支上，即用 1.14 分支的内容覆盖了工作区所有内容
git checkout branches/stable-1.14

# 检出到 9bfbacdd（commit id）上，即用这个 commit 内容覆盖了工作区所有内容
git checkout 9bfbacdd

# 从暂存区中检出内容，并且覆盖 main.cpp 文件内容，即尚未添加到暂存区的修改会被丢弃掉
git checkout main.cpp
```

:::

可是上面都是说从 `git` 的本地仓库和暂存区里检出内容，然后覆盖掉工作区的内容，即丢弃了本地所有的修改。

那如果是有些内容已经存在工作区了，但是尚未提交到暂存区，即是 `untracked` 的内容，那么我们可以使用 `git clean` 命令来删除这些文件，用法如下：

- `git clean -n` ：是一次 `clean` 的演习，告诉你哪些文件会被删除，记住他不会真正的删除文件，只是一个提醒。

- `git clean -f` ：删除当前目录下所有没有 `track` 过的文件，他不会删除 `.gitignore` 文件里面指定的文件夹和文件，不管这些文件有没有被 `track` 过。

- `git clean -f <path>` ：删除指定路径下的没有被 `track` 过的文件。

- `git clean -df` ：删除当前目录下没有被 `track` 过的文件和文件夹。

- `git clean -xf` ：删除当前目录下所有没有 `track` 过的文件，不管他是否是 `.gitignore` 文件里面指定的文件夹和文件。

好了，如果我们想要放弃本地的所有修改可以：

- `git checkout .`：注意有一个 `“.”`，会从暂存区里取出所有内容覆盖掉工作区的所有修改，如果连暂存区的内容也不想要则可以 `git checkout commit-id`。

- `git clean -xdf`：删除当前目录下所有的修改。

如果我们想要放弃本地某个文件的修改：

::: code-group

```bash
git checkout file-name  # 从暂存区里
```

:::

## 已经提交尚未推送到远端仓库

有时候，我们在本地的修改，可能提交到了本地仓库，但是尚未 push 到远程仓库，针对这一种场景的

回滚是比较简单的，如下图所示：

![/39be29b2-734e-4bc0-eff8-e42a6cd1538a.png](/39be29b2-734e-4bc0-eff8-e42a6cd1538a.png)

`origin/master` 指向了 `5ff5433b` 这个 `commit` ，本地有三个 `commit` ，现在想针对这三个 `commit` 作回滚，可
以使用 `git reset` 命令来做，`reset` 参数如下：

- `--soft`：缓存区和工作目录都不会被改变。

- `--mixed`：默认选项。你指定的提交同步，但工作目录不受影响。

- `--hard`：缓存区和工作目录缓存区和都同步到你指定的提交。

`git reset --hard HEAD~{n}` 就是把 `HEAD` 指针回退 `n` 个版本（commit），并且使用该 `commit` 的内容覆盖掉工作区的内容，即丢弃了前面 `n` 个 `commit` 的修改和当前工作区的修改。然后调用 `git push origin master` 推送到远程仓库。

## 已经提交到 remote 仓库

在使用 `Git` 进行版本控制时，如果我们已经将本地的代码提交（push）到了远程仓库，那么我们需要考虑两种情况。

首先，我们需要判断我们提交的代码是否有其他同事已经在此基础上进行了修改，并且将这些修改也推送到远程仓库。如果其他同事已经在我们的提交之上进行了修改，并且这些修改已经被推送，那么如果我们直接回退（例如使用 `git reset`），将会导致这些同事的修改被丢弃。同时，这种操作还会删除历史记录，这可能不符合我们的预期，尤其是在团队协作中，这会对同事的工作造成影响。

另一方面，如果没有其他同事在我们的提交上进行修改，那么我们可以考虑使用 `git revert` 来回退我们的提交。这种方法会创建一个新的提交，以抵消我们想要回退的那个提交，这样既保留了历史记录，也不会影响到其他同事的工作。

有些人可能会问，为什么不使用 `git reset` 呢？因为 `git reset` 会完全删除关于指定提交的历史记录，这样不仅会导致记录的不完整，也会对团队中的其他成员产生负面影响。因此，使用 `git revert` 是更好的选择。

具体来说，假设我们当前有三个提交，如果我们希望回退到某个特定的提交（比如 `d061cb3`），而这个提交之后的工作并不是我们想要的，那么我们应当使用 `git revert d061cb3` 来进行回退操作。这样做可以确保我们的操作是安全的，并且符合团队协作的最佳实践。

示例：

::: code-group

```bash
git revert d061cb3 # 因为4bff67b是晚于d061cb3的，如果这两个修改的内容有依赖，是会有冲突的，
                   # 当然如果想取消这次回退可以使用，git revert --abort
fix conflict  # 手动去解决冲突
git commit  # 然后提交，此时使用git log会发现原理的git commit记录还在，
            # 但是增加了一个revert的记录
git push    # 推送至远程库
```

:::

如果有其它同事基于我们的 `commit` 做修改的话，我们回退版本的时候不想把他的提交给回退

掉，比如想回滚到 `5ff5433b` 这里，但是有其他人的一个提交我不能回滚掉，要保存他的代码，而且如果有多个同事的修改在在 `5ff5433b` 之后的，那怎么办呢？

比较好的做法就是从 `5ff5433b` 拉取一个新的分支（分支名是 `reset_to_5ff5433b` ）, 因为这个新分支不包含要回滚的代码，此时我们可以把其它同事的修改手动合并到 `reset_to_5ff5433b` 分支，接着切换到 `master` 分支上，使用 `git merge reset_to_5ff5433b` 去合并分支到 `master` 上。这也就是分支操作的知识点。

::: code-group

```bash
# 从5ff5433bd1fe4处创建分支，即代码是5ff5433bd1fe4处的代码
$ git checkout -b reset_to_5ff5433b 5ff5433bd1fe4
# 查看master分支上的其它同事的提交（比如KING），把他的修改在新分支上再修改一遍
$ git show 9d531db98276
$ git commit –a –m "reverted 5ff5433b"
# 切换到master分支
$ git checkout master
$ git merge reset_to_5ff5433b
$ git push #推送到远程仓库
```

:::

## 避免频繁回退

在日常开发中，频繁回退（即使用 `git revert` 或 `git reset`）可能会影响工作效率和代码的整洁性。应当避免频繁回退：

- 定期提交：将工作分解成小的、可管理的任务，并在完成每个小任务后提交。这使得每个提交都比较小，回退时不会影响太多代码。

- 写清晰的提交信息：确保每次提交的信息清楚明了，说明你做了什么以及为什么做。这样在需要回退时，可以更容易地理解代码更改的历史。

- 使用分支：在开发新特性或者进行大改动时，使用分支（例如 `feature` 分支）进行开发。这样可以在主分支上保持稳定，开发完成后再合并。

- 代码审查：在合并代码之前，进行代码审查，确保代码的质量以及逻辑的正确性。这样可以减少因错误而导致的回退。

- 测试：在提交之前进行测试，确保所有功能正常。这可以大大减少后续回退的可能性。

- 利用暂存区：使用 `git add -p` 选择性地添加更改到暂存区，这样可以更好地控制哪些更改会被提交，从而避免不必要的错误提交。

- 分阶段开发：如果某个特性较复杂，可以将其分成几个阶段来开发。每完成一个阶段，就进行一次提交，可以减少大规模的回退。

- 使用标签：在重要的版本发布前打标签（`git tag`），这样在回退时可以更方便地找到之前的稳定版。
