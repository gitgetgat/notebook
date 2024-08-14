# 如何分片下载大文件，巧妙使用 http range 技术

<article-info/>

::: code-group

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/axios@1.6.2/dist/axios.min.js"></script>
  </head>
  <body>
    <img id="img" />
    <script>
      const p1 = new Promise((resolve, reject) => {
        axios
          .get("http://127.0.0.1:8080//test1.webp", {
            headers: {
              range: "bytes=0-40000"
            },
            responseType: "arraybuffer" // 返回的必须是 arraybuffer 类型
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
      const p2 = new Promise((resolve, reject) => {
        axios
          .get("http://127.0.0.1:8080//test1.webp", {
            headers: {
              range: "bytes=40001-"
            },
            responseType: "arraybuffer"
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
      Promise.all([p1, p2]).then((res) => {
        const [buffer1, buffer2] = res;
        console.log(buffer1, buffer2);
        // 不能直接操作 ArrayBuffer 中的内容；而是要通过类型化数组对象或 DataView 对象来操作
        const arr = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

        const arr1 = new Uint8Array(buffer1);
        arr.set(arr1, 0);

        const arr2 = new Uint8Array(buffer2);
        arr.set(arr2, arr1.byteLength);

        // 构建 blob，转为 url，赋值给 img 标签的 src
        const blob = new Blob([arr.buffer]);
        const url = URL.createObjectURL(blob);
        const img = document.getElementById("img");
        img.src = url;

        // a 标签通过 url 下载
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.jpg";
        document.body.appendChild(link);
        link.click();
        link.addEventListener("click", () => {
          link.remove();
        });
      });
    </script>
  </body>
</html>
```

:::

::: warning ⚠️ 注意

- 需要知道文件总大小，才好分片下载
- 跨域无法下载，先请求分片数据时也要注意跨域

:::
