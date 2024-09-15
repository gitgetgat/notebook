# 什么是 Render 函数?

<article-info/>

## 一、render 函数

### render 函数作用

`render 函数`  跟  `template`  一样都是创建  `html`  模板的，但是有些场景中用  `template`  实现起来代码冗长繁琐而且有大量重复，这时候就可以用  `render 函数`

### render 函数讲解

`render 函数`即`渲染函数`，它是个函数，它的参数也是个函数——即  `createElement`

### render 函数的返回值（VNode）

::: code-group

```bash
VNode（即：virtual node 虚拟节点），也就是我们要渲染的节点
```

:::

### render 函数的参数（createElement）

::: info
`createElement`  是  `render 函数`  的参数，它本身也是个函数，并且有三个参数
:::

- 一个 HTML 标签名、组件选项对象，或者 resolve 了上述任何一种的一个 async 函数，类型：{ String | Object | Function }，`必填项`
- 一个与模板中 attribute 对应的数据对象，类型：{ Object }，`可选`
- 子级虚拟节点 ( `VNodes` )，由  `createElement()`  构建而成，也可以使用字符串来生成 “文本虚拟节点”，类型：{ String | Array }，`可选`

::: code-group

```bash
/**
 * render: 渲染函数
 * @param {Function} createElement
 * @returns {VNode}
 */
render: createElement => {
    return createElement(
        // 1. 第一个参数，要渲染的标签名称【必需】
        'div',
        // 2. 第二个参数，1中渲染的标签的属性【可选】，不使用此参数，用 null 占位
        {
            // 与 `v-bind:class` 的 API 相同，
            // 接受一个字符串、对象或字符串和对象组成的数组
            'class': {
                foo: true,
                bar: false
            },
            // 与 `v-bind:style` 的 API 相同，
            // 接受一个字符串、对象，或对象组成的数组
            style: {
                color: 'red',
                fontSize: '14px'
            },
            // 普通的 HTML attribute
            attrs: {
                id: 'foo'
            },
            // 组件 prop
            props: {
                myProp: 'bar'
            },
            // DOM property
            domProps: {
                innerHTML: 'baz'
            },
            // 事件监听器在 `on` 内，
            // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
            // 需要在处理函数中手动检查 keyCode。
            on: {
                click: this.clickHandler
            },
            // 仅用于组件，用于监听原生事件，而不是组件内部使用
            // `vm.$emit` 触发的事件。
            nativeOn: {
                click: this.nativeClickHandler
            },
            // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
            // 赋值，因为 Vue 已经自动为你进行了同步。
            directives: [
                {
                    name: 'my-custom-directive',
                    value: '2',
                    expression: '1 + 1',
                    arg: 'foo',
                    modifiers: {
                        bar: true
                    }
                }
            ],
            // 作用域插槽的格式为
            // { name: props => VNode | Array<VNode> }
            scopedSlots: {
                default: props => createElement('span', props.text)
            },
            // 如果组件是其它组件的子组件，需为插槽指定名称
            slot: 'name-of-slot',
            // 其它特殊顶层 property
            key: 'myKey',
            ref: 'myRef',
            // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
            // 那么 `$refs.myRef` 会变成一个数组。
            refInFor: true
        },
        // 3. 第三个参数，1中渲染的标签的子元素数组【可选】，不使用此参数，用 null 占位 或不写
        [
            createElement(
                'span',
                null,
                '友情链接'
            )，
            createElement(
                'a',
                {
                    attrs: {
                        href: 'https://www.baidu.com'
                    }
                },
                '百度'
            )
        ]
    )
}
```

:::

将 `h` 作为 `createElement` 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 `JSX` 所要求的`const h = this.$createElement`，这样你就可以去掉 (h) 参数了

::: code-group

```js
render: (h) => h(App);
```

:::

## Vue 模板编译之生成 render 函数

### 官方的编译插件 `vue-template-compiler`

::: code-group

```js
const compiler = require("vue-template-compiler");
const template = "<p>我是哈默</p>";
const result = compiler.compile(template);
console.log(result.render);
```

:::

结果如下：

![/b13f8bde-4874-822b-ff97-39f8fa78fb55.png](/b13f8bde-4874-822b-ff97-39f8fa78fb55.png)

with( ){ } ：

::: code-group

```js
const message = "全局message";
const testObject = {
  message: "testobject里的message"
};
function testFunction() {
  with (testobject) {
    console.log(message);
  }
}
testFunction(); // testobject里的message
```

:::

\_c，\_v，\_s，\_q 是什么？

::: code-group

```jsx
/*处理v-once的渲染函数*/
Vue.prototype._o = markOnce;
/*将字符串转化为数字，如果转换失败会返回原字符串*/
Vue.prototype._n = toNumber;
/*将val转化成字符串*/
Vue.prototype._s = toString;
/*处理v-for列表渲染*/
Vue.prototype._l = renderList;
/*处理slot的渲染*/
Vue.prototype._t = renderSlot;
/*检测两个变量是否相等*/
Vue.prototype._q = looseEqual;
/*检测arr数组中是否包含与val变量相等的项*/
Vue.prototype._i = looseIndexOf;
/*处理static树的渲染*/
Vue.prototype._m = renderStatic;
/*处理filters*/
Vue.prototype._f = resolveFilter;
/*从config配置中检查eventKeyCode是否存在*/
Vue.prototype._k = checkKeyCodes;
/*合并v-bind指令到VNode中*/
Vue.prototype._b = bindObjectProps;
/*创建一个文本节点*/
Vue.prototype._v = createTextVNode;
/*创建一个空VNode节点*/
Vue.prototype._e = createEmptyVNode;
/*处理ScopedSlots*/
Vue.prototype._u = resolveScopedSlots;

/*创建VNode节点*/
vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false);
```

:::
