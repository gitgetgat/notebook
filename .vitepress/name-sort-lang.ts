import { GIT_LABELS } from "../module-router/git_labels";
import { CSS_LABELS } from "../module-router/css_labels";
import { JAVASCRIPT_LABELS } from "../module-router/javascript_labels";
import { TYPESCRIPT_LABELS } from "../module-router/typescript_labels";
import { HTML_LABELS } from "../module-router/html_labels";
import { QUESTIONS_LABELS } from "../module-router/questions_labels";
import { TALK_LABELS } from "../module-router/talk_labels";
import { LIBRARY_LABELS } from "../module-router/library_labels";
import { NODE_LIBRARY_LABELS } from "../module-router/node_library_labels";
import { VSCODE_PLUGINS_LABELS } from "../module-router/vscode_plugins_labels";
import { UNIAPP_LABELS } from "../module-router/uniapp_labels";
import { VUE2_BASE_LABELS } from "../module-router/vue2_base_labels";
import { VUE2_SOURCE_CODE_DEBUG_LABELS } from "../module-router/vue2_source_code_debug_labels";
import { VUE3_BASE_LABELS } from "../module-router/vue3_base_labels";
import { VUE3_SOURCE_CODE_DEBUG_LABELS } from "../module-router/vue3_source_code_debug_labels";
import { VUE3_COMPILATION_PRINCIPLE_REVEALED_LABELS } from "../module-router/vue3_compilation_principle_revealed_labels";
import { VUEX_LABELS } from "../module-router/vuex_labels";
import { VUEROUTER_LABELS } from "../module-router/vuerouter_labels";
import { NODEJS_LABELS } from "../module-router/nodejs_labels";
import { WEBPACK_LABELS } from "../module-router/webpack_labels";
import { VITE_LABELS } from "../module-router/vite_labels";
import { BROWSER_LABELS } from "../module-router/browser_labels";
import { CODESNIPPET_LABELS } from "../module-router/codesnippet_labels";
import { DESIGNPATTERNS_LABELS } from "../module-router/designpatterns_labels";
import { NETWORK_LABELS } from "../module-router/network_labels";

function addSortKey(labels) {
  return labels.map((e, idx) => {
    e.sortKey = idx + 1;
    return e;
  });
}

const NAME_LABELS = [
  ...addSortKey(GIT_LABELS),
  ...addSortKey(CSS_LABELS),
  ...addSortKey(JAVASCRIPT_LABELS),
  ...addSortKey(TYPESCRIPT_LABELS),
  ...addSortKey(HTML_LABELS),
  ...addSortKey(QUESTIONS_LABELS),
  ...addSortKey(TALK_LABELS),
  ...addSortKey(VSCODE_PLUGINS_LABELS),
  ...addSortKey(LIBRARY_LABELS),
  ...addSortKey(NODE_LIBRARY_LABELS),
  ...addSortKey(NODEJS_LABELS),
  ...addSortKey(CODESNIPPET_LABELS),
  ...addSortKey(UNIAPP_LABELS),
  ...addSortKey(VUE2_BASE_LABELS),
  ...addSortKey(VUE2_SOURCE_CODE_DEBUG_LABELS),
  ...addSortKey(VUE3_BASE_LABELS),
  ...addSortKey(WEBPACK_LABELS),
  ...addSortKey(VITE_LABELS),
  ...addSortKey(VUEROUTER_LABELS),
  ...addSortKey(VUEX_LABELS),
  ...addSortKey(BROWSER_LABELS),
  ...addSortKey(DESIGNPATTERNS_LABELS),
  ...addSortKey(NETWORK_LABELS),
  ...addSortKey(VUE3_SOURCE_CODE_DEBUG_LABELS),
  ...addSortKey(VUE3_COMPILATION_PRINCIPLE_REVEALED_LABELS),
];
const spaceStr = "　";
const DIR_LABELS = {
  "1-FrontEndBaGu": "前端",
  "1-HTML": "HTML",
  "2-CSS": "CSS",
  "3-JavaScript": "JavaScript",
  "4-TypeScript": "TypeScript",
  "5-Vue-Router": "Vue-Router",
  "6-Vuex": "Vuex",
  "7-Browser": "浏览器",
  "8-Engineering": "前端工程化",
  "2-Framework": "框架",
  Vue2: "Vue2",
  Vue3: "Vue3",
  "Vue2-Source-Code-Debug": `${spaceStr}Vue2 源码解析`,
  "Vue3-Source-Code-Debug": `${spaceStr}Vue3 源码解析`,
  "Vue3-Compilation-Principle-Revealed": `${spaceStr}Vue3 编译原理揭秘`,
  "Vue2-Base-Knowledge-Points": `${spaceStr}Vue2 基础知识点`,
  "Vue3-Base-Knowledge-Points": `${spaceStr}Vue3 基础知识点`,
  "3-BackEnd": "服务端",
  "4-ActualCombat": "实战",
  "5-DesignPatterns": "设计模式",
  "6-Share": "分享",
  GO: "GO",
  NodeJS: "NodeJS",
  Python: "Python",
  "4-Database": "数据库",
  UniApp: "Uni-App",
  CodeSnippet: "代码片段",
  Project: "项目实战",
  MongoDB: "MongoDB",
  MySql: "MySql",
  Redis: "Redis",
  SQLite: "SQLite",
  "WebStorage-IndexedDB": "浏览器存储",
  FrontEndUseSkills: "前端技巧应用",
  DataStructureAndAlgorithms: "数据结构与算法",
  Library: "Browser 库",
  NodeLibrary: "Node 库",
  "VsCode-Plugins": "VSCode 插件",
  "Uni-App": "Uni-App",
  Webpack: `${spaceStr}Webpack`,
  Vite: `${spaceStr}Vite`,
  Git: "Git",
  Interview: "面试",
  Questions: "面试题",
  Talk: "话术",
  LeetCode: "LeetCode",
  Network: "网络",
};
export { NAME_LABELS, DIR_LABELS };
