# diff 算法

<article-info/>

## Diff 算法是什么

`Diff算法` 探讨的就是 `虚拟DOM树` 发生变化后，生成 `DOM树` 更新补丁的方式。对比新旧两株虚拟 `DOM树` 的变更差异，将更新补丁作用于真实 DOM，以最小成本完成视图更新。

比起普通的 `虚拟DOM树` 节点挨个与另外一个 `虚拟DOM树` 节点依次比较这种庞大的工作量，`Diff算法` 考虑到大部分情况下是 同级节点 的变更，而不是 对节点做层级变更操作，所以 `Diff算法` 比较只会在同层级进行，不会跨层级比较。

## Diff 算法分解

1. 生成 `虚拟DOM` ：`render函数` 和 `h函数/createElement函数`

::: code-group

```jsx
const vm = new Vue({
  el: "#app",
  render(h) {
    // h(tag, data, children)
    // h 函数 也就是 vm.$createElement()
    // tag：标签名称或者组件对象
    // data：描述 tag，可以设置 DOM 的属性回着标签的属性
    // children：tag 中的文本内容或者子节点
    return h(
      "h1",
      {
        attrs: { id: "title" }
      },
      this.msg
    );
  },
  data: {
    msg: "Hello Vue"
  }
});
```

:::
::: code-group

```
VNode 的核心属性
-- tag
-- data
-- children
-- text
-- elm
-- key
```

:::

2. `vm._render()` ，调用 render 返回 vnode —> `vnode = render.call(vm._renderProxy, vm.$createElement)`
   - h 函数，在用户设置的 render 函数中调用
     会调用 `vm.$createElement()` ，最终调用 `createElement(vm, a, b, c, d, true)`
   - h 函数，在模板编译的 render 函数中调用
     会调用 `vm._c()` ，最终调用 `createElement(vm, a, b, c, d, true)`
   - `createElement` 中最终调用了 `_createElement()`
     `vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context)`
   - `vm._render()` 结束，返回 vnode
3. `vm._update()`
   - 负责把虚拟 DOM，渲染成真实 DOM
   - 首次执行：`vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);`
   - 数据更新：`vm.$el = vm.**patch**(prevVnode, vnode);`
4. `vm.__patch__()`
   - `runtime/index.js` 中挂载 `Vue.prototype.__patch__`，挂载的本体是 `runtime/patch.js` 的 patch 函数
   - 设置 modules 和 nodeOps
   - 调用 `createPatchFunction()` 函数 返回 patch 函数
5. `patch()`
   - `vdom/patch.js` 中的 `createPatchFunction()` 函数 返回 patch 函数
   - 挂载 cbs 节点的属性/事件/样式操作的钩子函数
   - 判断第一个参数是真实 DOM 还是虚拟 DOM。首次加载，第一个参数就是真实 DOM，转换成 VNode，调用 createElm 把 newVNode 转换成 真实 DOM，挂载到 DOM 树
   - 如果是数据更新的时候，新旧节点是 `sameVnode` 执行 `patchVnode`，也就是 `Diff`
   - 删除旧节点
6. `createElm(vnode, insertedVnodeQueue)`
   - 把虚拟节点，转换为真实 DOM，并插入到 DOM 树
   - 把虚拟节点的 children，转换为真实 DOM，并插入到 DOM 树
7. `patchVnode`
   - 对比新旧 VNode。以及新旧 VNode 的子节点，更新差异
   - 如果新旧 VNode 都有子节点并且子节点不同的话，会调用 `updateChildren` 对比子节点的差异
8. `updateChildren`
   - 从头和尾开始依次找到相同的子节点精心比较 patchVnode，总共有四中比较方式，依次是：
     - 旧头和新头相等对比
     - 旧尾和新尾相等对比
     - 旧头和新尾相等对比
     - 旧尾和新头相等对比
   - 不是上面四种，接着会在老节点的子节点中查找 newStartVnode，并进行处理
   - 如果新节点比老节点多，把新增的节点插入到 DOM 中
   - 如果老节点比新节点多，把多余的老节点删除
