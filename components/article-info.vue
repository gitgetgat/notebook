<template>
  <div class="flex padding-box tag-contanier ">
    <div>
      Tags:
      <span
        v-for="tag in tags"
        class="tag"
        :class="colorMap[tag] || 'soda-tag-color9'"
      >{{ tag }}</span>
    </div>
    <div>
      状态: <span
        class="tag"
        :class="colorMap[state]"
      >{{ state }}</span>
    </div>
    <div>
      难易度:
      <template
        v-for="i in star > 10 ? 10 : star"
        :key="i"
      > ⭐️ </template>
    </div>
  </div>
</template>

<!-- <article-info/> -->

<script setup>
import { useSidebar } from "vitepress/theme";
import { useData } from "vitepress";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const { page } = useData();
const { sidebar } = useSidebar();
const currentPage = sidebar.value[0].items.find(
  (e) => page.value.filePath.indexOf(e.meta.fileName) > -1
);
/**
 * 'HTML', 'H5', 'CSS', 'ES6', 'JavaScript', 'Vue2', 'Vue3', 'Vue-Router', 'Vuex', 'React', '服务端', 'NodeJS', 'Webpack', 'Git', '网络', 'NPM', 'Uni-App', '浏览器', '第三方库', '兼容', '实战', '算法', '设计模式', '话术', '面试', '报错处理'
 */
const { fileName, star, state, tags } = currentPage.meta;

const colorMap = ref({
  HTML: "soda-tag-color2",
  H5: "soda-tag-color3",
  CSS: "soda-tag-color4",
  ES6: "soda-tag-color5",
  JavaScript: "soda-tag-color6",
  Vue2: "soda-tag-color7",
  Vue3: "soda-tag-color8",
  Library: "soda-tag-color11",
  Browser: "soda-tag-color2",
  "源码": "soda-tag-color4",
  "Vue-Router": "soda-tag-color9",
  Vuex: "soda-tag-color2",
  React: "soda-tag-color3",
  服务端: "soda-tag-color4",
  NodeJS: "soda-tag-color5",
  Webpack: "soda-tag-color6",
  Git: "soda-tag-color7",
  报错处理: "soda-tag-color10",
  网络: "soda-tag-color11",
  NPM: "soda-tag-color9",
  "Uni-App": "soda-tag-color2",
  浏览器: "soda-tag-color3",
  第三方库: "soda-tag-color4",
  兼容: "soda-tag-color5",
  实战: "soda-tag-color6",
  算法: "soda-tag-color7",
  "Webpack 技巧与优化": "soda-tag-color11",
  设计模式: "soda-tag-color8",
  话术: "soda-tag-color9",
  面试: "soda-tag-color2",
  "VSCode 插件": "soda-tag-color6",
  工具: "soda-tag-color7",
  工程化: "soda-tag-color11",
  未完成: "soda-tag-color1",
  待更新: "soda-tag-color4",
  待优化: "soda-tag-color11",
  已完成: "soda-tag-color2",
  未归类: "soda-tag-color1"
});
function tagToSidebar(tag) {
  const ele = sidebar.value.find(
    (i) => i.text.toLowerCase() === tag.toLowerCase()
  );
  if (ele && ele.items && ele.items.length) {
    aUrlSkip(ele.items[0].link);
  } else {
    ElMessage({
      message: "暂未配置该分类！",
      type: "warning",
      plain: true
    });
  }
}
function aUrlSkip(url) {
  if (!url) return;
  const createAElement = document.createElement("a");
  createAElement.href = url;
  createAElement.target = "_self";
  document.body.appendChild(createAElement);
  createAElement.click(); //点击进行跳转
  document.body.removeChild(createAElement); //跳转完成移除元素
}
</script>

<style scoped>
.padding-box {
  padding: 24px 0;
}
.tag-contanier {
  /* height: 28px; */
  line-height: 28px;
}

.tag-contanier > div {
  flex: 1;
  padding: 5px 0;
}
@media (max-width: 768px) {
  .tag-contanier {
    line-height: 28px;
    flex-direction: column;
  }
}
.tag {
  display: inline-block;
  padding: 0 5px;
  vertical-align: middle;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.804);
  margin: 0 5px;
  transition: background 0.3s;
}
.curpoint {
  cursor: pointer;
}
.soda-tag-color1 {
  background: rgba(55, 55, 55, 0.5);
}
.soda-tag-color1:hover {
  background: rgba(55, 55, 55, 1);
}
.soda-tag-color2 {
  background: rgba(43, 89, 63, 0.5);
}
.soda-tag-color2:hover {
  background: rgba(43, 89, 63, 1);
}
.soda-tag-color3 {
  background: rgba(40, 69, 108, 0.5);
}
.soda-tag-color3:hover {
  background: rgba(40, 69, 108, 1);
}
.soda-tag-color4 {
  background: rgba(133, 76, 29, 0.5);
}
.soda-tag-color4:hover {
  background: rgba(133, 76, 29, 1);
}
.soda-tag-color5 {
  background: rgba(137, 99, 42, 0.5);
}
.soda-tag-color5:hover {
  background: rgba(137, 99, 42, 1);
}
.soda-tag-color6 {
  background: rgba(90, 90, 90, 0.5);
}
.soda-tag-color6:hover {
  background: rgba(90, 90, 90, 1);
}
.soda-tag-color7 {
  background: rgba(96, 59, 44, 0.5);
}
.soda-tag-color7:hover {
  background: rgba(96, 59, 44, 1);
}
.soda-tag-color8 {
  background: rgba(73, 47, 100, 0.5);
}
.soda-tag-color8:hover {
  background: rgba(73, 47, 100, 1);
}
.soda-tag-color9 {
  background: rgba(105, 49, 76, 0.5);
}
.soda-tag-color9:hover {
  background: rgba(105, 49, 76, 1);
}
.soda-tag-color10 {
  background: rgba(11, 11, 11, 0.5);
}
.soda-tag-color10:hover {
  background: rgba(11, 11, 11, 1);
}
.soda-tag-color11 {
  background: rgba(255, 71, 119, 0.5);
}
.soda-tag-color11:hover {
  background: rgba(255, 71, 119, 1);
}
</style>
