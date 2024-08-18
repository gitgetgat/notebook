import { defineConfig, type DefaultTheme } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import { sidebarItems, navItems } from "./nav-data";
import util from 'util';

// console.info('sidebarItems', util.inspect(sidebarItems, { depth: null, maxArrayLength: null }));
// console.info('navItems', util.inspect(navItems, { depth: null, maxArrayLength: null }));
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Soda's blog",
  description: "A VitePress Site",
  lang: 'zh-cn',
  srcDir: './src',
  cleanUrls: true,//生成简洁的 URL
  lastUpdated: true,
  themeConfig: {
    logo: { src: '/zzz-logo-mini.png', width: 24, height: 24 },

    nav: navItems,

    sidebar: sidebarItems,

    footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2019-present <a href="https://github.com/yyx990803">Evan You</a>'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    // // 搜索
    // search: {
    //   // local 自带的搜索只能搜索每篇文章的标题或者章节标题，并且可以定位到搜素结果的某一个章节标题位置
    //   provider: 'local'
    // }
  },
  vite: {
    plugins: [
      pagefindPlugin(
        {
          btnPlaceholder: '搜索',
          placeholder: '搜索文档',
          emptyText: '空空如也',
          heading: '共: {{searchResult}} 条结果',
          // 搜索结果不展示最后修改日期日期
          showDate: false,
          toSelect: '跳转到选项',
          toNavigate: '切换',
          toClose: '关闭',
          searchBy: '',
          customSearchQuery(input) {
            // 将搜索的每个中文单字两侧加上空格
            return input.replace(/[\u4E00-\u9FA5]/g, ' $& ')
              .replace(/\s+/g, ' ')
              .trim()
          },
          filter(searchItem, idx, originArray) {
            // 使用filter方法自定义过滤行为
            // console.log(searchItem)
            return !searchItem.route.includes('404')
          }
        }
      ),
    ],
    build: {
      commonjsOptions: {
        include: /node_modules|libs/,
      }
    }
  },
  markdown: {
    lineNumbers: true
  },
  async transformHtml(code, id, context) {
    // console.log('code', code)
    // console.log('id', id)
    // console.log('context', context)
  }
})
