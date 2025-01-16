# vue-router 4.x 的 History 和 Hash 模式有何区别？

<article-info/>

`vue-router 4.x` 有 3 个模式，其中两个更为常用，那便是 `history` 和 `hash`，另一个是 `memory`。

## 体验

`vue-router 4.x` 中设置模式已经变化：

::: code-group

```js
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  createMemoryHistory
} from "vue-router";

const router = createRouter({
  history: createWebHashHistory(), // hash 模式
  history: createWebHistory(), // history 模式
  history: createMemoryHistory(), // memory 模式
  routes: [
    //...
  ]
});
```

:::

用起来一抹一眼

::: code-group

```js
<router-link :to="/about">go to About</router-link>
```

:::

区别只在 `url` 形式

::: code-group

```js
hash: `http://xxx.com/#/about`;
history: `http://xxx.com/about`;
```

:::

- 两者的差别主要在显示形式和部署上，`history` 模式 `url` 看起来更加优雅美观，但是需要服务器配合，否则会出现刷新页面 404 的问题：

  ::: code-group

  ```bash
  // nginx 配置
  server {
  		listen 80;
  		server_name xxx.com;
  		location /admin {
  			root /User/abc/www/admin;
  			index index.html;
  		  try_files $uri $uri/ /index.html;
  		}
  }
  ```

  :::

- 在实现上不管那种模式，最终都是通过监听 `popstate` 事件触发路由跳转处理，url 显示不同只是显示效果上的差异；源码中 `hash模式` 实际上还是调用的 `createWebHistory()` 实现的
