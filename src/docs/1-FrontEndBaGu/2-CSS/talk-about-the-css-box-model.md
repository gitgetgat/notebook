# 说一下 CSS 盒模型

<article-info/>

![/734365ed-af19-7310-c13e-cefdd0873118.png](/734365ed-af19-7310-c13e-cefdd0873118.png)

![/c1ccb900-1bfa-0f36-846d-5d9cfc0755e3.png](/c1ccb900-1bfa-0f36-846d-5d9cfc0755e3.png)

- CSS 的盒子模型有哪些： `标准盒子模型`、`IE 盒子模型`
- CSS 的盒子模型区别：

  `标准盒子模型`： margin、border、padding、content

  `IE 盒子模型`： margin、content ( border + padding + content )

- 通过 CSS 如何转换盒子模型：

  ::: code-group

  ```css
  box-sizing: content-box; /\*_标准盒子模型 _/\*
  box-sizing: border-box; /\*_IE 盒子模型_/\*
  ```

  :::
