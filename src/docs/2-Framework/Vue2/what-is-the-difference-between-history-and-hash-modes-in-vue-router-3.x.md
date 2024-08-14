# vue-router 3.x 的 History 和 Hash 模式有何区别？

<article-info/>

- `vue-router 3.x` 及之前的版本拥有两种路由模式：`hash`、`history`
- `hash 模式`（`锚点模式`）是一种把前段路由的路径用 `#` 拼接在真实 `URL` 后面的模式，当 `#` 后面的路径发生变化时，浏览器不会重新发起请求，单页面应用必备，而是会触发 `hashChange` 事件，`hash 模式`的浏览器兼容性较好，就是看起来不够优雅；

  <custom-player type="bilibili">
  <template v-slot:bilibili>
  <iframe
          width="100%"
          height="500"
          src="//player.bilibili.com/player.html?isOutside=true&aid=542678023&bvid=BV13i4y1L7Qn&cid=252683933&p=1&autoplay=0"
          scrolling="no"
          border="0"
          frameborder="no"
          framespacing="0"
          allowfullscreen="true"
        >
  </iframe>
  </template>
  </custom-player>

- `history 模式`用到了 `HTML5` 中的 `history API`，允许开发者直接更改前端路由，更新浏览器 `URL` 地址，而不重新发起请求，用到了 `history API` 中的 `replaceState`、`pushState`、`back`、`forward`、`go`、这五个方法；`history 模式`有历史记录，通过`replaceState`、`pushState`修改历史记录；`history` 模式的路径比较正规，没有 `#`，但是兼容性不如 `hash 模式`，而且浏览器再刷新的时候，会按照路径发送真实的资源请求，如果这个路径是前段通过 `history API` 设置的 `URL`，那么服务端往往不存在这个资源，就会`返回 404` 了，所以需要服务端支持；

  <custom-player type="bilibili">
  <template v-slot:bilibili>
  <iframe
          width="100%"
          height="500"
          src="//player.bilibili.com/player.html?isOutside=true&aid=670139642&bvid=BV1ba4y1s7Ra&cid=252989103&p=1&autoplay=0"
          scrolling="no"
          border="0"
          frameborder="no"
          framespacing="0"
          allowfullscreen="true"
        >
  </iframe>
  </template>
  </custom-player>

- `abstract 模式` 适用于所有 JavaScript 环境，例如服务器端使用 Node.js。如果没有浏览器 API，路由器将自动被强制进入此模式。
