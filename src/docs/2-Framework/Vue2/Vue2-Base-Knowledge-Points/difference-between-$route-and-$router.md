# $route 和 $router 的区别

<article-info/>

## this.$route

当前激活的路由的信息对象。每个对象都是局部的，可以获取当前路由的 path, name, params, query 等属性。

- `$route.path` ：字符串，对应当前路由的路径，总是解析为绝对路径，如"/foo/bar"。
- `$route.params` ：一个 `key/value` 对象，包含了 动态片段 和 全匹配片段， 如果没有路由参数，就是一个空对象。
- `$route.query` ：一个 `key/value` 对象，表示 `URL` 查询参数。 例如，对于路径 /foo?user=1，则有 $route.query.user == 1， 如果没有查询参数，则是个空对象。
- `$route.hash` ：当前路由的 `hash` 值 (不带#) ，如果没有 hash 值，则为空字符串。
- `$route.fullPath` ：完成解析后的 URL，包含查询参数和 hash 的完整路径。
- `$route.matched` ：数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。
- `$route.name` ：当前路径名字
- `$route.meta` ：路由元信息

## this.$router

全局的 `router 实例`。通过 vue 根实例中注入 `router 实例`，然后再注入到每个子组件，从而让整个应用都有路由功能。其中包含了很多属性和对象（比如 `history 对象`），任何页面也都可以调用其 `push()`, `replace()`, `go()` 等方法。

### push

- 字符串

  `this.$router.push('home')`

- 对象

  `this.$router.push({path:'home'})`

- 命名的路由

  `this.$router.push({name:'user',params:{userId:123}})`

- 带查询参数

  `this.$router.push({path:'register',query:{plan:'123'}})` 变成 `/register?plan=123`

::: tip
`push` 方法其实和 `<router-link :to="...">` 是等同的。
:::

::: warning ⚠️ 注意
`push` 方法的跳转会向 `history` 栈添加一个新的记录，当我们点击浏览器的返回按钮时可以看到之前的页面。
:::

### go

- 页面路由跳转
- 前进或者后退 `this.$router.go(-1)` // 后退

### replace

- `push` 方法会向 `history` 栈添加一个新的记录，而 `replace` 方法是替换当前的页面
- 不会向 `history` 栈添加一个新的记录

::: tip
一般使用 `replace` 来做 404 页面

`this.$router.replace('/')`，配置路由时 path 有时候会加 `'/'` 有时候不加,以 `'/'` 开头的会被当作根路径，就不会一直嵌套之前的路径。
:::
