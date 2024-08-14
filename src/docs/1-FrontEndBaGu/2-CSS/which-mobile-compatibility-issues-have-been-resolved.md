# 解决过哪些移动端的兼容问题 ？

<article-info/>

1. 当设置样式 `overflow:scroll/auto` 时，`IOS` 上的华东会卡顿

   ::: code-group

   ```css
   div {
     -webkit-overflow-scrolling: touch;
   }
   ```

   :::

2. 在安卓环境下 `placeholder` 文字设置行高时会偏上

   `input` 有 `placeholder` 属性的时候不要设置行高

3. 移动端字体小于 12px 时异常显示

   应该先把在整体放大一倍，然后再用 `transform` 进行缩小

4. `ios` 下 `input` 按钮设置了 `disabled` 属性为 `true` 显示异常

   ::: code-group

   ```css
   input[type="button"] {
     opcity: 1;
   }
   ```

   :::

5. 安卓手机下取消语音输入按钮

   ::: code-group

   ```css
   input::-webkit-input-speech-button {
     display: none;
   }
   ```

   :::

6. `IOS` 下取消 `input` 输入框在输入引文首字母默认大写

   ::: code-group

   ```html
   <input autocapitalize="off" autocorrect="off" />
   ```

   :::

7. 禁用 `IOS` 和 `安卓` 用户选中文字

   添加全局 `CSS` 样式:

   ::: code-group

   ```css
   * {
     -webkit-user-select: none;
   }
   ```

   :::

8. 禁止 `IOS` 弹出各种窗口

   ::: code-group

   ```css
   * {
     -webkit-touch-callout: none;
   }
   ```

   :::

9. 禁止 `IOS` 识别长串数字为电话

   添加 `meta` 属性

   ::: code-group

   ```html
   <meta content="telephone=no" name="format-detection" />
   ```

   :::
