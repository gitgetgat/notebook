# 重排 reflow（回流） 和 重绘 repaint？

<article-info/>

在页面的生命周期中，一些效果的交互都有可能发生重排（`Layout`）和重绘（`Painting`），这些都会使我们付出高额的性能代价。 浏览器从下载文件至本地到显示页面是个复杂的过程，这里包含了重绘和重排。通常来说，渲染引擎会解析 HTML 文档来构建 DOM 树，与此同时，渲染引擎也会用 CSS 解析器解析 CSS 文档构建 CSSOM 树。接下来，DOM 树和 CSSOM 树关联起来构成渲染树（`RenderTree`），这一过程称为`Attachment`。然后浏览器按照渲染树进行布局（`Layout`），最后一步通过绘制显示出整个页面。

![/30d0f1cf-5a43-ecec-6cbe-ed88e4c3cb1a.png](/30d0f1cf-5a43-ecec-6cbe-ed88e4c3cb1a.png)

其中重排和重绘是最耗时的部分，一旦触发重排，我们对 DOM 的修改引发了 DOM 几何元素的变化，渲染树需要重新计算， 而重绘只会改变`vidibility`、`outline`、背景色等属性导致样式的变化，使浏览器需要根据新的属性进行绘制。更比而言，重排会产生比重绘更大的开销。所以，我们在实际生产中要严格注意减少重排的触发。

## 什么是重排和重绘

浏览器下载完页面中的所有组件——HTML 标记、JavaScript、CSS、图片之后会解析生成两个内部数据结构——`DOM树`和`渲染树`。

DOM 树表示页面结构，渲染树表示 DOM 节点如何显示。DOM 树中的每一个需要显示的节点在渲染树种至少存在一个对应的节点（隐藏的 DOM 元素 disply 值为 none 在渲染树中没有对应的节点）。渲染树中的节点被称为“帧”或“盒"，符合 CSS 模型的定义，理解页面元素为一个具有填充，边距，边框和位置的盒子。一旦 DOM 和渲染树构建完成，浏览器就开始显示（绘制）页面元素。

当 DOM 的变化影响了元素的几何属性（宽或高），浏览器需要重新计算元素的几何属性，同样其他元素的几何属性和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。<imp-text-success>这个过程称为重排</imp-text-success>。完成重排后，浏览器会重新绘制受影响的部分到屏幕，<imp-text-success>该过程称为重绘</imp-text-success>。由于浏览器的流布局，对渲染树的计算通常只需要遍历一次就可以完成。但 table 及其内部元素除外，它可能需要多次计算才能确定好其在渲染树中节点的属性，通常要花 3 倍于同等元素的时间。这也是为什么我们要避免使用 table 做布局的一个原因。

并不是所有的 DOM 变化都会影响几何属性，比如改变一个元素的背景色并不会影响元素的宽和高，这种情况下只会发生重绘。

## 重排和重绘的代价究竟多大

重排和重绘的代价有多大？我们再回到前文那个过桥的例子上，细心的你可能会发现了，千倍的时间差并不是由于“过桥”一手造成的，每次“过桥”其实都伴随着重排和重绘，而耗能的绝大部分也正是在这里!

::: code-group

```jsx
var times = 15000;

// code1 每次过桥+重排+重绘
console.time(1);
for (var i = 0; i < times; i++) {
  document.getElementById("myDiv1").innerHTML += "a";
}
console.timeEnd(1);

// code2 只过桥
console.time(2);
var str = "";
for (var i = 0; i < times; i++) {
  var tmp = document.getElementById("myDiv2").innerHTML;
  str += "a";
}
document.getElementById("myDiv2").innerHTML = str;
console.timeEnd(2);

// code3
console.time(3);
var _str = "";
for (var i = 0; i < times; i++) {
  _str += "a";
}
document.getElementById("myDiv3").innerHTML = _str;
console.timeEnd(3);

// 1: 2874.619ms
// 2: 11.154ms
// 3: 1.282ms
```

:::

数据是不会撒谎的，看到了吧，多次访问 DOM（计时 2）对于重排和重绘（计时 1）来说，耗时简直不值一提了。

## 重排何时发生

很显然，每次重排，必然会导致重绘，那么，重排会在哪些情况下发生？

- 页面第一次渲染 在页面发生首次渲染的时候，所有组件都要进行首次布局，这是开销最大的一次重排。
- 浏览器窗口尺寸改变
- 元素位置和尺寸发生改变的时候
- 新增和删除可见 DOM 元素
- 内容发生改变（文字数量或图片大小等等）
- 元素字体大小变化。
- 激活 CSS 伪类（例如：`:hover`）。
- 设置 style 属性
- 查询某些属性或调用某些方法。比如说： `offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight`  除此之外，当我们调用`getComputedStyle`方法，或者 IE 里的`currentStyle`时，也会触发重排，原理是一样的，都为求一个“即时性”和“准确性”。

这些都是显而易见的，或许你已经有过这样的体会，不间断地改变浏览器窗口大小，导致 UI 反应迟钝（某些低版本 IE 下甚至直接挂掉），现在你可能恍然大悟，没错，正是一次次的重排重绘导致的！

## 重排何时发生

`vidibility`、`outline`、背景色等属性的改变

::: warning ⚠️ 注意
重绘不一定导致重排，但重排一定会导致重绘。
:::

## 渲染树变化的排队和刷新

思考下面代码：

::: code-group

```jsx
var ele = document.getElementById("myDiv");
ele.style.borderLeft = "1px";
ele.style.borderRight = "2px";
ele.style.padding = "5px";
```

:::

乍一想，元素的样式改变了三次，每次改变都会引起重排和重绘，所以总共有三次重排重绘过程，但是浏览器并不会这么笨，它会把三次修改“保存”起来（大多数浏览器通过队列化修改并批量执行来优化重排过程），一次完成！但是，有些时候你可能会（经常是不知不觉）强制刷新队列并要求计划任务立即执行。获取布局信息的操作会导致队列刷新，比如：

1. offsetTop, offsetLeft, offsetWidth, offsetHeight
2. scrollTop, scrollLeft, scrollWidth, scrollHeight
3. clientTop, clientLeft, clientWidth, clientHeight
4. getComputedStyle() (currentStyle in IE)

将上面的代码稍加修改：

::: code-group

```jsx
var ele = document.getElementById("myDiv");
ele.style.borderLeft = "1px";
ele.style.borderRight = "2px";

// here use offsetHeight
// ...
ele.style.padding = "5px";
```

:::

因为 offsetHeight 属性需要返回最新的布局信息，因此浏览器不得不执行渲染队列中的“待处理变化”并触发重排以返回正确的值（即使队列中改变的样式属性和想要获取的属性值并没有什么关系），所以上面的代码，前两次的操作会缓存在渲染队列中待处理，但是一旦 `offsetHeight` 属性被请求了，队列就会立即执行，所以总共有两次重排与重绘。所以 <imp-text-success>尽量不要在布局信息改变时做查询</imp-text-success>。

## 最小化重排和重绘

- 我们还是看上面的这段代码：

  ::: code-group

  ```jsx
  var ele = document.getElementById("myDiv");
  ele.style.borderLeft = "1px";
  ele.style.borderRight = "2px";
  ele.style.padding = "5px";
  ```

  :::

  三个样式属性被改变，每一个都会影响元素的几何结构，虽然大部分现代浏览器都做了优化，只会引起一次重排，但是像上文一样，如果一个及时的属性被请求，那么就会强制刷新队列，而且这段代码 <imp-text-success>四次</imp-text-success> 访问 DOM，一个很显然的优化策略就是把它们的操作合成一次，这样只会修改 DOM 一次：

  ::: code-group

  ```jsx
  var ele = document.getElementById("myDiv");

  // 1. 重写style
  ele.style.cssText = "border-left: 1px; border-right: 2px; padding: 5px;";

  // 2. add style
  ele.style.cssText += "border-;eft: 1px;";

  // 3. use class
  ele.className = "active";
  ```

  :::

- fragment 元素的应用
  看如下代码，考虑一个问题：

  ::: code-group

  ```jsx
  <ul id="fruit">
    <li> apple </li>
    <li> orange </li>
  </ul>
  ```

  :::

  如果代码中要添加内容为 peach、watermelon 两个选项，你会怎么做？

  ::: code-group

  ```jsx
  var lis = document.getElementById("fruit");
  var li = document.createElement("li");
  li.innerHTML = "apple";
  lis.appendChild(li);

  var li = document.createElement("li");
  li.innerHTML = "watermelon";
  lis.appendChild(li);
  ```

  :::

  很容易想到如上代码，但是很显然，重排了两次，怎么破？前面我们说了，隐藏的元素不在渲染树中，太棒了，我们可以先把 id 为 fruit 的 ul 元素隐藏（display=none)，然后添加 li 元素，最后再显示，<imp-text-success>但是实际操作中可能会出现闪动</imp-text-success>，原因这也很容易理解。这时，`fragment` 元素就有了用武之地了。

  ::: code-group

  ```jsx
  var fragment = document.createDocumentFragment();

  var li = document.createElement("li");
  li.innerHTML = "apple";
  fragment.appendChild(li);

  var li = document.createElement("li");
  li.innerHTML = "watermelon";
  fragment.appendChild(li);

  document.getElementById("fruit").appendChild(fragment);
  ```

  :::

  文档片段是个轻量级的 document 对象，它的设计初衷就是为了完成这类任务——更新和移动节点。文档片段的一个便利的语法特性是当你附加一个片断到节点时，实际上被添加的是该片断的子节点，而不是片断本身。只触发了一次重排，而且只访问了一次实时的 DOM。

- 让元素脱离动画流

  用展开/折叠的方式来显示和隐藏部分页面是一种常见的交互模式。它通常包括展开区域的几何动画，并将页面其他部分推向下方。

  一般来说，重排只影响渲染树中的一小部分，但也可能影响很大的部分，甚至整个渲染树。浏览器所需要重排的次数越少，应用程序的响应速度就越快。因此当页面顶部的一个动画推移页面整个余下的部分时，会导致一次代价昂贵的大规模重排，让用户感到页面一顿一顿的。渲染树中需要重新计算的节点越多，情况就会越糟。
  使用以下步骤可以避免页面中的大部分重排：

  1. 使用 <imp-text-success>绝对位置</imp-text-success> 定位页面上的动画元素，将其脱离文档流
  2. 让元素动起来。当它扩大时，会临时覆盖部分页面。但这只是页面一个小区域的重绘过程，不会产生重排并重绘页面的大部分内容。
  3. 当动画结束时恢复定位，从而只会下移一次文档的其他元素

- 缓存布局信息

  ::: code-group

  ```jsx
  // bad 强制刷新 触发两次重排
  div.style.left = div.offsetLeft + 1 + "px";
  div.style.top = div.offsetTop + 1 + "px";

  // good 缓存布局信息 相当于读写分离
  var curLeft = div.offsetLeft;
  var curTop = div.offsetTop;
  div.style.left = curLeft + 1 + "px";
  div.style.top = curTop + 1 + "px";
  ```

  :::

- 优化动画

  - 可以把动画效果应用到`position`属性为`absolute`或`fixed`的元素上，这样对其他元素影响较小动画效果还应牺牲一些平滑，来换取速度，这中间的度自己衡量：比如实现一个动画，以 1 个像素为单位移动这样最平滑，但是`Layout`就会过于频繁，大量消耗 CPU 资源，如果以 3 个像素为单位移动则会好很多。

  - 启用 GPU 加速 GPU 硬件加速是指应用 GPU 的图形性能对浏览器中的一些图形操作交给 GPU 来完成，因为 GPU 是专门为处理图形而设计，所以它在速度和能耗上更有效率。GPU 加速通常包括以下几个部分：Canvas2D，布局合成, CSS3 转换（`transition`），CSS3 3D 变换（`transform`），WebGL 和视频(`video`)。

    ::: code-group

    ```jsx
    /** 根据上面的结论
    	* 将 2d transform 换成 3d
    	* 就可以强制开启 GPU 加速
    	* 提高动画性能
    	*/
    div { transform: translate3d(10px, 10px, 0); }
    ```

    :::

    ::: tip 为什么 transform 的效率高？

    1. transform 是合成属性，浏览器会为元素创建一个独立的复合层，当元素内容没有发生变化，该层不会被重绘，通过重新复合来创建动画。

    2. 因为 transform 既不会影响布局也不会影响绘制指令，它影响的只是渲染流程的最后一个 `「draw」` 阶段

    由于 `「draw」` 阶段在合成线程中，所以 transform 的变化几乎不会影响渲染主线程。反之，渲染主线程无论如何忙碌，也不会影响 transform 的变化。

    :::

## 浏览器渲染的流程理解重排和重绘

### 什么是 reflow？

reflow 的本质就是重新计算 layout 树。

当进行了会影响布局树的操作后，需要重新计算布局树，会引发 layout。

为了避免连续的多次操作导致布局树反复计算，浏览器会合并这些操作，当 JS 代码全部完成后再进行统一计算。所以，改动属性造成的 reflow 是异步完成的。

也同样因为如此，当 JS 获取布局属性时，就可能造成无法获取到最新的布局信息。

浏览器在反复权衡下，最终决定获取属性立即 reflow。

![/8e1fb99b-7bf8-47ab-ef03-dad3a246580c.png](/8e1fb99b-7bf8-47ab-ef03-dad3a246580c.png)

### 什么是 repaint？

repaint 的本质就是重新根据分层信息计算了绘制指令。

当改动了可见样式后，就需要重新计算，会引发 repaint。

由于元素的布局信息也属于可见样式，所以 reflow 一定会引起 repaint。

![/14aa93f4-a9d0-5bad-766d-147967947e48.png](/14aa93f4-a9d0-5bad-766d-147967947e48.png)
