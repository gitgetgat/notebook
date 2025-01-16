# 常用的 Plugin 有哪些？

<article-info/>

## `hot-module-replacement`

<link-tag :linkList="[{ linkType: 'git', linkText:'hot-module-replacement',linkUrl:'https://github.com/sidorares/hot-module-replacement'},{  linkText:'hot-module-replacement Webpack 官方文档',linkUrl:'https://webpack.docschina.org/concepts/hot-module-replacement/#root'}]" />

模块热更新插件。`Hot-Module-Replacement` 的热更新是依赖于 `webpack-dev-server`，后者是在打包文件改变时更新打包文件或者 `reload` 刷新整个页面，HRM 是只更新修改的部分。

`HotModuleReplacementPlugin` 是 `webpack` 模块自带的，所以引入 `webpack` 后，在 `plugins` 配置项中直接使用即可。

::: code-group

```js
const webpack = require("webpack");

plugins: [
  new webpack.HotModuleReplacementPlugin() // 热更新插件
];
```

:::

## `html-webpack-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'html-webpack-plugin',linkUrl:'https://github.com/jantimon/html-webpack-plugin'},{  linkText:'html-webpack-plugin Webpack 官方文档',linkUrl:'https://webpack.docschina.org/plugins/html-webpack-plugin/#root'}]" />

生成 `html` 文件。将 `webpack` 中 `entry` 配置的相关入口 `chunk` 和 `extract-text-webpack-plugin` 抽取的 `css` 样式 插入到该插件提供的 `template` 或者 `templateContent` 配置项指定的内容基础上生成一个 `html` 文件，具体插入方式是将样式 `link` 插入到 `head` 元素中，`script` 插入到 `head` 或者 `body` 中。

::: code-group

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

plugins: [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.join(__dirname, "/index.html"),
    minify: {
      // 压缩HTML文件
      removeComments: true, // 移除HTML中的注释
      collapseWhitespace: true, // 删除空白符与换行符
      minifyCSS: true // 压缩内联css
    },
    inject: true
  })
];
```

:::

`inject` 有四个选项值

- <imp-text-danger>true</imp-text-danger>：默认值，`script` 标签位于 `html` 文件的 `body` 底部

- <imp-text-danger>body</imp-text-danger>：`script` 标签位于 `html` 文件的 `body` 底部（同 `true`）

- <imp-text-danger>head</imp-text-danger>：`script` 标签位于 `head` 标签内

- <imp-text-danger>false</imp-text-danger>：不插入生成的 `js` 文件，只是单纯的生成一个 `html` 文件

多页应用打包

有时，我们的应用不一定是一个单页应用，而是一个多页应用，那么如何使用 `webpack` 进行打包呢。

::: code-group

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    index: "./src/index.js",
    login: "./src/login.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:6].js"
  },
  //...
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html" //打包后的文件名
    }),
    new HtmlWebpackPlugin({
      template: "./public/login.html",
      filename: "login.html" //打包后的文件名
    })
  ]
};
```

:::

如果需要配置多个 `HtmlWebpackPlugin`，那么 `filename` 字段不可缺省，否则默认生成的都是 `index.html`。

但是有个问题，`index.html` 和 `login.html` 会发现，都同时引入了 `index.f7d21a.js` 和 `login.f7d21a.js`，通常这不是我们想要的，我们希望 `index.html` 中只引入 `index.f7d21a.js`，`login.html` 只引入 `login.f7d21a.js`。

`HtmlWebpackPlugin` 提供了一个 `chunks` 的参数，可以接受一个数组，配置此参数仅会将数组中指定的 `js` 引入到 `html` 文件中

::: code-group

```js
module.exports = {
  //...
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html", //打包后的文件名
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      template: "./public/login.html",
      filename: "login.html", //打包后的文件名
      chunks: ["login"]
    })
  ]
};
```

:::

这样执行 `npm run build`，可以看到 `index.html` 中仅引入了 `index` 的 `js` 文件，而 `login.html` 中也仅引入了 `login` 的 `js` 文件。

## `clean-webpack-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'clean-webpack-plugin',linkUrl:'https://github.com/johnagan/clean-webpack-plugin'}]" />

`clean-webpack-plugin` 用于在打包前清理上一次项目生成的 `bundle` 文件，它会根据 `output.path` 自动清理文件夹；这个插件在生产环境用的频率非常高，因为生产环境经常会通过 `hash` 生成很多 `bundle` 文件，如果不进行清理的话每次都会生成新的，导致文件夹非常庞大。

::: code-group

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

plugins: [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, "/index.html")
  }),
  new CleanWebpackPlugin() // 所要清理的文件夹名称
];
```

:::

## `extract-text-webpack-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'extract-text-webpack-plugin',linkUrl:'https://github.com/webpack-contrib/extract-text-webpack-plugin'},{ linkText:'extract-text-webpack-plugin Webpack 官方文档',linkUrl:'https://webpack.docschina.org/migrate/3/#extracttextwebpackplugin---breaking-change'}]" />

将 `css` 成生文件，而非内联 。该插件的主要是为了抽离 `css` 样式,防止将样式打包在 `js` 中引起页面样式加载错乱的现象

::: code-group

```js
const ExtractTextPlugin = require("extract-text-webpack-plugin");

plugins: [
  // 将css分离到/dist文件夹下的css文件夹中的index.css
  new ExtractTextPlugin("css/index.css")
];
```

:::

## `mini-css-extract-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'mini-css-extract-plugin',linkUrl:'https://github.com/webpack-contrib/mini-css-extract-plugin'},{ linkText:'mini-css-extract-plugin Webpack 官方文档',linkUrl:'https://webpack.docschina.org/plugins/mini-css-extract-plugin#root'}]" />

将 `CSS` 提取为独立的文件的插件，对每个包含 `css` 的 `js` 文件都会创建一个 `CSS` 文件，支持按需加载 `css` 和 `sourceMap`。只能用在 `webpack4` 中，对比另一个插件 `extract-text-webpack-plugin` 有以下特点:

- 异步加载

- 不重复编译，性能更好

- 更容易使用

- 只针对 CSS

这个插件应该只用在生产环境配置，并且在 `loaders` 链中不使用 `style-loader`, 而且这个插件暂时不支持 `HMR`

::: code-group

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  }
};
```

:::

## `purifycss-webpack`

<link-tag :linkList="[{ linkType: 'git', linkText:'purifycss-webpack',linkUrl:'https://github.com/webpack-contrib/purifycss-webpack'}]" />

有时候我们 `css` 写得多了或者重复了，这就造成了多余的代码，我们希望在生产环境进行去除。

::: code-group

```js
const path = require("path");
const PurifyCssWebpack = require("purifycss-webpack"); // 引入PurifyCssWebpack插件
const glob = require("glob"); // 引入glob模块,用于扫描全部html文件中所引用的css

module.exports = merge(common, {
  plugins: [
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, "src/*.html"))
    })
  ]
});
```

:::

## `optimize-css-assets-webpack-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'optimize-css-assets-webpack-plugin',linkUrl:'https://github.com/NMFR/optimize-css-assets-webpack-plugin'}]" />

我们希望减小 `css` 打包后的体积，可以用到 `optimize-css-assets-webpack-plugin`。

::: code-group

```js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css代码

optimization: {
  minimizer: [
    // 压缩css
    new OptimizeCSSAssetsPlugin({})
  ];
}
```

:::

## `uglifyjs-webpack-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'uglifyjs-webpack-plugin',linkUrl:'https://github.com/webpack-contrib/uglifyjs-webpack-plugin'}]" />

`uglifyjs-webpack-plugin` 是 `vue-cli` 默认使用的压缩代码方式，用来对 `js` 文件进行压缩，从而减小 `js` 文件的大小，加速 `load` 速度。它使用的是单线程压缩代码，打包时间较慢，所以可以在开发环境将其关闭，生产环境部署时再把它打开。

::: code-group

```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

plugins: [
  new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false
      }
    },
    sourceMap: true,  //是否启用文件缓存
    parallel: true   //使用多进程并行运行来提高构建速度
  })
```

:::

## `webpack-parallel-uglify-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'webpack-parallel-uglify-plugin',linkUrl:'https://github.com/gdborton/webpack-parallel-uglify-plugin'}]" />

开启多个子进程，把对多个文件压缩的工作分别给多个子进程去完成，每个子进程其实还是通过 UglifyJS 去压缩代码，但是变成了并行执行。

::: code-group

```js
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");

plugins: [
  new ParallelUglifyPlugin({
    //cacheDir 用于配置缓存存放的目录路径。
    cacheDir: ".cache/",
    sourceMap: true,
    uglifyJS: {
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }
  })
];
```

:::

## `terser-webpack-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'webpack-parallel-uglify-plugin',linkUrl:'https://github.com/webpack-contrib/terser-webpack-plugin'},{ linkText:'webpack-parallel-uglify-plugin Webpack 官方文档',linkUrl:'https://webpack.docschina.org/plugins/terser-webpack-plugin/#root'}]" />

`Webpack4.0` 默认是使用 `terser-webpack-plugin` 这个压缩插件，在此之前是使用 `uglifyjs-webpack-plugin`，两者的区别是后者对 `ES6` 的压缩不是很好，同时我们可以开启 `parallel` 参数，使用多进程压缩，加快压缩。

::: code-group

```js
const TerserPlugin = require("terser-webpack-plugin"); // 压缩js代码

optimization: {
  minimizer: [
    new TerserPlugin({
      parallel: 4, // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
      cache: true, // 是否缓存
      sourceMap: false
    })
  ];
}
```

:::

## `NoEmitOnErrorsPlugin`

报错但不退出 webpack 进程。编译出现错误时，使用 `NoEmitOnErrorsPlugin` 来跳过输出阶段。这样可以确保输出资源不会包含错误。

::: code-group

```js
plugins: [new webpack.NoEmitOnErrorsPlugin()];
```

:::

## `compression-webpack-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'compression-webpack-plugin',linkUrl:'https://github.com/webpack-contrib/compression-webpack-plugin'},{ linkText:'compression-webpack-plugin Webpack 官方文档',linkUrl:'https://webpack.docschina.org/plugins/compression-webpack-plugin/#root'}]" />

所有现代浏览器都支持 `gzip` 压缩，启用 `gzip` 压缩可大幅缩减传输资源大小，从而缩短资源下载时间，减少首次白屏时间，提升用户体验。

`gzip` 对基于文本格式文件的压缩效果最好（如：`CSS`、`JavaScript` 和 `HTML`），在压缩较大文件时往往可实现高达 `70-90%` 的压缩率，对已经压缩过的资源（如：图片）进行 `gzip` 压缩处理，效果很不好。

::: code-group

```js
const CompressionPlugin = require("compression-webpack-plugin");

plugins: [
  new CompressionPlugin({
    // gzip压缩配置
    test: /\.js$|\.html$|\.css/, // 匹配文件名
    threshold: 10240, // 对超过10kb的数据进行压缩
    deleteOriginalAssets: false // 是否删除原文件
  })
];
```

:::

当然，这个方法还需要后端配置支持。

## `DefinePlugin`

<link-tag :linkList="[{ linkText:'DefinePlugin Webpack 官方文档',linkUrl:'https://webpack.docschina.org/plugins/define-plugin#root'}]" />

我们可以通过 `DefinePlugin` 可以定义一些全局的变量，我们可以在模块当中直接使用这些变量，无需作任何声明，`DefinePlugin` 是 webpack 自带的插件。

::: code-group

```js
plugins: [
  new webpack.DefinePlugin({
    DESCRIPTION: "This Is The Test Text."
  })
];

// 直接引用
console.log(DESCRIPTION);
```

:::

## `ProvidePlugin`

<link-tag :linkList="[{ linkText:'ProvidePlugin Webpack 官方文档',linkUrl:'https://webpack.docschina.org/plugins/provide-plugin/#root'}]" />

自动加载模块。任何时候，当 `identifier` 被当作未赋值的变量时， `module` 就会自动被加载，并且 `identifier` 会被这个 `module` 输出的内容所赋值。这是 `webpack` 自带的插件。

::: code-group

```js
plugins: [
  new webpack.DefinePlugin({
    DESCRIPTION: "This Is The Test Text."
  })
];

// 直接引用
console.log(DESCRIPTION);
```

:::

## `DLLPlugin`

<link-tag :linkList="[{ linkText:'DLLPlugin Webpack 官方文档',linkUrl:'https://webpack.docschina.org/plugins/dll-plugin#root'}]" />

这是在一个额外的独立的 `webpack` 设置中创建一个只有 `dll` 的 `bundle(dll-only-bundle)`。这个插件会生成一个名为 `manifest.json` 的文件，这个文件是用来让 `DLLReferencePlugin` 映射到相关的依赖上去的。

使用步骤如下

1. 在 `build` 下创建 `webpack.dll.config.js`

::: code-group

```js
const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: {
    vendor: [
      "vue-router",
      "vuex",
      "vue/dist/vue.common.js",
      "vue/dist/vue.js",
      "vue-loader/lib/component-normalizer.js",
      "vue",
      "axios",
      "echarts"
    ]
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].dll.js",
    library: "[name]_library"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve("./dist", "[name]-manifest.json"),
      name: "[name]_library"
    }),
    // 建议加上代码压缩插件，否则dll包会比较大。
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
```

:::

2. 在 `webpack.prod.conf.js` 的 `plugin` 后面加入配置

::: code-group

```js
new webpack.DllReferencePlugin({
  manifest: require("../dist/vendor-manifest.json")
});
```

:::

3. `package.json` 文件中添加快捷命令(`build:dll`)

::: code-group

```json
{
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build": "node build/build.js",
    "build:dll": "webpack --config build/webpack.dll.conf.js"
  }
}
```

:::

生产环境打包的时候先 `npm run build:dll` 命令会在打包目录下生成 `vendor-manifest.json` 文件与 `vendor.dll.js` 文件。然后 `npm run build` 生产其他文件。

## `copy-webpack-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'copy-webpack-plugin',linkUrl:'https://github.com/webpack-contrib/copy-webpack-plugin'},{ linkText:'copy-webpack-plugin Webpack 官方文档',linkUrl:'https://webpack.docschina.org/plugins/copy-webpack-plugin#root'}]" />

我们在 `public/index.html` 中引入了静态资源，但是打包的时候 `webpack` 并不会帮我们拷贝到 `dist` 目录，因此 `copy-webpack-plugin` 就可以很好地帮我做拷贝的工作了。

::: code-group

```js
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public/js/*.js",
          to: path.resolve(__dirname, "dist", "js"),
          flatten: true
        }
      ]
    })
  ]
};
```

:::

## `IgnorePlugin`

<link-tag :linkList="[{ linkText:'IgnorePlugin Webpack 官方文档',linkUrl:'https://webpack.docschina.org/plugins/ignore-plugin/#root'}]" />

这是 `webpack` 内置插件，它的作用是：忽略第三方包指定目录，让这些指定目录不要被打包进去。

比如我们要使用 `moment` 这个第三方依赖库，该库主要是对时间进行格式化，并且支持多个国家语言。虽然我设置了语言为中文，但是在打包的时候，是会将所有语言都打包进去的。这样就导致包很大，打包速度又慢。对此，我们可以用 `IgnorePlugin` 使得指定目录被忽略，从而使得打包变快，文件变小。

::: code-group

```js
const Webpack = require("webpack");
plugins: [
  //moment这个库中，如果引用了./locale/目录的内容，就忽略掉，不会打包进去
  new Webpack.IgnorePlugin(/\.\/locale/, /moment/)
];
```

:::

我们虽然按照上面的方法忽略了包含 `./locale/` 该字段路径的文件目录，但是也使得我们使用的时候不能显示中文语言了，所以这个时候可以手动引入中文语言的目录。

::: code-group

```js
import moment from "moment";

//手动引入所需要的语言包
import "moment/locale/zh-cn";

moment.locale("zh-cn");

let r = moment().endOf("day").fromNow();
console.log(r);
```

:::

## `ModuleConcatenationPlugin`

<link-tag :linkList="[{ linkText:'ModuleConcatenationPlugin Webpack 官方文档',linkUrl:'https://webpack.docschina.org/plugins/module-concatenation-plugin/#root'}]" />

此插件会将所有模块的作用域“提升”或合并到一个闭包中，从而使得代码在浏览器中执行速度更快。此插件在 `生产模式` 下已启用，在其他情况下则禁用。可以通过配置覆盖默认优化。

::: code-group

```js
new webpack.optimize.ModuleConcatenationPlugin();
```

:::

## `speed-measure-webpack-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'speed-measure-webpack-plugin',linkUrl:'https://github.com/stephencookdev/speed-measure-webpack-plugin'}]" />

可以看到每个 `Loader` 和 `Plugin` 执行耗时 (整个打包耗时、每个 `Plugin` 和 `Loader` 耗时)

::: code-group

```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap({
  plugins: [new MyPlugin(), new MyOtherPlugin()]
});
```

:::

## `webpack-bundle-analyzer`

<link-tag :linkList="[{ linkType: 'git', linkText:'webpack-bundle-analyzer',linkUrl:'https://github.com/webpack-contrib/webpack-bundle-analyzer'}]" />

可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)

![/93f72404-b338-11e6-92d4-9a365550a701.gif](/93f72404-b338-11e6-92d4-9a365550a701.gif)

::: code-group

```js
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  plugins: [new BundleAnalyzerPlugin()]
};
```

:::

## `purgecss-webpack-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'purgecss-webpack-plugin',linkUrl:'https://github.com/FullHuman/purgecss'},{ linkText:'purgecss-webpack-plugin 官网',linkUrl:'https://purgecss.com/'}]" />

删除未使用的 CSS

::: code-group

```js
const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "src")
};

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    })
  ]
};
```

:::

## `hard-source-webpack-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'hard-source-webpack-plugin',linkUrl:'https://github.com/mzgoddard/hard-source-webpack-plugin'}]" />

`HardSourceWebpackPlugin` 是 `webpack` 的一个插件，用于为模块提供中间缓存步骤。为了看到结果，您需要使用此插件运行 `webpack` 两次：第一次构建将花费正常时间。第二次构建将明显更快。

::: code-group

```js
// webpack.config.js
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  context: // ...
  entry: // ...
  output: // ...
  plugins: [
    new HardSourceWebpackPlugin()
  ]
}
```

:::

## `hashed-module-id-plugin`

帮助创建稳定的模块 ID

::: code-group

```js
const HashedModuleIdsPlugin = require("hashed-module-id-plugin ");

module.exports = {
  //...
  plugins: [new HashedModuleIdsPlugin()]
};
```

:::

## `html-webpack-externals-plugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'html-webpack-externals-plugin',linkUrl:'https://github.com/mmiller42/html-webpack-externals-plugin'}]" />

将基础包分离出来，通过 `CDN` 引入，不打入 `bundle` 中

::: code-group

```js
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "vue",
          entry:
            "https://cdn.finchina.com/app/app_dependent_file/vue/2.6.9/vue.min.js",
          global: "Vue"
        }
      ]
    })
  ]
};
```

:::

最后看到在 `index.html` 中动态添加了如下代码：

::: code-group

```html
<script
  type="text/javascript"
  src="https://cdn.finchina.com/app/app_dependent_file/vue/2.6.9/vue.min.js"
></script>
```

:::

::: tip 如果打包后资源依赖加载顺序有问题，可以在 `script` 标签内添加 `defer`

```html
<script
  src="https://cdn.finchina.com/app/app_dependent_file/vant/2.10.6/vant.min.js"
  defer
></script>
```

:::

## `SplitChunksPlugin`

<link-tag :linkList="[{ linkType: 'git', linkText:'SplitChunksPlugin',linkUrl:'https://webpack.docschina.org/plugins/split-chunks-plugin#root'}]" />

::: code-group

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

:::
