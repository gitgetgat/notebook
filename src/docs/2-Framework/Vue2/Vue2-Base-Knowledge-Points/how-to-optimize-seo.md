# SEO 如何优化?

<article-info/>

## 前言

单页应用（SPA）是最近流行的一种应用模式，它支持在同一页面下通过哈希（hash）或 html5 的 history api 实现不刷新式切换视图，既实现了动态路由的变化，也实现了历史记录的保持，然而，相比于静态页面和动态页面（ASP/PHP/JSP）而言，缺点也是显而易见的，那就是对 SEO 不友好。

不管是 Vue、React 还是 Angular 等实现路由的框架，无一不是加载原始 html 代码，再通过 JavaScript 动态渲染页面，但对于爬虫而已，JavaScript 代码是不会执行的，从而导致爬取不到合适的内容。

## 解决方案

![https://pic4.zhimg.com/80/v2-0b3c9c321cd7189780100cd9884a81a7_1440w.webp](https://pic4.zhimg.com/80/v2-0b3c9c321cd7189780100cd9884a81a7_1440w.webp)

搜索爬虫不会去执行 js 代码，只会从原有的 html 中读取相关信息，所以总的解决方案是尽可能保证原始 html 代码包含希望被收录的信息，有下面几种方案：

1. 页面中使用隐藏式元素   在 html 源码上写入希望被收录的静态信息，但不显示出来，仅为爬虫服务。

2. 专门为爬虫开一个服务   在后端做 http 拦截，检查请求代理 User-Agent 是不是爬虫，如果检测到是爬虫类型，动态生产 html 片段，仅为爬虫服务。

3. 使用预渲染（preredner）  在构建项目的同时，自动在浏览器中渲染一遍页面，然后生成相应路由下的静态 html，这些路由只有在不执行 javascript 时才会显示（正是爬虫的情况），如果执行了 js，将触发常规逻辑。

4. 使用服务端渲染（SSR）  并非动态页面，而是在 node 端执行 vue 代码，翻译转换得出相应的 html 片段/全文，最后在响应体中返回信息（后续文章介绍）。

综合考虑后，方式一适合简单修改，方式二修改难度高，方式三和方式四最为合适。从简易难度而已，预渲染是最简单最快捷的，所以这里先介绍预渲染的 seo 优化方式。

## 使用

先安装 `prerender-spa-plugin` 模块，然后修改路由为  <imp-text-success>history</imp-text-success>  模式，紧接着在打包配置中（`webpack.prod.config.js` 或 `vue.config.js`)添加 `PrerenderSPAPlugin` 插件,最后在入口文件中 <imp-text-success>触发相关事件</imp-text-success>即可。

::: code-group

```bash [安装]
$ npm install prerender-spa-plugin -S
```

```js [使用]
// build/webpack.prod.conf.js 或 vue.config.js
const PrerenderSPAPlugin = require("prerender-spa-plugin"); // 预渲染
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

// plugins中配置PrerenderSPAPlugin
new PrerenderSPAPlugin({
  staticDir: path.join(__dirname, "../dist"),
  // 对应自己的路由文件，比如index有参数，就需要写成 /index/param1。
  routes: ["/"], // 因为该系统操作都是基于登录后的，所以只做登录页面的预渲染就行了
  renderer: new Renderer({
    inject: {
      foo: "bar"
    },
    headless: false,
    // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
    renderAfterDocumentEvent: "render-event"
  })
});
```

:::

由于该插件需要电脑上已安装浏览器软件才可以运行，如果需要在没有浏览器的 linux 上运行打包，需要先检查电脑版本再添加插件，判断方式如下：

::: code-group

```js
// build/webpack.prod.conf.js 或 vue.config.js
const os = require("os");
// 预渲染操作判断，仅当当前运行系统为window或mac才执行预渲染打包
if (["Windows_NT", "Darwin"].includes(os.type())) {
  console.log("将自动打开浏览器进行预渲染操作");
  // 插入前面的插件配置
} else {
  console.log("非window或mac系统，不存在浏览器，取消预渲染操作");
}
```

:::

`main.js` 入口文件在 vue 实例完成后执行

::: code-group

```js
// main.js
document.dispatchEvent(new Event("render-event")); // 预渲染*
```

:::

最后因为我们修改了路由模式为 history，普通情况下对于浏览器而言 <imp-text-success>‘/list/detail’</imp-text-success> 实际上是要去请求 <imp-text-success>‘/list/detail/index.html’</imp-text-success> 页面，这显然不存在，会报 404 异常。所以我们需要对 nginx 服务器进行代理转发，设置如下：

::: code-group

```bash
# ect/nginx/nginx.conf
# vue最小管理系统配置（后台服务3000端口）
server {
  listen       8080; # 监听8080端口
  root         /www/vue-base-demo/dist/; // 静态资源目录
  index        index.html; // 首页
  location / {
          try_files $uri $uri/ /index.html; # 当找不到文件404的时候，转发的index.html上
  }
}
```

:::

:::tip
_当然其他服务器也可以实现，只要思路一样就行。_
:::

## 打包

::: code-group

```bash
npm run build
```

:::

打包后将在 dist 文件夹下生成相应的 html 文件。

## 预渲染注意事项

::: warning ⚠️ 注意

- vue-cli 2.x 和 vue-cli 3.x 配置差不多
- 路由需要使用 history 模式
- 预渲染配置 routes 属性可以填写路由对应的 url，如果需要参数需要配置合适的参数
- renderAfterDocumentEvent 需要对应
- 预渲染打包前会自动打开浏览器从而获取到相关 dom，如果没有浏览器软件将打包失败（建议· 把 dist 包括在 git 项目内）
- nginx 需要相应的修改，避免 404

:::
