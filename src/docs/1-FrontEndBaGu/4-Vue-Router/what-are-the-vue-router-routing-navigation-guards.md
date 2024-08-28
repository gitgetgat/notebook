# vue-router 路由导航守卫有哪些？

<article-info/>

## 什么是导航守卫？

正如其名，vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。这里有很多方式植入路由导航中：全局的，单个路由独享的，或者组件级的。

## 全局守卫

- `router.beforeEach（**全局前置守卫**）`
  定义：当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 <el-text size="large" type="success">等待中</el-text>。
  每个守卫方法接收两个参数：

  - `to`: 即将要进入的目标
  - `from`: 当前导航正要离开的路由
    可以返回的值如下:
  - `false`: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到  `from`  路由对应的地址。
  - 一个 <link-tag :linkList="[{ linkType: 'vue', linkText:'路由地址',linkUrl:'https://router.vuejs.org/zh/api/#routelocationraw'}]" />: 通过一个路由地址跳转到一个不同的地址，就像你调用  <link-tag :linkList="[{ linkType: 'vue', linkText:'router.push()',linkUrl:'https://router.vuejs.org/zh/api/#push'}]" />  一样，你可以设置诸如  `replace: true`  或  `name: 'home'`  之类的配置。当前的导航被中断，然后进行一个新的导航，就和  `from`  一样。

  ::: code-group

  ```jsx
  router.beforeEach(async (to, from) => {
    if (
      // 检查用户是否已登录
      !isAuthenticated &&
      // ❗️ 避免无限重定向
      to.name !== "Login"
    ) {
      // 将用户重定向到登录页面
      return { name: "Login" };
    }
  });
  ```

  :::
  <el-text size="large" type="success">可选的第三个参数  `next`</el-text>
  ::: code-group

  ```jsx
  // GOOD
  router.beforeEach((to, from, next) => {
    if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
    else next();
  });
  ```

  :::

- `router.beforeResolve（**全局解析守卫**）`
  解析守卫刚好会在导航被确认之前、<el-text size="large" type="success">所有组件内守卫和异步路由组件被解析之后</el-text> 调用。这里有一个例子，确保用户可以访问 <link-tag :linkList="[{ linkType: 'vue', linkText:'自定义',linkUrl:'https://router.vuejs.org/zh/guide/advanced/meta'}]" /> `meta`  属性  `requiresCamera`  的路由：

  ::: code-group

  ```jsx
  router.beforeResolve(async (to) => {
    if (to.meta.requiresCamera) {
      try {
        await askForCameraPermission();
      } catch (error) {
        if (error instanceof NotAllowedError) {
          // ... 处理错误，然后取消导航
          return false;
        } else {
          // 意料之外的错误，取消导航并把错误传给全局处理器
          throw error;
        }
      }
    }
  });
  ```

  :::

  `router.beforeResolve`  是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。

- `router.afterEach（**全局后置钩子**）`
  你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受  `next`  函数也不会改变导航本身：

  ::: code-group

  ```jsx
  router.afterEach((to, from) => {
    sendToAnalytics(to.fullPath);
  });
  ```

  :::

  它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。

## 路由独享的守卫

你可以直接在路由配置上定义  `beforeEnter`  守卫：

::: code-group

```jsx
const routes = [
  {
    path: "/users/:id",
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false;
    }
  }
];
```

:::

`beforeEnter`  守卫  <el-text size="large" type="success">只在进入路由时触发</el-text>，不会在  `params`、`query`  或  `hash`  改变时触发。例如，从  `/users/2`  进入到  `/users/3`  或者从  `/users/2#info`  进入到  `/users/2#projects`。它们只有在  <el-text size="large" type="success">从一个不同的</el-text>  路由导航时，才会被触发。

你也可以将一个函数数组传递给  `beforeEnter`，这在为不同的路由重用守卫时很有用：

::: code-group

```jsx
function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash };
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: to.query, hash: "" };
}

const routes = [
  {
    path: "/users/:id",
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash]
  },
  {
    path: "/about",
    component: UserDetails,
    beforeEnter: [removeQueryParams]
  }
];
```

:::

请注意，你也可以通过使用 <link-tag :linkList="[{ linkType: 'vue', linkText:'路径',linkUrl:'https://router.vuejs.org/zh/guide/advanced/meta'}]" /> <el-text size="large" type="success">meta 字段</el-text> 和 <el-text size="large" type="success">全局导航守卫</el-text> 来实现类似的行为。

## 组件内的守卫

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

::: code-group

```jsx
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  }
};
```

:::

`beforeRouteEnter`  守卫  <el-text size="large" type="success">不能</el-text>  访问  `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给  `next`  来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数

::: code-group

```jsx
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

:::

注意  `beforeRouteEnter`  是支持给  `next`  传递回调的唯一守卫。对于  `beforeRouteUpdate`  和  `beforeRouteLeave`  来说，`this`  已经可用了，所以 <el-text size="large" type="success">_不支持_</el-text>  传递回调，因为没有必要了：

::: code-group

```jsx
beforeRouteUpdate (to, from) {
  // just use `this`
  this.name = to.params.name
}
```

:::

这个  <el-text size="large" type="success">离开守卫</el-text>  通常用来预防用户在还未保存修改前突然离开。该导航可以通过返回  `false`  来取消。

::: code-group

```jsx
beforeRouteLeave (to, from) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (!answer) return false
}
```

:::

## 使用组合 API

如果你正在使用 <link-tag :linkList="[{ linkType: 'vue', linkText:'组合 API 和  setup  函数',linkUrl:'https://v3.vuejs.org/guide/composition-api-setup.html#setup'}]" /> 来编写组件，你可以通过  `onBeforeRouteUpdate`  和  `onBeforeRouteLeave` 分别添加 `update` 和 `leave` 守卫。

## 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用  `beforeRouteLeave`  守卫。
3. 调用全局的  `beforeEach`  守卫。
4. 在重用的组件里调用  `beforeRouteUpdate`  守卫(2.2+)。
5. 在路由配置里调用  `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用  `beforeRouteEnter`。
8. 调用全局的  `beforeResolve`  守卫(2.5+)。
9. 导航被确认。
10. 调用全局的  `afterEach`  钩子。
11. 触发 DOM 更新。
12. 调用  `beforeRouteEnter`  守卫中传给  `next`  的回调函数，创建好的组件实例会作为回调函数的参数传入。
