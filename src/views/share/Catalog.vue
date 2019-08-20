<template>
  <div class="container">
    <tree :data="data" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import Tree from "@/components/Tree.tsx";
import { getFidFromPath } from "../../constants/guard";

@Component({
  components: {
    tree: Tree
  }
})
export default class Catalog extends Vue {
  private data: {} = { public: { "task.csv": "task.csv", test: {} } };
  mounted() {
    let fid = getFidFromPath(this.$route);
    console.log(111, this.$route);
    let paths = fid.split("/");
    paths.forEach(path => {
      console.log(path);
    });
  }
}
</script>
<style lang='scss' scoped>
</style>
