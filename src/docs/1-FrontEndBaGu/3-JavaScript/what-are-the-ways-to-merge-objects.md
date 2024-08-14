# 合并对象的方式有哪些？

<article-info/>

::: code-group

```js [Object.assign 浅拷贝]
const a = {
	a: 1,
	b: 4
};
const b = {
	b;2,
	c: 3
};

// 方法一：Object.assign 浅拷贝
let obj1 = Object.assign(a, b);// 修改 a
let obj2 = Object.assign({}, a, b);// 修改{}
console.log(obj1, obj2);

```

```js [展开运算符 浅拷贝]
const a = {
	a: 1,
	b: 4
};
const b = {
	b;2,
	c: 3
};

// 方法二：展开运算符 浅拷贝
let obj3 = {...a,...b}
console.log(obj3);
```

```js [自己封装 浅拷贝]
const a = {
	a: 1,
	b: 4
};
const b = {
	b;2,
	c: 3
};

// 方法三：自己封装 浅拷贝
function extend(target, source) {
	for (var key in source) {
		target[key] = source[key];
	}
	return target;
}
let obj4 = extend(a, b)
console.log(obj4);
```

:::
