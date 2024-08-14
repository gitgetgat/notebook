# vue 项目上线打包优化

<article-info/>

## 禁止生成 `sourceMap` 文件

`vue` 项目在打包过程中，会出现 `map` 文件，该文件的主要作用是让我们打包后的文件像未加密的代码一样，可以准确的输出相关的错误信息。默认情况下 `productionSourceMap` 为 `true`，在此情况下，项目打包过后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知代码具体哪里出错.

vue.config.js 配置如下：

::: code-group

```js
module.exports = {
  productionSourceMap: false // 是否在构建生产包时生成 sourceMap 文件，false 将提高构建速度
};
```

:::

## 关闭 `Prefetch`

`vue-cli 3`默认开启 `prefetch` (预先加载模块)，提前获取用户未来可能会访问的内容

在首屏会把这十几个路由文件，都下载下来

注意: `prefetch` 其实并不会影响首页的加载速度，只是优化子页面

使用场景：当对流量有限制时可以使用，比如移动端，只用查看首页或者其它并不是全部页面的时候，使用 `perfetch` 可能会导致流量的不必要损耗

所以我们要关闭这个功能，在 vue.config.js 中设置

::: code-group

```js
// vue. config.js
module.exports = {
  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 或者
    // 修改它的选项:
    config.plugin("prefetch").tap((options) => {
      options[0].fileBlacklist = options[0].fileBlacklist || [];
      options[0].fileBlacklist.push(/myasyncRoute(.)+? .js$/);
      return options;
    });
  }
};
```

:::

## 路由懒加载

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk(opens new window)，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。

::: code-group

```js
const Foo = () => import(/* webpackChunkName:"group-foo" */ "./Foo.vue");
const Bar = () => import(/* webpackChunkName:"group-bar" */ "./Bar.vue");
const Baz = () => import(/* webpackChunkName:"group-baz" */ "./Baz.vue");
```

:::

## elementUI 组件库按需加载

vue 项目打包完，可查看 eleUI 会占较大量体积，需要对它进行按需引入

易错点：项目是基于 vue-cli 3.x 的版本，并没有官网的 .babelrc 文件，只有 babel.config,js 文件，而且项目不需要引入完整的 element-ui，只需要引入部分，按官网的步骤安装 babel-plugin-component 后在 babel.config,is 写入内容，报错。

解决方法:

.babelrc 文件和 babel.config.js 文件都是配置文件，可以视为相同，之后需要使用 npm 安装

::: code-group

```js
npm i @babel/preset-env -D
```

:::

而且，也不再使用 es2015，改成 @babel/preset-env，两者是相同的，其作用都是编译 es6 语法，因此在 babel.config.js 中写成

::: code-group

```js
module.exports = !
  presets: [
    '@vue/cli-plugin-babel/preset ',
    ["@babel/preset-env", {
      "modules": false
    }]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk",
      }
    ]
  ]
}
```

:::

## 使用 CDN 加载外部资源

对于 vue，vuex，vue-router，axios 等我们可以利用 wenpack 的 externals 参数来配置，这里我们设定只需要在生产环境中才需要使用：

::: code-group

```js [wabpack 配置]
const isProduction = process.env.NODE_ENV === "production";
const cdn = {
  css: [],
  js: [
    "https://cdn.bootcdn.net/ajax/libs/vue/2.5.17/vue.runtime.min.js",
    "https://cdn.bootcdn.net/ajax/libs/vue-router/3.0.1/vue-router.min.js",
    "https://cdn.bootcdn.net/ajax/libs/vuex/3.0.1/vuex.min.js",
    "https://cdn.bootcdn.net/ajax/libs/axios/0.18.0/axios.min.js"
  ]
};

module.exports = {
  chainWebpack: (config) => {
    // 生产环境配置
    if (isProduction) {
      // 生产环境注入 cdn
      config.plugin("html").tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
    }
  },
  configureWebpack: (config) => {
    if (isProduction) {
      // 用cdn方式引入
      config.externals = {
        vue: "Vue",
        vuex: "Vuex",
        "vue-router": "VueRouter",
        axios: "axios"
      };
    }
  }
};
```

```html [index.html里的相关核心代码]
<!-- 使用 CDN 的 CSS 文件 -->
<% for (var i in htmlWebpackPlugin.options.cdn &&
htmlWebpackPlugin.options.cdn.css) { %>
<link
  href="<%= htmlWebpackPlugin.options.cdn.css[i] %>"
  rel="proload"
  as="style"
/>
<link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet" />
<% } $>
<!-- 使用 CDN 的 js 文件 -->
<% for (var i in htmlWebpackPlugin.options.cdn &&
htmlWebpackPlugin.options.cdn.js) { %>
<link
  href="<%= htmlWebpackPlugin.options.cdn.js[i] %>"
  rel="proload"
  as="script"
/>
<% } $>
```

:::

## GZIP

拆包完成之后，我们再用一下 gzip 做一下压缩

安装 compression-webpack-plugin：`cnmp i compression-webpack-plugin -D`

::: code-group

```js
// 在 vue.congig.js 中引入并修改 webpack 配置
const CompressionPlugin = require('compression-webpack-plugin')

configureWebpack: (config) = > {
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...
			config.mode = 'production'
			return {
				plugins: [new Compressionplugin({
					test: /\.js$|\.html$|\.css/， //匹配文件名
					threshold: 10240， //对超过10k的数据进行压缩
					deleteOriginalAssets: false //是否删除原文件
				})]
			}
		}
```

:::

## 图片压缩

安装 `npm install image-webpack-loader --save-dev`

::: code-group

```jsx
//在chainwebpack中新增以下代码
config.plugins.delete('prefetch')
config.module.rule('images')
	.test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
	.use('image-webpack-loader')
	.loader('image-webpack-loader')
	.options([bypassOnDebug: true])
```

:::

## 代码压缩

安装插件 `npm i -D uglifyjs-webpack-plugin`

::: code-group

```jsx
// 代码压缩
// 在configureWebpack中加入
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 核心代码
new UglifyJsPlugin({
	uglifyOptions: {
		//生产环境自动删除console
		compress: {
			drop_debugger: true.
			drop_console: true,
			pure_funcs: ['console.1og']
		}
	},
	sourceMap: false,
	parallel: true
})
```

:::
