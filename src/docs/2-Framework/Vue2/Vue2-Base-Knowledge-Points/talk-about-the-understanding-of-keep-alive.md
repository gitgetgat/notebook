# 谈谈 keep-alive 的理解

<article-info/>

## 概念

`keep-alive` 是 Vue 的内置组件，当它包裹动态组件时，会缓存不活动的组件实例，而不是销毁。

## 功能

`keep-alive` 是系统自带的一个组件，用来缓存组件，避免多次加载相同的组件，减少性能消耗，提高用户体验。

## 使用场景

列表页进入详情页，如果在列表页点击的都是相同的 ，详情页就不用请求多次了，直接缓存起来就行了，如果点击的不同，则需要重新请求数据。

## 使用方式

- 在 `App.vue` 中使用 `keep-alive` 标签，表示缓存所有页面

  ::: code-group

  ```html
  <div id="app">
    <keep-alive>
      <tar-bar></tar-bar>
      <div class="container">
        <left-menu></left-menu>
        <main />
      </div>
    </keep-alive>
  </div>
  ```

  :::

- 按条件缓存，使用 `include`，`exclude` 判断是否缓存

  ::: code-group

  ```html
  // 1. 将缓存 name 为 cc 的组件,如果有多个，可用逗号分
  <keep-alive include="cc">
    <router-view />
  </keep-alive>
  // 2. 将不缓存 name 为 cc 的组件
  <keep-alive exclude="cc">
    <router-view />
  </keep-alive>
  // 3. 还可使用属性绑定动态判断
  <keep-alive :include="includedComs">
    <router-view />
  </keep-alive>
  // 4. 使用正则表达式，需要 v-model
  <keep-alive :include="/a|b/">
    <router-view />
  </keep-alive>
  ```

  :::

- 在 `router` 目录下的 `index.js` 中

  1. 使用 `meta:{ keepAlive = true }`,表示需要缓存
     ::: code-group

     ```jsx
     const routes = [
       {
         path: "/",
         component: Home,
         meta: {
           keepalive: true
         }
       },
       {
         path: "/login",
         component: Login
       },
       {
         path: "/edit",
         component: Edit,
         meta: {
           istoken: true
         }
       },
       {
         path: "/home",
         component: Home,
         meta: {
           keepalive: true
         }
       }
     ];
     ```

     :::

  2. 在 `App.vue` 中进行判断

     ::: code-group

     ```html
     <div id="app">
       <!--keep-alive 表示页面不会被销毁，即保持页面状态-->
       <keep-alive>
         <router-view v-if="$route.meta.keepalive"></router-view>
       </keep-alive>
       <router-view v-if="!$route.meta.keepalive"></router-view>
     </div>
     ```

     :::

  3. Props：
     - `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。
     - `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
     - `max` - 数字。最多可以缓存多少组件实例。
