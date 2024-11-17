# Tone.js 一款为交互式音乐而设计的 JavaScript 开源网络音频库

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'Tone.js',linkUrl:'https://github.com/Tonejs/Tone.js?source=post_page-----2e5fff0f071d--------------------------------'},{ linkText:'Tone.js 官网',linkUrl:'https://tonejs.github.io/'}]" />

![/0283e937-bd1d-d77f-3870-d63ff9061b7e.png](/0283e937-bd1d-d77f-3870-d63ff9061b7e.png)

## `Tone.js` 是什么？

`Tone.js` 是一个强大的 `Web Audio` 框架，为在浏览器中创建交互式音乐提供了丰富的工具和功能。使得在 `Web` 应用中实现复杂的音频处理和音乐创作成为可能。

### 核心特性

`Tone.js` 的设计目标是提供一个模块化的音频处理环境，它包括了合成器、效果器、信号控制等核心组件。这些组件可以被用来构建复杂的音频应用，如数字音频工作站（`DAW`）功能，包括全局传输、预建的合成器和效果器等。

![/63f9140d-47b6-ea45-4f43-ee63e0782113.gif](/63f9140d-47b6-ea45-4f43-ee63e0782113.gif)

## 安装和快速入门

要开始使用 `Tone.js`，你可以通过 `npm` 安装它：

::: code-group

```bash [npm]
npm install tone
```

```html [CDN]
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js"></script>
```

:::

一旦安装完成，你可以创建一个简单的合成器并播放音符：

::: code-group

```js
import * as Tone from "tone";
const synth = new Tone.Synth().toDestination();
synth.triggerAttackRelease("C4", "8n");
```

:::

这个示例实现了以下基本功能: 引入 `Tone.js` 库；创建一个简单的合成器 (`Tone.Synth`)；添加一个按钮来触发音符播放；当按钮被点击时,播放一个 `C4` 音符,持续时间为八分音符 (约 `0.5` 秒)。

例子展示了 `Tone.js` 的基本用法,包括:

1. 创建合成器；

2. 将合成器连接到输出设备；

3. 使用 `triggerAttackRelease` 方法播放音符；

4. 确保在用户交互后启动音频上下文

你可以基于这个示例进行扩展,例如添加更多的音符、改变音色、添加效果器等,以创建更复杂的音乐应用。

## 深入探索

`Tone.js` 提供了多种合成器和效果器，例如 `Tone.FMSynth`、`Tone.AMSynth`、`Tone.NoiseSynth` 等，以及丰富的信号控制功能。你可以使用 `Tone.PolySynth` 来创建一个多声部合成器，它允许你同时触发多个音符：

::: code-group

```js
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now();
synth.triggerAttack("D4", now);
synth.triggerAttack("F4", now + 0.5);
synth.triggerAttack("A4", now + 1);
synth.triggerAttack("C5", now + 1.5);
synth.triggerAttack("E5", now + 2);
synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
```

:::

可以扩展这个例子来创建一个简易的钢琴效果。我们将添加多个按键,每个按键对应一个音符,并使用 `Tone.js` 的 `PolySynth` 来允许同时播放多个音符。下面是<imp-text-primary>钢琴效果示例（可交互）</imp-text-primary>：

<script setup>
import ExpUseTone from '../../../../components/example/exp-use-tone-js.vue'
</script>

<exp-use-tone/>

## 应用案例

`Tone.js` 可以用于多种应用场景，包括：

1. <imp-text-danger>音乐游戏</imp-text-danger>：开发音乐节奏游戏，玩家需要按照音乐的节奏点击屏幕。

2. <imp-text-danger>音乐可视化</imp-text-danger>：结合 `Tone.js` 和 `WebGL`，创建音乐可视化效果，让音乐的节奏和旋律通过视觉呈现。

3. <imp-text-danger>交互式音乐创作</imp-text-danger>：开发在线音乐创作工具，用户可以通过简单的拖拽和点击创作自己的音乐作品。

## 最佳实践

使用 `Tone.js` 时，建议：

1. <imp-text-danger>模块化设计</imp-text-danger>：将音乐逻辑和界面逻辑分离，便于维护和扩展。

2. <imp-text-danger>性能优化</imp-text-danger>：注意音频处理的性能，避免过多的实时音频处理导致浏览器卡顿。

3. <imp-text-danger>用户体验</imp-text-danger>：提供丰富的交互方式，让用户能够轻松地创作和控制音乐。
