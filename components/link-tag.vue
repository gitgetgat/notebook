<template>
  <div
    class="link-tag-items"
    :class="{'flex-direction-column': flexDirectionColumn}"
  >
    <div
      class="flex link-tag-warp"
      v-for="link in linkList"
      @click="goToUrl(link)"
    >
      <div
        v-if="link.linkType==='git'"
        class="link-icon"
      >
        <el-icon size="20">
          <FaGithub />
        </el-icon>
      </div>
      <div
        v-else-if="link.linkType==='npm'"
        class="link-icon npm-color"
      >
        <el-icon size="29">
          <FaNpm />
        </el-icon>
      </div>
      <div
        v-else-if="link.linkType==='zhihu'"
        class="link-icon zhihu-color"
      >
        <el-icon size="29">
          <FaZhihu />
        </el-icon>
      </div>
      <div
        v-else-if="link.linkType==='juejin'"
        class="link-icon zhihu-color"
      >
        <el-icon size="24">
          <SiJuejin />
        </el-icon>
      </div>
      <div
        v-else-if="link.linkType==='bilibili'"
        class="link-icon bilibili-color"
      >
        <el-icon size="20">
          <Fa6Bilibili />
        </el-icon>
      </div>
      <div
        v-else-if="link.linkType==='youtube'"
        class="link-icon youtube-color"
      >
        <el-icon size="42">
          <ImYoutube2 />
        </el-icon>
      </div>
      <div
        v-else-if="link.linkType==='mdn'"
        class="link-icon"
      >
        <el-icon size="18">
          <SiMdnwebdocs />
        </el-icon>
      </div>
      <div
        v-else-if="link.linkType==='vue'"
        class="link-icon vue-color"
      >
        <el-icon size="22">
          <FaVuejs />
        </el-icon>
      </div>
      <div
        v-else
        class="link-icon"
      >
        <el-icon size="18">
          <FaLink />
        </el-icon>
      </div>
      <div class="link-text">{{ link.linkText }}</div>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { ref, onMounted, getCurrentInstance, inject } from "vue";

const props = defineProps({
  linkList: {
    type: Array,
    default: []
  },
  flexDirectionColumn: {
    type: Boolean,
    default: false
  }
})

async function goToUrl(link) {
  if (!link.linkUrl) return
  aUrlSkip(link.linkUrl);
}

function aUrlSkip(url) {
  if (!url) return;
  const createAElement = document.createElement("a");
  createAElement.href = url;
  createAElement.target = "_blank";
  document.body.appendChild(createAElement);
  createAElement.click(); //点击进行跳转
  document.body.removeChild(createAElement); //跳转完成移除元素
}
</script>

<style lang="less">
.flex-direction-column {
  flex-direction: column;
}
.link-tag-warp {
  cursor: pointer;
  vertical-align: middle;
  margin: 10px 6px;
  & > div {
    display: block;
    height: 34px;
    padding: 2px 12px 2px 14px;
    i {
      display: block;
      vertical-align: middle;
    }
  }
  .link-icon {
    border-radius: 10px 0 0 10px;
    line-height: 26px;
    border: 2px solid var(--vp-c-text-1);
    display: flex;
    align-items: center; /* 垂直居中 */
    transition: all 0.2s linear;
  }
  .npm-color {
    background-color: #cb3837;
  }
  .zhihu-color {
    background-color: rgb(23, 114, 246);
  }
  .bilibili-color {
    background-color: #fb7299;
  }
  .youtube-color {
    background-color: rgb(255, 0, 0);
  }
  .vue-color {
    background-color: #42b883;
  }
  .link-text {
    padding-left: 8px;
    border-radius: 0 10px 10px 0;
    line-height: 26px;
    font-size: 14px;
    font-weight: bold;
    border: 2px solid var(--vp-c-text-1);
    border-left: none;
    transition: all 0.2s linear;
  }
}
.link-tag-warp:hover {
  .link-text {
    color: #fff;
    background-color: var(--soda-bg-rgba-1);
    border: 2px solid var(--vp-c-brand-1);
    border-left: none;
  }
  .link-icon {
    border: 2px solid var(--vp-c-brand-1);
  }
}
.link-tag-items {
  display: inline-flex;
  flex-wrap: wrap;
}
</style>
