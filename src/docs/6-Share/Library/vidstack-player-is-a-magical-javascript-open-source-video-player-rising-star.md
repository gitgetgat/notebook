# Vidstack Player 一款神奇的 JavaScript 开源视频播放器新起之秀

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Vidstack Player',linkUrl:'https://github.com/vidstack/player'},{  linkText:'Vidstack Player 官方文档',linkUrl:'https://www.vidstack.io/'}]" />

## `Vidstack Player` 是什么？

`Vidstack Player` 是由 `Vime` 和 `Plyr` 的原班人马打造，不仅继承了前辈们的优秀基因，还在此基础上进行了创新和改进。这个库专为现代 Web 应用设计，支持多种媒体格式，并且可以轻松集成到各种 Web 应用程序中 。

特点

`Vidstack Player` 的核心特点可以概括为以下几点：

1. <imp-text-danger>框架无关性</imp-text-danger>：它基于 `Web Components` 和 `React` 设计，意味着它拥有良好的跨框架兼容性，无论您是使用 `React`、`Vue`、`Angular` 还是其他任何框架，都可以无缝集成 。

2. <imp-text-danger>可定制性</imp-text-danger>：提供了丰富的组件和钩子，使得开发者可以根据自己的需求定制播放器的 UI 和功能 。

3. <imp-text-danger>全面的播放器 API</imp-text-danger>：自动播放、音轨、全屏、画中画、实时、键盘、文本轨道和视频质量。

4. <imp-text-danger>性能优化</imp-text-danger>：库本身非常轻量，`gzip` 后只有 54kB，而且支持 `Tree shaking`，可以进一步减少最终打包体积 。

5. <imp-text-danger>丰富的功能</imp-text-danger>：支持多种媒体源，包括 `Audio`、`Video`、`HLS`、`DASH`、`YouTube`、`Vimeo` 和 `Remotion` 等 。

## 安装方法

`Vidstack Player` 可以通过 `npm`、`yarn` 或 `CDN` 进行安装。

::: code-group

```bash [npm]
npm i vidstack@next
```

```bash [yarn]
yarn add vidstack@next
```

```html [CDN]
<script src="https://cdn.vidstack.io/player" type="module"></script>
```

:::

## 在 Vue 中使用

示例如下：

<script setup>
import ExpUseVidstackPlayer from '../../../../components/example/exp-use-vidstack-player.vue'
</script>

<exp-use-vidstack-player/>

但是在 Vue 中使用的是 <imp-text-danger>Web Components</imp-text-danger>，自定义的标签元素，需要配置才能在编译时识别，下面是在 `vitepress` 中需要额外的配置，可以参考 <link-tag :linkList="[{  linkText:'站点配置 | VitePress',linkUrl:'https://vitepress.dev/zh/reference/site-config#vue'}]" />

::: code-group

```js [config.mts]
// .vitepress\config.mts
export default defineConfig({
  vue: {
    // @vitejs/plugin-vue 选项
    template: {
      compilerOptions: {
        // 将所有带短横线的标签名都视为自定义元素
        isCustomElement: (tag) => tag.startsWith("media-"),
      },
    },
  },
});
```

:::

## 应用案例

`Vidstack Player` 可以广泛应用于多种场景：

1. <imp-text-danger>视频直播平台</imp-text-danger>：支持实时流媒体播放和互动功能，通过集成实时聊天和弹幕系统，可以增强用户的观看体验 。

2. <imp-text-danger>在线教育平台</imp-text-danger>：用于播放课程视频，支持字幕、笔记和进度跟踪等功能，有助于提高学习效率和用户满意度 。

## 和同类库比较

`Vidstack Player` 相对于其他视频库的五个关键优势：

1. <imp-text-danger>现代化和高效</imp-text-danger>：提供最新 API 和优化的捆绑包大小，支持快速加载和现代浏览器。

2. <imp-text-danger>强大的 TypeScript 支持</imp-text-danger>：提供一流的 TypeScript 支持，确保类型安全的开发体验。

3. <imp-text-danger>丰富的组件和反应性</imp-text-danger>：提供广泛的声明性组件和基于信号的反应性系统，增强功能和外观。

4. <imp-text-danger>高度可定制</imp-text-danger>：支持自定义 UI 和生产就绪的 UI，提供超过 150 个 CSS 变量，易于个性化。

5. <imp-text-danger>免费且无限制的许可</imp-text-danger>：采用 MIT 许可，免费使用，无需为内容播放次数支付额外费用。
