# 基本数据类型和引用数据类型的区别？

<article-info/>

## 保存方式

基本数据类型是保存在栈内存中，保存的是一个具体的值；引用数据类型的数据保存在堆内存中，并把这个引用地址保存在栈内存中，取数据时通过取到栈内存里的地址去堆内存中取到数据，假如声明了两个引用类型的变量同时指向一个引用地址的时候，修改器用一个那个另一个也会改变。

![/1743275f-ca23-993d-a7bc-a75a219cef64.png](/1743275f-ca23-993d-a7bc-a75a219cef64.png)

## 比较方式

基本数据类型的比较是值的比较；引用类型的比较是引用地址的比较
