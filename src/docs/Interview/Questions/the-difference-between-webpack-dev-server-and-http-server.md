# webpack-dev-server 和 http 服务器的区别

<article-info/>

<imp-text-primary>webpack-dev-server 是一个独立的 npm 模块</imp-text-primary>，同时也是一个服务器插件。在使用 `webpack-dev-server` 之前，需要单独安装它作为项目的开发依赖。

`Webpack Dev Server` 插件是一个基于 `Node.js` 构建的 `Web` 服务器，它可以在本地开发环境中启动一个实时的 `Web` 服务器，并且能够自动编译并且刷新浏览器，为前端开发提供了很大的便利。

`Webpack Dev Server` 支持热模块替换（`HMR`），即在应用程序运行中更新模块而无需刷新整个页面，它还提供了一些其它的特性包括压缩、编译、转换、代码分离等等。`Webpack Dev Server` 通常<imp-text-danger>用来搭建本地开发环境</imp-text-danger>，而部署时则需要使用其它的 Web 服务器。

而 http 服务器则因其<imp-text-danger>模拟后台 api 接口</imp-text-danger>的能力，更<imp-text-danger>适用于测试环境</imp-text-danger>。

<imp-text-primary>webpack-dev-server 使用 <imp-text-danger>内存来存储</imp-text-danger> webpack 开发环境下的打包文件，并且 <imp-text-danger>可以使用模块热更新</imp-text-danger>，比传统的 http 服务对开发更加有效。</imp-text-primary>
