<template>
  <div class="container">
    <tree />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import Tree from "@/components/Tree.tsx";

@Component({
  components: {
    tree: Tree
  }
})
export default class Home extends Vue {
  mounted() {}
}
</script>
<style lang='scss' scoped>
</style>
