# 清除浮动有哪些方式？

<article-info/>

1. **额外标签法（隔墙法）**

   - 优点： 通俗易懂，书写方便。（不推荐使用）
   - 缺点： 添加许多无意义的标签，结构化比较差。

   ::: code-group

   ```html {4}
   <div class="father">
     <div class="son"></div>
     <div class="son2"></div>
     <div style="clear: both;"></div>
   </div>
   ```

   :::

   ::: code-group

   ```css
   .father {
     width: 1000px;
     background-color: pink;
   }

   .son {
     float: left;
     width: 200px;
     height: 200px;
     background-color: purple;
   }

   .son2 {
     float: left;
     width: 200px;
     height: 100px;
     background-color: red;
   }

   .ershu {
     width: 900px;
     height: 300px;
     background-color: black;
   }
   ```

   :::

2. 单伪元素清除浮动

   - 优点：项目中使用，直接给标签加类即可清除浮动

   ::: code-group

   ```css {1,4,8,10-13}
   .clearfix::after {
     content: "";
     display: block;
     clear: both;
   }
   /* 或者详细写为以下 */
   .clearfix::after {
     content: "";
     display: block;
     clear: both;
     /* 补充代码，隐藏这个盒子,在网页中看不到这个伪元素 */
     height: 0;
     visibility: hidden;
   }
   ```

   :::

   ::: code-group

   ```html {1}
   <div class="father clearfix">
     <div class="son"></div>
     <div class="son2"></div>
   </div>
   ```

   :::

3. 使用 before 和 after 双伪元素清除浮动（较常用推荐）

   ::: code-group

   ```html {1}
   <div class="father clearfix">
     <div class="son"></div>
     <div class="son2"></div>
   </div>
   <div class="ershu"></div>
   ```

   :::

   ::: code-group

   ```css {1,2,7}
   .clearfix::before,
   .clearfix::after {
     content: "";
     display: table;
   }

   .clearfix::after {
     clear: both;
   }
   ```

   :::

4. 给父元素添加 overflow

   ::: code-group

   ```html {1}
   <div class="father clearfix">
     <div class="son"></div>
     <div class="son2"></div>
   </div>
   <div class="ershu"></div>
   ```

   :::

   ::: code-group

   ```css {2}
   .father {
     overflow: hidden;
     width: 800px;
     background-color: pink;
   }
   ```

   :::
