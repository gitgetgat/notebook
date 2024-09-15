# MVVM 与 MVC 有什么区别？

<article-info/>

都是一种设计思想

`MVC` 是 `Model-View-Contoller` 的简写，即模型-视图-控制器

`MVC` 的目的是将 M 和 V 的代码分离

`MVC` 是单向通信，也就是 `View` 和 `Model` 必须通过 Controller 来承上启下。

`MVVM` 实现了 `View` 和 `Model` 的自动同步，当 `Model` 的属性改变时，不再需要自己手动操作 DOM 元素，提高了页面渲染性能。

![/e8a32e18-f6fd-1197-1481-07476492e006.png](/e8a32e18-f6fd-1197-1481-07476492e006.png)

![/d4a4ba0c-c942-e5e5-5ece-331b40f0cd4b.png](/d4a4ba0c-c942-e5e5-5ece-331b40f0cd4b.png)
