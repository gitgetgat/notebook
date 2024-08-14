# Ajax 是什么？怎么实现的？

<article-info/>

## Ajax 是什么?

- `Ajax` 即 `“Asynchronous Javascript And XML”（异步 JavaScript 和 XML）`，是指⼀种创建交互式⽹⻚应⽤的⽹⻚开发技术。
- `Ajax` 是⼀种⽤于创建快速动态⽹⻚的技术。
- `Ajax` 是⼀种在⽆需重新加载整个⽹⻚的情况下，能够更新部分⽹⻚的技术。
- 通过在后台与服务器进⾏少量数据交换，`Ajax` 可以使⽹⻚实现异步更新。这意味着可以在不重新加载整个⽹⻚的情况下，对⽹⻚的某部分进⾏更新。
- 传统的⽹⻚（不使⽤ `Ajax`）如果需要更新内容，必须重载整个⽹⻚⻚⾯。

## 同步与异步

- <el-text size="large" type="success">同步</el-text>：发送⼀个请求，需要等待响应返回，然后才能够发送下⼀个请求，如果该请求没有响应，不能发送下⼀个请求，客户端会处于⼀直等待过程中。
- <el-text size="large" type="success">异步</el-text>：发送⼀个请求，不需要等待响应返回，随时可以再发送下⼀个请求，即不需要等待。

## 应用场景

- 在线视频、直播平台等…评论实时更新、点赞、⼩礼物、…
- 会员注册时的信息验证，⼿机号、账号唯⼀
- 百度关键搜索补全功能

## 实现

::: code-group

```html [原生 JS]
<html>
  <head>
    <title>Title</title>
    <script type="text/javascript">
      function testJsAjax() {
        //1. 创建核⼼对象
        var xmlhttp = new XMLHttpRequest();
        //2.通过核⼼对象⽅法给当前的对象提供访问⽅式和URL路径
        xmlhttp.open("GET", "jsAjax?name=liuyan", true);
        //3.发送当前的请求⾄指定的URL
        xmlhttp.send();
        //4.接收返回值并处理
        xmlhttp.onreadystatechange = function () {
          //xmlhttp.readyState==4代表XMLHttpRequest对象读取服务器的响应结束
          //xmlhttp.status==200响应成功
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var msg = xmlhttp.responseText;
            document.getElementById("msg").innerHTML = msg;
          }
        };
      }
    </script>
  </head>
  <body>
    <div id="msg"></div>
    <input
      type="button"
      name="btn"
      value="JS原⽣⽅式实现异步"
      οnclick="testJsAjax()"
    />
  </body>
</html>
```

```js [JQuery]
$.ajax({
  url: "",
  data: {},
  type: "post/get",
  async: true,
  dataType: "text",
  success: function (obj) {},
  error: function () {}
});
```

:::
