# 同源策略，为什么会有同源策略？怎样解决跨域？

<article-info/>

## 跨域产生的原因

### 同源策略

浏览器出于安全考虑，对 `同源请求` _放行_，对 `异源请求` _限制_，这些 `限制规则` 统称为 `同源策略`

### 跨域（异源）问题

因为 `同源策略` 造成的开发问题，称之为 `跨域（异源）问题`

#### 何为同源

![/e057205e-2e7c-22bc-1bc9-29c3477e4ec6.png](/e057205e-2e7c-22bc-1bc9-29c3477e4ec6.png)

| 源 1                | 源 2                    | 是否同源 | 原因     |
| ------------------- | ----------------------- | -------- | -------- |
| `http`://a.com:81/a | `https`://a.com:81/a    | 否       | 协议不同 |
| http://`a.com`:81/a | http://`www.a.com`:81/a | 否       | 域名不同 |
| http://a.com:`81`/a | http://a.com:`82`/a     | 否       | 端口不同 |
| http://a.com:81/`a` | http://a.com:81/`a/b`   | 否       |          |

![/7f8396c8-76a5-e74c-7348-51b0c162c978.png](/7f8396c8-76a5-e74c-7348-51b0c162c978.png)

::: warning ⚠️ 注意
跨域可不只是简单的 Ajax 请求会出现，请求 CSS、JS、图片资源都会出现
:::

### 浏览器的同源策略

#### 浏览器如何限制？

- 对标签发出的跨域请求 `轻微限制`
- 对 AJAX 发出的跨域请求 `严厉限制`

![/fc306ea7-c097-f6c5-6a0b-da42b675edd4.png](/fc306ea7-c097-f6c5-6a0b-da42b675edd4.png)

::: warning ⚠️ 注意

- 请求可以正常发出（哪怕是跨域请求）
- 服务器可以正常响应
- 但是浏览器校验通过与否有，跨域问题是由浏览器的同源策略引起的
- 即使是发生跨域也不一定会引起跨域问题

:::

## 跨域解决方案

### CORS

CORS 是一套机制，用于浏览器校验跨域请求。是 <el-text size="large" type="success">正统</el-text> 的跨域解决方案，因为同源策略的验证规则就是 <el-text size="large" type="success">CORS 规则</el-text>

它的基本理念是：

- 只要 <el-text size="large" type="success">服务器</el-text> 明确表示 <el-text size="large" type="success">允许</el-text>，则校验 <el-text size="large" type="success">通过</el-text>

- <el-text size="large" type="success">服务器</el-text> 明确 <el-text size="large" type="success">拒绝</el-text> 或 <el-text size="large" type="success">没有表示</el-text>，则校验 <el-text size="large" type="success">不通过</el-text>

使用 CORS 方案的前提：必须保证服务器是【自己人】

CORS 将请求分为两类：

- 简单请求

  - 请求方法是以下三种之一：
    - `HEAD`
    - `GET`
    - `POST`
  - HTTP 的头信息不超出以下几种字段：
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type`
    - `DPR`
    - `Downlink`
    - `Save-Data`
    - `Viewport-Width`
    - `Width`
  - Content-Type 的值仅限于以下三种之一

    - `text/plain`
    - `multipart/form-data`
    - `application/x-www-form-urlencoded`

      ![/8dee7c6a-a1cb-97d6-29d1-876a48a71665.png](/8dee7c6a-a1cb-97d6-29d1-876a48a71665.png)

      发送简单请求的时候，浏览器发现跨域，会在请求头自动设置 `Origin：源` ，服务器有两种方式：1. 响应头的 `Access-Control-Allow-Origin：源` ，这里的源和请求附带的源一样，表示同源；2. 响应头的 `Access-Control-Allow-Origin：*` ，表示全部都通过，即所有源都可访问。

- 预检请求：非`简单请求`
  ![/0b6e5216-60cd-3491-5696-de2af3519171.png](/0b6e5216-60cd-3491-5696-de2af3519171.png)

  1. 发送预检请求

     首先和服务器确认是否同源，预检请求的请求方法为 `OPTIONS` ，<el-text size="large" type="success">携带三个字段：</el-text>

     - `Origin：源`
     - `Access-Control-Request-Method：请求类型`
     - `Access-Control-Request-Headers：修改了哪些请求头`

     服务器会返回响应的响应：

     - `Access-Control-Allow-Origin：我允许的源`
     - `Access-Control-Request-Method：我允许的请求类型`
     - `Access-Control-Request-Headers：我允许的修改了的请求头`
     - `Access-Control-Request-Headers：如果匹配成功就在此时间内我都会如此返回` ，浏览器可以缓存，等时间到期在发送预检请求

  2. 通过 `预检请求` 后，浏览器会再次发送响应请求；不通过，则 `跨域`

  #### 来看这个问题：

  跨域上传图片没有问题，但是提交普通表单却遇到了跨域问题前端小王仔细分析后，认为是服务器不支持预检请求导致的前端小王分析的结果有可能发生吗?
  答：有可能发生，上传图片用的 `POST` 请求，`Content-Type` 为 `multipart/form-data` ，但是提交表单一般会是 `Ajax` 请求， `Content-Type` 为 `application/json` ，所以修改了请求头，算是非简单请求，很可能会预检请求不过，导致跨域。

### JSONP

![/412424b2-8445-93d0-a88b-fb469e164e7e.png](/412424b2-8445-93d0-a88b-fb469e164e7e.png)

JSONP 是解决跨域问题的古老方案，在没有 CORS 之前被常常使用。

`同源策略` 中，对 `标签` 的跨域请求 `限制较小`，JSONP 利用了这一点。

::: warning ⚠️ 注意
JSONP 和 Ajax 没有关系，根本就不是 Ajax
:::

![/4667c3a9-13ce-e7b3-c641-66c99be163c5.png](/4667c3a9-13ce-e7b3-c641-66c99be163c5.png)

1. 页面中准备一个处理函数：

   ::: code-group

   ```js
   function handleFn(rep) {
     console.log(rep); // [1,2,3]
     // 做任何处理
   }
   ```

   :::

2. 创建 `script` 标签，将请求 `url` 作为标签的 `src` ，去请求 `JS`

   ::: code-group

   ```js
   function request(url) {
     const script = document.createElement("script");
     script.src = url;
     script.onload = function () {
       script.remove();
     };
     document.body.appendChild(script);
   }
   // 调用 JSONP 请求
   request("http://localhost:8080/api/user");
   ```

   :::

3. 服务器响应后，会返回一段 JS 脚本，浏览器当做 JS 文件去执行，在这个脚本中，会调用前面的处理函数，并把服务端响应的数据作为参数传入

   ::: code-group

   ```js
   handleFn([1, 2, 3]);
   ```

   :::

### 代理（Proxy）

![/59dd9c2f-b4f3-7540-4864-d503b285ed9b.png](/59dd9c2f-b4f3-7540-4864-d503b285ed9b.png)

::: code-group

```js
const express = require('express');
const app = express(); // 创建服务器
// 接受对路径 /hero 的 GET 请求
app.get('/hero', async (req, res) => {
  const axios = require('axios');
  const resp = await axios.get('https://pvp.qq.com/web201605/js/herolist.json')
    .then((resp) => console.log(resp.data))
  // 使用CORS解决对代理服务器的跨域
  res.header('access-control-allow-origin'，
    '*');
  // 响应一段测试文本
  res.send(resp.data);
});
//监听9527端口
app.listen(9527，() => {
  console.log('服务器已启动');
});
```

:::

### 前端常见跨域问题及解决方案

![/b3ed4892-1041-aeea-180f-72bbadcead5b.png](/b3ed4892-1041-aeea-180f-72bbadcead5b.png)

#### 经典场景 1

前端小王希望通过 AJAX 访问豆瓣电影的 API 接口，将它的电影数据展现到自己的网站上。

[https://movie.douban.com/j/search_subjects?type=movie&tag=热门&page_start=0](https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_start=0)

小王遇到了跨域问题

该跨域问题应该用哪种方式解决最合适?

- ⬜ CORS
- ⬜ JSONP
- ☑️ 代理
- ⬜ 在地上打滚

#### 经典场景 2

公司的后端服务器是支持 CORS 跨域的，但最近前端小王在开发时发现一个奇怪的现象：

1. 当本地使用 localhost:5000 打开页面后，请求服务器不会引发跨域问题
2. 当本地使用 127.0.0.1:5000 打开页面后，请求服务器出现了跨域错误。

前端小王首先要做的事情是：

- ⬜ 提着棍子找后端
- ⬜ 怒砸公司电脑
- ⬜ 吐口水
- ☑️ 对比前后服务器的响应头

通过上面的步骤，前端小王确定了，当本地源是 127.0.0.1 时，服务器不产生 `Access-Control-Allow-Origin` 响应头

前端小王接下来做什么事可能解决该问题：

- ☑️ 继续使用 `[localhost:5000](http://localhost:5000)` 打开页面
- ☑️ 提着棍子找后端
- ☑️ 端着茶找后端
- ⬜ 用头撞墙

#### 经典场景 3

前端小王所在的项目组维护着一个老项目，老项目中使用的是 JSONP 处理的跨域。

目前需要新增一个功能，新功能中要用到 AJAX 跨域提交 POST 请求。

继续使用 JSONP 能办到吗?

- ⬜ 能
- ☑️ 不能
- ⬜ 需要试一下才知道

::: tip
script 只能发送 GET 请求
:::

应该如何才能完成这个新功能的跨域请求

- ☑️ CORS
- ⬜ JSONP
- ☑️ 代理

#### 经典场景 4

前端小王入职后，项目负责人给了他一张公司服务器的部署图

![/90ba124b-effb-f1db-9d8d-e0a7a9072681.png](/90ba124b-effb-f1db-9d8d-e0a7a9072681.png)

![/134ea528-ff27-333b-d5f8-55906d38a934.png](/134ea528-ff27-333b-d5f8-55906d38a934.png)

同时告知了小王，为了安全，nginx 服务器不提供跨域解决方案 1

以上信息意味着:

- ⬜ 生产环境会发生跨域问题
- ☑️ 生产环境不会发生跨域问题
- ☑️ 开发环境会发生跨域问题
- ⬜ 开发环境不会发生跨域问题

这同时意味着，小王需要解决：

- ⬜ 生产环境的跨域问题
- ☑️ 开发环境的跨域问题

解决的方式是：

- ⬜ CORS
- ⬜ JSONP
- ☑️ 代理

::: tip
比如 Vue 开发中常见的配置 `代理服务器`
:::
