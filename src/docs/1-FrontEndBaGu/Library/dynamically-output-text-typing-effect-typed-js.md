# 动态输出文本打字效果 Typed.js

<article-info/>

![/8630c2c9-8365-42b3-37d4-38dcca0e91a6.webp](/8630c2c9-8365-42b3-37d4-38dcca0e91a6.webp)

## 什么是 Typed.js？

`Typed.js` 是一个开源的 JavaScript 插件，旨在通过打字动画模拟打字效果。它允许开发者在网页上创建渐进式的文本输入效果，使用户体验更加生动和引人注目。

## 使用场景

`Typed.js` 适用于多种场景，包括但不限于：

1. 首页引导：为网站首页添加动态文本，吸引用户注意并传达关键信息。

2. 宣传标语：在产品页面或广告中使用动态文字来增强信息的吸引力。

3. 教育网站：在教程或课程页面中使用打字效果来演示代码或步骤。

4. 互动游戏：在游戏中显示动态对话或提示，增加互动体验。

5. 个人博客：为个人博客或作品集页面添加个性化的动态文本效果。

## 如何使用 Typed.js

### 引入 Typed.js

::: code-group

```bash [npm]
npm install typed.js
```

```html [CDN]
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12/lib/typed.min.js"></script>
```

:::

### 基本用法

在 HTML 文件中，添加一个用于显示动态文本的元素。例如：

::: code-group

```html
<div id="typed-output"></div>
```

:::

在 JavaScript 文件中，初始化 Typed.js 实例：

::: code-group

```js
const options = {
  strings: ["Hello World!", "Welcome to my website.", "Enjoy your stay!"],
  typeSpeed: 50, // 打字速度（每个字符毫秒数）
  backSpeed: 25, // 删除速度（每个字符毫秒数）
  backDelay: 1000, // 删除延迟（毫秒数）
  startDelay: 500, // 开始延迟（毫秒数）
  loop: true // 是否循环
};

const typed = newTyped("#typed-output", options);
```

:::

### 配置选项

`Typed.js` 提供了丰富的配置选项来定制打字效果：

- `strings`: 一个字符串数组，每个字符串都将依次显示。

- `typeSpeed`: 每个字符的打字速度，以毫秒为单位。

- `backSpeed`: 每个字符的删除速度，以毫秒为单位。

- `backDelay`: 删除效果开始前的延迟，以毫秒为单位。

- `startDelay`: 打字动画开始前的延迟，以毫秒为单位。

- `loop`: 是否循环播放文本效果。

- `showCursor`: 是否显示光标。

- `cursorChar`: 自定义光标字符。

## 示例

### 基本打字效果

<script setup>
import ExpTypedJs from '../../../../components/example/use-typed-js.vue'
</script>

::: code-group

```js
const options = {
  strings: [
    "Welcome to our site!",
    "Explore our features.",
    "Contact us for more info."
  ],
  typeSpeed: 40,
  backSpeed: 20,
  backDelay: 500,
  loop: true
};

const typed = new Typed("#typed-output", options);
```

:::

<exp-typed-js :num='1'></exp-typed-js>

### 打字与删除混合效果

::: code-group

```js
const options = {
  strings: [
    "Learning JavaScript...",
    "Mastering front-end development...",
    "Building amazing websites..."
  ],
  typeSpeed: 30,
  backSpeed: 50,
  backDelay: 1000,
  startDelay: 500,
  loop: true,
  showCursor: true
};

const typed = new Typed("#typed-output", options);
```

:::

<exp-typed-js :num='2'></exp-typed-js>
