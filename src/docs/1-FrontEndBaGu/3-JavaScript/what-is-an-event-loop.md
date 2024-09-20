# 什么是事件循环(Event Loop)？什么是宏任务和微任务（旧版）？

<article-info/>

## 先看面试题

::: info 💭 如何理解 JS 的异步
JS 是⼀⻔单线程的语⾔，这是因为它运⾏在浏览器的渲染主线程中，⽽渲染主线程只有⼀个。

⽽渲染主线程承担着诸多的⼯作，渲染⻚⾯、执⾏ JS 都在其中运⾏。如果使⽤同步的⽅式，就极有可能导致主线程产⽣阻塞，从⽽导致消息队列中的很多其他任务⽆法得到执⾏。这样⼀来，⼀⽅⾯会导致繁忙的主线程⽩⽩的消耗时间，另⼀⽅⾯导致⻚⾯⽆法及时更新，给⽤户造成卡死现象。

所以浏览器采⽤异步的⽅式来避免。具体做法是当某些任务发⽣时，⽐如计时器、⽹络、事件监听，主线程将任务交给其他线程去处理，⾃身⽴即结束任务的执⾏，转⽽执⾏后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加⼊到消息队列的末尾排队，等待主线程调度执⾏。

在这种异步模式下，浏览器永不阻塞，从⽽最⼤限度的保证了单线程的流畅运⾏。
:::

::: info 💭 阐述⼀下 JS 的事件循环
事件循环⼜叫做消息循环，是浏览器渲染主线程的⼯作⽅式。

在 Chrome 的源码中，它开启⼀个不会结束的 for 循环，每次循环从消息队列中取出第⼀个任务执⾏，⽽其他线程只需要在合适的时候将任务加⼊到队列末尾即可。

过去把消息队列简单分为宏队列和微队列，这种说法⽬前已⽆法满⾜复杂的浏览器环境，取⽽代之的是⼀种更加灵活多变的处理⽅式。

根据 W3C 官⽅的解释，每个任务有不同的类型，同类型的任务必须在同⼀个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在⼀次事件循环中，由浏览器⾃⾏决定取哪⼀个队列的任务。但浏览器必须有⼀个微队列，微队列的任务⼀定具有最⾼的优先级，必须优先调度执⾏。
:::

::: info 💭 JS 中的计时器能做到精确计时吗？为什么？

不⾏，因为：

1. 计算机硬件没有原⼦钟，⽆法做到精确计时
2. 操作系统的计时函数本身就有少量偏差，由于 JS 的计时器最终调⽤的是操作系统的函数，也就携带了这些偏差
3. 按照 W3C 的标准，浏览器实现计时器时，如果嵌套层级超过 5 层，则会带有 4 毫秒的最少时间，这样在计时时间少于 4 毫秒时⼜带来了偏差
4. 受事件循环的影响，计时器的回调函数只能在主线程空闲时运⾏，因此⼜带来了偏差

:::

## 浏览器的进程模型

### 何为进程？

程序运⾏需要有它⾃⼰专属的内存空间，可以把这块内存空间简单的理解为进程

![/3e8d80e6-508d-0751-a6cb-e66975439aee.png](/3e8d80e6-508d-0751-a6cb-e66975439aee.png)

每个应⽤⾄少有⼀个进程，进程之间相互独⽴，即使要通信，也需要双⽅同意。

### 何为线程？

有了进程后，就可以运⾏程序的代码了。

运⾏代码的「⼈」称之为「线程」。

⼀个进程⾄少有⼀个线程，所以在进程开启后会⾃动创建⼀个线程来运⾏代码，该线程称之为主线程。

如果程序需要同时执⾏多块代码，主线程就会启动更多的线程来执⾏代码，所以⼀个进程中可以包含多个线程。

![/d8a61af0-4086-9f59-333d-052e3dcc1284.png](/d8a61af0-4086-9f59-333d-052e3dcc1284.png)

## 浏览器有哪些进程和线程？

<imp-text-warning>浏览器是⼀个多进程多线程的应⽤程序</imp-text-warning>

浏览器内部⼯作极其复杂。

为了避免相互影响，为了减少连环崩溃的⼏率，当启动浏览器后，它会⾃动启动多个进程。

![/5248a6c3-70da-4b2c-810b-82c966e59602.png](/5248a6c3-70da-4b2c-810b-82c966e59602.png)

::: tip
可以在浏览器的任务管理器中查看当前的所有进程
:::

其中，最主要的进程有：

1. 浏览器进程

   主要负责界⾯显示、⽤户交互、⼦进程管理等。浏览器进程内部会启动多个线程处理不同的任务。

2. ⽹络进程

   负责加载⽹络资源。⽹络进程内部会启动多个线程来处理不同的⽹络任务。

3. <imp-text-warning>渲染进程</imp-text-warning>（本节重点讲解的进程）

   渲染进程启动后，会开启⼀个 <imp-text-danger>渲染主线程</imp-text-danger>，主线程负责执⾏ HTML、CSS、JS 代码。

   默认情况下，浏览器会为每个<imp-text-primary>标签⻚</imp-text-primary>开启⼀个新的渲染进程，以保证不同的标签⻚之间不相互影响。

   ::: tip

   将来该默认模式可能会有所改变，有兴趣的同学可参⻅ <link-tag :linkList="[{ linkText:'chrome 官⽅说明⽂档',linkUrl:'https://chromium.googlesource.com/chromium/src/+/main/docs/process_model_and_site_isolation.md#Modes-and-Availability'}]" />

   :::

### **渲染主线程是如何⼯作的？**

渲染主线程是浏览器中最繁忙的线程，需要它处理的任务包括但不限于：

- 解析 HTML
- 解析 CSS
- 计算样式
- 布局
- 处理图层
- 每秒把⻚⾯画 60 次
- 执⾏全局 JS 代码
- 执⾏事件处理函数
- 执⾏计时器的回调函数
- ......

要处理这么多的任务，主线程遇到了⼀个前所未有的难题：如何调度任务？

⽐如：

- 我正在执⾏⼀个 JS 函数，执⾏到⼀半的时候⽤户点击了按钮，我该⽴即去执⾏点击事件的处理函数吗？
- 我正在执⾏⼀个 JS 函数，执⾏到⼀半的时候某个计时器到达了时间，我该⽴即去执⾏它的回调吗？
- 浏览器进程通知我“⽤户点击了按钮”，与此同时，某个计时器也到达了时间，我应该处理哪⼀个呢？
- ......

渲染主线程想出了⼀个绝妙的主意来处理这个问题：排队

![/de023c92-04ae-9754-9620-704b9e3fc323.png](/de023c92-04ae-9754-9620-704b9e3fc323.png)

1. 在最开始的时候，渲染主线程会进⼊⼀个⽆限循环
2. 每⼀次循环会检查消息队列中是否有任务存在。如果有，就取出第⼀个任务执⾏，执⾏完⼀个后进⼊下⼀次循环；如果没有，则进⼊休眠状态。
3. 其他所有线程（包括其他进程的线程）可以随时向消息队列添加任务。新任务会加到消息队列的末尾。在添加新任务时，如果主线程是休眠状态，则会将其唤醒以继续循环拿取任务

这样⼀来，就可以让每个任务有条不紊的、持续的进⾏下去了。

<imp-text-warning>整个过程，被称之为事件循环 Event Loop（消息循环 Message Loop）</imp-text-warning>

## 浏览器 JS 异步执行的原理

代码在执⾏过程中，会遇到⼀些⽆法⽴即处理的任务，⽐如：

- 计时完成后需要执⾏的任务 —— `setTimeout` 、 `setInterval`
- ⽹络通信完成后需要执⾏的任务 —— `XHR` 、 `Fetch`
- ⽤户操作后需要执⾏的任务 ——`addEventListener`

以 Chrome 为例，浏览器不仅有多个进程，还有多个线程，如`渲染进程`、`GPU 进程`和`插件进程`等。<imp-text-warning>而每个 tab 标签页都是一个独立的渲染进程</imp-text-warning>，所以一个 tab 异常崩溃后，其他 tab 基本不会被影响。<imp-text-warning>作为前端开发者，主要重点关注其渲染进程，渲染进程下包含了 JS 引擎线程、HTTP 请求线程和定时器线程等，这些线程为 JS 在浏览器中完成异步任务提供了基础。</imp-text-warning>

![/b8bca05a-f1b3-93c2-9794-e447887bf064.png](/b8bca05a-f1b3-93c2-9794-e447887bf064.png)

如果让渲染主线程等待这些任务的时机达到，就会导致主线程⻓期处于「阻塞」的状态，从⽽导致浏览器「卡死」

![/c1a7c533-b9bf-643c-1180-7847d3170f97.png](/c1a7c533-b9bf-643c-1180-7847d3170f97.png)

<imp-text-warning>渲染主线程承担着极其重要的⼯作，⽆论如何都不能阻塞！</imp-text-warning>

因此，浏览器选择<imp-text-success>异步</imp-text-success>来解决这个问题

![/a1571e8b-f819-6c92-4c0b-f67adeef961e.png](/a1571e8b-f819-6c92-4c0b-f67adeef961e.png)

使⽤异步的⽅式，<imp-text-warning>渲染主线程永不阻塞</imp-text-warning>

## JS 为何会阻碍渲染？

先看代码

::: code-group

```js
<h1>Mr.Yuan is awesome!</h1>
<button>change</button>
<script>
	var h1 = document.querySelector('h1');
	var btn = document.querySelector('button');
	// 死循环指定的时间
	function delay(duration) {
		var start = Date.now();
		while (Date.now() - start < duration) {}
	}
	btn.onclick = function () {
		h1.textContent = '袁⽼师很帅！';
		delay(3000);
	};
</script>
```

:::

上述代码，点击按钮后，会先改变文本内容，但是不会先渲染，会死循环 3 秒，然后再渲染

## 任务有优先级吗？

任务没有优先级，在消息队列中 <imp-text-warning>先进先出</imp-text-warning>

但 <imp-text-warning>消息队列是有优先级的</imp-text-warning>

根据 W3C 的最新解释:

- 每个任务都有⼀个任务类型，同⼀个类型的任务必须在⼀个队列，不同类型的任务可以分属于不同的队列。
  在⼀次事件循环中，浏览器可以根据实际情况从不同的队列中取出任务执⾏。
- 浏览器必须准备好⼀个`微队列`，`微队列`中的任务优先所有其他任务执⾏

  https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint

  ::: tip
  随着浏览器的复杂度急剧提升，W3C 不再使⽤宏队列的说法
  :::

在⽬前 chrome 的实现中，⾄少包含了下⾯的队列：

- 延时队列：⽤于存放计时器到达后的回调任务，优先级「中」
- 交互队列：⽤于存放⽤户操作后产⽣的事件处理任务，优先级「⾼」
- 微队列：⽤户存放需要最快执⾏的任务，优先级「最⾼」
- 浏览器还有很多其他的队列，由于和我们开发关系不⼤，不作考虑 …

  ::: tip
  添加任务到微队列的主要⽅式主要是使⽤ `Promise`、`MutationObserver`

  ::: code-group

  ```js
  // ⽴即把⼀个函数添加到微队列
  Promise.resolve().then(函数);
  ```

  :::

## 事件驱动浅析

浏览器异步任务的执行原理背后其实是一套事件驱动的机制。事件触发、任务选择和任务执行都是由事件驱动机制来完成的。`NodeJS` 和 `浏览器` 的设计都是基于事件驱动的，简而言之就是由特定的事件来触发特定的任务，这里的事件可以是用户的操作触发的，如 click 事件；也可以是程序自动触发的，比如浏览器中定时器线程在计时结束后会触发定时器事件。而本文的主题内容 <imp-text-warning>事件循环其实就是在事件驱动模式中来管理和执行事件的一套流程</imp-text-warning>。

以一个简单场景为例，假设游戏界面上有一个移动按钮和人物模型，每次点击右移后，人物模型的位置需要重新渲染，右移 1 像素。根据渲染时机的不同我们可以用不同的方式来实现。

![/e05673dc-0502-3754-47a4-cc3de5e78b05.png](/e05673dc-0502-3754-47a4-cc3de5e78b05.png)

<imp-text-warning>实现方式一：事件驱动。</imp-text-warning>点击按钮后，修改坐标 positionX 时，立即触发界面渲染的事件，触发重新渲染。

<imp-text-warning>实现方式二：状态驱动或数据驱动。</imp-text-warning>点击按钮后，只修改坐标 positionX，不触发界面渲染。在此之前会启动一个定时器 setInterval，或者利用 requestAnimationFrame 来不断地检测 positionX 是否有变化。如果有变化，则立即重新渲染。

浏览器中的点击事件处理也是典型的基于事件驱动。在事件驱动中，当有事件触发后，被触发的事件会按顺序暂时存在一个队列中，待 JS 的同步任务执行完成后，会从这个队列中取出要处理的事件并进行处理。那么具体什么时候取任务、优先取哪些任务，这就由事件循环流程来控制了。

## 浏览器中的事件循环

### 执行栈与任务队列

JS 在解析一段代码时，会将同步代码按顺序排在某个地方，即`执行栈`，然后依次执行里面的函数。当遇到异步任务时就交给其他线程处理，待当前执行栈所有同步代码执行完成后，会从一个队列中去取出已完成的异步任务的回调加入执行栈继续执行，遇到异步任务时又交给其他线程，.....，如此循环往复。而其他异步任务完成后，将回调放入任务队列中待执行栈来取出执行。
<imp-text-warning>JS 按顺序执行执行栈中的方法，每次执行一个方法时，会为这个方法生成独有的执行环境（上下文 context），待这个方法执行完成后，销毁当前的执行环境，并从栈中弹出此方法（即消费完成），然后继续下一个方法。</imp-text-warning>
![/3a14db80-597a-c5fb-eb70-b484f3b53858.png](/3a14db80-597a-c5fb-eb70-b484f3b53858.png)

可见，在事件驱动的模式下，至少包含了一个执行循环来检测任务队列是否有新的任务。<imp-text-warning>通过不断循环去取出异步回调来执行，这个过程就是 `事件循环` ，而每一次循环就是一个事件周期或称为一次 tick。</imp-text-warning>

### <imp-text-danger>宏任务和微任务（旧版；由于现在浏览器复杂度提升，这种简单的分类已经不能适应了）</imp-text-danger>

任务队列不只一个，根据任务的种类不同，可以分为`微任务（micro task）队列`和`宏任务（macro task）队列`。

<imp-text-warning>事件循环的过程中，执行栈在同步代码执行完成后，优先检查微任务队列是否有任务需要执行，如果没有，再去宏任务队列检查是否有任务执行，如此往复。微任务一般在当前循环就会优先执行，而宏任务会等到下一次循环，因此，微任务一般比宏任务先执行，并且微任务队列只有一个，宏任务队列可能有多个。</imp-text-warning>另外我们常见的点击和键盘等事件也属于宏任务。
下面我们看一下常见宏任务和常见微任务。

#### 常见宏任务

- `setTimeout()`
- `setInterval()`
- `DOM 事件`
- `AJAX 请求`
- <imp-text-warning>DOM 渲染（比较特别，可能既不属于微任务也不属于红任务，执行顺序：微任务 > DOM 渲染 > 宏任务）</imp-text-warning>
- `setImmediate()`

#### 常见微任务

- `promise.then()`、`promise.catch()`
- `async/await`
- `new MutaionObserver()`

  MutationObserver API 让我们能监听 DOM 树变化，该 API 设计用来替换掉在 DOM 3 事件规范中引入的 Mutation events。
  Mutation events 是同步触发的，每次变动都会触发一次调用。 MutationObserver API 是异步触发的， DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。所以 MutationObserver 相比 Mutation events 性能要更高。

- `process.nextTick()`

::: code-group

```js
console.log("同步代码1");
setTimeout(() => {
  console.log("setTimeout");
}, 0);
new Promise((resolve) => {
  console.log("同步代码2");
  resolve();
}).then(() => {
  console.log("promise.then");
});
console.log("同步代码3");
// 最终输出 "同步代码1"、"同步代码2"、"同步代码3"、"promise.then"、"setTimeout"
```

:::

上面的代码将按如下顺序输出为："同步代码 1"、"同步代码 2"、"同步代码 3"、"promise.then"、"setTimeout"，具体分析如下。

::: warning
_顺便提一下，在浏览器中 setTimeout 的延时设置为 0 的话，会默认为 4ms，NodeJS 为 1ms。具体值可能不固定，但不是为 0。_
:::

::: info
（1）setTimeout 回调和 promise.then 都是异步执行的，将在所有同步代码之后执行；

（2）虽然 promise.then 写在后面，但是执行顺序却比 setTimeout 优先，因为它是微任务；

3）new Promise 是同步执行的，promise.then 里面的回调才是异步的。

下面我们看一下上面代码的执行过程演示：

<custom-player :src="'/d2107ad6-f5c0-11eb-a6b8-fe2d7343ba6d.mp4'"/>

也有人这样去理解：微任务是在当前事件循环的尾部去执行；宏任务是在下一次事件循环的开始去执行。我们来看看微任务和宏任务的本质区别是什么。

我们已经知道，JS 遇到异步任务时会将此任务交给其他线程去处理，自己的主线程继续往后执行同步任务。比如 `setTimeout` 的计时会由浏览器的`定时器线程`来处理，待计时结束，就将定时器回调任务放入任务队列等待主线程来取出执行。前面我们提到，因为 JS 是单线程执行的，所以要执行异步任务，就需要浏览器其他线程来辅助，`即多线程是 JS 异步任务的一个明显特征`。

我们再来分析下 promise.then（微任务）的处理。当执行到 promise.then 时，V8 引擎不会将异步任务交给浏览器其他线程，而是将回调存在自己的一个队列中，待当前执行栈执行完成后，立马去执行 promise.then 存放的队列，promise.then 微任务没有多线程参与，甚至从某些角度说，微任务都不能完全算是异步，它只是将书写时的代码修改了执行顺序而已。

setTimeout 有“定时等待”这个任务，需要定时器线程执行；ajax 请求有“发送请求”这个任务，需要 `HTTP 线程`执行，而 promise.then 它没有任何异步任务需要其他线程执行，它只有回调，即使有，也只是内部嵌套的另一个宏任务。

:::

简单小结一下微任务和宏任务的本质区别。

- <imp-text-warning>宏任务特征</imp-text-warning>：有明确的异步任务需要执行和回调；需要其他异步线程支持。
- <imp-text-warning>微任务特征</imp-text-warning>：没有明确的异步任务需要执行，只有回调；不需要其他异步线程支持。

- <imp-text-warning>定时器误差</imp-text-warning>

  事件循环中，总是先执行同步代码后，才会去任务队列中取出异步回调来执行。当执行 `setTimeout` 时，浏览器启动新的线程去计时，计时结束后触发定时器事件将回调存入宏任务队列，等待 JS 主线程来取出执行。如果这时主线程还在执行同步任务的过程中，那么此时的宏任务就只有先挂起，这就造成了计时器不准确的问题。同步代码耗时越长，计时器的误差就越大。不仅同步代码，由于微任务会优先执行，所以微任务也会影响计时，假设同步代码中有一个死循环或者微任务中递归不断在启动其他微任务，那么宏任务里面的代码可能永远得不到执行。所以主线程代码的执行效率提升是一件很重要的事情。

  ![/63d689f6-0a85-6c74-6bf1-32f19962560b.png](/63d689f6-0a85-6c74-6bf1-32f19962560b.png)

  一个很简单的场景就是我们界面上有一个时钟精确到秒，每秒更新一次时间。你会发现有时候秒数会直接跳过 2 秒间隔，就是这个原因。

- <imp-text-warning>视图更新渲染</imp-text-warning>

  微任务队列执行完成后，也就是一次事件循环结束后，浏览器会执行视图渲染，当然这里会有浏览器的优化，可能会合并多次循环的结果做一次视图重绘，因此视图更新是在事件循环之后，所以并不是每一次操作 Dom 都一定会立马刷新视图。视图重绘之前会先执行 requestAnimationFrame 回调，那么对于 requestAnimationFrame 是微任务还是宏任务是有争议的，在这里看来，它应该既不属于微任务，也不属于宏任务。

## NodeJS 中的事件循环

JS 引擎本身不实现事件循环机制，这是由它的宿主实现的，浏览器中的事件循环主要是由浏览器来实现，而在 NodeJS 中也有自己的事件循环实现。NodeJS 中也是循环 + 任务队列的流程以及微任务优先于宏任务，大致表现和浏览器是一致的。不过它与浏览器中也有一些差异，并且新增了一些任务类型和任务阶段。接下来我们介绍下 NodeJS 中的事件循环流程。

### NodeJS 中的异步方法

因为都是基于 V8 引擎，浏览器中包含的异步方式在 NodeJS 中也是一样的。另外 NodeJS 中还有一些其他常见异步形式。

- `文件 I/O`：异步加载本地文件。
- `setImmediate()`：与 setTimeout 设置 0ms 类似，在某些同步任务完成后立马执行。
- `process.nextTick()`：在某些同步任务完成后立马执行。
- `server.close、socket.on('close',...）等：关闭回调`。

  想象一下，如果上面的形式和 setTimeout、promise 等同时存在，如何分析出代码的执行顺序呢？只要我们理解了 NodeJS 的事件循环机制，也就清楚了。

#### <imp-text-warning>事件循环模型</imp-text-warning>

`NodeJS` 的跨平台能力和事件循环机制都是基于 `Libuv 库` 实现的，你不用关心这个库的具体内容。我们只需要知道 `Libuv` 库是事件驱动的，并且封装和统一了不同平台的 API 实现。

`NodeJS` 中 `V8` 引擎将 JS 代码解析后调用 `Node API`，然后 `Node API` 将任务交给 `Libuv` 去分配，最后再将执行结果返回给 `V8` 引擎。在 Libux 中实现了一套事件循环流程来管理这些任务的执行，<imp-text-warning>所以 `NodeJS` 的事件循环主要是在 `Libuv` 中完成的。</imp-text-warning>

![/a14b687b-b2ad-c5f7-0596-fb4a0d19ea55.png](/a14b687b-b2ad-c5f7-0596-fb4a0d19ea55.png)

下面我们来看看 `Libuv` 中的循环是怎样的。

#### <imp-text-warning>事件循环各阶段</imp-text-warning>

在 `NodeJS` 中 `JS` 的执行，我们主要需要关心的过程分为以下几个阶段，下面每个阶段都有自己单独的任务队列，当执行到对应阶段时，就判断当前阶段的任务队列是否有需要处理的任务。

- <imp-text-success>timers 阶段</imp-text-success>：执行所有 setTimeout() 和 setInterval() 的回调。
- <imp-text-success>pending callbacks 阶段</imp-text-success>：某些系统操作的回调，如 TCP 链接错误。除了 timers、close、setImmediate 的其他大部分回调在此阶段执行。
- <imp-text-success>poll 阶段</imp-text-success>：轮询等待新的链接和请求等事件，执行 I/O 回调等。V8 引擎将 JS 代码解析并传入 Libuv 引擎后首先进入此阶段。如果此阶段任务队列已经执行完了，则进入 check 阶段执行 `setImmediate` 回调（如果有 `setImmediate`），或等待新的任务进来（如果没有 `setImmediate`）。在等待新的任务时，如果有 `timers` 计时到期，则会直接进入 `timers` 阶段。此阶段可能会阻塞等待。

- <imp-text-success>check 阶段</imp-text-success>：setImmediate 回调函数执行。
- <imp-text-success>close callbacks 阶段</imp-text-success>：关闭回调执行，如 socket.on('close', ...)。

  ![/440d3e8b-2e4e-aa67-8fe6-0efe6148d31a.png](/440d3e8b-2e4e-aa67-8fe6-0efe6148d31a.png)

  <imp-text-warning>上面每个阶段都会去执行完当前阶段的任务队列，然后继续执行当前阶段的微任务队列，只有当前阶段所有微任务都执行完了，才会进入下个阶段。</imp-text-warning>这里也是与浏览器中逻辑差异较大的地方，不过浏览器不用区分这些阶段，也少了很多异步操作类型，所以不用刻意去区分两者区别。代码如下所示：

::: code-group

```js
const fs = require("fs");
fs.readFile(__filename, (data) => {
  // poll(I/O 回调) 阶段
  console.log("readFile");
  Promise.resolve().then(() => {
    console.error("promise1");
  });
  Promise.resolve().then(() => {
    console.error("promise2");
  });
});
setTimeout(() => {
  // timers 阶段
  console.log("timeout");
  Promise.resolve().then(() => {
    console.error("promise3");
  });
  Promise.resolve().then(() => {
    console.error("promise4");
  });
}, 0);
// 下面代码只是为了同步阻塞1秒钟，确保上面的异步任务已经准备好了
var startTime = new Date().getTime();
var endTime = startTime;
while (endTime - startTime < 1000) {
  endTime = new Date().getTime();
}
// 最终输出 timeout promise3 promise4 readFile promise1 promise2
```

:::

另一个与浏览器的差异还体现在同一个阶段里的不同任务执行，在 `timers` 阶段里面的宏任务、微任务测试代码如下所示：

::: code-group

```js
setTimeout(() => {
  console.log("timeout1");
  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);
setTimeout(() => {
  console.log("timeout2");
  Promise.resolve().then(function () {
    console.log("promise2");
  });
}, 0);
```

:::

- 浏览器中运行每次宏任务完成后都会优先处理微任务，输出“timeout1”、“promise1”、“timeout2”、“promise2”。
- NodeJS 中运行因为输出 timeout1 时，当前正处于 <imp-text-warning>timers 阶段</imp-text-warning>，所以会先将所有 timer 回调执行完之后再执行微任务队列，即输出“timeout1”、“timeout2”、“promise1”、“promise2”。
  ::: warning
  _上面的差异可以用浏览器和 NodeJS 10 对比验证。是不是感觉有点反程序员？因此 NodeJS 在版本 11 之后，就修改了此处逻辑使其与浏览器尽量一致，也就是每个 timer 执行后都先去检查一下微任务队列，所以 NodeJS 11 之后的输出已经和浏览器一致了。_
  :::

#### <imp-text-warning>nextTick、setImmediate 和 setTimeout</imp-text-warning>

实际项目中我们常用 Promise 或者 setTimeout 来做一些需要延时的任务，比如一些耗时计算或者日志上传等，目的是不希望它的执行占用主线程的时间或者需要依赖整个同步代码执行完成后的结果。
NodeJS 中的 process.nextTick() 和 setImmediate() 也有类似效果。<imp-text-warning>其中 setImmediate() 我们前面已经讲了是在 check 阶段执行的，而 process.nextTick() 的执行时机不太一样，它比 promise.then() 的执行还早，在同步任务之后，其他所有异步任务之前，会优先执行 nextTick。</imp-text-warning>可以想象是把 nextTick 的任务放到了当前循环的后面，与 promise.then() 类似，但比 promise.then() 更前面。意思就是在当前同步代码执行完成后，不管其他异步任务，先尽快执行 nextTick。如下面的代码，因此这里的 nextTick 其实应该更符合“setImmediate”这个命名才对。

::: code-group

```js
setTimeout(() => {
  console.log("timeout");
}, 0);
Promise.resolve().then(() => {
  console.error("promise");
});
process.nextTick(() => {
  console.error("nextTick");
});
// 输出：nextTick、promise、timeout
```

:::

接下来我们再来看看 setImmediate 和 setTimeout，它们是属于不同的执行阶段了，分别是 timers 阶段和 check 阶段。

::: code-group

```js
setTimeout(() => {
  console.log("timeout");
}, 0);
setImmediate(() => {
  console.log("setImmediate");
});
// 输出：timeout、 setImmediate
```

:::

分析上面代码，第一轮循环后，分别将 setTimeout 和 setImmediate 加入了各自阶段的任务队列。第二轮循环首先进入  `timers 阶段`，执行定时器队列回调，然后  `pending callbacks 和 poll 阶段` 没有任务，因此进入 `check 阶段` 执行 setImmediate 回调。所以最后输出为 “timeout”、“setImmediate”。当然这里还有种理论上的极端情况，就是第一轮循环结束后耗时很短，导致 setTimeout 的计时还没结束，此时第二轮循环则会先执行 setImmediate 回调。
再看这下面一段代码，它只是把上一段代码放在了一个 I/O 任务回调中，它的输出将与上一段代码相反。

::: code-group

```js
const fs = require("fs");
fs.readFile(__filename, (data) => {
  console.log("readFile");
  setTimeout(() => {
    console.log("timeout");
  }, 0);
  setImmediate(() => {
    console.log("setImmediate");
  });
});
// 输出：readFile、setImmediate、timeout
```

:::

如上面代码所示：

- 第一轮循环没有需要执行的异步任务队列；
- 第二轮循环 timers 等阶段都没有任务，只有 poll 阶段有 I/O 回调任务，即输出“readFile”；
- 参考前面事件阶段的说明，接下来，poll 阶段会检测如果有 setImmediate 的任务队列则进入 check 阶段，否则再进行判断，如果有定时器任务回调，则回到 timers 阶段，所以应该进入 check 阶段执行 setImmediate，输出“setImmediate”；
- 然后进入最后的 close callbacks 阶段，本次循环结束；
- 最后进行第三轮循环，进入 timers 阶段，输出“timeout”。
  所以最终输出“setImmediate”在“timeout”之前。可见这两者的执行顺序与当前执行的阶段有关系。

### 最后，请分析下面代码的输出顺序：

::: code-group

```js
setTimeout(() => {
  console.log("setTimeout start");
  new Promise((resolve) => {
    console.log("promise1 start");
    resolve();
  }).then(() => {
    console.log("promise1 end");
  });
  console.log("setTimeout end");
}, 0);
function promise2() {
  return new Promise((resolve) => {
    console.log("promise2");
    resolve();
  });
}
async function async1() {
  console.log("async1 start");
  await promise2();
  console.log("async1 end");
}
async1();
console.log("script end");
// 输出：
// “async1 start”
// “promise2”
// “script end”
// “async1 end”
// “setTimeout start”
// “promise1 start”
// “setTimeout end”
// “promise1 end”
```

:::
