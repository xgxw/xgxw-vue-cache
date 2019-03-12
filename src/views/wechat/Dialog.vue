<template>
  <div class="dialog">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Dialog extends Vue {
  mounted() {}
}
</script>
<style lang="scss" scoped>
@media all {
  .dialog {
    box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
    background-color: #fff;
  }
}
@media screen and (max-width: 980px) {
  .dialog {
    margin: 0 auto;
    padding: 30px;
    width: 65%;
  }
}
</style>
