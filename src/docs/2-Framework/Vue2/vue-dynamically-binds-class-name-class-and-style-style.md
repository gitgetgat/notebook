# Vue 动态绑定 类名 class 和 样式 style

<article-info/>

## 类名 class

- 绑定 `变量名`：通过`v-bind`绑定元素的`class`属性，为其指定一个 变量名，通过改变变量的值，修改样式。注意，当`className`为  `''`  时，这个 class 属性仍然会被添加到真实 DOM 上，只不过没有值。

  ::: code-group

  ```js
  <div :class="className">class动态绑定</div>

  <script>
  export default {
    data() {
      return {
        className: 'app'
      }
    }
  }
  </script>
  ```

  :::

- 绑定 `对象`：使用对象语法可以根据条件给元素添加或移除一个或多个 class。例如，你可以根据属性 isRed 的值来决定是否添加类名 red

  ::: code-group

  ```html
  <div :class="{ red: isRed }"></div>
  ```

  :::

- 绑定 `数组`：使用数组语法可以一次指定多个 class，这些 class 都会被添加到元素中。例如，下面的代码会将类名 red 和 bold 添加到元素中

  ::: code-group

  ```html
  <div :class="[ 'red', 'bold' ]"></div>
  ```

  :::

- 绑定 `计算属性`：使用计算属性可以在模板中动态计算出 class 名称。例如，假设根据 isActive 属性来决定是否添加类名 active

  ::: code-group

  ```html
  <div :class="computedClass"></div>
  ```

  :::

  ::: code-group

  ```js
  computed: {
    computedClass: function () {
      return this.isActive ? 'active' : '';
    }
  }
  ```

  :::

- 使用一个数组和对象的混合语法：使用数组和对象的混合语法可以按照一定的逻辑动态地为元素绑定 class。例如，可以根据属性 isActive 的值来为元素动态绑定 class

  ::: code-group

  ```html
  <div :class="[isActive ? 'active' : '', { bold: isBold }]"></div>
  ```

  :::

## 样式 style

- 直接绑定一个样式对象：如果你想同时绑定多个样式并且这些样式都是固定的，那么你可以直接在模板中绑定一个样式对象。例如，下面的代码会将 color: red 和 background-color: blue 样式应用到元素中

  ::: code-group

  ```html
  <div :style="{'color': 'red', 'background-color': 'blue'}"></div>
  ```

  :::

- 绑定 `对象`：使用对象语法可以根据条件动态绑定一个或多个样式。例如，你可以根据属性 isRed 的值来决定是否添加 color: red 样式

  ::: code-group

  ```html
  <div :style="{ color: isRed ? 'red' : '' }"></div>
  ```

  :::

- 绑定 `数组`：使用数组语法可以一次指定多个样式，这些样式都会应用到元素中。例如，下面的代码会将 color: red 和 font-size: 20px 样式应用到元素中

  ::: code-group

  ```html
  <div :style="[ { color: 'red' }, { 'font-size': '20px' } ]"></div>
  ```

  :::

- 绑定 `计算属性`：使用计算属性可以在模板中动态计算出样式。例如，假设根据 fontSize 属性来设置元素的字体大小

  ::: code-group

  ```html
  <div :style="{ fontSize: computedFontSize }"></div>
  ```

  :::

  ::: code-group

  ```js
  computed: {
    computedFontSize: function () {
      return this.fontSize + 'px';
    }
  }
  ```

  :::
