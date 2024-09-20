# 为什么 Vue3 使用 Proxy 和 Reflect 代替 Vue2 的 Object.defineProperty 来实现响应式数据？

<article-info/>

<link-tag :linkList="[{ linkType: 'mdn', linkText:'Proxy 定义',linkUrl:'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy'},{ linkType: 'mdn', linkText:'Reflect 定义',linkUrl:'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect'},{ linkType: 'mdn', linkText:'Object.defineProperty() 定义',linkUrl:'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty'}]" />

## `Object.defineProperty()`

`Object.defineProperty()` 是对特定对象特定属性 设置 <imp-text-danger>属性描述符</imp-text-danger>，触发 `getter` 和 `setter` 行为，被监听了 `getter` 和 `setter` 的属性，就被叫做 <imp-text-danger>该属性具备了响应性</imp-text-danger>

但是由于 `JavaScript` 的限制，`Vue2` 不能检测数组和对象的变化，所以导致 `Vue2` 使用 `Object.defineProperty()` 实现响应性存在缺陷：

- 当为 <imp-text-danger>对象</imp-text-danger> 新增一个没有在 data 中声明的属性时，新增的属性 <imp-text-danger>不是响应性</imp-text-danger> 的；
- 当为 <imp-text-danger>数组</imp-text-danger> 通过下标的形式新增一个元素时，新增的元素 <imp-text-danger>不是响应性</imp-text-danger> 的；

那就意味着：我们 <imp-text-danger>必须要知道指定对象中存在该属性</imp-text-danger> ，才可以为该属性指定响应性

## `proxy`

`proxy` 和 `Object.defineProperty()` 存在一个非常大 的区别，那就是：

- `proxy`:

  - `proxy` 将代理一个对象（被代理对象），得到一个新的对象（代理对象），同时拥有被代理对象中的全部属性
  - 当想要修改对象的指定属性时，我们应该使用 <imp-text-danger>代理对象</imp-text-danger> 进行修改
  - <imp-text-danger>代理对象</imp-text-danger> 的任何一个属性都可以出发 handler 的 `getter` 和 `setter`

- `Object.defineProperty()`：
  - `Object.defineProperty()` 为 <imp-text-danger>指定对象的指定属性</imp-text-danger> 设置 <imp-text-danger>属性描述符</imp-text-danger>
  - 当想要修改对象的指定属性时，我们应该使用 原对象 进行修改
  - 通过 属性描述符，只有 <imp-text-danger>被监听</imp-text-danger> 的指定属性，才可以触发 `getter` 和 `setter`

所以当 `Vue3` 通过 `proxy` 实现响应性核心 `API` `之后，Vue` 将 <imp-text-danger>不会</imp-text-danger> 在存在新增属性时失去响应性的问题

## `Reflect`：调用对象的基本操作（内部方法）

`Reflect` 是一个内置的对象，它提供 <imp-text-danger>拦截</imp-text-danger> `JavaScript` 操作的方法, 本质上是 <imp-text-danger>调用对象的基本操作（内部方法）</imp-text-danger>， 什么意思呢？看下面代码：

::: code-group

```html [示例1]
<script>
  const p1 = {
    lastName: "三",
    firstName: "张",
    get fullName() {
      return this.firstName + this.lastName;
    }
  };

  console.log(p1.fullName);
</script>
```

```html [示例2]
<script>
  const p1 = {
    lastName: "三",
    firstName: "张"
  };

  let keys = Object.keys(p1);
  console.log(keys);

  Object.defineProperty(p1, "c", {
    value: 3,
    enumerable: false
  });

  console.log(p1);
  keys = Object.keys(p1);
  console.log(keys);
  console.log(Reflect.ownKeys(p1));
</script>
```

:::

### 示例 1

在 示例 1 中，我们通过 `p1.fullName` 读取了 `fullName` 属性，这个简单的 `p1.fullName` 底层操作其实内部不止这么简单，内部他有几个步骤，首先会把 `this` 指向` p1`，然后调用 `Reflect.get(p1, 'fullName', p1)`，最后将结果返回，可以看到底层操作其实做了不止一步，本质上仍是调用 `Reflect` 来实现。

### 示例 2

在 示例 2 中，我们先打印了 `p1` 的所有属性属性，然后通过 `Object.defineProperty` 给 `p1` 设置了属性 `'c'`，并且设置了属性描述符，值为 `3`，是否可枚举，设置为 `否`，然后再次获取 `p1` 的所有属性并打印

![/97ad5462-97c3-533f-b6eb-b6195d0661c7.png](/97ad5462-97c3-533f-b6eb-b6195d0661c7.png)

可以看到第一次打印属性名是两个，定义了新属性后，怕上已经有了 `'c'`，但是再次打印所有属性，仍然是两个，这是应为我们将属性 `'c'` 设置为 <imp-text-danger>不可枚举</imp-text-danger>，但是 `Object.keys` 内部是如何实现的呢？内部其实也是做了不止一步操作：

1. 通过 `Reflect.ownKeys(p1)` 获取所有的属性名
2. 通过 `for` 循环遍历所有的属性名，如果过滤掉 <imp-text-danger>不是字符串的</imp-text-danger> ，<imp-text-danger>不可枚举的</imp-text-danger> ，将过滤结果返回

所以我们如果想获取所有的属性，我们可以通过 `Reflect.ownKeys(p1)`，也就是我们图中最后一次打印

所以可以看出 Reflect 是对对象操作的更加 <imp-text-danger>细粒度</imp-text-danger> 的操作

### 与 proxy 结合

我们来关注其中两个 `Reflect.get(target, propertyKey, receiver)`、`Reflect.set(target, propertyKey, value, receiver)`。在这两个函数中 `receiver` 可以用来改变 `this` 的指向，指向 `receiver`，详细可以看 <link-tag :linkList="[{ linkType: 'mdn', linkText:'Reflect 定义',linkUrl:'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect'}]" />

为什么要 `proxy` 和 `Reflect` 搭配使用呢？我们来看下面这个例子

::: code-group

```html
<script>
  const p1 = {
    lastName: "三",
    firstName: "张",
    get fullName() {
      return this.firstName + this.lastName;
    }
  };

  const proxy = new Proxy(p1, {
    get(target, key, receiver) {
      console.log("触发了 getter 行为");
      return target[key];
    }
  });
  console.log(proxy.fullName);
</script>
```

:::

我们来看下输出：

![/0c885f16-cdef-1de6-2ef6-cd312603ecc7.png](/0c885f16-cdef-1de6-2ef6-cd312603ecc7.png)

看上去貌似没有问题，触发了 `getter` 打印，输出了正确的结果 “张三”；但是仔细想一想真的没有问题么？我们读取 `proxy.fullName` 时应该触发几次 `getter` 行为呢？在 `proxy.fullName` 内部，我们是不是读取了 `this.firstName` 和 `this.lastName`，所以是不是相应应该触发两次 `getter` 行为，加上 `fullName` 属性本身触发一次 `getter` 行为，一共应该触发了 3 次 `getter` 行为，但是为什么 `proxy.fullName` 只触发了一次 `getter` 行为？我们在 `proxy.fullName` 中打印 `this` 看一下

::: code-group

```html
<script>
  const p1 = {
    lastName: "三",
    firstName: "张",
    get fullName() {
      console.log(this);
      return this.firstName + this.lastName;
    }
  };

  const proxy = new Proxy(p1, {
    get(target, key, receiver) {
      console.log("触发了 getter 行为");
      return target[key];
    }
  });
  console.log(proxy.fullName);
</script>
```

:::

![/e867d49e-a19f-34b8-ce61-e399f960ed14](/e867d49e-a19f-34b8-ce61-e399f960ed14.png)

可以看到这里的 `this` 指向了 `p1`，也就是被代理对象，所以 `proxy.fullName` 读取 `this.firstName` 和 `this.lastName` 时，不会触发 `getter` 行为，所以 `proxy.fullName` 只触发了一次 `getter` 行为。

那我们该怎么做才能正确的触发 `getter` 行为呢？我们可以通过 `Reflect.get(target, propertyKey, receiver)` 来实现，看下面修改过后的代码：

::: code-group

```html
<script>
  const p1 = {
    lastName: "三",
    firstName: "张",
    get fullName() {
      console.log(this);
      return this.firstName + this.lastName;
    }
  };

  const proxy = new Proxy(p1, {
    get(target, key, receiver) {
      console.log("触发了 getter 行为");
      return target[key]; // [!code --]
      return Reflect.get(target, key, receiver); // [!code ++]
    }
  });
  console.log(proxy.fullName);
</script>
```

:::

我们使用 `Reflect.get(target, propertyKey, receiver)` 替换了 `target[key]`，这样 `proxy.fullName` 内部就会也触发两次 `getter` 行为了，分别是 `this.firstName` 和 `this.lastName`。

同时也可以看到 `this` 指向了 `proxy` 对象，而不是 `p1`。

![/72f84736-35c2-e734-ad58-dbc0fbd01a47.png](/72f84736-35c2-e734-ad58-dbc0fbd01a47.png)

## 总结

- `proxy` 和 `Object.defineProperty()` 都可以做到响应式，但是 `Object.defineProperty()` 因为本身的限制，会丢失新增属性的响应性，而 `proxy` 则不会。

- 当我们期望监听代理对象的 `getter` 和 `setter` 时，不应该使用 `target[key]`，因为它在某些时刻下是不可靠的，而应该使用 `Reflect`，借助它的 `get` 和 `set` 方法，使用 `receiver（proxy 实例）` 作为 `this`，已到达期望的结果，比如正确的触发 `getter` 和 `setter` 行为
