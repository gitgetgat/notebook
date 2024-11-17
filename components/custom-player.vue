<template>
  <!-- https://github.com/sampotts/plyr -->
  <slot name="bilibili"></slot>
  <video
    class="player"
    v-if="type === 'self'"
    :id="eleId"
    controls
  >
    <source :src="src" />
  </video>
</template>

<!-- <custom-player type="bilibili">
  <template v-slot:bilibili>
    <iframe
        width="100%"
        height="500"
        src="//player.bilibili.com/player.html?isOutside=true&aid=481406105&bvid=BV1yT411X7AY&cid=995047054&p=1&autoplay=0"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
      >
      </iframe>
  </template>
</custom-player> -->

<!-- <custom-player src="" /> -->

<script>
import { toRefs, onMounted } from "vue";
// import Plyr from 'plyr';
export default {
  props: {
    type: {
      type: String,
      default: 'self'
    },
    eleId: {
      type: String,
      default: 'myPlayer'
    },
    src: {
      type: String,
      required: true
    }
  },
  setup(props) {
    let Plyr = null
    const { eleId, src } = toRefs(props)

    onMounted(() => {
      import('plyr').then(module => {
        Plyr = module.default
        const player = new Plyr(`#${eleId.value}`);
      })
    });
  }
}
</script>

<style scoped>
.player {
  margin: 30px 0;
  width: 100%;
  height: auto;
}
</style>