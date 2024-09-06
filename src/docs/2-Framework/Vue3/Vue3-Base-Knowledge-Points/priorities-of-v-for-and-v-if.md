# v-for 和 v-if 的优先级

<article-info/>

## vue2 中 v-for 优先级比 v-if 高

我就拿一个最简单的代码来说，我把 v-for 和 v-if 共存与一个标签上，Vue2 中肯定会警告我们，不建议这么做，但是为啥不建议，根本没几个人知道~

![/dd237b57-994e-d000-4247-a1fb9fca83e8.png](/dd237b57-994e-d000-4247-a1fb9fca83e8.png)

想要获取答案，可以打开这个网站：<link-tag :linkList="[{linkType:'vue',linkText:'vue2 template-explorer',linkUrl:'https://v2.template-explorer.vuejs.org/'}]" />

这是一个解析 Vue2 代码的网站，能把 Vue 代码解析成最终的产物代码

![/3e8db3b4-11ad-aad7-c1f9-2768b4bb3c73.jpg](/3e8db3b4-11ad-aad7-c1f9-2768b4bb3c73.jpg)

其实重要的部分在这里

![/f72f7b3e-235c-17b2-ed77-2cf9a93ad6b2.jpg](/f72f7b3e-235c-17b2-ed77-2cf9a93ad6b2.jpg)

可以看到在 Vue2 中，会先循环，然后在循环中去判断，判断为真则正常渲染，判断为假则执行 `_e` 函数，`_e` 函数就是注释的意思，就是把判断为假的节点注释掉，也就是：

1. 先走 `v-for` 循环 3 次
2. 在循环体中走 `v-if` 判断
3. 判断 `item !== 2` 则正常渲染，`item === 2` 则把这个节点注释掉
   所以最终选出出来 1、3 两个节点

大家能理解为什么 Vue2 会警告你了吗？因为其实我们只需要渲染 2 个节点，但是最终还是循环了 3 次，造成了性能浪费，也就是 `v-for` 优先级高于 `v-if`，共存时会造成性能浪费

## Vue3 中 v-if 优先级比 v-for 高

但是在 Vue3 中，v-for 和 v-if 却是可以共存的，为什么呢？我们还是拿最简单的代码来分析

![/6ba2b69d-fd5d-710a-1131-eaa2b14c70a0.png](/6ba2b69d-fd5d-710a-1131-eaa2b14c70a0.png)

我们可以到这个网站：<link-tag :linkList="[{linkType:'vue',linkText:'play.vuejs.org',linkUrl:'https://play.vuejs.org/'}]" />，看到解析后的产物

![/7c55980d-019c-7e6c-21e3-62ff5d0de69c.png](/7c55980d-019c-7e6c-21e3-62ff5d0de69c.png)

重要部分在这里

![/4f5f9d0a-fddd-2aea-7c86-63b5a5c796ac.png](/4f5f9d0a-fddd-2aea-7c86-63b5a5c796ac.png)

可以看到，跟 Vue2 不同的是，Vue3 中是先走判断，然后再走循环的，也就是：

1、先走 `v-if` 判断
2、如果 `item !== 2`，就去走循环也就是 `v-for`
3、如果 `item == 2`，就执行 `createCommandVNode`，创建一个注释节点
也就是在 Vue3 中，`v-if` 优先级是高于 `v-for` 的，真正循环的只有 1、3 这两个节点，这提高了性能

但是我们会看到，代码会报错：`item 找不到`？

![/d43093d8-3e95-5200-e536-411ea8ba73aa.png](/d43093d8-3e95-5200-e536-411ea8ba73aa.png)

这是因为在 `v-for` 和 `v-if` 共存的时候，Vue3 会在底层帮我们转换成

![/888afeb9-7e76-e0b5-5f91-cf0d8a30127b.png](/888afeb9-7e76-e0b5-5f91-cf0d8a30127b.png)

不信我们可以看看转换后的产物，跟刚刚是一模一样的！！！

![/0bdeb021-95de-32ae-e3f9-6062afc3a6e9.png](/0bdeb021-95de-32ae-e3f9-6062afc3a6e9.png)

item 是在外层的，所以报错说 item 找不到，大家都知道为啥了吧？在外层怎么能获取到 item 呢？

## 总结

总结就是不要让 `v-if` 和 `v-for` 共存在同一个标签中，遇到这种情况需要使用 `computed` 去计算，然后再去渲染

![/15d2d1f5-7703-1f24-2e09-946f7a32de50.png](/15d2d1f5-7703-1f24-2e09-946f7a32de50.png)
