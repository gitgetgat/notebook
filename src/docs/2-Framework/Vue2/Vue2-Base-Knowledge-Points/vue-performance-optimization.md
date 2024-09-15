# Vue 性能优化

<article-info/>

- 不要把所有数据都放在 data 中
- v-for 设置 key
- v-for 时给每个元素绑定事件用事件代理
- 模块化、组件化
  - 封装具有高度可用性的模块：axios 的封装（request.js）
  - 拆分高度重复性的组件、提高复用性、维护性
  - 组件可配置性强
- 路由懒加载
  - 首屏加快渲染
- 加载优化
  - 按需加载
  - 内容懒加载
  - 图片懒加载
- 异步组件
- 用户体验优化：骨架屏
- 数据持久化存储的使用尽量用防抖节、流优化
- productionSourceMap：
  - false（生产环境不启用）
  - 生成 map 文件、定位源码
- productionGzip：
  - webpack 插件：`compression-webpack-plugin`
  - true（生产环境启用）
  - 启用 gZip 压缩功能，打包体积更小
  - [使用方式请看 ➡️](../../1-FrontEndBaGu/7-Engineering/Webpack/vue-configures-compression-webpack-plugin-to-implement-gzip-compression.md)
- keep-alive：
  - 缓存组件：例如一些列表的展示，一些不活跃的组件可以缓存
- 插件 CDN

  - `vue-router`、`axios` 等插件可以使用 CDN 静态引入到 HTML 中

    ::: code-group

    ```html
    <link rel="stylesheet" href="https://cdnis.cloudflare.com/ajax/libs/element-ui/2.4.7/themechalk/index.css'>
    <script src="https://cdn.bootcsscom/yue/2.5.9/yue,min,js></script>
    <script src="https://cdnbootcss,com/yuex/3.0.1/yuex,minis'></script>
    <scriptsrc="https://cdn,bootcss,com/yue-router/3.0.1/yue-routerminjs'></script>
    <scriptsrc="https://cdn.bootcsscom/axios/0.15.3/axios,minis'></script>
    <scriptsrc="https://cdn.bootcss,com/element-ui/2.4.7/index.is'></script>
    ```

    :::

  - webpack 注册插件

    ::: code-group

    ```jsx
    configureWebpack: { externals: { 'vue': 'Vue', 'vue-router': 'VueRouter', 'vuex': 'Vuex', 'axios':
    'axios', 'element-ui': 'ELEMENT'}}
    ```

    :::

- 图片 CDN，图片懒加载（`vue-lazyload` 插件）、使用 CSS 图标
- 组件按需导入，需要什么倒入什么，避免全部导入
- SEO 优化：
  - 预渲染
  - 服务端渲染 SSR
- 打包优化
  - CDN 形式家在第三方模块
  - 多线程打包
  - 抽离公共文件
- 缓存和压缩
  - 客户端缓存、服务端缓存
  - 服务端 `gZip` 压缩
