<template>
  <div class="container">
    <shell />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import CommandBar from "@/components/CommandBar.vue";

@Component({
  components: {
    shell: CommandBar
  }
})
export default class TestPage extends Vue {
  mounted() {}
}
</script>
<style lang='scss' scoped>
</style>
