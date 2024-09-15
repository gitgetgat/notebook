# 如何理解 MVVM

<article-info/>

`MVVM` 是 `Model-View-ViewModel` 的缩写，它是一种基于前端开发的架构模式

M：模型（Model）：对应 data 中的数据

V：视图（View）：用户界面，也就是 DOM

VM：视图模型（ViewModel）：Vue 实例对象，连接 `View` 和 `Model` 的桥梁

`MVVM` 的核心是 `ViewModel`，提供对 `View` 和 `Model` 的双向数据绑定，当数据（M）变化时，`ViewModel` 能监听到数据的变化（通过 Data Bindings）,自动更新视图（V），而当用户操作视图，`ViewModel` 也能监听到视图（V）的变化（DOM Listeners），然后通知数据（M）做改动，这就实现了数据的双向绑定。

`ViewModel` 通过双向数据绑定把 `View` 层和 `Model` 层连接了起来，而 `View` 和 `Model` 并不直接关联，而 `View` 和 `Model` 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM， 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 `MVVM` 来统一管理。

![/e68846bb-252a-858f-1452-f1ac6f1edf97.png](/e68846bb-252a-858f-1452-f1ac6f1edf97.png)
