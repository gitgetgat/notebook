# var、let 和 const 的区别？

<article-info/>

1. `var` 具有变量提升机制，`let` 和 `const` 没有。

   ::: code-group

   ```js
   console.log(str); //undefined
   var str = 你好 ';
   console.log(num); //报错
   let num = 10;
   ```

   :::

2. `var` 可以多次声明同一个变量，`let` 和 `const` 不可以。
3. `var`、`let` 声明变量的，`const` 声明常量的。
4. `var`、`let` 声明的变量可以再次赋值，`const` 不可以（声明的复杂数据类型的指针不能变）。

   ::: code-group

   ```js
   const obj = {
     a: 1
   };
   //obj = 1111;// 报错
   obj.a = 1111; // 可以改
   console.log(obj);
   const arr = ["a", "b ", "c"];
   arr[0] = "aaaaa"; // 可以改
   console.log(arr);
   ```

   :::

5. `var` 声明的变量没有作用域（顶级作用域），`let` 和 `const` 声明的变量有块级作用域。

   ::: code-group

   ```js
   function demo() {
   	let n = 2;
   	if (true) {
   		let n = 1;
   	}
   	console.log(n);//2
   }
   demo();

   function demo1() {
   	var = 2;
   	if (true) {
   		var n = 1;
   	}
   	console.log(n);//1
   }
   demo1();
   ```

   :::

   ::: code-group

   ```js
   (function () {
     var a = (b = 10);
   })();
   console.log(a); //报错，a的作用域在自执行函数内的局部作用域
   console.log(b); //10，这里的b前面没有var，所以挂载到 window 上的
   ```

   :::
