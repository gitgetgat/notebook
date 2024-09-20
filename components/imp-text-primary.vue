<template>
  <el-text
    size="large"
    type="primary"
    :class="bold?'bold':''"
  >
    <slot></slot>
  </el-text>
</template>

<script setup>
const props = defineProps({
  bold: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.bold {
  font-weight: 700;
}
</style>
