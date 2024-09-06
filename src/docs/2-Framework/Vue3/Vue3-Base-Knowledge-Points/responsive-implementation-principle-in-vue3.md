# vue3 中的响应式实现原理

<article-info/>

vue3 的响应式实现主要有两个部分：`reactive`、`ref`。

`reactive` 主要是通过 `proxy` 进行的响应式实现，核心是监听复杂数据类型的 `getter` 和 `setter` 行为。

当监听到 `getter` 行为的时候那么就收集当前的依赖行为，也就是 `effect` 。 当触发 `setter` 行为的时候，那么就触发刚才收集的依赖。那么此时，所有获取到当前数据的地方都会更新执行，也就是完成了响应性。

但是 proxy 只能监听复杂数据类型，没有办法监听简单数据类型。所以 vue 专门提供了 ref 方法。

ref 方法既可以处理简单数据类型、也可以处理复杂数据类型。 它的实现在 3.2 之前和 3.2 之后是不同的。3,2 之前主要通过 `Obiect.defineProperty` 进行实现，在 3.2 版本的时候，根据社区贡献改为了 `get value` 和 `set value` 标记的方式进行实现。这也是为什么 ref 类型的数据必须要通过 `.value` 的方式使用的原因（本质上是触发 value 方法）

当 ref 接收复杂数据类型的时候，会直接通过 `toReactive` 方法，把复杂数据类型交给 `reactive` 进行处理。

整个的 vue3 响应性，主要就是由这两大块来进行实现的。`proxy` 处理复杂数据类型，`get value` 和 `set value` 处理简单数据类型。核心都是监听 `setter` 和 `getter` ，然后触发 `effect` 的方式
