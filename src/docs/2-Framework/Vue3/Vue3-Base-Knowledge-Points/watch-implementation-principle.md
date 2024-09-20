# watch 实现原理

<article-info/>

`watch` 是一个典型的懒执行 `API`，它的逻辑更加纯粹： <imp-text-success>在监听的响应式数据变化时，重新执行回调函数就可以了</imp-text-success>

核心的点有两个:

- 如何 `监听依赖` 和 `触发依赖` 的
- 如何进行懒执行的

首先是 `watch` 监听依赖儿触发依赖的机制

`watch` 的监听和触发也是依赖的 `setter` 和 `getter` 行为。

这里的 `setter` 行为触发是比较明确的，本质上就是监听的响应式数据触发 `setter` 行为。

而 `getter` 行为的触发是依赖于内部的 `traverse` 方法进行的。`traverse` 方法就是 <imp-text-success>依次遍历数据，分别触发 `getter` 行为。</imp-text-success>

至于懒执行本质上就是通过 `options` 中的 `immediate` 参数，逻辑比较简单

因为 `watch` 内部通过 `job` 的方法来触发 `callback` (回调函数)，如果 `immediate` 为 `true` 那么就主动触发次 `job` 就可以了。

总的来说，`watch` 的实现会更加纯粹一些。只需要关注好 `setter`、`getter` 以及 懒执行的特性即可。
