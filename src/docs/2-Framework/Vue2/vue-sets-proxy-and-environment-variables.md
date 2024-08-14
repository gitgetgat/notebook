# Vue 设置代理和环境变量

<article-info/>

## 模式

模式是 Vue CLI 项目中一个重要的概念。默认情况下，一个 Vue CLI 项目有三个模式：

`development` 模式用于 `vue-cli-service serve`

`test` 模式用于 `vue-cli-service test:unit`

`production` 模式用于 `vue-cli-service build` 和 `vue-cli-service test:e2e`

## 环境变量

你可以在你的项目根目录中放置下列文件来指定环境变量：

::: code-group

```bash
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

:::

.env.development：开发环境下的配置文件
.env.production：生产环境下的配置文件

![/a9cd600c-a3d9-6bca-c423-28bd675e4dd4.png](/a9cd600c-a3d9-6bca-c423-28bd675e4dd4.png)

::: tip
如果没有配置这两个文件，运行 npm run serve 时，process.env.NODE_ENV 的值默认就是 development；运行 npm run build 时，process.env.NODE_ENV 的值默认是 production
:::

::: code-group

```bash
"scripts": {
    "serve": "vue-cli-service serve",//development开发环境
    "build": "vue-cli-service build",//production生产环境
    "lint": "vue-cli-service lint"
 },
```

:::

::: code-group

```bash
# .env.development 或者 .env.production
NODE_ENV = 'development'

VUE_APP_BASE_API = 'http://xx.xxx.xxx.xx:xxx:xxxx/api'

VUE_APP_BASE_URL = 'http://xxx:xxxx'

VUE_APP_BASE_NAME = '/api'
```

:::

::: tip
.env.development 文件和 .env.production 可以定相同名称的变量也可以不相同名称的变量，变量值可以相同也可以不同；在编码时可以根据判断来取不同的值
:::

::: code-group

```bash
# vue.config.js
devServer: {
    // port: 6666,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_NAME]: {
        target: process.env.VUE_APP_BASE_URL,//代理地址
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          ['^'+process.env.VUE_APP_BASE_NAME]: ''
        }
      },
    }
  },
```

:::

## 配置 axios

::: code-group

```js
const http = axios.create({
  withCredentials: true, // 指定某个请求应该发送凭据。允许客户端携带跨域cookie，也需要此配置
  baseURL: process.env.VUE_APP_BASE_URL, // 所有请求的公共地址部分
  timeout: 3000 // 请求超时时间 这里的意思是当请求时间超过5秒还未取得结果时 提示用户请求超时
});
```

:::
