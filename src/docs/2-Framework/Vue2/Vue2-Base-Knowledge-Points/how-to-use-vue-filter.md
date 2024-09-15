# vue 的过滤器怎么使用?

<article-info/>

::: code-group

```vue [商品列表组件]
<template>
  <div>
    <h1>Vue中过滤器(filters)的使用</h1>
    <table border="1">
      <tr v-for="(item, index) in orderData" :key="index">
        <td>{{ item.orderId }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td :class="item.status | setOrderStatus | setStatusStyle">
          {{ item.status | setOrderStatus }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { setOrderStatus, setStatusStyle } from "./filters";

export default {
  name: "test",
  filters: {
    setOrderStatus,
    setStatusStyle
  },
  data() {
    return {
      orderData: [
        // 商品
        // 1 待付款2 待发货 3 待收货 4 待评价
        { orderId: 1, name: "商品1", price: 100, status: 1 },
        { orderId: 2, name: "商品2", price: 500, status: 2 },
        { orderId: 3, name: "商品3", price: 700, status: 3 },
        { orderId: 4, name: "商品4", price: 1000, status: 4 }
      ]
    };
  }
};
</script>
<style scoped></style>
```

```js [过滤器]
export default {
  setOrderStatus(value) {
    // 1 -> 待付款 2 -> 待发货 3 -> 待收货 4 -> 待评价
    switch (value) {
      case 1:
        return "待付款";
      case 2:
        return "待发货";
      case 3:
        return "待收货";
      case 4:
        return "待评价";
      default:
        return "未获取到状态";
    }
  },
  setStatusStyle(value) {
    switch (value) {
      case "待付款":
        return "not-pay";
      case "待发货":
        return "not-send";
      case "待收货":
        return "not-receive";
      case "待评价":
        return "not-comment";
      default:
        return "";
    }
  }
};
```

:::
