# JS 的设计原理是什么？

<article-info/>

## JS：动态类型语言。 运行时编译。

- `JIT`：在 <imp-text-success>运行阶段</imp-text-success> 生成机器代码，而不是提前生成。这就是把代码运行和生成机器代码是结合在一起的。在运行阶段收集类型信息，然后根据这些信息编译生成机器代码后再运行这些代码。就直接使用生成好的机器代码。
- `AOT`：在 <imp-text-success>运行前</imp-text-success> 提前生成好机器代码，比如 C++(静态类型语言)这样的语言。

既然 js 是一门高级语言，它被计算机 CPU 执行前需要通过某种程序将 JS 转换成低级的计算机语言并执行。这种程序就被称为 js 引擎。和其他语言相比 js 有许多执行引擎。比如谷歌 Chrome 使用的 V8 引擎，webkit 使用的 javaScriptCore，Mozilla 的 SpiderMonkey，比较火的 QuickJS 和 Facebook 在 React Native 中使用到的 Hermes。虽然引擎众多，但这些引擎在编译 JS 大致的流程都是差不多的。

首先将 JS 源码通过解析器，解析成 <link-tag :linkList="[{ linkType: 'zhihu', linkText:'传送门：抽象语法树 AST',linkUrl:'https://zhuanlan.zhihu.com/p/266697614'}]" /> ，接着再通过解释器将 <imp-text-success>AST 编译成字节码 bytecode</imp-text-success> 。字节码是跨平台的一种中间表示不同于最终的机器代码，字节码与平台无关，能够再不同操作系统上运行，字节码最后通过编译器生成 <imp-text-success>机器代码</imp-text-success> 。由于不同的处理平台使用的机器代码有差异，所以编译器会根据当前平台来编译出相应的机器代码。这里的机器码其实就是汇编代码。这是一个简化流程。在不同 js 引擎中表现会有一定的差异，比如在 V8 引擎 5.9 版本之前是直接把 AST 生成的机器代码，它不会额外生成 `bytecode` 字节码。但是在之后的版本，V8 使用了新的架构则会生产 `bytecode`。

## V8 引擎

V8 是一个接收 JavaScript 代码，编译 JS 代码然后执行的 C++程序。编译后的代码，可以再多种操作系统，多种处理器上运行。V8 要负责以下工作：编译和执行 JS 代码、处理调用栈、内存的分配、垃圾的回收。

### V8 是如何编译和执行 JS 代码的？

- 解析器：将 JS 代码解析成 <imp-text-success>抽象语法树 AST</imp-text-success> ；
- 解释器：负责将 AST 解释成 <imp-text-success>字节码 bytecode</imp-text-success>，同时解释器也有直接解释执行 bytecode 的能力；
- 编译器：负责编译出运行更加高效的 <imp-text-success>机器代码</imp-text-success>

### V8 的优点：

1. 函数只申明未被调用，不会被解析成 AST；
2. 函数只被调用一次，bytecode 直接被解释执行；
3. 函数调用多次，可能会被标记为热点函数，可能会被编译成机器代码。

JSX：巧妙的将 UI 逻辑和渲染逻辑很好的组合在了一起

## 调用栈 和 队列

- 栈： 先进后出
- 堆： 先进先出

调用栈是 JS 引擎 追踪函数执行流程的一种机制，当执行环境中调用了多个函数时，通过这种机制，我们能够追踪到哪个函数正在执行，执行的函数体又调用了哪个函数。它采用了先进后出的机制来管理函数的执行。

<imp-text-success>调用栈是如何管理执行顺序的</imp-text-success>：函数的声明是不会放入栈中的，调用栈，顾名思义一定是被调用的函数才会入栈。

javaScript 的执行环境是一个单线程，这就意味着 JS 环境只有一个调用栈，想想如果调用栈中的某个函数执行需要消耗大量时间的话。因为只有一个调用栈就会导致调用栈被阻塞无法入栈和出栈。页面的布局绘制和 JS 执行都是在一个主线程里。如果 JS 执行迟迟不归还主线程的话，就会影响页面的渲染就可能会导致页面出现卡顿的现象。也就会严重影响用户的体验。优化这个问题的方案就是使用事件循环和异步回调。

## 回调函数

众所周知，JS 是单线程的，因为多个线程改变 DOM 的话会导致页面紊乱，所以设计为一个单线程的语言，但是浏览器是多线程的，这使得 JS 同时具有异步的操作，即定时器，请求，事件监听等，而这个时候就需要一套事件的处理机制去决定这些事件的顺序，即 `Event Loop（事件循环）`，下面会详细讲解事件循环，只需要知道，前端发出的请求，一般都是会进入浏览器的 http 请求线程，等到收到响应的时候会通过回调函数推入异步队列，等处理完主线程的任务会读取异步队列中任务，执行回调

![/02066f0e-e065-1b15-f2bd-e7dd144c277d.png](/02066f0e-e065-1b15-f2bd-e7dd144c277d.png)

<link-tag :linkList="[{ linkType: 'bilibili', linkText:'JaveScript Event Loop 讲解',linkUrl:'https://link.zhihu.com/?target=https%3A//www.bilibili.com/video/BV1kf4y1U7Ln'}]" />

## 调用栈 消息队列 微任务队列

`event loop`：异步和多线程的实现是通过事件循环机制实现的。

1. 调用栈（call stack）
2. 消息队列（Message Queue）
3. 微任务队列（microtask Queue）

Event Loop 开始前会从全局代码开始一行一行执行，遇到 `函数调用会把它压入调用栈中`，被压入的函数叫做帧(frame)，`当函数返回后会从调用栈中弹出`。

javeScript 中的异步操作比如：`fetch 事件回调`，`setTimeout setInterval` 中的回调函数会入队到 `消息队列` 中，称为消息。消息会在调用栈清空的时候执行。这也是为什么 setTimeout 中的延迟参数只是 `最小延迟时间（0）`。调用栈为空后 `消息队列里的消息压入到调用栈中并执行`。只有 promise async await 执行的异步操作会加入到 `微任务队列` 中，它会在调用栈被清空后 `立即执行`，并且处理期间新加入的微任务一起执行。

Event Loop <link-tag :linkList="[{ linkType: 'youtube', linkText:'传送门：视频讲解链接',linkUrl:'https://www.youtube.com/watch?v=cCOL7MC4Pl0'}]" /> (任务队列 动画回调队列 微任务队列)

比如任务队列一次只处理一个， 如果有另外一个事件进来，就放到队尾。

动画回调会一次执行完，除非在过程中又提交了新的，他们会延迟到下一帧。

微任务会执行到完成，包括插进来的，所以如果你的提交和处理的速度一样快，会一直在处理微任务。如果队列没清空，事件循环就阻塞，这就是渲染被阻塞的原因。
