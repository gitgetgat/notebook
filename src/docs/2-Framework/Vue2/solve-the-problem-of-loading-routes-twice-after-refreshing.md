# 解决刷新后二次加载路由的问题

<article-info/>

1. `window.location.reload()` //可能会出现闪屏的问题
2. `matcher`

   ::: code-group

   ```jsx
   const router = createRouter();
   export function resetRouter() {
     const newRouter = creatRouter();
     router.matcher = newRouter.matcher;
   }
   ```

   :::
