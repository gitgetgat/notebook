# ES6 和 ES5 的区别是什么？（ES6 有哪些新增的特性？）

<article-info/>

### ES5 和 ES6 的区别：

- `ECMAScripts5`，即 `ES5`，是 `ECMAScripts` 的第五次修订，于 2009 年完成标准化 `ECMAScripts6`，即 `ES6`，是 `ECMAScripts` 的第六次修订，于 2015 年完成，也称 `ES2015`，`ES6` 是继 `ES5` 之后的一次改进，相对于 `ES5` 更加简洁，提高了开发效率，`ES6` 新增的一些特性。

### ES5 的特性：

- [`strict 模式`](./what-is-strict-mode-in-js.md)：严格模式，限制一些用法；
- Array 增加方法：
  - `every`
  - `some`
  - `forEach`
  - `filter`
  - `indexOf`
  - `lastIndexOf`
  - `isArray`
  - `map`
  - `reduce`
  - `reduceRight`
- Object 方法：
  - `Object.getPrototypeOf`
  - `Object.create`
  - `Object.getOwnPropertyNames`
  - `Object.defineProperty`
  - `Object.getOwnPropertyDescriptor`
  - `Object.keys`
  - `Object.preventExtensions`
  - `Object.isExtensible`
  - `Object.seal`
  - `Object.isSealed`
  - `Object.freeze`
  - `Object.isFrozen`

PS：还有其他方法  `Function.prototype.bind`、`String.prototype.trim`、`Date.now`

### ES6 的新特性：

- 块级作用域：`let`、`const`
- 解构赋值：
  - 数组的解构：
    - 通过逗号间隔来获取对应的数据，不想获取的可以不写变量名，但是逗号必须保留
    - **`...`**  这种用法可以获取接下来所有的数据，但是只能在最后使用
    - 解构的成员个数小于数组长度，那么只会从前往后数的提取对应的，如果大于数组长度，解构出来 undefined
    - 默认值通过  **`=`**  来设置，如果提取失败，会赋予设定的默认值，`const [ name=123 ] = obj`
  - 对象的解构：
    - 通过属性名来提取对应的数据，可以在解构出来的变量名（数据的属性名）后用  **:**  来重命名一个新的名称  `const { name: objname } = obj`
    - 默认值通过  **=**  来设置，如果提取失败，会赋予设定的默认值， `const { name: objname = ‘Tom’ } = obj`
- 模板字符串

  - 模板字符串支持换行
  - `${}`，花括号里支持标准的 JS 语句，`${name} --- ${1+2} --- ${Math.random()}`
  - 标签函数，标签函数必须提前定义，接受的参数是字符串被 `${}` 分割后的字符串数组以及所有在模板字符串中出现的表达式的返回值

    ::: code-group

    ```js
    const name = "tom";
    const gender = false;

    function myTagFunc(strings, name, gender) {
      // console.log(strings, name, gender)
      // return '123'
      const sex = gender ? "man" : "woman";
      console.log("strings", strings);
      return strings[0] + name + strings[1] + sex + strings[2];
    }

    const result = myTagFunc`hey, ${name} is a ${gender}.`;

    console.log(result);
    ```

    :::

- 函数参数
  - 参数设置默认值需要放到最后
  - **`...`**  用来获取所有的参数或者剩余的所有参数，只能放在最后使用，它是一个参数数组
- 展开运算符
  - **`...`**  用来按照次序展开一个数组的所有项
- 箭头函数
  - 函数体是一行并且没有花括号包裹，会默认返回这个函数体的结果，有花括号包裹需要手动用 return 返回
  - 函数内部不会改变 this 的指向
- 对象字面量的增强

  - 属性名与属性值变量名相同可以直接写一个
  - 定义方法可以省略  **`function 关键字`**
  - 计算属性名，通过  **`[]`**  让表达式结果作为属性名

  ::: code-group

  ```js
  // 对象字面量

  const bar = "345";

  const obj = {
    foo: 123,
    // bar: bar
    // 属性名与变量名相同，可以省略 : bar
    bar,
    // method1: function () {
    //   console.log('method111')
    // }
    // 方法可以省略 : function
    method1() {
      console.log("method111");
      // 这种方法就是普通的函数，同样影响 this 指向。
      console.log(this);
    },
    // Math.random(): 123 // 不允许
    // 通过 [] 让表达式的结果作为属性名
    [bar]: 123
  };

  // obj[Math.random()] = 123

  console.log(obj);
  obj.method1();
  ```

  :::

- 对象拓展方法

  - **`Object.assign` 方法**

    - 将多个源对象中的属性复制到一个目标对象中
    - 接收任意多个参数，第一个参数是目标对象
    - 属性名相同会覆盖掉
    - 返回值是接收的第一个参数的对象
    - 常用来复制一个全新的对象出来
    - options 对象参数？

    ::: code-group

    ```js
    const newobj = Object.assign({}, source1);
    ```

    :::

  - **`Object.is` 方法**
    - **`==`**  运算符会在比较前做类型转换
    - **`===`**  运算符的局限性
  - **`Object.is` 方法 可以弥补上面的两个问题**

- Math + Number + String + Array 拓展方法

  ::: code-group

  ```js
  Number.EPSILON Number.isInteger(Infinity) // false 

  Number.isNaN("NaN") // false 

  Math.acosh(3) // 1.762747174039086 

  Math.hypot(3, 4) // 5 

  Math.imul(3, 4), // 12

  Math.pow(2, 32) - 2) // 2 

  "abcde".includes("cd") // true 

  "abc".repeat(3) // "abcabcabc" 

  Array.from(document.querySelectorAll('*')) // Returns a real Array 

  Array.of(1, 2, 3) // Similar to new Array(...), but without special one-arg behavior

  [0, 0, 0].fill(7, 1) // [0,7,7]

  [1, 2, 3].find(x => x == 3) // 3 

  [1, 2, 3].findIndex(x => x == 2) // 1 

  [1, 2, 3, 4, 5].copyWithin(3, 0) // [1, 2, 3, 1, 2] 

  ["a", "b", "c"].entries() // iterator [0, "a"], [1,"b"], [2,"c"] 

  ["a", "b", "c"].keys() // iterator 0, 1, 2

   ["a", "b", "c"].values() // iterator

  "a", "b", "c" Object.assign(Point, { origin: new Point(0,0) })
  ```

  :::

- Proxy
  - [MDN 上 Proxy 的介绍=>点击跳转](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- Reflect
  - [MDN 上 Reflect 的介绍=>点击跳转](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
  - 以后尽量使用这套统一操作对象的 API，前面一些操作对象的方式可能会慢慢废弃掉，例如：**`in 关键字，Object 的一些方法，delete...`**
- class 类

  - 构造函数关键字  **`constructor`**
  - 静态方法关键字  **`static`**，调用  **`类名.方法`**，**`方法内部的 this 指向 类 而不是 实例对象`**
  - 类的继承关键字  **`extend`**，**`super 关键字`**  始终指向父类，调用 **`super`**，相当于调用父类的构造函数

  ::: code-group

  ```js
  // extends 继承

  class Person {
    constructor(name) {
      this.name = name;
    }

    say() {
      console.log(`hi, my name is ${this.name}`);
    }
  }

  class Student extends Person {
    constructor(name, number) {
      super(name); // 父类构造函数
      this.number = number;
    }

    hello() {
      super.say(); // 调用父类成员
      console.log(`my school number is ${this.number}`);
    }
  }

  const s = new Student("jack", "100");
  s.hello();
  ```

  :::

- Set 数据结构

  - [MDN 上 Set 的介绍=>点击跳转](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
  - 不重复，唯一的数据结构
  - 添加重复值会忽略掉
  - 数组去重小技巧

    ::: code-group

    ```js
    const arr = [1, 2, 1, 3, 4, 1];

    // const result = Array.from(new Set(arr))
    const result = [...new Set(arr)];

    console.log(result);
    ```

    :::

- Map 数据结构
  - Object 对象的键都是 toString() 后的结果
  - [MDN 上 Map 的介绍=>点击跳转](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
- Symbol 数据类型
  - [MDN 上 Symbol 的介绍=>点击跳转](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
  - 每个从 Symbol() 返回的 symbol 值都是唯一的。一个 symbol 值能作为对象属性的标识符；这是该数据类型仅有的目的。`Symbol('foo') === Symbol('foo') // false`
  - For…In，Object.keys()，JSON.stringify() 都无法访问到 symbol 值作为的属性名，所以该类型特别适合作为对象的私有属性，但是还是有方式可以获取到  `Object.getOwnPropertySymbols(obj)`
  - Symbol.for(key)，使用给定的 key 搜索现有的 symbol，如果找到则返回该 symbol。否则将使用给定的 key 在全局 symbol 注册表中创建一个新的 symbol。所以  `Symbol.for('foo') === Symbol.for('foo') // true`
- for of 循环
  - 是一种数据统一的遍历方式，可以在遍历过程中随意 break 结束遍历，每次遍历得到当前的值，实现迭代器接口才可遍历
