import DefaultTheme from 'vitepress/theme'
import Layout from "./Layout.vue";
import ElementPlus from 'element-plus'
import VueViewer from 'v-viewer'
import _ from 'lodash';
import ArticleInfo from '../../components/article-info.vue'
import CustomPlayer from '../../components/custom-player.vue'
import PdfViewer from '../../components/pdf-view.vue'
import 'element-plus/dist/index.css'
import 'plyr/dist/plyr.css'//播放器主题
import 'element-plus/theme-chalk/dark/css-vars.css'//暗黑模式
import './custom.css'//自定义样式，覆盖默认样式
import 'viewerjs/dist/viewer.css'



// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(ElementPlus)
    app.use(VueViewer)
    app.component('CustomPlayer', CustomPlayer)
    app.component('ArticleInfo', ArticleInfo)
    app.component('PdfViewer', PdfViewer)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    // 挂载全局方法
    app.config.globalProperties.$_ = _
  }
}