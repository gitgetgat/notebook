# 在 created 和 mounted 去请求数据，有什么区别

<article-info/>

## created

在渲染前调用，通常先初始化属性，然后做渲染

## mounted

在模版渲染完成后，一般在初始化页面后，再对元素节点进行操作，在这里请求数据可能会造成闪屏，created 里不会

## 总结

一般 created 里比较多；

请求的数据对 DOM 有影响，在 created 里；请求的数据和 DOM 无关，则可以在 mounted 里
