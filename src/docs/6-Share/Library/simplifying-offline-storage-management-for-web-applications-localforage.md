# 简化 Web 应用程序的离线存储管理 —— localForage.js

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'localForage.js',linkUrl:'https://github.com/xmoyking/localForage-cn'},{ linkText:'localForage.js 官网',linkUrl:'https://localforage.docschina.org/#localforage'}]" />

## `localForage` 是什么？

`localForage` 是一个 `JavaScript` 库，通过简单类似 `localStorage API` 的异步存储来改进你的 Web 应用程序的离线体验。它能存储多种类型的数据，而不仅仅是字符串。

`localForage` 有一个优雅降级策略，若浏览器不支持 `IndexedDB` 或 `WebSQL`，则使用 `localStorage`。在所有主流浏览器中都可用：`Chrome`，`Firefox`，`IE` 和 `Safari`（包括 `Safari Mobile`）。

`localForage` 提供回调 `API` 同时也支持 `ES6 Promises API`，你可以自行选择。

## 快速开始

首先需要安装 `localForage` 库。可以通过 `npm` 或者 `yarn` 进行安装，运行以下命令：

::: code-group

```bash [npm]
npm install localforage
```

```bash [yarn]
yarn add localforage
```

:::

假如我们想在 `Vue` 全局或者组件中使用

::: code-group

```js [main.js 设置全局使用]
// main.js
import localforage from "localforage";

localforage.config({
  driver: localforage.INDEXEDDB, // 选择存储引擎，如IndexedDB
  name: "my-app", // 数据库名称
  version: 1, // 数据库版本号
  storeName: "my-store" // 存储对象的名称
});

Vue.prototype.$localforage = localforage;
```

```vue [组件中引用使用]
<template>
  <div>
    <button @click="saveData">保存数据</button>
    <button @click="getData">获取数据</button>
  </div>
</template>

<script>
import localforage from "localforage";

export default {
  methods: {
    saveData() {
      localforage
        .setItem("myKey", "Hello, localForage!")
        .then(() => {
          console.log("数据保存成功");
        })
        .catch((error) => {
          console.error("数据保存失败:", error);
        });
    },
    getData() {
      localforage
        .getItem("myKey")
        .then((value) => {
          console.log("获取到的数据:", value);
        })
        .catch((error) => {
          console.error("获取数据失败:", error);
        });
    }
  }
};
</script>
```

:::

使用 `removeItem` 方法删除指定键的数据

::: code-group

```js
import localforage from "localforage";

// 删除指定键的数据
localforage
  .removeItem("myKey")
  .then(() => {
    console.log("数据删除成功");
  })
  .catch((error) => {
    console.error("数据删除失败:", error);
  });
```

:::

使用 `clear` 方法清空所有数据

::: code-group

```js
import localforage from "localforage";

// 清空所有数据
localforage
  .clear()
  .then(() => {
    console.log("数据清空成功");
  })
  .catch((error) => {
    console.error("数据清空失败:", error);
  });
```

:::

::: warning
请注意，删除数据是不可逆的操作，请谨慎使用。确保你真正需要删除数据而不是仅仅清空存储。在调用删除操作之前，最好先确认用户的意图。
:::

## VUE 推荐使用 `Pinia` 管理 `localForage`

安装 `Pinia` 和 `localforage`：

::: code-group

```bash
npm install pinia localforage
```

:::

在 Vue 应用程序的入口文件中设置 `Pinia` 实例和 `localforage`：

::: code-group

```js
// main.js
import Vue from "vue";
import { createPinia } from "pinia";
import localforage from "localforage";
import { createPlugin } from "vue-pinia";

const pinia = createPinia();
Vue.use(createPlugin(pinia));

localforage.config({
  // 配置项
});

new Vue({
  pinia
  // 其他配置项
}).$mount("#app");
```

:::

在上述代码中，我们首先导入了 `createPinia` 函数、`localforage` 和 `createPlugin` 函数。然后，使用 `createPinia` 创建了一个全局的 `Pinia` 实例，并将其作为 Vue 实例的选项进行注册。接下来，我们使用 `localforage.config` 方法对 `localForage` 进行配置。最后，通过 `Vue.use` 安装了 `Pinia` 的插件。

创建并注册 `Pinia store` 用于管理 `localForage`

如果你想使用多个数据库，建议通过 `pinia` 统一管理所有的数据库，这样数据的流向会更明晰，数据库相关的操作都写在 `store` 中，让你的数据库更规范化。

::: code-group

```js
// store/indexedDB.ts
import { defineStore } from "pinia";
import localforage from "localforage";

export const useIndexedDBStore = defineStore("indexedDB", {
  state: () => ({
    filesDB: localforage.createInstance({
      name: "filesDB"
    }),
    usersDB: localforage.createInstance({
      name: "usersDB"
    }),
    responseDB: localforage.createInstance({
      name: "responseDB"
    })
  }),
  actions: {
    async setfilesDB(key: string, value: any) {
      this.filesDB.setItem(key, value);
    }
  }
});
```

:::

我们使用的时候，就直接调用 `store` 中的方法

::: code-group

```js
import { useIndexedDBStore } from "@/store/indexedDB";
const indexedDBStore = useIndexedDBStore();
const file1 = { a: "hello" };
indexedDBStore.setfilesDB("file1", file1);
```

:::
