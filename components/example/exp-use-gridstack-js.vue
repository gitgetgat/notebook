<template>
  <div class="grid-stack-container">
    <h2>GridStack.js 演示</h2>
    <div class="grid-stack"></div>
  </div>
</template>

<script setup>
import * as pkg from 'gridstack/dist/gridstack.js';
const { GridStack } = pkg;
import 'gridstack/dist/gridstack.min.css'
import { onMounted, ref } from 'vue'
onMounted(() => {
  const grid = GridStack.init({
    cellHeight: 80,
    margin: 6,
    minRow: 5 // 确保网格至少有5行高
  });
  grid.load([
    { x: 0, y: 0, w: 2, h: 2, content: '1' },
    { x: 4, y: 0, w: 4, h: 4, content: '2' },
    { x: 8, y: 0, w: 4, h: 2, content: '3' },
    { x: 0, y: 2, w: 3, h: 3, content: '4' },
    { x: 8, y: 6, w: 4, h: 3, content: '5' }
  ]);
})

</script>
<style lang="less">
.grid-stack-container {
  background: #f1f2f4;
  border-radius: 0.5rem;
  h2 {
    text-align: center;
    color: #3c3f44;
    margin: 16px 0;
  }
}
.grid-stack .grid-stack-item-content {
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(34 197 94 / 0.15);
  text-align: center;
}
</style>
