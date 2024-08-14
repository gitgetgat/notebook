# 禁止 IOS 长按时触发系统菜单，禁止 IOS&Android 长按时下载图片，禁止 IOS&Android 用户选中文字

<article-info/>

::: code-group

```html
<style>
  html,
  body {
    /** 禁止 IOS 长按时触发系统菜单 **/
    touch-callout: none;
    -webkit-touch-callout: none;

    /** 禁止 IOS&Android长按时下载图片，禁止 IOS&Android用户选中文字 **/
    user-select: none;
    -webkit-user-select: none;
  }
</style>
```

:::
