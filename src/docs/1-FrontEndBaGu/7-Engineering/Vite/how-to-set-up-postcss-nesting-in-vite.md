# 如何在 Vite 中设置 PostCSS 嵌套?

1. 通过 npm 安装

::: code-group

```bash
npm install postcss-nesting --save-dev
```

:::

2. 设置 vite.config.js:

::: code-group

```js
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postcssNesting from "postcss-nesting";

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },

  css: {
    postcss: {
      plugins: [postcssNesting]
    }
  }
});
```

:::
