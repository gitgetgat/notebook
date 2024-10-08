# 箭头函数和普通函数有什么区别 ？

<article-info/>

- 箭头函数比普通函数更加简洁
  - 如果没有参数，就直接写一个空括号即可
  - 如果只有一个参数，可以省去参数的括号
  - 如果有多个参数，用逗号分割
  - 如果函数体的返回值只有一句，可以省略大括号
- `this` 指向的问题
  箭头函数不会创建自己的 `this`， 所以它没有自己的 `this`，它只会在自己作用域的上一层继承 `this`。所以箭头函数中 `this` 的指向在它在定义时已经确定了，之后不会改变。
  箭头函数不同于传统 `JavaScript` 中的函数，箭头函数并没有属于⾃⼰的 `this`，它所谓的 `this` 是捕获其所在上下⽂的 `this` 值，作为⾃⼰的 `this` 值，并且由于没有属于⾃⼰的 `this`，所以是不会被 new 调⽤的，这个所谓的 `this` 也不会被改变。
- 箭头函数继承来的 `this` 指向永远不会改变

  ::: code-group

  ```js
  var id = "GLOBAL";
  var obj = {
    id: "OBJ",
    a: function () {
      console.log(this.id);
    },
    b: () => {
      console.log(this.id);
    }
  };
  obj.a(); // 'OBJ'
  obj.b(); // 'GLOBAL'
  new obj.a(); // undefined
  new obj.b(); // Uncaught TypeError: obj.b is not a constructor
  ```

  :::

  对象 obj 的方法 b 是使用箭头函数定义的，这个函数中的 `this` 就永远指向它定义时所处的全局执行环境中的 `this`，即便这个函数是作为对象 obj 的方法调用，`this` 依旧指向 `Window` 对象。<imp-text-success>需要注意，定义对象的大括号{ }是无法形成一个单独的执行环境的，它依旧是处于全局执行环境中。</imp-text-success>

- `call()`、`apply()`、`bind()`等方法不能改变箭头函数中 `this` 的指向

  ::: code-group

  ```js
  var id = "Global";
  let fun1 = () => {
    console.log(this.id);
  };
  fun1(); // 'Global'
  fun1.call({ id: "Obj" }); // 'Global'
  fun1.apply({ id: "Obj" }); // 'Global'
  fun1.bind({ id: "Obj" })(); // 'Global'
  ```

  :::

- 箭头函数不能 `new` (不能当作构造函数)
  由于箭头函数时没有自己的 `this`，且 `this` 指向外层的执行环境，且不能改变指向，所以不能当做构造函数使用。
  不能 `new`，所以箭头函数没有 <link-tag :linkList="[{ linkType: 'mdn', linkText:'new.target',linkUrl:'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new.target'}]" />；箭头函数的 `this` 指向全局对象时，使用 `new.target` 会报错；箭头函数的 `this` 指向普通函数时，使用 `new.target` 返回普通函数的引用
- 箭头函数没有 `prototype`
  箭头函数不能使用 `new` 生成实例，因为箭头函数没有 `prototype`，而 `construct` 在 `prototype` 里面
- 箭头函数没有 `arguments`
  它处于全局时，使用 `arguments` 报错
  它处于普通函数作用域时，`arguments` 是上层普通函数的作用域
