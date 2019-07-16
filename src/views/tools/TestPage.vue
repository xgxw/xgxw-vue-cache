<template>
  <div class="container">
    <context-menu
      :target="target"
      :show="contextMenuVisible"
      @update:show="(show) => contextMenuVisible = show"
    >
      <a @click="test1">test1</a>
      <a @click="test2">test2</a>
    </context-menu>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import ContextMenu from "@/components/ContextMenu.vue";

@Component({
  components: {
    "context-menu": ContextMenu
  }
})
export default class TestPage extends Vue {
  private target: HTMLElement = document.body;
  private contextMenuVisible: boolean = false;
  mounted() {}
  test1() {
    console.log("test1");
  }
  test2() {
    console.log("test2");
  }
}
</script>
<style lang='scss' scoped>
</style>
