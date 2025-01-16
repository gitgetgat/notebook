# vue-router 如何控制路由访问权限 ？

<article-info/>

- 前端控制：可以在配置路由时添加路由的 `meta` 信息，这个 `meta` 信息里的数据可以在 `路由守卫（例如 beforeEach）`里拿到，通过对这个 `meta` 信息里的数据的判断来控制路由访问权限。

  ::: code-group

  ```js [路由配置]
  // router/index.js
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin.vue'),
    meta: { requiresAuth: true }
  },
  ```

  ```js [路由拦截器]
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!store.getters.isLoggedIn) {
        next({ path: "/login" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
  ```

- 后端控制：我们需要通过向后端发送请求，获取返回的用户权限信息，然后在生成路由表时进行相应的控制。这时生成的动态路由表路就没有权限不达标才能访问的页面了。

  ::: code-group

  ```jsx
  // 请求用户权限
  const response = await axios.get("/user");
  const permissions = response.data.permissions;

  // 生成动态路由表的方法
  function generateRoutesFromMenu(menu = [], permissions = {}) {
    const routes = [];

    for (let i = 0, l = menu.length; i < l; i++) {
      const item = menu[i];
      const route = {
        path: item.path,
        name: item.name,
        meta: item.meta, // 从菜单项中提取出路由的meta信息
        component: item.component ? loadView(item.component) : null,
        children: item.children
          ? generateRoutesFromMenu(item.children, permissions)
          : []
      };

      // 如果路由需要控制权限
      if (route.meta && route.meta.requiresAuth) {
        // 判断用户是否有权限访问该路由
        if (permissions[route.meta.permissionKey]) {
          // 用户有权限，则把该路由加入到路由表中
          routes.push(route);
        }
      } else {
        // 如果不需要权限控制，则直接加入到路由表中
        routes.push(route);
      }
    }

    return routes;
  }
  ```

  :::
