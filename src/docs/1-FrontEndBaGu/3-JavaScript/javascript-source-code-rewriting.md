# JavaScript 源码重写

<article-info/>

## new

::: code-group

```js
function Person(name) {
  this.name = name;
  // return this;
  // returm 123;
  // return [];
}

Person.prototype.say = function () {
  console.log("hello");
};

// var p = new Person('zhangsan')
// p.say()

Function.prototype.new = function () {
  var fn = this; // 使用 Person.new() 调用，所以 this -> Person
  var obj = Object.create(fn.prototype); // 创建一个空对象，把这个空对象和构造函数通过原型链进行链接
  var res = fn.apply(obj, arguments); // 把构造函数的 this 绑定到生成的新的空对象上
  return res instanceof Object ? res : obj; // 根据构造函数法会的类型判断，如果是指类型，则返回新生成的对象；如果是引用类型，就要返回这个引用类型
};

var p = Person.new("zhangsan");
p.say();
```

:::

## ES6 中 class

总结一下类：

1.  class 不能提升
2.  class 只能通过 new 实例
3.  class 是采用严格模式
4.  class 的原型山的属性不能遍历
5.  在 内部不能修改 class 的名称

::: code-group

```js
\\
```

:::

## call

::: code-group

```js
function randomString() {
  return (
    Math.random().toString(36).substring(3, 6) +
    new Date().getTime().toString(36)
  );
}

Function.prototype.myCall = function (context) {
  var fn = this;

  if (typeof context === "object" && typeof context !== null) {
    var prop = randomString();
    var args = [];
    for (let i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    context[prop] = this;
    var res = eval("context[prop](" + args + ")");
    delete context[prop];
    return res;
  }
};

function test(a, b) {
  console.log(a, b);
  return a + b;
}

var result = test.myCall({}, 1, 2);
console.log(result);
```

:::

## apply

::: code-group

```js
function randomString() {
  return (
    Math.random().toString(36).substring(3, 6) +
    new Date().getTime().toString(36)
  );
}

Function.prototype.myApply = function (context) {
  var fn = this;

  if (typeof context === "object" && typeof context !== null) {
    var prop = randomString();
    var args = [];
    for (let i = 1; i < arguments[1].length; i++) {
      args.push(arguments[1][i]);
    }
    context[prop] = this;
    var res = eval("context[prop](" + args + ")");
    delete context[prop];
    return res;
  }
};

function test(a, b) {
  console.log(a, b);
  return a + b;
}

var result = test.myApply({}, 1, 2);
console.log(result);
```

:::

## bind

::: code-group

```js
/**
 * 重点：
 *    1. 偏函数的特性
 *    2. 原型的问题
 */

// 偏函数的特性
var obj = {};
function test(a, b) {
  console.log(a, b);
  return a + b;
}
test.bind(obj, 1, 2)(); // 1 2
test.bind(obj, 1)(2); // 1 2
test.bind(obj)(1, 2); // 1 2

// 原型的问题
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function () {
  console.log("hello");
};

var Person1 = Person.bind(obj);
console.log(Person1.prototype === Person.prototype);
var p = new Person1();
p.say();

Function.prototype.myBind = function (context) {
  var fn = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var target = function () {
    var innerArgs = Array.prototype.slice.call(arguments);

    return fn.apply(context, args.concat(innerArgs));
  };

  var Buffer = function () {};
  Buffer.prototype = fn.prototype;
  target.prototype = new Buffer();
  return target;
};
```

:::

## forEach

::: code-group

```js
var arr = [1, 2, 3, 4];
var obj = {};

arr.forEach(function (item, index, arr) {
  console.log(item, index, arr, this);
}, obj);

Array.prototype.myForEach = function (fn) {
  var arr = this;
  var context = arguments[1] || window;
  if (typeof fn === "function") {
    for (let i = 0; i < arr.length; i++) {
      fn.apply(context, [arr[i], i, arr]);
    }
  } else {
    throw new Error("参数必须是 function");
  }
};

arr.myForEach(function (item, index, arr) {
  console.log(item, index, arr, this);
}, obj);
```

:::

## map

::: code-group

```js
var arr = [1, 2, 3, 4];
var obj = {};

const res = arr.map(function (item, index, arr) {
  console.log(item, index, arr, this);
  return item * 2;
}, obj);
console.log(res);

Array.prototype.myMap = function (fn) {
  var arr = this;
  var context = arguments[1] || window;
  var res = [];
  if (typeof fn === "function") {
    for (let i = 0; i < arr.length; i++) {
      res.push(fn.apply(context, [arr[i], i, arr]));
    }
  } else {
    throw new Error("参数必须是 function");
  }
  return res;
};

const myRes = arr.myMap(function (item, index, arr) {
  console.log(item, index, arr, this);
  return item * 2;
}, obj);
console.log(myRes);
```

:::

## filter

::: code-group

```js
var arr = [1, 2, 3, 4];
var obj = {};

const res = arr.filter(function (item, index, arr) {
  console.log(item, index, arr, this);
  return item % 2;
}, obj);
console.log(res);

Array.prototype.myFilter = function (fn) {
  var arr = this;
  var context = arguments[1] || window;
  var res = [];
  if (typeof fn === "function") {
    for (let i = 0; i < arr.length; i++) {
      fn.apply(context, [arr[i], i, arr]) ? res.push(arr[i]) : undefined;
    }
  } else {
    throw new Error("参数必须是 function");
  }
  return res;
};

const myRes = arr.myFilter(function (item, index, arr) {
  console.log(item, index, arr, this);
  return item % 2;
}, obj);
console.log(myRes);
```

:::

## some 和 every

::: code-group

```js
var arr = [1, 2, 3, 4];
var obj = {};

let res = null;
res = arr.some(function (item, index, arr) {
  console.log(item, index, arr, this);
  return item % 2;
}, obj);
console.log(res);

res = arr.every(function (item, index, arr) {
  console.log(item, index, arr, this);
  return item % 2;
}, obj);
console.log(res);

Array.prototype.mySome = function (fn) {
  var arr = this;
  var context = arguments[1] || window;
  var res = false;
  if (typeof fn === "function") {
    for (let i = 0; i < arr.length; i++) {
      if (fn.apply(context, [arr[i], i, arr])) {
        res = true;
        break;
      }
    }
  } else {
    throw new Error("参数必须是 function");
  }
  return res;
};

Array.prototype.myEvery = function (fn) {
  var arr = this;
  var context = arguments[1] || window;
  var res = true;
  if (typeof fn === "function") {
    for (let i = 0; i < arr.length; i++) {
      if (!fn.apply(context, [arr[i], i, arr])) {
        res = false;
        break;
      }
    }
  } else {
    throw new Error("参数必须是 function");
  }
  return res;
};

let myRes = null;
myRes = arr.mySome(function (item, index, arr) {
  console.log(item, index, arr, this);
  return item % 2;
}, obj);
console.log(myRes);

myRes = arr.myEvery(function (item, index, arr) {
  console.log(item, index, arr, this);
  return item % 2;
}, obj);
console.log(myRes);
```

:::

## reduce

## promise
