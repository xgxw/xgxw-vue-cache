<template>
  <main class="status">
    <time class="cell">20:00</time>
    <img class="cell" src="../assets/imgs/ios11-cellular-signal-icon.png">
    <img class="cell" src="../assets/imgs/ios10-wifi-symbol-status-icon.png">
    <img class="cell" src="../assets/imgs/ios12-battery-status-icon.png">
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class StatusBar extends Vue {
  @Prop() private mkdoc!: string;
  mounted() {}
  get content() {
    return "Hello";
  }
}
</script>

<style scoped lang="scss">
$height: 30pt;
$width: 375pt;
.status {
  height: $height;
  width: $width;

  .cell {
    height: $height;
    width: auto;
  }
}
</style>
