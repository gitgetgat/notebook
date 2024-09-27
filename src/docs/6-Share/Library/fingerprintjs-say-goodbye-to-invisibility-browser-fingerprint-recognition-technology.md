# Fingerprintjs 告别隐身 浏览器指纹识别技术

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'FingerprintJS',linkUrl:'https://github.com/fingerprintjs/fingerprintjs?tab=readme-ov-file'},{ linkText:'FingerprintJS 官网',linkUrl:'https://fingerprint.com/github/'}]" />

![/6bcd6715-bb07-f38d-06ef-180b7469d0c3.png](/6bcd6715-bb07-f38d-06ef-180b7469d0c3.png)

## `Fingerprintjs` 是什么？

`Fingerprintjs` 是一个快速且轻量级的浏览器指纹标识生成库，基于 `JavaScript` 实现，它可以通过收集用户浏览器的一些特征信息，如 <imp-text-danger>浏览器类型</imp-text-danger>、<imp-text-danger>操作系统</imp-text-danger>、<imp-text-danger>屏幕分辨率</imp-text-danger>、<imp-text-danger>系统字体</imp-text-danger>、<imp-text-danger>Canvas</imp-text-danger> 技术等，来生成一个唯一的浏览器标识，匿名识别网络浏览器的准确率最高可达 99.5%。

## `Fingerprintjs` 的特性

- <imp-text-danger>访问者识别</imp-text-danger>：`Fingerprint` 能够识别每个访问者，包括那些选择匿名的。
- <imp-text-danger>高精度</imp-text-danger>：即使在清除了 `cookies` 的情况下，`Fingerprint` 也能提供持续数月甚至数年的行业领先准确性。
- <imp-text-danger>减少验证步骤</imp-text-danger>：对于合法用户，`Fingerprint` 旨在减少验证步骤，提供更流畅的用户体验。
- <imp-text-danger>阻止恶意行为</imp-text-danger>：对于欺诈和恶意行为，`Fingerprint` 能够识别并阻止，保护网站和用户。

## 使用方法

### 安装

首先，你需要通过 `npm` 或 `yarn` 或 `CDN` 安装 `Fingerprintjs`：

::: code-group

```bash [npm]
npm i @fingerprintjs/fingerprintjs
```

```bash [yarn]
yarn add @fingerprintjs/fingerprintjs
```

```html [CDN script 标签]
<script src="https://openfpcdn.io/fingerprintjs/v4/iife.min.js"></script>
```

```js [UMD]
require(["https://openfpcdn.io/fingerprintjs/v4/umd.min.js"]);
```

:::

### 不同的使用示例

#### 浏览器 `ES Module`

::: code-group

```html
<script>
  // Initialize the agent at application startup.
  // You can also use https://openfpcdn.io/fingerprintjs/v4/esm.min.js
  const fpPromise = import("https://openfpcdn.io/fingerprintjs/v4").then(
    (FingerprintJS) => FingerprintJS.load()
  );

  // Get the visitor identifier when you need it.
  fpPromise
    .then((fp) => fp.get())
    .then((result) => console.log(result.visitorId));
</script>
```

:::

#### 浏览器 `<script>` 标签

::: code-group

```html
<!-- Note that we use iife.min.js -->
<script src="https://openfpcdn.io/fingerprintjs/v4/iife.min.js"></script>
<script>
  // Initialize the agent at application startup.
  var fpPromise = FingerprintJS.load();

  // Analyze the visitor when necessary.
  fpPromise
    .then((fp) => fp.get())
    .then((result) => console.log(result.visitorId));
</script>
```

:::

#### `UMD`

::: code-group

```js
require(["https://openfpcdn.io/fingerprintjs/v4/umd.min.js"], (
  FingerprintJS
) => {
  // Initialize the agent at application startup.
  const fpPromise = FingerprintJS.load();

  // Get the visitor identifier when you need it.
  fpPromise
    .then((fp) => fp.get())
    .then((result) => console.log(result.visitorId));
});
```

:::

#### `Webpack`/`Rollup`/`NPM`/`Yarn`

::: code-group

```js
import FingerprintJS from "@fingerprintjs/fingerprintjs";

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load();

(async () => {
  // Get the visitor identifier when you need it.
  const fp = await fpPromise;
  const result = await fp.get();
  console.log(result.visitorId);
})();
```

:::

## 应用场景

- <imp-text-danger>用户账号接管</imp-text-danger>：识别并阻止使用被盗凭证的登录尝试，同时确认合法用户。

- <imp-text-danger>机器人检测</imp-text-danger>：检测恶意机器人、自动化工具和其他复杂威胁，以防止实时攻击。

- <imp-text-danger>反欺诈保障</imp-text-danger>：`Fingerprint` 可以用于识别欺诈用户，从而防止欺诈行为的发生。

::: warning 注意：
由于涉及到用户隐私和安全问题，使用时需遵守法规，确保用户隐私安全。
:::
