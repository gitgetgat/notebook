# 有没有做过无感登录？

<article-info/>

## 什么是 `无感知刷新Token`

无感知刷新 `Token` 是指，在 `Token` 过期之前，系统自动使用 `Refresh Token` 获取新的 `Access Token`，从而实现 `Token` 的无感知刷新，用户可以无缝继续使用应用。

在实现无感知刷新 `Token` 的过程中，需要考虑以下几个方面：

- 如何判断 `Token` 是否过期？
- 如何在 `Token` 过期时自动使用 `Refresh Token` 获取新的 `Access Token`？
- 如何处理 `Refresh Token` 的安全问题？

## 无感登录的方案

1. 在响应拦截器中拦截，判断 `token` 过期返回后，调用刷新 `token` 的接口
2. 后端返回过期时间，前端判断 `token` 过期时间够，调用刷新 `token` 的接口（需要多返回过期时间字段）
3. 设定定时器，定时刷新 `token`

## 实现步骤

1. **获取 `Access Token` 和 `Refresh Token`**

   在认证成功后，需要将 `Access Token` 和 `Refresh Token` 发送给客户端。`Access Token` 用于访问受保护的 `API`，`Refresh Token` 用于获取新的 `Access Token`。可以使用 `JWT（JSON Web Token）`或 `OAuth2`（开放授权）等方式实现认证。

   在 `JWT` 中，可以使用如下代码生成 `Access Token` 和 `Refresh Token`：

   ::: code-group

   ```js
   const accessToken = jwt.sign({ userId: "123" }, "ACCESS_TOKEN_SECRET", {
     expiresIn: "15m"
   });
   const refreshToken = jwt.sign({ userId: "123" }, "REFRESH_TOKEN_SECRET", {
     expiresIn: "7d"
   });
   ```

   :::

2. 在请求中携带 `Access Token`

   在每个需要认证的 `API` 请求中，需要在请求头中携带 `Access Token`，如下所示：

   ::: code-group

   ```js
   GET /api/user HTTP/1.1
   Host: example.com
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   :::

   在前端中，可以使用 `Axios` 等库设置请求头：

   ::: code-group

   ```js
   axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
   ```

   :::

3. 拦截 `401 Unauthorized` 响应

   在服务器返回 `401 Unauthorized` 响应时，说明 `Access Token` 已经过期，需要使用 `Refresh Token` 获取新的 `Access Token`。可以使用 `Axios` 拦截器或 `Fetch API` 的中间件实现拦截。

   在 `Axios` 中，可以使用如下代码实现拦截器：

   ::: code-group

   ```js
   axios.interceptors.response.use(
     (response) => {
       return response;
     },
     (error) => {
       const originalRequest = error.config;
       if (error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true; //防止无限调用
         return axios
           .post("/api/refresh_token", { refreshToken })
           .then((response) => {
             const { access_token, refresh_token } = response.data;
             localStorage.setItem("access_token", access_token);
             localStorage.setItem("refresh_token", refresh_token);
             axios.defaults.headers.common[
               "Authorization"
             ] = `Bearer ${access_token}`;
             originalRequest.headers.Authorization = `Bearer ${access_token}`;
             return axios(originalRequest);
           });
       }
       return Promise.reject(error);
     }
   );
   ```

   :::

   在 Fetch 中，可以使用如下代码实现中间件：

   ::: code-group

   ```js
   function authMiddleware(request) {
     const access_token = localStorage.getItem("access_token");
     if (access_token) {
       request.headers.set("Authorization", `Bearer ${access_token}`);
     }
     return request;
   }

   function tokenRefreshMiddleware(response) {
     if (response.status === 401) {
       const refreshToken = localStorage.getItem("refresh_token");
       return fetch("/api/refresh_token", {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           refreshToken
         })
       })
         .then((response) => {
           if (response.ok) {
             return response.json();
           }
           throw new Error("Refresh Token failed");
         })
         .then((data) => {
           localStorage.setItem("access_token", data.access_token);
           localStorage.setItem("refresh_token", data.refresh_token);
           return Promise.resolve("refreshed");
         })
         .catch((error) => {
           localStorage.removeItem("access_token");
           localStorage.removeItem("refresh_token");
           return Promise.reject(error);
         });
     }
     return Promise.resolve("ok");
   }

   fetch("/api/user", {
     method: "GET",
     headers: {
       "Content-Type": "application/json"
     },
     middleware: [authMiddleware, tokenRefreshMiddleware]
   })
     .then((response) => {
       console.log(response);
     })
     .catch((error) => {
       console.error(error);
     });
   ```

   :::

   在上述代码中，使用 `Axios` 或 `Fetch` 拦截器拦截 `401 Unauthorized` 响应，如果发现 `Access Token` 已经过期，则发送 `Refresh Token` 请求获取新的 `Access Token`，并将新的 `Access Token` 设置到请求头中，重新发送请求。

4. 服务器处理 Refresh Token 请求

   在服务器端，需要编写 API 处理 Refresh Token 请求，生成新的 Access Token，并返回给客户端。

   在 [**JWT**](../../BackEnd/NodeJS/have-you-heard-of-jwt.md) 中，可以使用如下代码生成新的 Access Token：

   ::: code-group

   ```js
   const accessToken = jwt.sign({ userId: "123" }, "ACCESS_TOKEN_SECRET", {
     expiresIn: "15m"
   });
   ```

   :::

   在刷新 Token 时，需要验证 Refresh Token 的合法性，可以使用如下代码验证 Refresh Token：

   ::: code-group

   ```js
   try {
     const payload = jwt.verify(refreshToken, "REFRESH_TOKEN_SECRET");
     const accessToken = jwt.sign(
       { userId: payload.userId },
       "ACCESS_TOKEN_SECRET",
       { expiresIn: "15m" }
     );
     const refreshToken = jwt.sign(
       { userId: payload.userId },
       "REFRESH_TOKEN_SECRET",
       { expiresIn: "7d" }
     );
     res.json({ access_token: accessToken, refresh_token: refreshToken });
   } catch (err) {
     res.sendStatus(401);
   }
   ```

   :::

   在上述代码中，使用 [**JWT**](../../BackEnd/NodeJS/have-you-heard-of-jwt.md) 的 `verify` 方法验证 `Refresh Token` 的合法性，如果验证成功，则生成新的 `Access Token` 和 `Refresh Token`，并返回给客户端。

5. 设置定时刷新 `Token`

   为了避免 `Access Token` 过期时间太长，可以设置定时刷新 `Token` 的功能。可以使用定时器或`Web Workers` 等方式实现定时刷新 `Token`。在每次刷新 `Token` 时，需要重新获取新的 `Access Token` 和 `Refresh Token`，并保存到客户端。

   ::: code-group

   ```js
   function refreshToken() {
     const refreshToken = localStorage.getItem("refresh_token");
     axios
       .post("/api/refresh_token", { refreshToken })
       .then((response) => {
         const { access_token, refresh_token } = response.data;
         localStorage.setItem("access_token", access_token);
         localStorage.setItem("refresh_token", refresh_token);
         axios.defaults.headers.common[
           "Authorization"
         ] = `Bearer ${access_token}`;
       })
       .catch((error) => {
         console.error(error);
       });
   }

   setInterval(refreshToken, 14 * 60 * 1000); // 每14分钟刷新Token
   ```

   :::

   在上述代码中，使用定时器每 14 分钟刷新 `Token`。在刷新 `Token` 成功后，将新的 `Access Token` 和 `Refresh Token` 保存到客户端，并将新的 `Access Token` 设置到请求头中。

## 安全性考虑

在实现无感知刷新 `Token` 的过程中，需要考虑到 `Refresh Token` 的安全性问题。因为 `Refresh Token` 具有长期的有效期限，一旦 `Refresh Token` 被泄露，攻击者就可以使用 `Refresh Token` 获取新的 `Access Token`，从而绕过认证机制，访问受保护的 `API`。

为了增加 `Refresh Token` 的安全性，可以考虑以下几种措施：

- 将 `Refresh Token` 保存在 [**HttpOnly Cookie**](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/HTTP/Cookies%23restrict_access_to_cookies_using_httponly) 中，可以避免在客户端被 `JavaScript` 获取；
- 对 `Refresh Token` 进行加密或签名，可以增加其安全性。

## 案例

- `token.js`：定义通过 `localStorage` 存取 `token` 的操作。

  ::: code-group

  ```js
  // token.js

  export function getToken(token) {
    localStorage.getItem(TOKEN_KEY);
  }

  export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  export function getRefreshToken() {
    localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  export function setRefreshToken(token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
  ```

  :::

- `refreshToken.js`：定义刷新 `token` 的请求操作。

  ::: code-group

  ```js
  // refreshToken.js

  import request from "./request";
  import { getRefreshToken } from "./token";

  let promise;
  // 刷新 token 的请求
  export async function refreshtoken() {
    // 防止同一时间无权限时，并发多次请求刷新 token，
    // 只请求一次，所有请求都等待这里一次刷新 token 的请求
    if (promise) {
      return promise;
    }
    promise = new Promise(async (resolve, reject) => {
      const resp = await request.get("./refresh_token", {
        headers: {
          Authorization: `Bearer ${getRefreshToken()}`
        },
        //标识是否刷新 token 的请求，会绑定在此次请求的 config 中
        __isRefreshToken: true
      });
      resolve(resp.code === 0);
    });
    promise.finally(() => {
      promise = null;
    });
    return promise;
  }
  // 是否是刷新token的请求
  export function isRefreshRequest(config) {
    return !!config.__isRefreshToken;
  }
  ```

  :::

- `request.js`：封装 `axios` 请求实例拦截器的操作。

  ::: code-group

  ```js
  // request.js

  import axios from "axios";
  import { setToken, getToken, setRefreshToken } from "./token";
  import { refreshtoken, isRefreshRequest } from "./refreshToken";
  const ins = axios.create({
    baseURL: "http://localhost:9527",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  ins.interceptors.response.use(async (res) => {
    if (res.headers.authorization) {
      const token = res.headers.authorization.replace("Bearer", "");
      setToken(token);
      ins.defaults.headers.Authorization = `Bearer ${token}`;
    }
    if (res.headers.refreshtoken) {
      const token = res.headers.authorization.replace("Bearer", "");
      setRefreshToken(refreshtoken);
    }
    if (res.data.code === 401 && !isRefreshRequest(res.config)) {
      // 刷新token
      const isSuccess = await refreshtoken();
      if (isSuccess) {
        // 有新的token后，重新请求
        res.config.headers.Authorization = `Bearer ${getToken()}`;
        const resp = await ins.request(res.config);
        return resp;
      } else {
        // 刷新失败，跳转登录页
      }
    }
    return res.data;
  });

  export default ins;
  ```

  :::
