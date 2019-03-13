<template>
  <main class="status">
    <div>
      <time class="cell left"><b>{{time}}</b></time>
    </div>
    <div>
      <img class="cell right" src="../assets/imgs/ios12-battery-status-icon.png">
      <img class="cell right" src="../assets/imgs/ios10-wifi-symbol-status-icon.png">
      <img class="cell right" src="../assets/imgs/ios11-cellular-signal-icon.png">
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class StatusBar extends Vue {
  @Prop() private time!: string;
  mounted() {}
  get content() {
    return "Hello";
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/iphonex.scss";
.status {
  height: $header-height;
  width: $width;
  padding: 10px 4px 0;
  .cell {
    height: 20px;
    font-size: 1.1rem;
    display: flex;
    flex-direction: column;
  }
  .cell:not(:last-child) {
    padding-left: 10px;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
}
</style>
