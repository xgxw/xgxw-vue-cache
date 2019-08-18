<template>
  <div class="container">
    <tree :data="data"/>
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
  private data:{} = {"public":{"task.csv":"task.csv","test":{}}} 
  mounted() {}
}
</script>
<style lang='scss' scoped>
</style>
