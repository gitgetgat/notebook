# JS 中关于 this 指向的问题

<article-info/>

## 全局作用域下，this 指向 全局对象

- 获取全局对象：

  - <imp-text-warning>web</imp-text-warning>：`window`、`self`、`frames`、`this`

  ::: code-group

  ```js
  // self、frames 是 window 的属性，指向 window 本身
  window => {
  	self: window,
  	frames: window
  }
  ```

  :::

  - <imp-text-warning>node</imp-text-warning>：global
  - <imp-text-warning>worker</imp-text-warning>：self
  - 通用：`globalThis`（除 IE 外都支持）

## 类（class）

::: code-group

```js
class Test {
  constructor() {
    // 类的非静态方法
    // 挂载到 new 出来的实例化对象上
    this.test = function () {
      console.log("none-static:" + this);
    };
  }

  // Test.prototype => {...}
  // 挂载到构造函数的 prototype 上
  test() {
    console.log("static:" + this);
  }
}
```

:::

## 举个栗子

::: code-group

```js [例子 1]
class Father {
  constructor() {
    this.age = 44;
  }

  swim() {
    console.log("Go Swimming!!!");
  }
}

class Son extends Father {
  constructor() {
    // super 必须在 this 之前，super() 的目的就是为了继承 Father
    // 调用 Father 的 constructor
    // 生成 this 绑定 -> Father 的 this -> Son 的实例
    // this 指向 new Father() 得到的对象 { age：44 }
    super();
    this.hobby = "music";
  }

  study() {
    console.log(this);
    this.swim();
  }
}

const son = new Son();
console.log(son);
son.study();
```

```js [例子 2]
// 类的内部是严格模式
class Father {
  constructor() {
    // 目的：是让函数内部的this指向固定
    this.eat = this.eat.bind(this);
  }
  get fruit() {
    return "apple";
  }

  eat() {
    console.log("I am eating an " + this.fruit);
  }
}

class Son {
  get fruit() {
    return "pear";
  }
}

const father = new Father();
const son = new Son();

father.eat();

son.eat = father.eat;

// 若果没有 Father 的 eat 方法固定 this 指向，则 son 吃自己的水果
// 由于 Father 的 eat 方法固定 this 指向，所以吃 father 的水果
son.eat();
```

:::

## 箭头函数

- 全局下定义：

::: code-group

```js
"use strict";
const test = () => {
  // 不论是否处于严格模式下，浏览器下都指向 window
  console.log(this);
};

function test1() {
  // 非严格模式下，浏览器下指向 window
  // 严格模式下，浏览器下都指向 undefined
  console.log(this);
}

const test2 = function () {
  // 非严格模式下，浏览器下指向 window
  // 严格模式下，浏览器下都指向 undefined
  console.log(this);
};

test();
test1();
test2();
```

:::

- 箭头函数是忽略任何形式的 `this` 指向的改变

::: code-group

```js
var obj = {
  a: 1
};

var a = 2;
const test = () => {
  console.log(this.a);
};

test(); // 2
test.call(obj); // 2
test.apply(obj); // 2
var test1 = test.bind(obj);
test1(); // 2
```

:::

- 箭头函数一定不是一个构造器，所以不能 `new`

- 箭头函数中的 `this` 不是谁绑定指向谁

  ::: code-group

  ```js
  var obj = {
    a: 1
  };

  obj.test = () => {
    console.log(obj);
    console.log(this); // window
  };
  obj.test();
  ```

  :::

- 箭头函数内部没有 this，需要去外层非箭头函数的作用域获取

  ::: code-group

  ```js
  var obj = {
    a: 1
  };

  obj.test = function () {
    var t = () => {
      // this -> obj
      console.log(this);
    };
    t();
  };

  obj.test1 = function () {
    setTimeout(() => {
      // this -> obj
      console.log(this);
    }, 0);
  };

  obj.test2 = function () {
    var t1 = () => {
      var t2 = () => {
        // this -> obj
        console.log(this);
      };
      t2();
    };
    t1();
  };

  obj.test3 = function () {
    var t1 = function () {
      var t2 = () => {
        // this -> window
        console.log(this);
      };
      t2();
    };
    t1(); // window 调用的 t1
  };

  obj.test();
  obj.test1();
  obj.test2();
  obj.test3();
  ```

  :::

## 对象：this 指向它最近的引用，谁调用，指向谁

::: code-group

```js
var obj = {
  a: 1
};

obj.test = function () {
  console.log(this);
};

obj.test(); // obj

var obj1 = {
  a: 1,
  b: {
    c: {
      test: function () {
        console.log(this);
      }
    }
  }
};

obj1.b.c.test(); // c => { test }

var obj2 = Object.create({
  // 创建 obj1，并指定 obj1 的原型
  test: function () {
    console.log(this.a + this.b);
  }
});

obj2.a = 1;
obj2.b = 2;

obj2.test(); // this 谁调用指向谁；this.a 只是引用
```

:::

## new 的过程

::: code-group

```js
function Test() {
  // this -> {}
  // this -> {a:1}
  // this -> {a:1,b:2}
  this.a = 1;
  this.b = 2;
  console.log(this); // this -> {a:1,b:2}
  // this -> 存在的
  return {
    c: 3,
    d: 4
  };
}
/**
 * 1. 构造函数里默认隐式返回 this，或者可以手动返回 this
 * 2. 如果手动返回了一个新对象，this 指向这个新对象
 * 3. 如果手动返回一个新对象，之前的 this 是存在的，只不
 *    过在最后返回的时候被手动拦截了，指向了新的对象
 */
var test = new Test();
console.log(test);
```

:::

## 事件绑定函数里的 this 指向

- 将函数绑定
  ::: code-group

  ```js [绑定方式 1]
  var oBtn = document.getElementById("btn");

  // onclick 事件处理函数内部的 this 总是指向被绑定的 DOM 元素
  oBtn.onclick = function () {
    console.log(this); // this -> btn DOM 元素
  };

  oBtn.addEventListener(
    "click",
    function () {
      console.log(this); // this -> btn DOM 元素
    },
    false
  );
  ```

  ```js [绑定方式 2]
  (function (doc) {
    var oBtn = doc.getElementById("btn");
    function Plus(a, b) {
      this.a = a;
      this.b = b;
      this.init();
    }

    Plus.prototype.init = function () {
      this.bindEvent();
    };
    Plus.prototype.bindEvent = function () {
      // // 情况1
      // oBtn.addEventListener("click", this.handleBtnClick, false);
      // 情况2
      oBtn.addEventListener("click", this.handleBtnClick.bind(this), false);
    };
    Plus.prototype.handleBtnClick = function () {
      // // 情况1
      // console.log(this.a, this.b); // undefined, undefined
      // console.log(this); // DOM 元素
      // console.log(this.a + this.b); // NaN

      // 情况2
      console.log(this.a, this.b); // 3,4
      console.log(this); // 实例化出来的对象
      console.log(this.a + this.b); // 7
    };
    window.Plus = Plus;
  })(document);

  new Plus(3, 4);
  ```

  :::

- 行内绑定

  ::: code-group

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <script src="./test.js"></script>
    <body>
      <!-- 指向绑定的 DOM 元素 -->
      <button onclick="console.log(this);">test</button>
      <!-- 立即执行函数里，指向 window -->
      <button onclick="(function(){console.log(this);})()">test</button>
    </body>
  </html>
  ```

  :::
