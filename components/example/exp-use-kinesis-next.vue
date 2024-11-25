<template>
  <div class="kinesis-app">
    <kinesis-container>
      Here, you can put
      <kinesis-element :strength="10"> whatever </kinesis-element>
      <kinesis-element :strength="20"> content! </kinesis-element>
    </kinesis-container>
  </div>
</template>

<script>
import { KinesisContainer, KinesisElement } from "vue-kinesis";
export default {
  name: "App",
  components: {
    KinesisContainer,
    KinesisElement,
  },
};
</script>

<style scoped>
.kinesis-app {
  padding: 40px 0;
  text-align: center;
}
</style>