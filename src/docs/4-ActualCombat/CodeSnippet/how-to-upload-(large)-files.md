# 文件（大）上传是怎么做的?

<article-info/>

## 文件上传核心逻辑

![/808fc983-5d63-f60c-0f0b-c4da28b4f571.png](/808fc983-5d63-f60c-0f0b-c4da28b4f571.png)

所以第一步最重要的是 `调试接口`

这里推荐一个可以以最原始的方式发送 http 请求的 VSCode 插件：`REST Client`

![/ba689795-d4b2-3da8-b6fd-e330bccbd98e.png](/ba689795-d4b2-3da8-b6fd-e330bccbd98e.png)

## 单文件上传

API 文档：

单文件上传

请求路径：/upload/single

请求方法：POST

消息格式：`multipart/form-data`

字段名称：avatar

允许的后缀名：['.jpg’，‘.jpeg’，'.bmp'，'.webp'，'.gif'，' .png' ]

最大尺寸: 1M

响应格式：JSON

响应结果示例：

::: code-group

```js
// 成功
{
  "data": "文件的访问地址"
}
// 失败: 后缀名不符号要求
{
  "errCode": 1,
  "errMsg": "后缀名不符合要求",
}
// 失败: 文件过大
{
  "errCode": 2,
  "errMsg": "文件过大",
}
```

:::

代码实例（仅 JS）：

::: code-group

```js
const $ = document.querySelector.bind(document);
const doms = {
  img: $(".preview"),
  container: $(".upload"),
  select: $(".upload-select"),
  selectFile: $(".upload-select input"),
  progress: $(".upload-progress"),
  cancelBtn: $(".upload-progress button"),
  delBtn: $(".upload-result button")
};
// 展示某个界面
function showArea(areaName) {
  doms.container.className = `upload ${areaName}`;
}
// 设置进度
function setProgress(value) {
  doms.progress.style.setProperty("--percent", value);
}

doms.select.onclick = function () {
  doms.selectFile.click();
};

let cancelUpload = null;
function cancel() {
  // 取消网络传输
  cancelUpload && cancelUpload();
  showArea("select");
  doms.selectFile.value = null;
}
// 上传控件改变时触发
doms.selectFile.onchange = function () {
  if (this.files.length === 0) {
    return;
  }
  const file = this.files[0];
  if (!validateFile(file)) {
    return;
  }
  // 切换界面
  showArea("progress");
  // 显示预览图（dataURL）
  const reader = new FileReader();
  reader.onload = (e) => {
    doms.img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  // 上传
  cancelUpload = upload(
    file,
    function (val) {
      // 进度变化
      setProgress(val);
    },
    function (resp) {
      showArea("result");
    }
  );
};

/**
 * 核心——网络传输
 * formData上传
 * @param {*} file
 * @param {Function} onProgress
 * @param {Function} onFinish
 * @return {*}
 */
function upload(file, onProgress, onFinish) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const resp = JSON.parse(xhr.responseText);
    onFinish(resp);
  };
  xhr.upload.onProgress = (e) => {
    const percent = Math.floor((e.loaded / e.total) * 100);
    onProgress(percent);
  };
  xhr.open("POST", "http://test.com:9527/upload/single");
  const form = new FormData();
  form.append("avatar", file);
  xhr.send(form);
  return function () {
    // 取消
    xhr.abort();
  };
}
/**
 * 验证文件大小，和后缀是否合法
 * @param {*} file input上传的文件信息 {name,size,type,...}
 * @return {*} boolean
 */
function validateFile(file) {
  const sizeLimit = 1 * 1024 * 1024;
  const legalExts = [".jpg", ".jpeg", ".bmp", ".webp", ".gif", ".png"];
  if (file.size > sizeLimit) {
    alert("文件尺寸过大！");
    return false;
  }
  const name = file.name.toLowerCase();
  if (
    !legalExts.some((ext) => {
      name.endWith(ext);
    })
  ) {
    alert("文件类型不正确");
    return false;
  }
  return true;
}

doms.cancelBtn.onclick = doms.delBtn.onclick = cancel;
```

:::

## 拖拽上传

API 文档：

单文件上传

请求路径：/upload/single

请求方法：POST

消息格式：`multipart/form-data`

字段名称：avatar

允许的后缀名：['.jpg’，‘.jpeg’，'.bmp'，'.webp'，'.gif'，' .png' ]

最大尺寸: 1M

响应格式：JSON

响应结果示例：

::: code-group

```js
// 成功
{
  "data": "文件的访问地址"
}
// 失败: 后缀名不符号要求
{
  "errCode": 1,
  "errMsg": "后缀名不符合要求",
}
// 失败: 文件过大
{
  "errCode": 2,
  "errMsg": "文件过大",
}
```

:::

代码实例（仅 JS）：

1. 简单的修改：

   由于 **`input`** 标签本身支持拖拽上传，在上面单文件基础上，将 input 标签 **`display：none`** 取消，放出来，并且宽高占满上传组件，用 **`opacity：0`** 替代即可

2. 考虑兼容性：

   在上面单文件基础上，给 div 使用 H5 的拖拽 API

   ::: code-group

   ```js
   const $ = document.querySelector.bind(document);
   const doms = {
     img: $(".preview"),
     container: $(".upload"),
     select: $(".upload-select"),
     selectFile: $(".upload-select input"),
     progress: $(".upload-progress"),
     cancelBtn: $(".upload-progress button"),
     delBtn: $(".upload-result button")
   };
   // 展示某个界面
   function showArea(areaName) {
     doms.container.className = `upload ${areaName}`;
   }
   // 设置进度
   function setProgress(value) {
     doms.progress.style.setProperty("--percent", value);
   }

   doms.select.ondragenter = (e) => {
     e.preventDefault();
     doms.select.classList.add("draging");
   };

   doms.select.ondragleave = (e) => {
     e.preventDefault();
     doms.select.classList.remove("draging");
   };

   doms.select.ondragover = (e) => {
     // ondragover 会在移动时一直触发
     e.preventDefault();
   };

   doms.select.ondrag = (e) => {
     e.preventDefault();
     // console.log(e.dataTransfer.files);
     const files = e.dataTransfer.files;
     if (!files.types.includes("files")) {
       alert("仅支持拖拽文件上传");
     }
     if (files.length !== 1) {
       alert("仅支持单文件上传");
     }
     doms.select.classList.remove("draging");
     doms.selectFile.files = files;
     changeHandler();
   };

   doms.select.onclick = function () {
     doms.selectFile.click();
   };

   let cancelUpload = null;
   function cancel() {
     // 取消网络传输
     cancelUpload && cancelUpload();
     showArea("select");
     doms.selectFile.value = null;
   }

   const changeHandler = function () {
     if (this.files.length === 0) {
       return;
     }
     const file = this.files[0];
     if (!validateFile(file)) {
       return;
     }
     // 切换界面
     showArea("progress");
     // 显示预览图（dataURL）
     const reader = new FileReader();
     reader.onload = (e) => {
       doms.img.src = e.target.result;
     };
     reader.readAsDataURL(file);
     // 上传
     cancelUpload = upload(
       file,
       function (val) {
         // 进度变化
         setProgress(val);
       },
       function (resp) {
         showArea("result");
       }
     );
   };
   // 上传控件改变时触发
   doms.selectFile.onchange = changeHandler;

   /**
    * 核心——网络传输
    * formData上传
    * @param {*} file
    * @param {Function} onProgress
    * @param {Function} onFinish
    * @return {*}
    */
   function upload(file, onProgress, onFinish) {
     const xhr = new XMLHttpRequest();
     xhr.onload = function () {
       const resp = JSON.parse(xhr.responseText);
       onFinish(resp);
     };
     xhr.upload.onProgress = (e) => {
       const percent = Math.floor((e.loaded / e.total) * 100);
       onProgress(percent);
     };
     xhr.open("POST", "http://test.com:9527/upload/single");
     const form = new FormData();
     form.append("avatar", file);
     xhr.send(form);
     return function () {
       // 取消
       xhr.abort();
     };
   }
   /**
    * 验证文件大小，和后缀是否合法
    * @param {*} file input上传的文件信息 {name,size,type,...}
    * @return {*} boolean
    */
   function validateFile(file) {
     const sizeLimit = 1 * 1024 * 1024;
     const legalExts = [".jpg", ".jpeg", ".bmp", ".webp", ".gif", ".png"];
     if (file.size > sizeLimit) {
       alert("文件尺寸过大！");
       return false;
     }
     const name = file.name.toLowerCase();
     if (
       !legalExts.some((ext) => {
         name.endWith(ext);
       })
     ) {
       alert("文件类型不正确");
       return false;
     }
     return true;
   }

   doms.cancelBtn.onclick = doms.delBtn.onclick = cancel;
   ```

   :::

## Base64 上传

::: tip
和上面单文件上传稍有不同，只是在上传时的格式不同，将读取到的文件数据转换成 base64 格式
:::

API 文档：

Base64 上传

请求路径：/upload/base64

请求方法：POST

消息格式：`json`，示例：

::: code-group

```js
{
  "ext": ".png",
  "avatar": "图片的base64格式"
}
```

:::

字段名称：avatar

允许的后缀名：['.jpg’，‘.jpeg’，'.bmp'，'.webp'，'.gif'，' .png' ]

最大尺寸: 1M

响应格式：JSON

响应结果示例：

::: code-group

```js
// 成功
{
  "data": "文件的访问地址"
}
// 失败: 后缀名不符号要求
{
  "errCode": 1,
  "errMsg": "后缀名不符合要求",
}
// 失败: 文件过大
{
  "errCode": 2,
  "errMsg": "文件过大",
}
```

:::

代码实例（仅 JS）：

::: code-group

```js
const $ = document.querySelector.bind(document);
const doms = {
  img: $(".preview"),
  container: $(".upload"),
  select: $(".upload-select"),
  selectFile: $(".upload-select input"),
  progress: $(".upload-progress"),
  cancelBtn: $(".upload-progress button"),
  delBtn: $(".upload-result button")
};
// 展示某个界面
function showArea(areaName) {
  doms.container.className = `upload ${areaName}`;
}
// 设置进度
function setProgress(value) {
  doms.progress.style.setProperty("--percent", value);
}

doms.select.ondragenter = (e) => {
  e.preventDefault();
  doms.select.classList.add("draging");
};

doms.select.ondragleave = (e) => {
  e.preventDefault();
  doms.select.classList.remove("draging");
};

doms.select.ondragover = (e) => {
  // ondragover 会在移动时一直触发
  e.preventDefault();
};

doms.select.ondrag = (e) => {
  e.preventDefault();
  // console.log(e.dataTransfer.files);
  const files = e.dataTransfer.files;
  if (!files.types.includes("files")) {
    alert("仅支持拖拽文件上传");
  }
  if (files.length !== 1) {
    alert("仅支持单文件上传");
  }
  doms.select.classList.remove("draging");
  doms.selectFile.files = files;
  changeHandler();
};

doms.select.onclick = function () {
  doms.selectFile.click();
};

let cancelUpload = null;
function cancel() {
  // 取消网络传输
  cancelUpload && cancelUpload();
  showArea("select");
  doms.selectFile.value = null;
}

const changeHandler = function () {
  if (this.files.length === 0) {
    return;
  }
  const file = this.files[0];
  if (!validateFile(file)) {
    return;
  }
  // 切换界面
  showArea("progress");
  // 显示预览图（dataURL）
  const reader = new FileReader();
  reader.onload = (e) => {
    doms.img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  // 上传
  cancelUpload = uploadBase64(
    file,
    function (val) {
      // 进度变化
      setProgress(val);
    },
    function (resp) {
      showArea("result");
    }
  );
};
// 上传控件改变时触发
doms.selectFile.onchange = changeHandler;

/**
 * 核心——网络传输
 * base64上传
 * @param {*} file
 * @param {Function} onProgress
 * @param {Function} onFinish
 * @return {*}
 */
function uploadBase64(file, onProgress, onFinish) {
  const ext = "." + file.name.split(".").pop();
  const reader = new FileReader();
  let xhr;
  reader.onload = (e) => {
    // 获取base64数据
    const base64 = e.target.result.split(".").pop();
    xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const resp = JSON.parse(xhr.responseText);
      onFinish(resp);
    };
    xhr.upload.onProgress = (e) => {
      const percent = Math.floor((e.loaded / e.total) * 100);
      onProgress(percent);
    };
    xhr.open("POST", "http://test.com:9527/upload/single");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(
      JSON.stringify({
        ext,
        avatar: base64
      })
    );
  };
  reader.readAsDataURL(file);

  return function () {
    // 取消
    xhr && xhr.abort();
  };
}
/**
 * 验证文件大小，和后缀是否合法
 * @param {*} file input上传的文件信息 {name,size,type,...}
 * @return {*} boolean
 */
function validateFile(file) {
  const sizeLimit = 1 * 1024 * 1024;
  const legalExts = [".jpg", ".jpeg", ".bmp", ".webp", ".gif", ".png"];
  if (file.size > sizeLimit) {
    alert("文件尺寸过大！");
    return false;
  }
  const name = file.name.toLowerCase();
  if (
    !legalExts.some((ext) => {
      name.endWith(ext);
    })
  ) {
    alert("文件类型不正确");
    return false;
  }
  return true;
}

doms.cancelBtn.onclick = doms.delBtn.onclick = cancel;
```

:::

## 二进制格式上传

API 文档：

二进制格式上传

请求路径：/upload/binary

请求方法：POST

消息格式：`binary（application/octet-stream）`

消息头：`x-ext：文件的后缀名，例如 .jpg`

允许的后缀名：['.jpg’，‘.jpeg’，'.bmp'，'.webp'，'.gif'，' .png' ]

最大尺寸: 1M

响应格式：JSON

响应结果示例：

::: code-group

```js
// 成功
{
  "data": "文件的访问地址"
}
// 失败: 后缀名不符号要求
{
  "errCode": 1,
  "errMsg": "后缀名不符合要求",
}
// 失败: 文件过大
{
  "errCode": 2,
  "errMsg": "文件过大",
}
```

:::

代码实例（仅 JS）：

::: code-group

```js
const $ = document.querySelector.bind(document);
const doms = {
  img: $(".preview"),
  container: $(".upload"),
  select: $(".upload-select"),
  selectFile: $(".upload-select input"),
  progress: $(".upload-progress"),
  cancelBtn: $(".upload-progress button"),
  delBtn: $(".upload-result button")
};
// 展示某个界面
function showArea(areaName) {
  doms.container.className = `upload ${areaName}`;
}
// 设置进度
function setProgress(value) {
  doms.progress.style.setProperty("--percent", value);
}

doms.select.ondragenter = (e) => {
  e.preventDefault();
  doms.select.classList.add("draging");
};

doms.select.ondragleave = (e) => {
  e.preventDefault();
  doms.select.classList.remove("draging");
};

doms.select.ondragover = (e) => {
  // ondragover 会在移动时一直触发
  e.preventDefault();
};

doms.select.ondrag = (e) => {
  e.preventDefault();
  // console.log(e.dataTransfer.files);
  const files = e.dataTransfer.files;
  if (!files.types.includes("files")) {
    alert("仅支持拖拽文件上传");
  }
  if (files.length !== 1) {
    alert("仅支持单文件上传");
  }
  doms.select.classList.remove("draging");
  doms.selectFile.files = files;
  changeHandler();
};

doms.select.onclick = function () {
  doms.selectFile.click();
};

let cancelUpload = null;
function cancel() {
  // 取消网络传输
  cancelUpload && cancelUpload();
  showArea("select");
  doms.selectFile.value = null;
}

const changeHandler = function () {
  if (this.files.length === 0) {
    return;
  }
  const file = this.files[0];
  if (!validateFile(file)) {
    return;
  }
  // 切换界面
  showArea("progress");
  // 显示预览图（dataURL）
  const reader = new FileReader();
  reader.onload = (e) => {
    doms.img.src = e.target.result;
  };
  reader.readAsDataURL(file);
  // 上传
  cancelUpload = upload(
    file,
    function (val) {
      // 进度变化
      setProgress(val);
    },
    function (resp) {
      showArea("result");
    }
  );
};
// 上传控件改变时触发
doms.selectFile.onchange = changeHandler;

/**
 * 核心——网络传输
 * 二进制上传
 * @param {*} file
 * @param {Function} onProgress
 * @param {Function} onFinish
 * @return {*}
 */
function uploadBinary(file, onProgress, onFinish) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const resp = JSON.parse(xhr.responseText);
    onFinish(resp);
  };
  xhr.upload.onProgress = (e) => {
    const percent = Math.floor((e.loaded / e.total) * 100);
    onProgress(percent);
  };
  xhr.open("POST", "http://test.com:9527/upload/single");
  xhr.setRequestHeader("content-type", "application/octet-stream");
  xhr.setRequestHeader("x-ext", "." + file.name.split(".").pop());
  xhr.send(file);
  return function () {
    // 取消
    xhr.abort();
  };
}
/**
 * 验证文件大小，和后缀是否合法
 * @param {*} file input上传的文件信息 {name,size,type,...}
 * @return {*} boolean
 */
function validateFile(file) {
  const sizeLimit = 1 * 1024 * 1024;
  const legalExts = [".jpg", ".jpeg", ".bmp", ".webp", ".gif", ".png"];
  if (file.size > sizeLimit) {
    alert("文件尺寸过大！");
    return false;
  }
  const name = file.name.toLowerCase();
  if (
    !legalExts.some((ext) => {
      name.endWith(ext);
    })
  ) {
    alert("文件类型不正确");
    return false;
  }
  return true;
}

doms.cancelBtn.onclick = doms.delBtn.onclick = cancel;
```

:::

## 裁剪上传

裁剪上传的上传部分和其他没什么区别，主要在于交互和转换上

代码实例：

::: code-group

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="file" name="" id="" />
    <img src="" alt="" class="preview" />
    <button>生成截图后的file对象</button>
    <script>
      const inpFile = document.querySelector('input[type="file"]');
      const img = document.querySelector(".preview");
      const btn = document.querySelector("button");

      inpFile.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      };
      btn.onclick = () => {
        // 拿到裁剪后的file对象
        const cutInfo = {
          x: 500,
          y: 500,
          cutWidth: 300,
          cutHeight: 300,
          width: 100,
          height: 100
        };
        const canvas = document.createElement("canvas");
        canvas.width = cutInfo.width;
        canvas.height = cutInfo.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          cutInfo.x,
          cutInfo.y,
          cutInfo.cutWidth,
          cutInfo.cutHeight,
          0,
          0,
          cutInfo.width,
          cutInfo.height
        );
        canvas.toBlob((blob) => {
          const file = new File([blob], "avatar.jpg", {
            type: "image/jpeg"
          });
          // ajax 将 file 上传到服务器
        }, "image/jpeg");
        document.body.appendChild(canvas);
      };
    </script>
  </body>
</html>
```

:::

## 大文件分片上传

大文件上传的核心还是`前段分片`，其他的只是将分片的小数据块分次发送请求到服务器，再由服务器合并分片成源文件。

::: warning ⚠️ 注意：

1. 大文件切片快的原因是，浏览器读取的只是文件的基本信息（size，type，name），并未读取到真正的数据，切片也只是根据文件的基本信息切片

`文件秒传`和`断点续传`的核心是告诉服务器`文件标识`，服务器再告诉我们是否已经上传过或者还有哪些分片没有传，这个标识就是`hash`，可以用插件 `spark-md5` 完成

:::

代码实例：

::: warning ⚠️ 注意：

1. 大文件计算 `hash`，如果读取整个文件那太慢了，也太吃内存，所以 `分片累计计算 hash`是一个不错方法，也就是`增量算法` ，把每次计算的结果和下一次一起计算。

2. 优化 hash 计算

- 使用 Promise 将计算 hash 异步，使它不卡顿主线程；
- 再提升一步，可以使用 web worker 另起一个线程去计算
- 如果使用 web worker 还有几率卡顿的话，可以将大文件拆分小模块，然后把小模块分片计算 hash 并上传分片，等空闲了，再计算其他部分模块。
  :::

::: code-group

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="file" name="" id="" />
    <script src="https://cdn.bootcdn.net/ajax/libs/spark-md5/3.0.2/spark-md5.min.js"></script>
    <script>
      const inp = document.querySelector("input");
      inp.onchange = async (e) => {
        const file = inp.files[0];
        if (!file) {
          return;
        }
        const chunks = createChunks(file, 10 * 1024 * 1024);
        const hashStr = await hash(chunks);
        console.log(hashStr);
      };
      // 增量计算 hash
      function hash(chunks) {
        return new Promise((resolve, reject) => {
          const spark = new SparkMD5();
          function _read(i) {
            if (i >= chunks.length) {
              resolve(spark.end());
              return;
            }
            const blob = chunks[i];
            const reader = new FileReader();
            reader.onload = (e) => {
              const bytes = e.target.result;
              spark.append(bytes);
              _read(i + 1);
            };
            reader.readAsArrayBuffer(blob);
          }
          _read(0);
        });
      }
      // 大文件切片
      function createChunks(file, chunkSize) {
        const result = [];
        for (let i = 0; i < file.size; i += chunkSize) {
          result.push(file.slice(i, i + chunkSize));
        }
        return result;
      }
    </script>
  </body>
</html>
```

:::
