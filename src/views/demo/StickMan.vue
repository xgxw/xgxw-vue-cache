<template>
  <div class="container">
    <stick-man :visible="visible" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import StickMan from "@/components/StickMan.vue";

@Component({
  components: {
    "stick-man": StickMan
  }
})
export default class StickManDemo extends Vue {
  private visible: boolean = true;
  mounted() {
      console.log("StickMan Demo")
  }
}
</script>
<style lang='scss' scoped>
@import "@/assets/css/base.scss";
@import "@/assets/css/zindex.scss";
</style>
