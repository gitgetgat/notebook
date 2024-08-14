# Vue 路由属性怎么传参的？

<article-info/>

## params 传参：

::: code-group

```jsx
this.$router.push({ name: "index", params: { id: item.id } });
this.$route.params.id;
```

:::

## 路由属性传参

::: code-group

```jsx
this.$router.push({ path: `/index/${item.id}` });
// 路由配置
{
  path: "/index:id";
}
```

:::

## query 传参

可以解决页面刷新参数丢失的问题，应为在地址栏的 URL 里：
::: code-group

```jsx
this.$router.push({
  name: "index",
  query: { id: item.id }
});
```

:::
