# 初始化项目并引入 shadcn-vue UI

<article-info/>

<link-tag :linkList="[{ linkType: 'vue', linkText:'shadcn-vue',linkUrl:'https://www.shadcn-vue.com/'},{ linkText:'tailwind 中文官网',linkUrl:'https://tailwind.nodejs.cn/'}]" />

## 1. 通过 vite 创建项目

```bash
# npm 6.x
npm create vite@latest my-vue-app --template vue-ts

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue-ts
```

## 2. 添加 Tailwind 并配置

vite 内置了 postcss，无需额外安装

```bash
npm install -D tailwindcss@3 autoprefixer
```

配置 vite.config.ts

```ts{2-3,8-15}
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwind(),
        autoprefixer()
      ],
    },
  },
  plugins: [
    vue()
  ],
})
```

## 3. 编辑 tsconfig.json

这里应为 `vite` 为 `typescript` 默认生成了三个 `tsconfig` 文件，分别是 `tsconfig.json`、`tsconfig.node.json`、`tsconfig.app.json`，这里我们只需要修改 `tsconfig.app.json` 文件即可

```ts{4-7}
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

## 4. 再次更新 vite.config.ts 配置

将以下代码添加到 vite.config.ts，以便可以正确解析路径

```bash
# (so you can import "path" without error)
npm i -D @types/node
```

```ts{1,20-24}
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwind(),
        autoprefixer()
      ],
    },
  },
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```

## 5. 删除默认 Vite 样式

删除默认的 `Vite` 样式表 `./src/style.css`

## 6. 运行 CLI 并安装 shadcn-vue

### 安装 shadcn-vue

运行 `shadcn-vue` init 命令来设置你的项目：

```bash
npx shadcn-vue@latest init
```

过程中将被问到几个配置问题，这些问题的设置将应用到 `components.json` 中：

```
Would you like to use TypeScript (recommended)? no / yes
Which framework are you using? Vite / Nuxt / Laravel
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your tsconfig.json or jsconfig.json file? › ./tsconfig.json
Where is your global CSS file? › › src/assets/index.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Write configuration to components.json. Proceed? > Y/n
```

### 创建 `'./assets/index.css'`，并配置变量

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --border: 0 0% 100%;
    --input: 240 3.7% 15.9%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

### 更新 `main.ts`

删除 `style.css` 的导入并添加 `tailwind` 样式导入 `import './assets/index.css'`

```ts{2,4}
import { createApp } from 'vue'
import './style.css' // [!code --]
import App from './App.vue'
import './assets/index.css' // [!code ++]

createApp(App).mount('#app')
```

## 7. 测试

开始向项目添加组件。

```bash
npx shadcn-vue@latest add button
```

上述命令将 `Button` 组件添加到你的项目中。然后你可以像这样导入它：

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <div>
    <Button>Click me</Button>
  </div>
</template>
```

![50f2be28-fe2d-8092-fb9c-afa08b6ec65e.png](/50f2be28-fe2d-8092-fb9c-afa08b6ec65e.png)
