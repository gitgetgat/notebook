# 已缓存组件需要强制刷新但又需要保持缓存

<article-info/>

::: code-group

```vue
<template>
  <keep-alive :include="keepArr">
    <router-view v-if="refreshControl"></router-view>
  </keep-alive>
</template>

<script type="babel">
export default {
  name: 'v-content',
  watch: {
    // 监听哪一个路由需要重新刷新 keep-alive，isRefresh（Boolean） 配置在路由的 meta 中
    '$route.params.isRefresh': function (val, oldVal) {
      if (val && this.keepArr.includes(this.$route.meta.keepAliveName)) {
        // 先从缓存列表里删除
        this.keepArr.splice(this.keepArr.indexOf(this.$route.meta.keepAliveName), 1)
        // 利用 v-if:false 实现组件的卸载
        this.refreshControl = false
        this.$nextTick(() => {
          // DOM 刷新后 添加到缓存列表
          this.keepArr.push(this.$route.meta.keepAliveName)
          // 利用 v-if:true 实现组件的装载
          this.refreshControl = true
        })
      }
    }
  },
  data() {
    return {
      keepArr: ['home', 'service', 'data-specification'],// 需要缓存的组件
      refreshControl: true // 刷新状态
    };
  },
  components: {},
  mounted() { },
};
</script>
```

:::
