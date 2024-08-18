# babel-plugin-import 实现按需引入

<article-info/>

首先 `babel-plugin-import` 是为了解决在打包过程中把项目中引用到的外部组件或功能库全量打包，从而导致编译结束后包容量过大的问题，如下图所示：

![/29f217bd-fbef-2090-ab27-fb054afc0741.png](/29f217bd-fbef-2090-ab27-fb054afc0741.png)

- 安装  `babel-plugin-import`  插件

  ::: code-group

  ```bash
  npm i babel-plugin-import -D
  ```

  :::

- 修改 babel 插件配置 `.babelrc` 文件

  ::: code-group

  ```js
  module.exports = {
    plugins: [
      [
        "import",
        {
          libraryName: "vant",
          libraryDirectory: "es",
          style: true
        },
        "vant"
      ]
    ]
  };
  ```

  :::

- 在项目代码中按需引入要用到的组件

  ::: code-group

  ```js
  import { Button } from "vant";
  Vue.use(Button);
  ```

  :::

- 自动转换为

  ::: code-group

  ```js
  import "vant/es/button/style";
  import _Button from "vant/es/button";
  ```

  :::

::: tip babel-plugin-import 原理
[https://blog.csdn.net/CamilleZJ/article/details/127862211](https://blog.csdn.net/CamilleZJ/article/details/127862211)
:::
