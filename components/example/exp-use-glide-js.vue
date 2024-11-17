<template>
  <div
    class="glide"
    id="use-gilde-box"
  >
    <div
      class="glide__track"
      data-glide-el="track"
    >
      <div class="glide__slides">
        <div class="glide__slide">
          <div class="glide__slide__item">item-0</div>
        </div>
        <div class="glide__slide">
          <div class="glide__slide__item">item-1</div>
        </div>
        <div class="glide__slide">
          <div class="glide__slide__item">item-2</div>
        </div>
      </div>
    </div>

    <div
      class="glide__bullets"
      data-glide-el="controls[nav]"
    >
      <button
        class="glide__bullet"
        data-glide-dir="=0"
      ></button>
      <button
        class="glide__bullet"
        data-glide-dir="=1"
      ></button>
      <button
        class="glide__bullet"
        data-glide-dir="=2"
      ></button>
    </div>
  </div>
</template>

<script setup>
import Glide from '@glidejs/glide'
import "@glidejs/glide/dist/css/glide.core.min.css"
import "@glidejs/glide/dist/css/glide.theme.min.css"
import { nextTick, onMounted } from 'vue';

onMounted(() => {
  new Glide('.glide').mount()
});
</script>

<style scoped>
#use-gilde-box {
  color: black;
  width: 100%;
  position: static;
  display: block;
}
.glide__slide__item {
  height: 200px;
  background-color: aqua;
  text-align: center;
  line-height: 200px;
  font-size: 22px;
  color: #fff;
  border-radius: 10px 10px 0 0;
}
.glide__bullets {
  background-color: burlywood;
  display: block;
  position: static;
  height: 40px;
  line-height: 40px;
  text-align: center;
  left: auto;
  transform: none;
  /* bottom: 10px; */
}
</style>