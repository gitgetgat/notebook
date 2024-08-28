<template>
  <div class="flex pdf-viewer">
    <div class="flex thumbnail-box">
      <el-tabs
        tab-position="left"
        class="demo-tabs thumbnail-btn-tab"
      >
        <el-tab-pane
          label="Config"
          v-if="catalogueData.length"
        >
          <template #label>
            <span class="custom-tabs-label">
              <el-icon size="24">
                <Menu />
              </el-icon>
            </span>
          </template>
          <el-tree
            class=""
            style="height: 100%;overflow-x: scroll; flex: 1;padding: 12px 0;"
            :data="catalogueData"
            :props="defaultProps"
            @node-click="handleNodeClick"
          />
        </el-tab-pane>
        <el-tab-pane v-if="pageNum>0">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon size="24">
                <PictureFilled />
              </el-icon>
            </span>
          </template>
          <keep-alive>
            <div id="thumbnail-container-box">
            </div>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane v-if="false">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon size="24">
                <Management />
              </el-icon>
            </span>
          </template>
          <div class="flex_one">
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="flex_one view-contanier flex">
      <div class="view-contanier-header flex">
        <div class="start flex_one">
          <div class="btn-icon">
            <el-icon size="24">
              <Fold />
            </el-icon>
          </div>
        </div>
        <div class="center">
          <el-input-number
            @blur="renderPage"
            v-model="currentPage"
            :step="1"
            :controls="false"
          />
          <span class="inline-block mr-10 ml-10">/</span> {{ pageNum }} <span class="inline-block user-select-none mr-20 ml-20">|</span>
          <div class="btn-icon">
            <el-icon
              size="18"
              @click="zooomOut"
            >
              <RemoveFilled />
            </el-icon>
          </div>
          <el-input-number
            class="scale-input mr-10"
            @blur="renderPage"
            v-model="scale"
            :step="1"
            :min="scaleMin"
            :max="scaleMax"
            :controls="false"
          />
          <div class="btn-icon">
            <el-icon
              size="18"
              @click="zooomIn"
            >
              <CirclePlusFilled />
            </el-icon>
          </div>
          <span class="inline-block user-select-none mr-20 ml-10">|</span>
          <div class="btn-icon">
            <el-icon
              size="20"
              @click="previousPage"
            >
              <CaretLeft />
            </el-icon>
          </div>
          <div class="btn-icon">
            <el-icon
              size="20"
              @click="nextPage"
            >
              <CaretRight />
            </el-icon>
          </div>
          <div class="btn-icon">
            <el-icon size="20">
              <LuSeparatorVertical />
            </el-icon>
          </div>
          <div class="btn-icon">
            <el-icon size="16">
              <LuRotateCcw />
            </el-icon>
          </div>
        </div>
        <div class="end flex_one">
          <el-dropdown trigger="click">
            <div class="btn-icon mr-5 ml-5">
              <el-icon size="18">
                <MoreFilled />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>单页显示</el-dropdown-item>
                <el-dropdown-item>双页显示</el-dropdown-item>
                <el-dropdown-item>演示</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="btn-icon mr-5 ml-5">
            <el-icon size="18">
              <FullScreen />
            </el-icon>
          </div>
          <div class="btn-icon mr-5 ml-5">
            <el-icon size="18">
              <DCaret />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="view-contanier-body flex_one">
        <el-scrollbar class="view-contanier-body-scrollbar">
          <canvas id="canvasContainer"></canvas>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { ref, onMounted, getCurrentInstance, inject } from "vue";
import * as pdfjs from "pdfjs-dist"
const { isDark } = useData()
import { ElLoading, ElMessage } from 'element-plus'
import { CaretRight, CaretLeft } from '@element-plus/icons-vue'
import * as iconAll from 'vue-icons-plus'
// import * as iconLu from 'vue-icons-plus/lu'



pdfjs.GlobalWorkerOptions.workerSrc = '/notebook/pdf.worker.min.js'
const pdfUrl = '/notebook/aaa.pdf'
let svg = `<svg width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg" fill="${isDark ? '#1b1b1f' : '#ffffff'}">
    <circle cx="9" cy="9" r="5">
        <animate attributeName="fill-opacity"
         begin="0s" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="9" cy="27" r="5" fill-opacity=".5">
        <animate attributeName="fill-opacity"
         begin="100ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="9" cy="45" r="5">
        <animate attributeName="fill-opacity"
         begin="300ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="27" cy="9" r="5">
        <animate attributeName="fill-opacity"
         begin="600ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="27" cy="27" r="5">
        <animate attributeName="fill-opacity"
         begin="800ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="27" cy="45" r="5">
        <animate attributeName="fill-opacity"
         begin="400ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="45" cy="9" r="5">
        <animate attributeName="fill-opacity"
         begin="700ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="45" cy="27" r="5">
        <animate attributeName="fill-opacity"
         begin="500ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
    <circle cx="45" cy="45" r="5">
        <animate attributeName="fill-opacity"
         begin="200ms" dur="1s"
         values="1;.2;1" calcMode="linear"
         repeatCount="indefinite" />
    </circle>
</svg>
`

const catalogueLoading = ref(true); // 目录加载loading
const color = ref(isDark ? 'rgba(255, 255, 245, 0.86)' : 'rgba(60, 60, 67)'); // 动态的颜色
let catalogueData = ref([]); // 树形结构数据
let pdf = null; // pdf 实例
let pdfMateData = null
const currentPage = ref(5); // 当前页码
const pageNum = ref(0); // pdf 总页数
const scale = ref(100); // 缩放比例
const scaleMin = ref(25); // 缩放比例
const scaleMax = ref(300); // 缩放比例
// 目录对应属性名
const defaultProps = {
  children: 'items',
  label: 'title',
}

onMounted(() => {
  init()
})
async function init() {
  const loading = ElLoading.service({
    lock: true,
    // text: 'Loading...',
    svg,
    background: color.value,
  })
  // 读取pdf文档
  const loadingTask = pdfjs.getDocument(pdfUrl)
  pdf = await loadingTask.promise
  pageNum.value = pdf.numPages // 获取文档总页数
  console.log('pdf', pdf);
  await renderPage(null, currentPage);

  pdfMateData = await pdf.getData() // 获取文档源数据
  console.log('pdfMateData', pdfMateData);

  const outline = await pdf.getOutline() // 获取目录
  catalogueData.value = outline
  catalogueLoading.value = false
  console.log('catalogueData', catalogueData);


  initThumbnails()

  loading.close()
}
async function initThumbnails() {
  // 生成缩略图
  const thumbnailsCOntainer = document.getElementById('thumbnail-container-box');
  // 根据总页数创建缩略图元素
  for (let i = 0; i < pageNum.value; i++) {
    const div = document.createElement('div');
    div.className = 'thumbnail-box-container'
    // 添加点击事件，点击舔砖相对应页面，并且高亮当前缩略图
    div.addEventListener('click', async function (e) {
      currentPage.value = i + 1
      if (currentPage.value > 0 && currentPage.value <= pageNum.value) {
        const thumbnailBoxContainers = document.getElementsByClassName('thumbnail-box-container');
        for (let idx = 0; idx < thumbnailBoxContainers.length; idx++) {
          const ele = thumbnailBoxContainers[idx];
          ele.className = ele.className.split(' ').filter(e => e !== 'is-active').join(' ')
          if (idx === i) ele.className += ' is-active'
        }
        await renderPage(null, currentPage)
      }
    })
    // 创建缩略图渲染 canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'thumbnail'
    canvas.width = 200
    div.appendChild(canvas);
    thumbnailsCOntainer.appendChild(div);
  }

  const thumbnails = document.getElementsByClassName('thumbnail');

  for (let i = 0; i < thumbnails.length; i++) {
    const canvas = thumbnails[i]
    const context = canvas.getContext('2d')

    pdf.getPage(i + 1).then((page) => {
      // 循环渲染
      // 宽度固定，计算每页缩放比例
      let viewport = page.getViewport({ scale: 1 })
      let newScale = 200 / viewport.width
      viewport = page.getViewport({ scale: newScale })
      canvas.height = viewport.height
      canvas.width = viewport.width

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      }
      page.render(renderContext);
    })
  }
}
// 缩小
async function zooomOut() {
  if ((scale.value - 5) < scaleMin.value) {
    scale.value = scaleMin.value;
  } else {
    scale.value -= 5
  }
  await renderPage(null, currentPage);
}
// 放大
async function zooomIn() {
  if ((scale.value + 5) > scaleMax.value) {
    scale.value = scaleMax.value;
  } else {
    scale.value += 5
  }
  await renderPage(null, currentPage);
}
// 上一页
async function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    await renderPage(null, currentPage);
  }
}
// 下一页
async function nextPage() {
  if (currentPage.value < pageNum.value) {
    currentPage.value++;
    await renderPage(null, currentPage);
  }
}
// 渲染页面
async function renderPage(event, pageNumber) {
  const pageNum = pageNumber ? pageNumber.value : currentPage.value;
  const page = await pdf.getPage(pageNum);
  const viewport = page.getViewport({ scale: scale.value / 100 });

  const canvas = document.getElementById('canvasContainer');
  const context = canvas.getContext('2d');

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  const renderContext = {
    canvasContext: context,
    viewport: viewport
  };

  await page.render(renderContext);
}
// 点击目录跳转
async function handleNodeClick(val) {
  if (!Array.isArray(val.dest)) {
    ElMessage.error('目录读取页码失败！')
    return
  }
  const pageNumber = (await pdf.getPageIndex(val.dest[0])) + 1
  currentPage.value = pageNumber;
  await renderPage(null, currentPage);
}
</script>

<style lang="less">
.pdf-viewer {
  height: calc(100vh - var(--vp-nav-height, 0px));
  overflow-y: auto;

  .thumbnail-box {
    width: var(--soda-pdf-thumbnail-box-width);
    display: flex;
    height: 100%;
    border-right: 1.5px solid var(--vp-c-gutter);

    .thumbnail-btn-tab {
      width: 100%;
      height: 100%;
      display: flex;
    }

    .el-tabs__content {
      flex: 1;
      overflow-y: auto;
    }

    .el-tabs__header {
      width: 50px;
      .el-tabs__nav {
        padding-top: 10px;
      }
    }

    #thumbnail-container-box {
      height: 100%;
      overflow-y: auto;
      flex: 1;

      .thumbnail {
        padding: 16px 50px;
        display: block;
        cursor: pointer;
        position: relative;
      }
      .thumbnail-box-container.is-active {
        background-color: var(--soda-bg-rgba-1);
      }

      .thumbnail-box-container {
        flex: 1;
        border-radius: 8px;
        background-color: transparent;
        transition: background-color 0.3s linear;
      }

      .thumbnail-box-container:hover {
        background-color: var(--soda-bg-rgba-1);
      }
    }
  }
  .view-contanier {
    flex-direction: column;
    .view-contanier-header {
      height: 60px;
      padding: 0 20px;
      border-bottom: 1.5px solid var(--vp-c-gutter);
      .btn-icon {
        display: flex; /* 使用flex布局 */
        align-items: center; /* 垂直居中 */
        height: 100%;
        i {
          cursor: pointer;
          vertical-align: middle;
        }
      }
      .btn-icon:hover i {
        color: var(--vp-c-brand-1);
      }
      .center {
        display: flex; /* 使用flex布局 */
        align-items: center; /* 垂直居中 */
        height: 100%;
        .btn-icon {
          margin-right: 10px;
        }
        i {
          cursor: pointer;
          vertical-align: middle;
        }
        .el-input-number {
          width: 46px;
        }
        .scale-input {
          width: 60px;
          .el-input__inner {
            text-align: center;
          }
        }
      }
      .end {
        flex-direction: row-reverse;
        display: flex; /* 使用flex布局 */
        align-items: center; /* 垂直居中 */
        height: 100%;
        i {
          cursor: pointer;
          vertical-align: middle;
        }
      }
    }
    .view-contanier-body {
      .view-contanier-body-scrollbar {
        height: 400px;
        width: calc(100vw - var(--soda-pdf-thumbnail-box-width, 0px));
        height: calc(
          100vh - var(--vp-nav-height, px) - var(--view-contanier-header, 0px)
        );
      }
    }
  }
}
</style>
