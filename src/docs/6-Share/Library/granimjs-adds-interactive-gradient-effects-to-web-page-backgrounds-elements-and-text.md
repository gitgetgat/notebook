# granim.js 给网页背景 元素 文字添加交互式的渐变效果

<article-info/>

<link-tag :linkList="[{ linkType: 'git', linkText:'granim.js',linkUrl:'https://github.com/sarcadass/granim.js'},{ linkText:'granim.js 官网',linkUrl:'https://sarcadass.github.io/granim.js/index.html'}]" />

![/1d987a7c-45ad-912b-b38f-c675ce48d478.gif](/1d987a7c-45ad-912b-b38f-c675ce48d478.gif)

## `granim.js` 是什么？

`granim.js` 是一个开源 `JavaScript` 库，专门用于创建流畅和交互式的渐变动画。这些动画可以作为网页的背景，也可以给其他元素添加渐变动画，如按钮或滑块的视觉反馈。还可以为文字加上渐变效果，为用户带来视觉上的吸引力。

## 使用方法

### 安装

首先，你需要通过 `npm` 或 `yarn` 或 `CDN` 安装 `Fingerprintjs`：

::: code-group

```bash [npm]
npm install granim --save
```

```bash [bower]
bower install granim
```

:::

### 示例

#### 基础渐变动画

![/94fb0cd1-eae2-3041-e840-71789d1a1a2f.gif](/94fb0cd1-eae2-3041-e840-71789d1a1a2f.gif)

::: code-group

```js
var granimInstance = new Granim({
  element: "#canvas-basic",
  direction: "diagonal",
  isPausedWhenNotInView: true,
  states: {
    "default-state": {
      gradients: [
        ["#ff9966", "#ff5e62"],
        ["#00F260", "#0575E6"],
        ["#e1eec3", "#f05053"]
      ]
    }
  }
});
```

:::

#### 复杂渐变动画

![/d7f5c547-6f80-56b5-09d2-6b624e038949.gif](/d7f5c547-6f80-56b5-09d2-6b624e038949.gif)

::: code-group

```js
var granimInstance = new Granim({
  element: "#canvas-complex",
  direction: "left-right",
  isPausedWhenNotInView: true,
  states: {
    "default-state": {
      gradients: [
        [
          { color: "#833ab4", pos: 0.2 },
          { color: "#fd1d1d", pos: 0.8 },
          { color: "#38ef7d", pos: 1 }
        ],
        [
          { color: "#40e0d0", pos: 0 },
          { color: "#ff8c00", pos: 0.2 },
          { color: "#ff0080", pos: 0.75 }
        ]
      ]
    }
  }
});
```

:::

#### 带图像和混合模式的渐变动画

![/4798c311-218e-7535-04e9-36855c7cec72.gif](/4798c311-218e-7535-04e9-36855c7cec72.gif)

::: code-group

```js
var granimInstance = new Granim({
    element: '#canvas-image-blending',
    direction: 'top-bottom',
    isPausedWhenNotInView: true,
    image : {
        source: '../assets/img/bg-forest.jpg',
        blendingMode: 'multiply'
    },
    states : {
        "default-state": {
            gradients: [
                ['#29323c', '#485563'],
                ['#FF6B6B', '#556270'],
                ['#80d3fe', '#7ea0c4'],
                ['#f0ab51', '#eceba3']
            ],
            transitionSpeed: 7000
        }
    }
}
```

:::

#### 文字图像蒙层渐变

![/07e884d2-1d1d-0f2f-6968-53936faf89bf.gif](/07e884d2-1d1d-0f2f-6968-53936faf89bf.gif)

::: code-group

```js
var granimInstance = new Granim({
  element: "#logo-canvas",
  direction: "left-right",
  states: {
    "default-state": {
      gradients: [
        ["#EB3349", "#F45C43"],
        ["#FF8008", "#FFC837"],
        ["#4CB8C4", "#3CD3AD"],
        ["#24C6DC", "#514A9D"],
        ["#FF512F", "#DD2476"],
        ["#DA22FF", "#9733EE"]
      ],
      transitionSpeed: 2000
    }
  }
});
```

:::

## API 介绍

### 选项 (Options)

- <imp-text-danger>element (必需)</imp-text-danger>: 指定用于渐变动画的 `canvas` 元素的 `CSS` 选择器或 `HTMLCanvasElement`。
- <imp-text-danger>name</imp-text-danger>: 用于设置深色/浅色主题的类名前缀。
- <imp-text-danger>elToSetClassOn</imp-text-danger>: 设置深色/浅色类名的元素。
- <imp-text-danger>direction</imp-text-danger>: 渐变的方向，可选项包括 `'diagonal'`、`'left-right'`、`'top-bottom'`、`'radial'` 或 `'custom'`。
- <imp-text-danger>customDirection</imp-text-danger>: 自定义渐变方向的对象。
- <imp-text-danger>isPausedWhenNotInView</imp-text-danger>: 当动画不在视窗内时是否暂停。
- <imp-text-danger>scrollDebounceThreshold</imp-text-danger>: 滚动时的防抖阈值。
- <imp-text-danger>stateTransitionSpeed</imp-text-danger>: 状态转换的动画时长。
- <imp-text-danger>defaultStateName</imp-text-danger>: 默认状态的名称。
- <imp-text-danger>states (必需)</imp-text-danger>: 包含所有状态的对象。
- <imp-text-danger>image</imp-text-danger>: 包含图像选项的对象。

### 状态 (States)

- <imp-text-danger>gradients (必需)</imp-text-danger>: 定义渐变颜色和位置的数组。
- <imp-text-danger>transitionSpeed</imp-text-danger>: 每个渐变之间的过渡时长。
- <imp-text-danger>loop</imp-text-danger>: 动画到达最后一个渐变后是否循环。

### 图像 (Image)

- <imp-text-danger>source (必需)</imp-text-danger>: 图像的源地址。
- <imp-text-danger>position</imp-text-danger>: 图像在 `canvas` 中的位置。
- <imp-text-danger>stretchMode</imp-text-danger>: 图像是否拉伸以适应大小。
- <imp-text-danger>blendingMode</imp-text-danger>: 图像与渐变的混合模式。

### 回调函数 (Callbacks)

- <imp-text-danger>onStart</imp-text-danger>: 动画开始时触发。
- <imp-text-danger>onGradientChange</imp-text-danger>: 渐变变化时触发。
- <imp-text-danger>onEnd</imp-text-danger>: 动画结束时触发。

### 事件 (Emitted Events)

- <imp-text-danger>监听关键事件</imp-text-danger>：如 `'granim:start'`、`'granim:end'`、`'granim:loop'` 和 `'granim:gradientChange'`。

### 方法 (Methods)

- <imp-text-danger>play()</imp-text-danger>: 播放动画。
- <imp-text-danger>pause()</imp-text-danger>: 暂停动画。
- <imp-text-danger>clear()</imp-text-danger>: 停止动画并清除渐变。
- <imp-text-danger>changeState(stateName)</imp-text-danger>: 更改状态。
- <imp-text-danger>changeDirection(directionName)</imp-text-danger>: 更改方向。
- <imp-text-danger>changeBlendingMode(blendingModeName)</imp-text-danger>: 更改混合模式。
- <imp-text-danger>destroy()</imp-text-danger>: 销毁实例并移除事件监听器。
