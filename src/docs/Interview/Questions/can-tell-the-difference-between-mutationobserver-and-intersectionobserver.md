# MutationObserver 与 IntersectionObserver 傻傻分不清楚？

<article-info/>

## MutationObserver 和 IntersectionObserver 的区别

### MutationObserver

- <imp-text-danger>作用</imp-text-danger>：用于监听 DOM 树的变动，包括：元素的属性、子元素列表或节点文本的变化。
- <imp-text-danger>适用场景</imp-text-danger>：可以用来检测 DOM 的结构和内容变化，比如元素被插入或删除、属性被更改等。
- <imp-text-danger>性能</imp-text-danger>：由于 MutationObserver 监听的是整个 DOM 树的变化，频繁的 DOM 操作会导致性能问题，因此适用于较少变化的场景。

### IntersectionObserver

- <imp-text-danger>作用</imp-text-danger>：用于监听目标元素与其祖先元素（或 viewport）之间的交叉状态，即是否进入或离开视口。
- <imp-text-danger>适用场景</imp-text-danger>：适合用于检测元素是否在视口中，例如：实现图片懒加载、无限滚动或曝光监测。
- <imp-text-danger>性能</imp-text-danger>：由于它的监听目标是元素的可见性，相较于 MutationObserver，更适合频繁变化的场景。

| 维度                 | 监听对象                           | 常见使用场景                      | 性能                   |
| -------------------- | :--------------------------------- | :-------------------------------- | :--------------------- |
| MutationObserver     | DOM 节点的结构、属性或文本变化     | 检测 DOM 变化（插入、删除、修改） | 频繁变化可能影响性能   |
| IntersectionObserver | 目标元素与视口或指定元素的交叉状态 | 图片懒加载、曝光监测、滚动加载等  | 更适合高频率变化的监听 |

## 应用场景

### IntersectionObserver

在之前我们做图片懒加载的时候，其实是使用过 `IntersectionObserver` 的。我们会使用它检测 `DOM（img）` 是否可见，以此来判断是否需要加载对应的图片：

::: code-group

```js
// 懒加载图片的回调函数，包含淡入效果和错误处理
function lazyLoadImages(entries, observer) {
  entries.forEach((entry) => {
    // 检查图片是否进入视口
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // 将 src 替换为 src 开始加载图片

      // 图片加载成功后，添加 'loaded' 类触发淡入效果
      img.onload = () => img.classList.add("loaded");

      // 图片加载失败时，显示默认占位图
      img.onerror = () => (img.src = "placeholder.jpg");

      observer.unobserve(img); // 停止观察该图片
    }
  });
}

// 创建 IntersectionObserver 实例，用于懒加载
const imageObserver = new IntersectionObserver(lazyLoadImages, {
  threshold: 0.1
});

// 选取所有带有 src 属性的图片并开始观察
document.querySelectorAll("img[src]").forEach((img) => {
  imageObserver.observe(img);
});
```

:::

除此之外，IntersectionObserver 在 性能检测 中也有应用场景。

比如昨天，我们讲解的 [前端埋点与监控最佳实践：从基础到全流程实现](./best-practices-for-front-end-tracking-and-monitoring-from-basics-to-full-process-implementation.md) 里，就可以通过 `IntersectionObserver` 来完成 【曝光监测】的功能：

::: tip
trackEvent 方法参考 [前端埋点与监控最佳实践：从基础到全流程实现](./best-practices-for-front-end-tracking-and-monitoring-from-basics-to-full-process-implementation.md)
:::

::: code-group

```js
// 处理元素可见性变化的回调函数
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    // 检查元素是否进入视口
    if (entry.isIntersecting) {
      console.log("元素已进入视口:", entry.target);

      // 调用自定义追踪事件函数，记录元素可见性
      trackEvent("element_visible", { elementId: entry.target.id });

      // 可选：停止观察该元素（仅触发一次）
      observer.unobserve(entry.target);
    }
  });
}

// 创建 IntersectionObserver 实例
const observer = new IntersectionObserver(handleIntersection, {
  root: null, // 使用视口作为容器
  threshold: 0.5 // 当元素 50% 可见时触发回调
});

// 选择需要观察的目标元素
const targetElement = document.getElementById("target");
observer.observe(targetElement);

// 示例追踪事件函数
function trackEvent(eventType, details) {
  console.log(`记录事件: ${eventType}`, details);
  // 在这里将追踪数据发送到服务器或分析服务
}
```

:::

### MutationObserver

MutationObserver 主要 <imp-text-danger>监听 DOM 的动态变化（添加、删除 等）</imp-text-danger>。在 SPA 应用中，动态加载的场景下会非常有用。

比如，我们做一个评论提交的功能，当用户提交一条新评论时，我们希望检测到 DOM 变化并触发相关操作：

::: code-group

```js
<div id="comments-section">
  <p>评论列表:</p>
  <div id="comments">
    <p>用户1: 很棒的文章！</p>
  </div>
</div>

<button onclick="addComment()">添加评论</button>

<script>
  // 模拟添加评论
  function addComment() {
    const comment = document.createElement("p");
    comment.textContent = `用户${Date.now()}: 新的评论内容`;
    document.getElementById("comments").appendChild(comment);
  }

  // MutationObserver 实例
  const commentsSection = document.getElementById("comments");
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'childList') {
            // 调用自定义追踪事件函数，记录元素可见性
            trackEvent('element_update', { elementId: target.target.id });
      }
    });
  });

  // 观察评论区的子节点变化
  observer.observe(commentsSection, {
    childList: true, // 监听子节点变化
  });
</script>
```

:::
