<!-- .vitepress/theme/Layout.vue -->

<script setup lang="ts">
import { useData, onContentUpdated, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide, onUpdated } from 'vue'
// import { api as viewerApi } from "v-viewer"
import * as Viewer from "v-viewer"

const { api: viewerApi } = Viewer

const { isDark } = useData()

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
onContentUpdated(() => {
  // 添加自定义类名
  document.querySelectorAll('.vp-code-group').forEach(ele => {
    if (ele.querySelectorAll('.tabs label').length <= 1) {
      ele.classList.add('tabs-hide')
    }
  })
  // 添加图片点击查看大图
  document.querySelectorAll('.vp-doc p img').forEach(ele => {
    if (ele.classList.contains('isHasViewered')) return
    ele.addEventListener('click', function () {
      console.log(this.src);
      viewerApi({
        images: [this.src]
      })
    })
    ele.classList.add('isHasViewered')
  })
});
</script>

<template>
  <DefaultTheme.Layout />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>