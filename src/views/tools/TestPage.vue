<template>
  <div class="container">
    <stick-man />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import StickManDemo from "../demo/StickMan.vue";

@Component({
  components: {
    "stick-man": StickManDemo
  }
})
export default class TestPage extends Vue {
  mounted() {}
}
</script>
<style lang='scss' scoped>
</style>
