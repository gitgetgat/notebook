<template>
  <div v-show="scriptLoaded" id="view-container"></div>
</template>

<script setup>
// 引入 mo.js 的核心功能
// import { Burst } from "@mojs/core";

import { onMounted, ref } from "vue";

const scriptLoaded = ref(false);

const loadScript = async (src, callback) => {
  if (!scriptLoaded.value) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script.onload = () => {
      console.log("Script loaded successfully.");
      scriptLoaded.value = true;
      callback();
    };
    script.onerror = () => {
      console.error("Script loading error.");
    };
    document.head.appendChild(script);
  } else {
    console.log("Script already loaded.");
  }
};

function fn() {
  if (mojs) {
    const item = document.getElementById("view-container");
    const burst = new mojs.Burst({
      parent: item,
      radius: { 0: 100 },
      count: 7,
      rotate: { 0: 90 },
      opacity: { 1: 0 },
    }); // 播放动画
    item.addEventListener("click", function (e) {
      const itemBound = item.getBoundingClientRect();
      const mouseX = e.clientX - itemBound.left - itemBound.width / 2;
      const mouseY = e.clientY - itemBound.top - itemBound.height / 2;
      burst
        .tune({
          x: mouseX,
          y: mouseY,
        })
        .replay();
    });
  }
}

onMounted(() => {
  loadScript("https://cdn.jsdelivr.net/npm/@mojs/core", fn);
});
</script>

<style scope>
#view-container {
  position: relative; /* 在设置 parent时这个很重要 */
  width: auto;
  height: 300px;
  background-color: #fff;
  overflow: hidden;
}
</style>
