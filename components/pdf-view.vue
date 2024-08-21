<template>
  <div class="flex padding-box">
    <canvas id="canvasContainer"></canvas>
    <el-button @click="previousPage">previousPage</el-button>
    <el-button @click="nextPage">nextPage</el-button>
  </div>
</template>

<!-- <article-info/> -->

<script setup>
import { useSidebar } from "vitepress/theme";
import { useData } from "vitepress";
import { ref, onMounted } from "vue";
import * as pdfjs from "pdfjs-dist"
pdfjs.GlobalWorkerOptions.workerSrc = '/notebook/pdf.worker.mjs'
const pdfUrl = '/notebook/你不知道的JavaScript（上卷）.pdf'
const loadingTask = pdfjs.getDocument(pdfUrl)
let pdf = null
let currentPage = 1
console.log('pdf', pdf);
onMounted(async () => {
  // const container = document.getElementById('canvas-container');
  pdf = await loadingTask.promise
  const canvas = document.getElementById('canvasContainer');
  const context = canvas.getContext('2d')

  const page = await pdf.getPage(currentPage)
  const viewport = page.getViewport({ scale: 1.5 })

  canvas.height = viewport.height
  canvas.width = viewport.width

  const renderContext = {
    canvasContext: context,
    viewport: viewport
  }
  await page.render(renderContext);

  const outline = await pdf.getOutline()

  console.log('outline', outline);

  const pageNumber = (await pdf.getPageIndex({
    "num": 524,
    "gen": 0
  })) + 1
  console.log('pageNumber', pageNumber);
  // container.appendChild(canvas);
})
async function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    await renderPage(currentPage);
  }
}
async function nextPage() {
  if (currentPage < pdf.numPages) {
    currentPage++;
    await renderPage(currentPage);
  }
}
async function renderPage(pageNumber) {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 1.5 });

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
</script>

<style scoped>
</style>
