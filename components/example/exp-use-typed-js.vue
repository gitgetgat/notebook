<template>
  <div>
    示例展示：
    <div
      :id="'typed-output'+num"
      style="display: inline-block;"
    ></div>
  </div>
</template>

<script setup>
import typed from 'typed.js'
import { onMounted } from 'vue'

const { num } = defineProps(['num'])

const options = {
  1: {
    strings: [
      "Welcome to our site!",
      "Explore our features.",
      "Contact us for more info."
    ],
    typeSpeed: 40,
    backSpeed: 20,
    backDelay: 500,
    loop: true
  },
  2: {
    strings: [
      "Learning JavaScript...",
      "Mastering front-end development...",
      "Building amazing websites..."
    ],
    typeSpeed: 30,
    backSpeed: 50,
    backDelay: 1000,
    startDelay: 500,
    loop: true,
    showCursor: true
  }
}

onMounted(() => {
  new typed(`#typed-output${num}`, options[num]);
})
</script>

