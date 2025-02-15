# 添加路由功能

<article-info/>

<link-tag :linkList="[{ linkType: 'vue', linkText:'Vue Router',linkUrl:'https://router.vuejs.org/'}]" />

::: tip 目标
根据目录结构自动生成路由功能
:::

## 1. 安装 Vue Router

项目使用 Vue3，所以使用 Vue Router v4.x

```bash
npm i vue-router@4
```

创建 `src/router/index.ts` 文件，并添加以下代码：

```ts
import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import("@/views/home.vue")
    },
    {
      path: "/about",
      component: () => import("@/views/about.vue")
    }
  ]
});

export function setupRouter(app: App) {
  app.use(router);
}

export default router;
```

在 main.ts 中引入并使用路由：

```ts
import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import router, { setupRouter } from "./router"; // [!code ++]

async function bootstrap() {
  const app = createApp(App);
  setupRouter(app); // [!code ++]
  await router.isReady(); // [!code ++]
  app.mount("#app");
}

bootstrap();
```

创建 `src/views/home.vue` 和 `src/views/about.vue` 文件，并添加以下代码：

::: code-group

```vue [src/views/home.vue]
<template>
  <div>
    <h1>Home</h1>
  </div>
</template>
```

```vue [src/views/about.vue]
<template>
  <div>
    <h1>About</h1>
  </div>
</template>
```

:::

在 App.vue 文件中添加 `router-view` 组件：

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <div>
    <Button>Click me</Button>
  </div>
  <router-view /> // [!code ++]
</template>
```

可以看到以下结果：
![/2faca5ba-c0e9-0e59-ef4f-c50ca05f0729.png](/2faca5ba-c0e9-0e59-ef4f-c50ca05f0729.png)

![/fe56dc23-d00c-d85f-2cbe-e4bda1e30331.png](/fe56dc23-d00c-d85f-2cbe-e4bda1e30331.png)

## 2. 自动提取布局路由

### 添加目录结构

创建 `src/layouts` 目录，里面存放布局组件，在其内创建 `admin.vue` 文件和 `members.vue` 文件；创建 `src/router/autoload.ts` 文件，用来根据目录结构自动生成路由；创建 `src/views/admin/index.vue` 和 `src/views/members/index.vue` 文件作为布局组件对应的子路由组件。结构如下：

![/e1bcd2f1-d164-cd25-038e-fce383ae1efd.png](/e1bcd2f1-d164-cd25-038e-fce383ae1efd.png)

`src/layouts` 目录中的布局组件文件名与 `src/views` 目录中的文件夹名保持一致，即 `admin.vue` 和 `members.vue` 文件名分别为 `admin` 和 `members`，这样在自动生成路由时，就可以根据布局组件文件名自动生成对应的子路由组件文件名。

### 提取布局组件路由

我们在 `src/router/autoload.ts` 文件添加以下代码来实现自动提取布局组件路由：

```ts
import type { RouteRecordRaw } from "vue-router";

// 废弃的方法 import.meta.globEager
// const layoutModules = import.meta.globEager('../layouts/*.vue')
// 使用 import.meta.glob('*', { eager: true }) 代替
const layoutModules = import.meta.glob("../layouts/*.vue", { eager: true });

const layoutRoutes = [] as RouteRecordRaw[];
// 获取路由
function getLayoutRoutes() {
  Object.entries(layoutModules).forEach(([filePath, module]) => {
    const route = getRouteByModule(filePath, module);
    layoutRoutes.push(route);
  });
  return layoutRoutes;
}

function getRouteByModule(filePath: string, module: any) {
  // filePath: /src/layouts/members.vue

  const name = filePath.replace(/^.*[\\\/]/, "").replace(/\.vue$/, "");
  return {
    name,
    path: `/${name}`,
    component: module.default
  } as RouteRecordRaw;
}

export default getLayoutRoutes();
```

## 3. 自动提取子路由

修改 `src/router/autoload.ts` 文件

```ts
import type { RouteRecordRaw } from "vue-router";

// 废弃的方法 import.meta.globEager
// const layoutModules = import.meta.globEager('../layouts/*.vue')
// 使用 import.meta.glob('*', { eager: true }) 代替
const layoutModules = import.meta.glob("../layouts/*.vue", { eager: true });
const viewModules = import.meta.glob("../views/**/*.vue", { eager: true }); // [!code ++]

const layoutRoutes = [] as RouteRecordRaw[];
// 获取路由
function getLayoutRoutes() {
  Object.entries(layoutModules).forEach(([filePath, module]) => {
    const route = getRouteByModule(filePath, module);
    route.children = getChildRoutes(route); // [!code ++]
    layoutRoutes.push(route);
  });
  return layoutRoutes;
}

function getRouteByModule(filePath: string, module: any) {
  // filePath: /src/layouts/members.vue
  // filePath: /src/views/admin/index.vue

  const name = filePath.replace(/^.*[\\\/]/, "").replace(/\.vue$/, ""); // [!code --]
  const name = filePath // [!code ++]
    .replace(/^.*[\\\/](layouts|views)[\\\/]/, "") // [!code ++]
    .replace(/\.vue$/, ""); // [!code ++]
  return {
    name,
    path: `/${name}`,
    component: module.default
  } as RouteRecordRaw;
}

// 获取子路由
function getChildRoutes(layoutRoute: RouteRecordRaw) {
  const childRoutes = [] as RouteRecordRaw[];
  console.log(layoutRoute.name);
  Object.entries(viewModules).forEach(([filePath, module]) => {
    console.log(filePath);
    if (filePath.includes(`../views/${layoutRoute.name as string}`)) {
      const route = getRouteByModule(filePath, module);
      childRoutes.push(route);
    }
  });
  return childRoutes;
}

export default getLayoutRoutes();
```

![decfee3e-06cc-b765-dccb-c47ff0e4c7cc.png](/decfee3e-06cc-b765-dccb-c47ff0e4c7cc.png)

可以看到子路由已经注册成功了。

## 4. 自定义子路由的信息

我们可以在子路由组件中添加以下代码：

```vue{8-12}
<!-- src/views/admin/index.vue -->
<template>
  <div>
    admin.index.vue
  </div>
</template>

<script>
export default {
  newname: 'admin.index.vue'
}
</script>
```

抛出的这个对象可以在 `src/router/autoload.ts` 文件中获取到：

```ts{8}
// code ...
function getRouteByModule(filePath: string, module: any) {
  // filePath: /src/layouts/members.vue
  // filePath: /src/views/admin/index.vue

  // const name = filePath.replace(/^.*[\\\/]/, "").replace(/\.vue$/, "");
  const name = filePath.replace(/^.*[\\\/](layouts|views)[\\\/]/, '').replace(/\.vue$/, '')
  console.log(module.default?.newname);
  return {
    name,
    path: `/${name}`,
    component: module.default
  } as RouteRecordRaw
}
// code ...
```

通过这个方式可以在文件中抛出 `任意的自定义数据` 使用 `import.meta.glob` 获取
