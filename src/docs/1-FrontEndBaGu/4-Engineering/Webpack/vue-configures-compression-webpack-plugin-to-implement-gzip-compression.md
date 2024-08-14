# Vue 配置 compression-webpack-plugin 实现 Gzip 压缩

<article-info/>

## `gZip` 压缩

> [!NOTE]
> HTTP 协议上的 `gZip编码` 是一种用来改进 web 应用程序性能的技术，web 服务器 和 客户端（浏览器）必须共同支持 gzip。目前主流的浏览器，Chrome、firefox、IE 等都支持该协议。
>
> 简单来说，`gZip` 是一种压缩技术。

## 为何要使用 `gZip` 压缩 ？

> [!NOTE]
> 打包的时候开启 `gZip` 可以很大程度减少包的大小，页面大小可以变为原来的 30% 甚至更小，`非常适合于上线部署`。
>
> 更小的体积对于用户体验来说就意味着更快的加载速度以及更好的用户体验

## 为什么 `gZip` 压缩后页面加载速度提升 ？

> [!NOTE]
> 浏览器向服务器发出请求，并且在请求头中声明可以使用 `gZip` 的编码格式，服务器接受到请求之后，读取压缩后的文件，服务器直接返回给浏览器 `gZip` 格式的文件，浏览器进行解压缩，这样以来就节省了服务器压缩的时间

## 需求实现

1. 安装依赖

   ::: code-group

   ```bash
   cnpm i -D compression-webpack-plugin
   ```

   :::

2. 修改 vue.config.js 配置

   > [!NOTE]
   > 在打包过程中，可能会遇到 `“TypeError: Cannot read property 'tapPromise' of undefined”` 这样的错误，这是由于安装的 `“compression-webpack-plugin”` 版本太高导致的，通过安装低版本或者指定版本即可解决（cnpm i -D compression-webpack-plugin@6.1.0）。
   >
   > “filename”配置项必须明确指定，否则在 vue cli 创建的 2.x 和 3.x 项目中，生成的压缩文件位置存在差异。

   ::: code-group

   ```js
   const CompressionWebpackPlugin = require("compression-webpack-plugin");

   module.exports = {
     productionSourceMap: false,
     configureWebpack: (config) => {
       config.plugins.push(
         new CompressionWebpackPlugin({
           filename: "[path][name].gz",
           test: /\.(js|css)$/i
         })
       );
     }
   };
   ```

   :::

3. 执行命令：npm run build，之后，可以发现生成了许多“.gz”格式的文件，这些文件就是压缩后的。

   ![/b7759fbd-24f7-430d-5a86-34af928cc4b9.png](/b7759fbd-24f7-430d-5a86-34af928cc4b9.png)

4. 配置服务端

   > [!NOTE]
   > 生成压缩后的文件，不能直接使用，需要服务端配置才可以使用，而且发现打包生成的 `“dist/index.html”` 首页内，也没有直接引用这些 `“.gz”` 格式的文件。
   >
   > 而实现的关键，其实就是让服务端向浏览器发送 `“Content-Encoding=gzip”` 这个响应头，并把对应的 `“.gz”` 格式文件发送给浏览器，让浏览器通过 `“gzip”` 编码格式来解析资源。

   - nodejs
     将打包好的文件，丢至 nodejs 服务环境下，执行下列代码。

     ::: code-group

     ```js
     const path = require("path");
     const fs = require("fs");
     const express = require("express");
     const app = express();

     app.use((request, response, next) => {
       const fullPath = path.join(__dirname, `${request.originalUrl}.gz`);

       // 检测是否存在同名.gz压缩文件
       if (fs.existsSync(fullPath)) {
         // 存在就告诉浏览器用gzip编码格式来解析，并把对应的“.gz”格式文件发送给浏览器。
         response.setHeader("Content-Encoding", "gzip");
         response.sendFile(fullPath);
       } else {
         next();
       }
     });
     app.use(express.static("./"));

     app.listen(1055, (_) => {
       console.log("1055服务器已经启动");
     });
     ```

     :::

     通过访问 `“[http://localhost:1055/](https://link.segmentfault.com/?enc=CSdi6wGH%2FUApa8sS0WlM3Q%3D%3D.A%2FcdO4q5GIhBUC09E7NGYb9DSZHlNiZP5n3OjSjdfc8%3D)”`，可以发现浏览器已经能够读取这些 `“.gz”` 格式的文件了，即使把打包的非压缩文件删除了也没问题。

     ![/c5356091-0bba-80d4-9c10-6f0316199cad.png](/c5356091-0bba-80d4-9c10-6f0316199cad.png)

   - nginx（nginx.conf）
     在 http 模块内配置 `“gzip_static on”` 即可:

     ::: code-group

     ```bash
     http {
      gzip_static on;
     }
     ```

     :::
     或者 在 nginx.conf 的 server 模块中加入以下代码:
     ::: code-group

     ```bash
     server{
         //开启和关闭gzip模式
     	gzip on;
     	//gizp压缩起点，文件大于2k才进行压缩;设置允许压缩的页面最小字节数，页面字节数从header头得content-length中进行获取。 默认值是0，不管页面多大都压缩。建议设置成大于2k的字节数，小于2k可能会越压越大。
     	gzip_min_length 2k;
     	// 设置压缩所需要的缓冲区大小，以4k为单位，如果文件为7k则申请2*4k的缓冲区
     	gzip_buffers 4 16k;
     	// 设置gzip压缩针对的HTTP协议版本
     	gzip_http_version 1.0;
     	// gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
     	gzip_comp_level 2;
     	//进行压缩的文件类型
     	gzip_types text/plain application/javascript text/css application/xml;
     	// 是否在http header中添加Vary: Accept-Encoding，建议开启
     	gzip_vary on;
     }
     ```

     :::

### compression 库

这是一个 nodejs 的压缩中间件，提供的功能与 `“compression-webpack-plugin”` 差不多，所以如果是 nodejs 服务开发，并使用了这个库，那么前端也就没有必要再使用 `“compression-webpack-plugin”`。
