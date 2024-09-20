import DefaultTheme from 'vitepress/theme'
import Layout from "./Layout.vue";
import ElementPlus from 'element-plus'
import VueViewer from 'v-viewer'
import _ from 'lodash';
import ArticleInfo from '../../components/article-info.vue'
import CustomPlayer from '../../components/custom-player.vue'
import PdfViewer from '../../components/pdf-view.vue'
import LinkTag from '../../components/link-tag.vue'
import ImpTextDanger from '../../components/imp-text-danger.vue'
import ImpTextSuccess from '../../components/imp-text-success.vue'
import ImpTextPrimary from '../../components/imp-text-primary.vue'
import ImpTextWarning from '../../components/imp-text-warning.vue'
import 'element-plus/dist/index.css'
import 'plyr/dist/plyr.css'//播放器主题
import 'element-plus/theme-chalk/dark/css-vars.css'//暗黑模式
import './custom.css'//自定义样式，覆盖默认样式
import 'viewerjs/dist/viewer.css'




// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as iconFa from '../../node_modules/vue-icons-plus/icons/fa/index.mjs'
import * as iconFa6 from '../../node_modules/vue-icons-plus/icons/fa6/index.mjs'
import * as iconIm from '../../node_modules/vue-icons-plus/icons/im/index.mjs'
import * as iconLu from '../../node_modules/vue-icons-plus/icons/lu/index.mjs'
import * as iconSi from '../../node_modules/vue-icons-plus/icons/si/index.mjs'


export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.use(VueViewer)
    app.component('CustomPlayer', CustomPlayer)
    app.component('ArticleInfo', ArticleInfo)
    app.component('PdfViewer', PdfViewer)
    app.component('LinkTag', LinkTag)
    app.component('ImpTextDanger', ImpTextDanger)
    app.component('ImpTextSuccess', ImpTextSuccess)
    app.component('ImpTextPrimary', ImpTextPrimary)
    app.component('ImpTextWarning', ImpTextWarning)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    for (const [key, component] of Object.entries(iconFa)) {
      app.component(key, component)
    }
    for (const [key, component] of Object.entries(iconFa6)) {
      app.component(key, component)
    }
    for (const [key, component] of Object.entries(iconIm)) {
      app.component(key, component)
    }
    for (const [key, component] of Object.entries(iconLu)) {
      app.component(key, component)
    }
    for (const [key, component] of Object.entries(iconSi)) {
      app.component(key, component)
    }
    // 挂载全局方法
    app.config.globalProperties.$_ = _
  }
}