<template>
  <div class="container" v-show="visible">
      <canvas>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

// 3d库
/*
    three: 最流行, 且 MIT
    vue-3d-model
    playcanvas: 非开源
*/

@Component({})
export default class StickMan extends Vue {
  @Prop() private visible!: boolean;

  mounted() {}
}
</script>
<style lang='scss' scoped>
@import "@/assets/css/base.scss";
@import "@/assets/css/zindex.scss";
</style>
