# Vue 中 computed、method、watch 区别

<article-info/>

## 区别

### computed

- 初始化显示的属性数据发生变化的时候调用；
- 计算属性不在 `data` 中，它是基于 `data` 或 `props` 中的数据通过计算得到的一个新值，这个新值根据已知值的变化而变化；
- 在 `computed` 属性对象中定义计算属性的方法，和取 `data` 对象里的数据属性一样，以属性访问的形式调用；
- 如果 `computed` 属性值是函数，那么默认会走 `get` 方法，必须要有一个返回值，函数的返回值就是属性的属性值；
- `computed` 属性值默认会<imp-text-primary>缓存</imp-text-primary>计算结果，在重复的调用中，只要依赖数据不变，直接取缓存中的计算结果，只有<imp-text-primary>依赖型数据</imp-text-primary>发生<imp-text-primary>改变</imp-text-primary>，`computed` 才会重新计算；
- 在 `computed` 中的，属性都有一个 `get` 和一个 `set` 方法，当数据变化时，调用 `set` 方法。

  ::: code-group

  ```js
  realSelectedDay: {
        get() {
          if (!this.value) return this.selectedDay;
          return this.formatedDate;
        },
        set(val) {
          this.selectedDay = val;
          const date = new Date(val);
          this.$emit('input', date);
        }
      },
  ```

  :::

### watch

- 主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作，可以看作是 `computed` 和 `methods` 的结合体；
- 可以监听的数据来源：`data`，`props`，`computed` 内的数据；
- watch `支持异步`；
- `不支持缓存`，监听的数据改变，直接会触发相应的操作；
- 监听函数有两个参数，第一个是最新的值，第二个参数是输入之前的值，顺序是新值，旧值。

### 使用场景

- `computed`：用于处理复杂的逻辑运算；一个数据受一个或多个数据影响；用来处理 `watch` 和`methods` 无法处理的，或处理起来不方便的情况。
- `watch`：用来处理当一个属性发生变化时，需要执行某些具体的业务逻辑操作，或要在数据变化时执行异步或开销较大的操作；一个数据改变影响多个数据。
