# 什么是路由懒加载 ？

<article-info/>

::: tip
整个网页默认是刚打开就去加载所有页面，路由懒加载就是只加载你当前点击的那个模块。

按需去加载路由对应的资源，提高首屏加载速度（tip:首页不用设置懒加载，而且一个页面加载过后再次访问不会重复加载）。
:::

## 实现原理

将路由相关的组件，不再直接导入了，而是改写成异步组件的写法，只有当函数被调用的时候，才去加载对应的组件内容。

## 传统路由配置

::: code-group

```jsx
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/home.vue'
Vue.use(VueRouter)
const router = new VueRouter({
 routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]

export default router
```

:::

## 路由懒加载写法

::: code-group

```jsx
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({
 routes: [
    { path: '/login', component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue') },
    { path: '/home',  component: () => import(/* webpackChunkName: "home" */'@/views/home/home.vue') }
  ]

export default router
```

:::
