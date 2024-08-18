# HTMLCollection 和 NodeList 的区别

<article-info/>

- `NodeList` 是一个静态集合，其不受 DOM 树元素变化的影响；相当于是 DOM 树快照，节点数量和类型的快照，就是对节点增删，NodeList 感觉不到。但是对节点内部内容修改，是可以感觉到的，比如修改 innerHTML。

- `HTMLCollection` 是动态绑定的，是一个的动态集合， DOM 树发生变化，HTMLCollection 也会随之变化，节点的增删是敏感的。只有 `NodeList` 对象有包含属性节点和文本节点。

- `HTMLCollection` 是 tml 元素的集合，可以通过 name，id 或 index 索引来获取。NodeList 只能通过 index 索引来获取。

- `HTMLCollection` 和 `NodeList` 本身无法使用数组的方法：pop()，push()，或 join() 等。除非你把他转为一个数组，你使用上面所介绍的方法将其转换为数组。
