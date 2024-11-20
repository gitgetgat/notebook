# 探索 Vuex-Persist：让你的状态管理穿越时光

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Vuex-Persist',linkUrl:'https://github.com/championswimmer/vuex-persist'}]" />

## 什么是 `Vuex-persist`？

`Vuex-persist` 是一个专为 `Vuex` 设计的插件，旨在将 `Vuex` 的状态持久化到本地存储（LocalStorage）或其他存储机制中。它就像一位忠实的记忆护卫，确保你的应用状态在页面刷新、关闭后依然完好无损。无论你是开发单页应用还是复杂的 Web 应用，`Vuex-persist` 都能让你的状态管理更持久、更稳定。

## 使用方式

1. 安装 `Vuex-Persist`

可以使用 npm 或 yarn 安装 Vuex-Persist：

::: code-group

```bash
npm install vuex-persist
# 或者
yarn add vuex-persist
```

:::

2. 在 `Vuex store` 中导入 `Vuex-Persist`

需要在 `Vuex store` 中导入 `Vuex-Persist`，然后创建一个新的 `Vuex-Persist` 插件，并将其添加到 Vuex 的插件列表中。以下是一个示例代码：

::: code-group

```js
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

const vuexLocalStorage = new VuexPersist({
  key: "my-app",
  storage: window.localStorage
});

const store = new Vuex.Store({
  // ...your store options
  plugins: [vuexLocalStorage.plugin]
});
```

:::

在上面的代码中，我们首先导入了 `Vuex` 和 `Vuex-Persist`。然后，我们创建了一个新的 `Vuex-Persist` 插件，并将其添加到 `Vuex` 的插件列表中。在创建插件时，我们可以指定存储键的名称（`'my-app'`）以及要使用的存储引擎（在这种情况下是 `localStorage`）。

3. 启用自动重载 如果您希望在刷新页面或重新加载应用程序时自动还原 `Vuex store` 的状态，则需要启用自动重载。为此，您需要在创建插件时将 `autoRehydrate` 属性设置为 `true`：

::: code-group

```js
const vuexLocalStorage = new VuexPersist({
  key: "my-app",
  storage: window.localStorage,
  autoRehydrate: true
});
```

:::

4. 指定要持久化的状态

默认情况下，`Vuex-Persist` 将保存整个 `Vuex store` 的状态。如果您只想保存某些模块的状态，则可以在创建插件时指定模块的名称：

::: code-group

```js
const vuexLocalStorage = new VuexPersist({
  key: "my-app",
  storage: window.localStorage,
  modules: ["auth", "cart"]
});
```

:::

在上面的代码中，我们只保存了名为 `"auth"` 和 `"cart"` 的模块的状态。

这就是使用 `Vuex-Persist` 在 `Vue` 应用程序中实现持久化状态的基本步骤。使用这个库，您可以轻松地将应用程序状态保存到`本地存储`、`会话存储`、`cookie` 或 `IndexedDB` 中，并在应用程序重新加载时自动还原该状态。

## `vuex-persist` 的详细属性

| 属性              |                类型                 | 描述                                                                                                                                |
| ----------------- | :---------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------- |
| `key`             |              `string`               | 将状态存储在存储中的键。默认: 'vuex'                                                                                                |
| `storage`         |         `Storage (Web API)`         | 可传 `localStorage`, `sessionStorage`, `localforage` 或者你自定义的存储对象. 接口必须要有 get 和 set. 默认是: `window.localStorage` |
| `saveState`       |  `function(key, state[, storage])`  | 如果不使用存储，这个自定义函数将保存状态保存为持久性。                                                                              |
| `restoreState`    | `function(key[, storage]) => state` | 如果不使用存储，这个自定义函数处理从存储中检索状态                                                                                  |
| `reducer`         |     `function(state) => object`     | 将状态减少到只需要保存的值。默认情况下，保存整个状态。                                                                              |
| `filter`          |   `function(mutation) => boolean`   | 突变筛选。看 `mutation.type` 并返回 `true`，只有那些你想坚持写被触发。所有突变的默认返回值为 `true`。                               |
| `modules`         |             `string[]`              | 要持久化的模块列表。                                                                                                                |
| `asyncStorage`    |              `boolean`              | 表示状态是否使用 `Promises`（如 `localforage`）（使用 `localforage` 等时必须将其设置为 `true`）默认值：`false`                      |
| `supportCircular` |              `boolean`              | 表示状态是否有任何对自身的循环引用（state.x === state）默认值：`false`                                                              |
