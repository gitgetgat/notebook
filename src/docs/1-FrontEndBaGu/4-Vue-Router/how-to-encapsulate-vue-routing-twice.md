# 如何 vue 路由二次封装？

<article-info/>

思路：将路由拆分为多个文件，例如将导航守卫，路由列表，路由模式啊等等将这些不同的功能存放在不同的文件里，最后设置一个主的入口文件将这些拆分好的文件导入进去

![/1e9daa6a-f568-770f-eb9b-3f1c0584e64b.png](/1e9daa6a-f568-770f-eb9b-3f1c0584e64b.png)

1. **文件的拆分**

   在 router 目录下新建 router.js，route.js，guards.js 文件

   ::: code-group

   ```js [router.js]
   import { createRouter, createWebHistory } from "vue-router";

   // 路由列表
   import { AppRoutes } from "@/router/route";
   export const AppRouter = createRouter({
     history: createWebHistory(),
     routes: AppRoutes
   });

   //导航守卫
   import { beforeEach, afterEach } from "@/router/guards";
   AppRouter.beforeEach(beforeEach);
   AppRouter.afterEach(afterEach);
   ```

   ```js [route.js]
   export const AppRoutes = [
     {
       path: "/login",
       name: "login",
       component: () => import("@/views/Login.vue")
     },
     {
       path: "/",
       name: "home",
       component: () => import("@/views/Home.vue")
     }
   ];
   ```

   ```js [guards.js]
   import { useGlobalUserStore } from "@/store/UserGlobalStore";

   // 前置守卫
   export async function beforeEach(to) {
     if (to.path == "/login") {
       document.title = "后台管理系统";
       return;
     }
     if (!localStorage.getItem("token")) {
       return "/login";
     }
     // 以防伪造token增加用户权限信息的判断
     try {
       await useGlobalUserStore().initUserInfo();
       let { permissions } = useGlobalUserStore();
       if (permissions[0] === "*:*:*") {
         return;
       }
     } catch (e) {
       return "/login";
     }
   }
   // 后置守卫
   export async function afterEach() {}
   ```

   ```js [router/index.js]
   // 路由主入口
   export * from "./route";
   export * from "./router";
   ```

   ```js [main.js]
   // 引入拆分的路由
   import { AppRouter } from "@/router/index";

   createApp(App).use(AppRouter).use(createPinia()).mount("#app");
   ```

   :::

2. 拆分之前：

   ::: code-group

   ```jsx [router/index.js]
   import { createRouter, createWebHistory } from "vue-router";
   import { useGlobalUserStore } from "@/store/UserGlobalStore";
   import Login from "@/views/Login.vue";
   import Home from "@/views/Home.vue";

   const Router = createRouter({
     history: createWebHistory(),
     routes: [
       {
         path: "/login",
         name: "login",
         component: Login
       },
       {
         path: "/",
         name: "home",
         component: Home
       }
     ]
   });
   Router.beforeEach(async (to) => {
     console.log(to);
     if (to.path == "/login") {
       document.title = "后台管理系统";
       return;
     }
     if (!localStorage.getItem("token")) {
       return "/login";
     }
     // 以防伪造token增加用户权限信息的判断
     try {
       await useGlobalUserStore().initUserInfo();
       let { permissions } = useGlobalUserStore();
       if (permissions[0] === "*:*:*") {
         return;
       }
     } catch (e) {
       return "/login";
     }
   });
   export default Router;
   ```

   :::
