# 在日常开发中使用过 render 函数 或 h 函数吗？使用场景是什么？

<article-info/>

有使用过。我在构建一个组件库组件的时候使用过它

之前的时候，我做过一个 <imp-text-success>confirm 组件</imp-text-success> 的时候。因为 <imp-text-success>confirm 组件</imp-text-success> 是需要通过方法来触发组件展示的。

所以说，需要动态的把组件插入到 DOM 中

那么这个时候，就用到了 render 函数。利用 render 函数进行的渲染

在制作 <imp-text-success>Breadcrumb 面包屑</imp-text-success> 组件的时候，因为 breadcrumb 和 breadcrumb-item 是分离的，所以需要在 breadcrumb 中通过 `defineSlots` 获取所有的插槽，然后通过 h 函数配合 render 函数进行染。

这是两个比较典型的场景
