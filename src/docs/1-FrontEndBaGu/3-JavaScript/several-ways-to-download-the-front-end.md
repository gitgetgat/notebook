# 前端下载的几种方式

<article-info/>

## form 表单标签下载

::: code-group

```html
<body>
  <button
    onclick="inputDownloadEvt('get', 'http://192.168.66.183:13666/download', 'name', 'HAP.pdf')"
  >
    form标签下载
  </button>
  <script>
    /**
     * @param {String} method - 请求方法get/post
     * @param {String} url
     * @param {String} paramsKey - 请求参数名
     * @param {String} paramsValue - 请求参数值
     */
    function inputDownloadEvt(method, url, paramsKey, paramsValue) {
      const form = document.createElement("form");
      form.style.display = "none";
      form.setAttribute("target", "_blank");
      form.setAttribute("method", method);
      form.setAttribute("action", url);
      const input = document.createElement("input"); // [!code warning]
      input.setAttribute("type", "hidden"); // [!code warning]
      // 对于get请求 最终会拼成http://192.168.66.183:13666/download?name=HAP.pdf
      input.setAttribute("name", paramsKey); // [!code warning]
      input.setAttribute("value", paramsValue); // [!code warning]
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    }
  </script>
</body>
```

:::

::: tip ⚠️ 高亮部分
如果有多个参数，可以创建多个 input 标签
:::

- **优点**
  1. 兼容性好，不会出现 **`URL`** 长度限制问题
  2. **`form`** 标签 **`get`** 和 **`post`** 都可以
- **缺点**
  1. 无法获取下载进度
  2. 无法在 `header` 中携带 `token` 做鉴权操作
  3. 无法直接下载浏览器可直接预览的文件类型（`txt`、`png`、`pdf` 会直接预览）
  4. 无法判断接口是否返回成功

## window.open 下载

::: code-group

```html
<body>
  <button
    onclick="downloadEvt('http://192.168.66.183:13666/download?name=HAP.pdf')"
  >
    window.open下载
  </button>
  <script>
    function downloadEvt(url) {
      window.open(url, "_self");
    }
  </script>
</body>
```

:::

- **优点**
  1. 简单方便直接
  2. `form` 标签 `get` 和 `post` 都可以
- **缺点**
  1. 会出现 `URL` 长度限制问题
  2. 需要注意 **`URL`** 编码问题
  3. 无法获取下载进度
  4. 无法在 **`header`** 中携带 **`token`** 做鉴权操作
  5. 无法直接下载跨域下的浏览器可直接预览的文件类型（txt、png、pdf 会直接预览）
  6. 无法判断接口是否返回成功

### 三、**location.href 下载**

::: code-group

```js
<body>
  <button onclick="downloadEvt('http://192.168.66.183:13666/download?name=HAP.pdf')">location.href下载</button>
  <script>
    function downloadEvt(url) {
      window.location.href = url;
    }
  </script>
</body>
```

:::

- **优点**
  1. 简单方便直接
  2. 可以下载大文件 (G 以上)
- **缺点**
  1. 会出现 `URL` 长度限制问题
  2. 需要注意 `URL` 编码问题
  3. 无法获取下载进度
  4. 无法在 `header` 中携带 `token` 做鉴权操作
  5. 无法直接下载跨域下的浏览器可直接预览的文件类型（`txt`、`png`、`pdf` 会直接预览）
  6. 无法判断接口是否返回成功

## a 标签 download 属性下载

::: code-group

```html
<body>
  <a href="http://192.168.66.183:13666/download?name=HAP.pdf" download="test">
    点击下载
  </a>
</body>
```

:::

可以下载浏览器可直接预览的文件类型（`txt`、`png`、`pdf` 会直接预览），但是必须是同源，如果跨域，还是会预览

## a 标签下载

::: code-group

```html
<body>
  <button
    onclick="downloadEvt('http://192.168.66.183:13666/download?name=HAP.pdf')"
  >
    a标签下载
  </button>
  <script>
    function downloadEvt(url, fileName = "未知文件") {
      const el = document.createElement("a");
      el.style.display = "none";
      el.setAttribute("target", "_blank");
      /**
       * download的属性是HTML5新增的属性
       * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
       * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
       * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
       */
      fileName && el.setAttribute("download", fileName);
      el.href = url;
      console.log(el);
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
    }
  </script>
</body>
```

:::

**优点**：

- 可以下载 `txt、png、pdf` 等类型文件
- `download` 的属性是 `HTML5` 新增的属性 `href` 属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目（调用后台的接口），这时 `download` 就会不起作用。 此时，如果是下载浏览器无法解析的文件，例如`.exe`,`.xlsx`...那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如`.txt`,`.png`,`.pdf`...浏览器就会采取预览模式；所以，对于（`txt、png、pdf`）等的预览功能我们就可以直接不设置 `download` 属性(前提是后端响应头的 `Content-Type: application/octet-stream`，如果为 `application/pdf` 浏览器则会判断文件为 pdf ，自动执行预览的策略)

**缺点**：

- a 标签只能做 `get` 请求，所有 `url` 有长度限制
- 无法获取下载进度
- 无法在 `header` 中携带 `token` 做鉴权操作
- 跨域限制
- 无法判断接口是否返回成功
- `IE` 兼容问题

## ajax 下载（`Blob - 利用 Blob 对象生成 Blob URL`）

如果后端需要做 `token` 验证，那么`a、form、iframe、window.open、location.href`都无法在 `header` 中携带 `token`，这时候可以使用 `ajax` 来实现。

精简版：

::: code-group

```js
/**
 * 利用 ajax blob 下载文件
 * @param {String} path - 下载地址、下载请求地址
 * @param {String} name - 下载文件的名称/重命名（考虑到兼容问题，最好加上后缀名）
 */
function downloadFileByBlob(path, name) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", path);
  xhr.responseType = "blob";
  xhr.send();
  xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
      const url = URL.createObjectURL(this.response);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
}
```

:::

完全版：

::: code-group

```html
<body>
  <button
    onclick="downLoadAjaxEvt('get', 'http://192.168.66.183:13666/download?name=HAP.pdf')"
  >
    ajax下载
  </button>
  <script>
    function downloadEvt(url, fileName = "未知文件") {
      const el = document.createElement("a");
      el.style.display = "none";
      el.setAttribute("target", "_blank");
      /**
       * download的属性是HTML5新增的属性
       * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
       * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
       * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
       */
      fileName && el.setAttribute("download", fileName);
      el.href = url;
      console.log(el);
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
    }

    // 根据header里的contenteType转换请求参数
    function transformRequestData(contentType, requestData) {
      requestData = requestData || {};
      if (contentType.includes("application/x-www-form-urlencoded")) {
        // formData格式：key1=value1&key2=value2，方式二：qs.stringify(requestData, {arrayFormat: 'brackets'}) -- {arrayFormat: 'brackets'}是对于数组参数的处理
        let str = "";
        for (const key in requestData) {
          if (Object.prototype.hasOwnProperty.call(requestData, key)) {
            str += `${key}=${requestData[key]}&`;
          }
        }
        return encodeURI(str.slice(0, str.length - 1));
      } else if (contentType.includes("multipart/form-data")) {
        const formData = new FormData();
        for (const key in requestData) {
          const files = requestData[key];
          // 判断是否是文件流
          const isFile = files
            ? files.constructor === FileList ||
              (files.constructor === Array && files[0].constructor === File)
            : false;
          if (isFile) {
            for (let i = 0; i < files.length; i++) {
              formData.append(key, files[i]);
            }
          } else {
            formData.append(key, files);
          }
        }
        return formData;
      }
      // json字符串{key: value}
      return Object.keys(requestData).length ? JSON.stringify(requestData) : "";
    }
    /**
     * ajax实现文件下载、获取文件下载进度
     * @param {String} method - 请求方法get/post
     * @param {String} url
     * @param {Object} [params] - 请求参数，{name: '文件下载'}
     * @param {Object} [config] - 方法配置
     */
    function downLoadAjaxEvt(method = "get", url, params, config) {
      const _method = method.toUpperCase();
      const _config = Object.assign(
        {
          contentType:
            _method === "GET"
              ? "application/x-www-form-urlencoded"
              : "application/json", // 请求头类型
          fileName: "未知文件", // 下载文件名(必填，若为空，下载下来都是txt格式)
          async: true, // 请求是否异步-true异步、false同步
          token: "token" // 用户token
        },
        config
      );

      const queryParams = transformRequestData(_config.contentType, params);
      const _url = `${url}${
        _method === "GET" && queryParams ? "?" + queryParams : ""
      }`;

      const ajax = new XMLHttpRequest();
      ajax.open(_method, _url, _config.async);
      ajax.setRequestHeader("Authorization", _config.token);
      ajax.setRequestHeader("Content-Type", _config.contentType);
      // responseType若不设置，会导致下载的文件可能打不开
      ajax.responseType = "blob";
      // 获取文件下载进度
      ajax.addEventListener("progress", (progress) => {
        const percentage = ((progress.loaded / progress.total) * 100).toFixed(
          2
        );
        const msg = `下载进度 ${percentage}%...`;
        console.log(msg);
      });
      ajax.onload = function () {
        if (this.status === 200 || this.status === 304) {
          // 通过FileReader去判断接口返回是json还是文件流
          const fileReader = new FileReader();
          fileReader.onloadend = (e) => {
            if (
              this.getResponseHeader("content-type").includes(
                "application/json"
              )
            ) {
              const result = JSON.parse(
                fileReader.result || "{message: 服务器出现问题，请联系管理员}"
              );
              alert(result.message);
            } else {
              // 两种解码方式，区别自行百度: decodeURIComponent/decodeURI（主要获取后缀名，否则低版本浏览器会一律识别为txt，导致下载下来的都是txt）
              const _fileName = decodeURIComponent(
                (
                  this.getResponseHeader("content-disposition") ||
                  '; filename="未知文件"'
                )
                  .split(";")[1]
                  .trim()
                  .slice(9)
              );
              /**
               * Blob.type一个字符串，表明该 Blob 对象所包含数据的 MIME 类型。如果类型未知，则该值为空字符串。
               * 对于pdf：type为application/pdf  同时 a标签 不设置download属性, 可以直接预览
               */
              const blob = new Blob([this.response]);
              const href = URL.createObjectURL(blob);
              downloadEvt(href, _fileName);
              // 释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象
              URL.revokeObjectURL(href);
            }
          };
          // 调用readAsText读取文件，少了readAsText将不会触发onloadend事件
          fileReader.readAsText(this.response);
        } else {
          alert("服务器出现问题，请联系管理员");
        }
      };
      // send(string): string：仅用于 POST 请求
      ajax.send(queryParams);
    }
  </script>
</body>
```

:::

- `responseType` responseType 若不设置，会导致下载的文件可能打不开`ajax.responseType = 'blob';`
- `new FileReader()`

  1. 文件下载的接口存在返回失败的情况（例如：服务器连接不上、接口报错等），对于下载失败的情况我们需要在页面上弹出失败提示，而不是将失败信息写进文件里等用户打开，这时候可以使用`FileReader`去根据响应头里的`content-type`判断接口是否返回成功；
  2. 如果`content-type`返回`application/json`表示文件流返回失败，此时直接在页面上弹出失败信息（如下图）；如果是其他格式就认为文件流已经返回。

     ![/c585ce62-0746-3f14-ca5e-63c27a298239.png](/c585ce62-0746-3f14-ca5e-63c27a298239.png)

- `this.getResponseHeader('content-disposition')`  后端返回的文件名称，主要获取后缀名，否则某些浏览器会一律识别为 txt，导致下载下来的都是 txt（如下图）
  ![/c3787e51-50db-68e0-e070-2b5749592837.png](/c3787e51-50db-68e0-e070-2b5749592837.png)
- `new Blob([this.response], {type: '文件类型'})`<link-tag :linkList="[{ linkText:'Application Type 对照表',linkUrl:'https://tools.jb51.net/table/http_content_type/'}]" />

  1. `Blob.type` 一个字符串，表明该 `Blob` 对象所包含数据的 `MIME` 类型。如果类型未知，则该值为空字符串；
  2. 对于 `pdf`，`type` 值为 `application/pdf` 同时 `a` 标签 不设置 `download` 属性（如下图）, 可以直接预览（如下图）

     ![/5ee310c3-e602-9927-275a-53e3f83801c2.png](/5ee310c3-e602-9927-275a-53e3f83801c2.png)

     ![/b25ba236-adea-2e85-7461-e6593b1afb9c.png](/b25ba236-adea-2e85-7461-e6593b1afb9c.png)

- `axios` 中其实已经提供了获取文件上传和下载进度的事件，这里我使用的是原生 `ajax`（`axios` 雷同，只需要修改请求方法）。
  ![/ac25922b-d156-f8ee-82ba-17f1a859bddf.png](/ac25922b-d156-f8ee-82ba-17f1a859bddf.png)

**优点**：

- 可以下载 **`txt、png、pdf`** 等类型文件
- 可以在 `header` 中携带 `token` 做鉴权操作
- 可以获取文件下载进度
- 可以判断接口是否返回成功

**缺点**：

- 兼容性问题，IE10 以下不可用，注意 Safari 浏览器,官网给出  `Safari has a serious issue with blobs that are of the type application/octet-stream`
- 将后端返回的文件流全部获取后才会下载

## ajax 下载（`Data URL - base64 编码后的 url`）

精简版：

::: code-group

```js
/**
 * 利用 ajax base64 下载文件
 * @param {String} path - 下载地址、下载请求地址
 * @param {String} name - 下载文件的名称/重命名（考虑到兼容问题，最好加上后缀名）
 */
function downloadFileByBlob(path, name) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", path);
  xhr.responseType = "blob";
  xhr.send();
  xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.response);
      fileReader.onload = function () {
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = this.result;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    }
  };
}
```

:::

完整版：

::: code-group

```html
<body>
  <button
    onclick="downLoadAjaxEvt('get', 'http://192.168.66.183:13666/download?name=HAP.pdf')"
  >
    ajax下载(base64)
  </button>
  <script>
    function downloadEvt(url, fileName = "未知文件") {
      const el = document.createElement("a");
      el.style.display = "none";
      el.setAttribute("target", "_blank");
      /**
       * download的属性是HTML5新增的属性
       * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
       * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
       * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
       */
      fileName && el.setAttribute("download", fileName);
      el.href = url;
      console.log(el);
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
    }

    // 根据header里的contenteType转换请求参数
    function transformRequestData(contentType, requestData) {
      requestData = requestData || {};
      if (contentType.includes("application/x-www-form-urlencoded")) {
        // formData格式：key1=value1&key2=value2，方式二：qs.stringify(requestData, {arrayFormat: 'brackets'}) -- {arrayFormat: 'brackets'}是对于数组参数的处理
        let str = "";
        for (const key in requestData) {
          if (Object.prototype.hasOwnProperty.call(requestData, key)) {
            str += `${key}=${requestData[key]}&`;
          }
        }
        return encodeURI(str.slice(0, str.length - 1));
      } else if (contentType.includes("multipart/form-data")) {
        const formData = new FormData();
        for (const key in requestData) {
          const files = requestData[key];
          // 判断是否是文件流
          const isFile = files
            ? files.constructor === FileList ||
              (files.constructor === Array && files[0].constructor === File)
            : false;
          if (isFile) {
            for (let i = 0; i < files.length; i++) {
              formData.append(key, files[i]);
            }
          } else {
            formData.append(key, files);
          }
        }
        return formData;
      }
      // json字符串{key: value}
      return Object.keys(requestData).length ? JSON.stringify(requestData) : "";
    }
    /**
     * ajax实现文件下载、获取文件下载进度
     * @param {String} method - 请求方法get/post
     * @param {String} url
     * @param {Object} [params] - 请求参数，{name: '文件下载'}
     * @param {Object} [config] - 方法配置
     */
    function downLoadAjaxEvt(method = "get", url, params, config) {
      const _method = method.toUpperCase();
      const _config = Object.assign(
        {
          contentType:
            _method === "GET"
              ? "application/x-www-form-urlencoded"
              : "application/json", // 请求头类型
          fileName: "未知文件", // 下载文件名(必填，若为空，下载下来都是txt格式)
          async: true, // 请求是否异步-true异步、false同步
          token: "token" // 用户token
        },
        config
      );

      const queryParams = transformRequestData(_config.contentType, params);
      const _url = `${url}${
        _method === "GET" && queryParams ? "?" + queryParams : ""
      }`;

      const ajax = new XMLHttpRequest();
      ajax.open(_method, _url, _config.async);
      ajax.setRequestHeader("Authorization", _config.token);
      ajax.setRequestHeader("Content-Type", _config.contentType);
      // responseType若不设置，会导致下载的文件可能打不开
      ajax.responseType = "blob";
      // 获取文件下载进度
      ajax.addEventListener("progress", (progress) => {
        const percentage = ((progress.loaded / progress.total) * 100).toFixed(
          2
        );
        const msg = `下载进度 ${percentage}%...`;
        console.log(msg);
      });
      ajax.onload = function () {
        if (this.status === 200 || this.status === 304) {
          // 通过FileReader去判断接口返回是json还是文件流
          const fileReader = new FileReader();
          fileReader.readAsDataURL(this.response);
          fileReader.onload = () => {
            if (
              this.getResponseHeader("content-type").includes(
                "application/json"
              )
            ) {
              alert("服务器出现问题，请联系管理员");
            } else {
              // 两种解码方式，区别自行百度: decodeURIComponent/decodeURI（主要获取后缀名，否则某些浏览器会一律识别为txt，导致下载下来的都是txt）
              const _fileName = decodeURIComponent(
                (
                  this.getResponseHeader("content-disposition") ||
                  '; filename="未知文件"'
                )
                  .split(";")[1]
                  .trim()
                  .slice(9)
              );
              // 也可以用FileSaver（需提前引入https://github.com/eligrey/FileSaver.js）: saveAs(fileReader.result, _fileName);
              downloadEvt(fileReader.result, _fileName);
            }
          };
        } else {
          alert("服务器出现问题，请联系管理员");
        }
      };
      // send(string): string：仅用于 POST 请求
      ajax.send(queryParams);
    }
  </script>
</body>
```

:::

- `fileSaver`  网上介绍很多，可以自己百度下，也可以看下面这篇
  [**前端下载利器——FileSaver**](../../6-Share/Library/filesaver-a-powerful-front-end-download-tool.md)
- 大文件流式下载可以百度这个：**`StreamSaver.js`**

**优点**

- 可以下载 **`txt、png、pdf`** 等类型文件
- 可以在 **`header`** 中携带 **`token`** 做鉴权操作
- 可以获取文件下载进度
- 可以判断接口是否返回成功

**缺点**

- 兼容性问题，<imp-text-warning>IE10 以下</imp-text-warning> 不可用
- 将后端返回的文件流全部获取后才会下载

### 八、**大文件下载注意点**

- `fileSaver`  批量下载时，总量不超过 2G 可以用下这个，但是每个浏览器允许下载的最大文件不一样~

![/e1b9ccf2-6922-7215-c536-6e600a2b1a7d.png](/e1b9ccf2-6922-7215-c536-6e600a2b1a7d.png)

- `ajax` 下载 如果后端需要对下载接口做 token 鉴权，此时需要使用 ajax 获取文件流（第六、七点），可以了解下 <link-tag :linkList="[{ linkText:'ajax 文件下载原理',linkUrl:'https://blog.csdn.net/wiki_Wei/article/details/85325926'}]" />。 简单来说，文件下载依赖浏览器特性。前端获取到服务器端生成的字节流，此时数据是存在于 **js 的内存中** 的，是不可以直接保存在本地的，利用`Blob`对象和`window.URL.createObjectURL`对象生成一个虚拟的 URL 地址，然后在利用浏览器的特性进行下载。 因此对于 ajax 下载 **大文件** 时，会出现 <imp-text-danger>浏览器崩溃</imp-text-danger> 情况，此时可以考虑使用 **链接直接下载** 或使用 **分片下载**
  ![/4058576f-8a22-b54b-d2f8-ece1ca5f79f7.png](/4058576f-8a22-b54b-d2f8-ece1ca5f79f7.png)
- 链接下载 链接下载需要后端一边去下载要打包的文件，一边把打包好的东西写入这个链接。存在的问题是，如果文件很大，那么这个链接需要一直保持，相当于这个接口一直开着没有结束；而且一旦中间出了什么问题，已经下载的东西也全部废了，因此推荐使用 **分片下载**。
- 大文件分片技巧可以参考下：
  [如何分片下载大文件，巧妙使用 http range 技术](./how-to-download-large-files-in-pieces-and-use-http-range-technology-ingeniously.md)
