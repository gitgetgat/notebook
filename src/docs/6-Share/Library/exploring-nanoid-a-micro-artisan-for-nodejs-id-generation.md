# 探索 nanoid：Node.js ID 生成的“微型工匠”

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'nanoid',linkUrl:'https://github.com/ai/nanoid/blob/HEAD/README.zh-CN.md'}]" />

## 什么是 `nanoid`？

一个小巧、安全、URL 友好、唯一的 JavaScript 字符串 ID 生成器。

`nanoid` 是一个用于生成唯一性 `ID` 的轻量级库。它不仅生成的 `ID` 短小精悍，而且还具备高性能和高安全性。无论你是要生成用户 ID、订单号，还是其他唯一性标识，`nanoid` 都能为你提供全方位的支持。简单来说，`nanoid` 就是你的“微型工匠”，让唯一性 `ID` 的生成一气呵成，简洁高效。

## 特点

- <imp-text-danger>小巧</imp-text-danger>： 116 字节 (经过压缩和 Brotli 处理)。没有依赖。Size Limit 控制大小。
- <imp-text-danger>安全</imp-text-danger>： 它使用硬件随机生成器。可在集群中使用。
- <imp-text-danger>紧凑</imp-text-danger>： 它使用比 `UUID（A-Za-z0-9_-）` 更大的字母表。因此，ID 大小从 36 个符号减少到 21 个符号。
- <imp-text-danger>可移植</imp-text-danger>： `Nano ID` 已被移植到 20 种编程语言。

## 与 `UUID` 的比较

`Nano ID` 与 `UUID v4` (基于随机数) 相当。它们在 ID 中有相似数量的随机位 (`Nano ID` 为 126，`UUID` 为 122)，因此它们的碰撞概率相似:

> 要想有十亿分之一的重复机会, 必须产生 103 万亿个版本 4 的 ID.

`Nano ID` 和 `UUID v4` 之间有两个主要区别:

- `Nano ID` 使用更大的字母表，所以类似数量的随机位 被包装在 21 个符号中，而不是 36 个。
- `Nano ID` 代码比 `uuid/v4` 包少 4 倍: 130 字节而不是 423 字节.

## 安装

::: code-group

```bash
npm install nanoid
```

:::

Nano ID 5 仅适用于 ESM 项目、测试或 Node.js 脚本。 对于 CommonJS，您需要 Nano ID 3.x（我们仍然支持它）：

::: code-group

```bash
npm install nanoid@3
```

:::

想要快速上手尝试，你可以从 CDN 加载 Nano ID。但是，它不建议 在生产中使用，因为它的加载性能较低。

::: code-group

```bash
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
```

:::

## 使用

::: code-group

```js
import { nanoid } from "nanoid";
model.id = nanoid(); //=> "V1StGXR8_Z5jdHi6B-myT"
```

:::

如果你想要减小 ID 大小（但是会增加碰撞概率）， 可以将大小作为参数传递

::: code-group

```js
import { nanoid } from "nanoid";
nanoid(10); //=> "IRFa-VaY2b"
```

:::

## `nanoid` 的优劣势

### 优势

- <imp-text-danger>高效性</imp-text-danger>：`nanoid` 的 ID 生成功能使得唯一性 ID 的生成更高效和简洁。

- <imp-text-danger>灵活性</imp-text-danger>：`nanoid` 提供了丰富的配置选项和自定义长度，允许开发者根据需求生成不同长度的 ID。

- <imp-text-danger>稳定性</imp-text-danger>：`nanoid` 提供了稳定的 ID 生成功能，确保 ID 在各种环境中的唯一性和可靠性。

- <imp-text-danger>易用性</imp-text-danger>：`nanoid` 的 API 设计简洁直观，易于上手，并且提供了良好的文档支持。

- <imp-text-danger>社区支持</imp-text-danger>：作为一个开源项目，`nanoid` 得到了社区的广泛支持和贡献，不断进行改进和优化。

### 劣势

- <imp-text-danger>随机性依赖</imp-text-danger>：`nanoid` 的 ID 生成依赖于随机数生成器，在一些特定的环境中可能会影响性能和安全性。

- <imp-text-danger>学习曲线</imp-text-danger>：对于一些复杂的应用场景，开发者可能需要花费一些时间来理解和配置 `nanoid` 的选项。

## 使用 `nanoid` 需要注意的地方

- <imp-text-danger>合理配置 ID 长度</imp-text-danger>：在使用 `nanoid` 时，确保 ID 长度的配置合理，以满足唯一性和安全性的需求。

- <imp-text-danger>性能优化</imp-text-danger>：在高并发和大规模 ID 生成场景下，注意内存管理和性能优化，确保 ID 生成的稳定性。

- <imp-text-danger>安全防护</imp-text-danger>：在处理敏感数据时，注意 ID 生成的安全性，采取适当的防护措施，如加密和验证。

- <imp-text-danger>升级依赖</imp-text-danger>：保持 `nanoid` 库的最新版本，及时获取最新的功能和性能优化。

- <imp-text-danger>团队协作</imp-text-danger>：在需要多人协作的项目中，建议团队共同维护和更新 ID 生成策略，确保代码的一致性和稳定性。
