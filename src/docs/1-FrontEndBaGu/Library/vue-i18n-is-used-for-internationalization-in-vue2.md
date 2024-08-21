# Vue 国际化插件 vue-i18n

[官方文档](https://vue-i18n.intlify.dev/)

[Git](https://github.com/intlify/vue-i18n)

## 安装

```bash
npm install vue-i18n
```

::: tip
v8 适用于 Vue2，v9 适用于 Vue3
:::

## 创建项目结构

这里我们就不拘泥于什么项目结构了，项目目录结构大同小异，结构只是影响引用的方式，这里我们创建 一个 `lang` 文件夹用来存放项目里的 `多语言文件`

![/c773cedb-675a-7113-6a0d-8c986d8af1df.png](/c773cedb-675a-7113-6a0d-8c986d8af1df.png)

### 创建多语言文件

::: code-group

```js [en.js]
const en = {
  Language: "English",
  CreisMacrodata: {
    // 宏观版
    FORMATTER: {
      "Niang-": "-", // 年-
      NiangDian: ".", //年
      "-Yue": "" // -月
    },
    COMPONENT: {
      TABLE: {
        TongBi: "YoY", //同比
        HuanBi: "Mom", //环比
        ZhanBi: "Proportion", //占比
        HeJi: "Sum", //合计
        PingJunZhi: "Average", //平均值
        ZuiDaZhi: "Max", //最大值
        ZuiXiaoZhi: "Min", //最小值
        ZhongWeiShu: "Median" //中位数
      }
    },
    TITLE: {
      Home: "Macro-data-Edition Home", //宏观版-首页
      Refresh: "Macro-data-Edition Refresh", //宏观版
      Transaction: "Macro-data-Edition Transaction", //宏观版-交易数据
      Development: "Macro-data-Edition Development", //宏观版-开发经营
      Indices: "Macro-data-Edition Indices", //宏观版-指数研究
      Economy: "Macro-data-Edition Economy", //宏观版-宏观经济
      Search: "Macro-data-Edition Search", //宏观版-全局搜索
      PolicyPlan: "Macro-data-Edition Policy&Plan", //宏观版-政策规划
      PolicyPlanDetail: "Macro-data-Edition Policy&Plan Detail", //宏观版-政策规划详情
      Template: "Macro-data-Edition Template", //宏观版-数据模板
      ServiceCenter: "Macro-data-Edition Service Center", //宏观版-服务中心
      DataInstruction: "Macro-data-Edition Data Instruction", //宏观版-数据说明
      HelpCenter: "Macro-data-Edition Help Center" //宏观版-帮助中心
    },
    NOTFOUND: {
      TIP: "Please check if the URL you entered is correct, and click the button below to return to the homepage", //请检查您输入的网址是否正确，请点击以下按钮返回主页
      ReturnToHome: "Return to Home" //返回首页
    },
    NAV: {
      Home: "HOME", //首页
      Search: "SEARCH", //搜索
      Transaction: "TRANSACTION", //交易
      Development: "DEVELOPMENT", //开发
      Indices: "INDICES", //指数
      Economy: "ECONOMY", //宏观
      ExtractData: "EXTRACT DATA", //提取数据
      "Policy&Plan": "POLICY&PLAN", //政策
      Template: "TEMPLATE", //我的模版
      OnlineTables: "ONLINE TABLES", //在线表格
      HelpCenter: "Help Center", //帮助中心
      DataInstruction: "Data Instruction", //数据说明
      SignOut: "Sign Out", //退出
      Version: "Version", //版本
      "Macro-data-Edition": "Macro-data-Edition", //宏观版
      Account: "Account" //账户
    }
  }
};
export default en;
```

```js [zh-CN.js]
const zh = {
  Language: "中文",
  CreisMacrodata: {
    // 宏观版
    FORMATTER: {
      "Niang-": "年",
      NiangDian: "年",
      "-Yue": "月"
    },
    TITLE: {
      Home: "宏观版-首页",
      Refresh: "宏观版",
      Transaction: "宏观版-交易数据",
      Development: "宏观版-开发经营",
      Indices: "宏观版-指数研究",
      Economy: "宏观版-宏观经济",
      Search: "宏观版-全局搜索",
      PolicyPlan: "宏观版-政策规划",
      PolicyPlanDetail: "宏观版-政策规划详情",
      Template: "宏观版-数据模板",
      ServiceCenter: "宏观版-服务中心",
      DataInstruction: "宏观版-数据说明",
      HelpCenter: "宏观版-帮助中心"
    },
    COMPONENT: {
      TABLE: {
        TongBi: "同比",
        HuanBi: "环比",
        ZhanBi: "占比",
        HeJi: "合计",
        PingJunZhi: "平均值",
        ZuiDaZhi: "最大值",
        ZuiXiaoZhi: "最小值",
        ZhongWeiShu: "中位数"
      }
    },
    NOTFOUND: {
      TIP: "请检查您输入的网址是否正确，请点击以下按钮返回主页",
      ReturnToHome: "返回首页"
    },
    NAV: {
      Home: "首页",
      Search: "搜索",
      Transaction: "交易",
      Development: "开发",
      Indices: "指数",
      Economy: "宏观",
      ExtractData: "提取数据",
      "Policy&Plan": "政策",
      Template: "我的模版",
      OnlineTables: "在线表格",
      HelpCenter: "帮助中心",
      DataInstruction: "数据说明",
      SignOut: "退出",
      Version: "版本",
      "Macro-data-Edition": "宏观版",
      Account: "账户"
    }
  }
};
export default zh;
```

:::

### 创建 i18n.js

![/0638e529-4592-78c2-21b8-226838e28f88.png](/0638e529-4592-78c2-21b8-226838e28f88.png)

创建 `i18n.js` 文件，用来引入 `vue-i18n` 插件，并创建 `i18n` 实例对象

::: code-group

```js
import Vue from "vue";
import VueI18n from "vue-i18n";
// 引入自定义的各个语言配置文件
import zh from "../lang/zh-CN";
import en from "../lang/en";

//element-ui自带多语言配置
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";

// 第三方包的各个语言配置文件

import yjyUiZh from "yjy-ui/lib/config/language/zh-CN";
import yjyUiEn from "yjy-ui/lib/config/language/en";

import bpMacrodataTableZh from "@fm_modules_dev/bp-macrodata-table/src/lang/zh-CN";
import bpMacrodataTableEn from "@fm_modules_dev/bp-macrodata-table/src/lang/en";
import bpMacrodataSelectZh from "@fm_modules_dev/bp-macrodata-select/src/lang/zh-CN";
import bpMacrodataSelectEn from "@fm_modules_dev/bp-macrodata-select/src/lang/en";
import bpPolicyListZh from "@fm_modules_dev/bp-policy-list/src/lang/zh-CN";
import bpPolicyListEn from "@fm_modules_dev/bp-policy-list/src/lang/en";
import bpCityPlanningZh from "@fm_modules_dev/bp-city-planning/src/lang/zh-CN";
import bpCityPlanningEn from "@fm_modules_dev/bp-city-planning/src/lang/en";
Vue.use(VueI18n);

// 各个国家语言包
const messages = {
  en: {
    ...en,
    ...yjyUiEn,
    ...bpMacrodataTableEn,
    ...bpMacrodataSelectEn,
    ...bpPolicyListEn,
    ...bpCityPlanningEn,
    ...enLocale
  },
  zh: {
    ...zh,
    ...yjyUiZh,
    ...bpMacrodataTableZh,
    ...bpMacrodataSelectZh,
    ...bpPolicyListZh,
    ...bpCityPlanningZh,
    ...zhLocale
  }
};

const i18n = new VueI18n({
  locale: localStorage.getItem("change-language") || "zh-CN", // 先从本地获取语言类型
  messages, // 配置的文本内容
  silentTranslationWarn: true, // 忽略翻译警告
  globalInjection: true, // 全局注入
  fallbackLocale: "zh" // 指定的locale没有找到对应的资源或当前语种不存在时，默认设置当前语种为中文
});

export default i18n;
```

:::

## 修改项目入口文件 main.js

::: code-group

```js
// main.js
import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui"; //element-ui
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import i18n from "./i18n"; //
import ElementLocale from "element-ui/lib/locale";

ElementLocale.i18n((key, value) => i18n.t(key, value)); // element-ui 使用 i18n

new Vue({
  render: (h) => h(App),
  i18n //挂载
}).$mount("#app");
```

:::

## 实现语言切换 change-language.vue

::: code-group

```vue
<template>
  <div class="header-user fr">
    <ul class="user-nav clearfix">
      <li>
        <el-dropdown trigger="click" @command="handle">
          <a href="javascript:;">
            {{ $t("Language") }}
            <em class="el-icon-caret-bottom"></em>
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) of list"
              :key="index"
              :command="item.key"
              >{{ item.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "change-language",
  data() {
    return {
      list: [
        { key: "en", name: "English" }, // 英语
        { key: "zh-CN", name: "中文" } // 中文
      ]
    };
  },
  methods: {
    handle(value) {
      if (this.$i18n.locale === value) return;
      this.$i18n.locale = value;
      localStorage.setItem("change-language", value);
    }
  }
};
</script>
<style scoped lang="scss"></style>
```

:::

## 使用时遇到的问题

### i18n 在 props 里无法正常使用

有时我们需要在 `props` 里的 `default` 里使用 `i18n` 来指定国际化下的默认值。

但是直接使用 `this.$t()` 会报错 `TypeError: _this.$t is not function`

::: code-group

```vue [未使用 i18n]
<script>
export default {
  props: {
    rowSetInfo: {
      type: Object,
      default: () => ({
        rowHeader: {
          name: "时间",
          hasSort: true,
          width: 13,
          textAlign: "center",
          bold: "bold"
        },
        rows: []
      })
    }
  }
};
</script>
```

```vue [使用 i18n]
<script>
// zhLocale 是中文字体文件
export default {
  props: {
    rowSetInfo: {
      type: Object,
      default: function () {
        return {
          rowHeader: {
            name:
              typeof this.$t === "function"
                ? this.$t("YjyUi.Table.ShiJian")
                : "YjyUi.Table.ShiJian"
                    .split(".")
                    .reduce((prev, curr) => prev[curr], zhLocale) || "",
            hasSort: true,
            width: 13,
            textAlign: "center",
            bold: "bold"
          },
          rows: []
        };
      }
    }
  }
};
</script>
```

:::
