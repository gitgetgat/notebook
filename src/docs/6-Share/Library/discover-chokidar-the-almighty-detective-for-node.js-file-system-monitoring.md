# 探索 Chokidar：Node.js 文件系统监视的“全能侦探”

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Chokidar',linkUrl:'https://github.com/paulmillr/chokidar'}]" />

## `chokidar` 是什么？

`chokidar` 是一个用于监视文件系统中文件和目录变化的 `Node.js` 库。它提供了一个易于使用的 API，可以实时地跟踪文件或目录的创建、修改、删除等操作，并将这些变化通知给开发者。`chokidar` 在跨平台兼容性、稳定性和性能方面都表现出色，因此在开发过程中被广泛应用。

## 为什么会有 `chokidar`?

<imp-text-danger>Node.js 的 fs.watch</imp-text-danger>:

- 在 `MacOS` 上不报告文件名。
- 在 `MacOS` 上使用像 Sublime 这样的编辑器时根本不报告事件。
- 经常将事件报告两次。
- 发出大多数更改作为重命名。
- 不提供递归查看文件树的简单方法。
- 不支持 `Linux` 上的递归监视。

<imp-text-danger>Node.js 的 fs.watchFile</imp-text-danger>:

- 在事件处理方面几乎一样糟糕。
- 也不提供任何递归监视。
- 导致高 CPU 使用率。

<imp-text-danger>Chokidar 解决了这些问题</imp-text-danger>。

它最初是为 Brunch（一种超快速的 Web 应用程序构建工具）制作的，现在用于 Microsoft 的 Visual Studio Code、gulp、karma、PM2、browserify、webpack、BrowserSync 等。 它已在生产环境中证明了自己。

`Chokidar` 仍然依赖于 `Node.js` 核心 `fs` 模块，但是当使用 `fs.watch` 和 `fs.watchFile` 进行观察时，它会规范化它接收到的事件，通常通过获取文件统计信息和/或目录内容来检查真实性。

在 `MacOS` 上，`chokidar` 默认使用本机扩展来公开 Darwin FSEvents API。 与大多数 `*nix` 平台上可用的 kqueue 等实现相比，这提供了非常有效的递归监视。 `Chokidar` 仍然需要做一些工作来规范化以这种方式接收到的事件。

在大多数其他平台上，基于 `fs.watch` 的实现是默认的，它避免了轮询并降低了 CPU 使用率。 请注意，`chokidar` 将递归地为已指定路径范围内的所有内容启动观察器，因此请谨慎观察，以免浪费系统资源。

## 入门

通过 npm 安装

::: code-group

```bash
npm install chokidar
```

:::

然后在您的代码中 require 并使用它：

::: code-group

```js
const chokidar = require("chokidar");

// 当前目录
chokidar.watch(".").on("all", (event, path) => {
  console.log(event, path);
});
```

:::

## API

::: code-group

```js
// 更典型的实现结构示例

// 初始化
const watcher = chokidar.watch("file, dir, glob, or array", {
  ignored: /(^|[\/\\])\../, // 忽略点文件
  persistent: true
});

// 收到事件时使用
const log = console.log.bind(console);
// 添加事件监听
watcher
  .on("add", (path) => log(`File ${path} has been added`))
  .on("change", (path) => log(`File ${path} has been changed`))
  .on("unlink", (path) => log(`File ${path} has been removed`));

// 更多其他事件
watcher
  .on("addDir", (path) => log(`Directory ${path} has been added`))
  .on("unlinkDir", (path) => log(`Directory ${path} has been removed`))
  .on("error", (error) => log(`Watcher error: ${error}`))
  .on("ready", () => log("Initial scan complete. Ready for changes"))
  .on("raw", (event, path, details) => {
    // 内部
    log("Raw event info:", event, path, details);
  });

// 'add'、'addDir' 和 'change' 事件也接收 stats结果作为可用的第二个参数
watcher.on("change", (path, stats) => {
  if (stats) console.log(`File ${path} changed size to ${stats.size}`);
});

// 新建文件
watcher.add("new-file");
watcher.add(["new-file-2", "new-file-3", "**/other-file*"]);

// 获取文件系统上正在监视的实际路径列表
var watchedPaths = watcher.getWatched();

// 取消一些文件的监视
await watcher.unwatch("new-file*");

// 停止监视
// 这个方法是异步的
watcher.close().then(() => console.log("closed"));

// 完整的选项列表。 请参阅下面的说明。
// 不要使用这个例子！
chokidar.watch("file", {
  persistent: true,

  ignored: "*.txt",
  ignoreInitial: false,
  followSymlinks: true,
  cwd: ".",
  disableGlobbing: false,

  usePolling: false,
  interval: 100,
  binaryInterval: 300,
  alwaysStat: false,
  depth: 99,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  },

  ignorePermissionErrors: false,
  atomic: true // 或自定义“原子性延迟”，以毫秒为单位（默认 100）
});
```

:::

### chokidar.watch(paths, [options])

#### `paths`：文件路径、要递归监视的目录 或 `glob` 模式。

::: warning
注意：`glob` 不能包含 windows 分隔符 (`\`)，因为这是它们按照标准工作的方式——您需要将它们替换为正斜杠 (`/`)。

注 `2`：有关其他 `glob` 文档，请查看低级库：`picomatch`。
:::

#### `options` (对象)：选项对象定义如下：

##### Persistence

- <imp-text-danger>persistent</imp-text-danger> (默认: `true`).指示进程是否应在文件被监视时继续运行。 如果在使用 `fsevents` 监视时设置为 `false`，则即使进程继续运行，`ready` 后也不会再发出任何事件。

##### 路径过滤

- <imp-text-danger>ignored (anymatch-compatible definition)</imp-text-danger> 定义要忽略的文件/路径。 整个相对或绝对路径，而不仅仅是文件名。 如果提供了一个带有两个参数的函数，它会在每个路径中被调用两次——一次带有一个参数（路径），第二次带有两个参数（路径和该路径的 `fs.Stats` 对象）。

- <imp-text-danger>ignoreInitial</imp-text-danger>（默认值：`false`）。 如果设置为 `false`，那么当 `chokidar` 发现这些文件路径时（在 `ready` 事件之前）实例化监视时，也会为匹配路径发出 `add/addDir` 事件。

- <imp-text-danger>followSymlinks</imp-text-danger>（默认值：`true`）。 当为 `false` 时，将仅监视符号链接本身的变化，而不是通过链接路径跟踪链接引用和冒泡事件。

- <imp-text-danger>cwd</imp-text-danger>（无默认值）。 派生监视路径的基本目录。 随事件发出的路径将与此相关。

- <imp-text-danger>disableGlobbing</imp-text-danger>（默认值：`false`）。 如果设置为 `true`，则传递给 `.watch()` 和 `.add()` 的字符串将被视为文字路径名，即使它们看起来像 `glob`。

##### Performance

- <imp-text-danger>usePolling</imp-text-danger>（默认值：`false`）。 是使用 `fs.watchFile`（由轮询支持）还是 `fs.watch`。 如果轮询导致 CPU 使用率过高，请考虑将其设置为 `false`。 通常需要将此设置为 `true` 才能通过网络成功查看文件，并且可能需要在其他非标准情况下成功查看文件。 在 `MacOS` 上显式设置为 `true` 会覆盖 `useFsEvents` 默认值。 您还可以将 `CHOKIDAR_USEPOLLING` 环境变量设置为 `真 (1)` 或 `假 (0)` 以覆盖此选项。

- 轮询特定设置（`usePolling: true` 时有效）

- <imp-text-danger>interval</imp-text-danger>（默认值：`100`）。 文件系统轮询的时间间隔，以毫秒为单位。 您还可以设置 `CHOKIDAR_INTERVAL` 环境变量来覆盖此选项。

- <imp-text-danger>binaryInterval</imp-text-danger>（默认值：`300`）。 二进制文件的文件系统轮询间隔。 （参见二进制扩展列表）

- <imp-text-danger>useFsEvents</imp-text-danger>（默认值：在 `MacOS` 上为 `true`）。 是否使用 `fsevents` 监视界面（如果可用）。 当显式设置为 `true` 并且 `fsevents` 可用时，这将取代 `usePolling` 设置。 在 `MacOS` 上设置为 `false` 时，`usePolling: true` 成为默认值。

- <imp-text-danger>alwaysStat</imp-text-danger>（默认值：`false`）。 如果依赖可能随 `add`、`addDir` 和 `change` 事件一起传递的 `fs.Stats` 对象，请将其设置为 `true` 以确保即使在底层监视事件中尚不可用的情况下也能提供该对象。

- <imp-text-danger>depth</imp-text-danger>（默认值：`undefined`）。 如果设置，则限制将遍历多少级子目录。

- <imp-text-danger>awaitWriteFinish</imp-text-danger>（默认值：`false`）。 默认情况下，`add` 事件将在文件首次出现在磁盘上时触发，在整个文件被写入之前。 此外，在某些情况下，在写入文件时会发出一些更改事件。 在某些情况下，特别是在监视大文件时，需要等待写入操作完成才能响应文件创建或修改。 将 `awaitWriteFinish` 设置为 `true`（或真实值）将轮询文件大小，保持其添加和更改事件，直到大小在可配置的时间内没有更改。 适当的持续时间设置在很大程度上取决于操作系统和硬件。 为了准确检测，此参数应该相对较高，从而使文件监视的响应速度大大降低。 谨慎使用。

- <imp-text-danger>options.awaitWriteFinish</imp-text-danger> 可以设置为一个对象以调整时间参数：

- <imp-text-danger>awaitWriteFinish.stabilityThreshold</imp-text-danger>（默认值：`2000`）。 文件大小在发出事件之前保持不变的时间量（以毫秒为单位）。

- <imp-text-danger>awaitWriteFinish.pollInterval</imp-text-danger>（默认值：`100`）。 文件大小轮询间隔，以毫秒为单位。

### 错误

- <imp-text-danger>ignorePermissionErrors</imp-text-danger>（默认值：`false`）。 指示是否尽可能监视没有读取权限的文件。 如果由于设置为 `true` 的 `EPERM` 或 `EACCES` 而导致监视失败，则错误将被静默抑制。

- <imp-text-danger>atomic</imp-text-danger>（默认值：如果 `useFsEvents` 和 `usePolling` 为 `false`，则为 `true`）。 自动过滤掉使用 “原子写入” 而不是直接写入源文件的编辑器时出现的伪影。 如果文件在删除后 `100` 毫秒内重新添加，`Chokidar` 会发出更改事件，而不是先取消链接再添加。 如果 `100` 毫秒的默认值不适合您，您可以通过将原子设置为自定义值（以毫秒为单位）来覆盖它。

### 方法 & 事件

- <imp-text-danger>chokidar.watch()</imp-text-danger> 生成一个 `FSWatcher` 实例。 `FSWatcher` 的方法：

- <imp-text-danger>.add(path / paths)</imp-text-danger>：添加文件、目录 或 `glob` 模式以进行跟踪。 采用一组字符串或仅采用一个字符串。

- <imp-text-danger>.on(event, callback)</imp-text-danger>：监听 FS 事件。 可用事件：`add`、`addDir`、`change`、`unlink`、`unlinkDir`、`ready`、`raw`、`error`。 此外，除了 `ready`、`raw` 和 `error` 之外，所有事件都可用，它会随每个事件的基础事件名称和路径一起发出。 `raw` 是内部的，小心使用。

- <imp-text-danger>.unwatch(path / paths)</imp-text-danger>：停止监视文件、目录 或 `glob` 模式。 采用一组字符串或仅采用一个字符串。

- <imp-text-danger>.close()</imp-text-danger>: `async` 从监视的文件中删除所有侦听器。 异步，返回 `Promise`。 与 `await` 一起使用以确保不会发生错误。

- <imp-text-danger>.getWatched()</imp-text-danger>：返回一个对象，该对象表示此 `FSWatcher` 实例正在监视的文件系统上的所有路径。 对象的键是所有目录（使用绝对路径，除非使用 cwd 选项），值是每个目录中包含的项目名称的数组。

## CLI

如果您需要一个 `CLI` 界面来查看文件，请查看 `chokidar-cli`，它允许您在每次更改时执行命令，或者获取更改事件的 `stdio` 流。

## 安装故障排除

::: danger 📢 npm WARN optional dep failed, continuing fsevents@n.n.n
此消息是 npm 如何处理可选依赖项的正常部分，并不表示存在问题。 即使伴有其他相关错误信息，`Chokidar` 也应该可以正常运行。
:::

::: danger 📢 TypeError: fsevents is not a constructor
通过执行 `rm -rf node_modules package-lock.json yarn.lock && npm install` 更新 `chokidar`，或更新使用 `chokidar` 的依赖项。
:::

::: danger 📢 Chokidar 在 Linux 上产生 ENOSP 错误，如下所示：

`bash`：无法设置终端进程组（-1）：设备 `bash` 的 `ioctl` 不合适：此 `shell` 中没有作业控制错误：`watch /home/ENOSPC`

这意味着 `Chokidar` 用完了文件句柄，您需要通过在终端中执行以下命令来增加它们的数量：`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
:::
