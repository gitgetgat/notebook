# computed 实现原理

<article-info/>

`computed` 和 `ref` 的突现是有一些类似的，比如：

1. 它们本质上都是一个类 (`ComputedReflmpl`)
2. 都是通过 `get value` 和 `set value` 监听 `getter` 和 `setter` 行为的

但是因为 `computed` 的计算属性特性(依赖的响应式数据发生变化时，才会重新计算)，所以在源码的实现上有一些区别，这个区别主要体现在两个地方：

1. 调度器：`scheduler`
2. 执行检查 (脏状态) ：`_dirty`

## 首先是调度器 `scheduler`

它是作为 `ReactiveEffect` 的第二个参数存在的回调函数。当触发依赖的时候，会直接执行这个回调区数。

在这个回调函数中，会根据当前的脏值状态来决定是否需要触发依赖

## 然后是 `_dirty`。

它其实就是一个 `boolean` 的变量。

- true：表示需要获取 计算之后 的最新数据
- false：表示当前数据就是最新的，不需要重新计算

在每次去触发 `get value（computed.value）` 的时候，都会根据这个 `_dirty` 的值来判断计算的触发。

总的来说，计算属性的核心还是体现在 `是否需要重新计算` 这里。判断的方式就是通过 `_dirty` 进行的。而 scheduler 主要提供了函数的作用，在函数内部还是需要依赖 dirty 来决定触发依赖的时机。
