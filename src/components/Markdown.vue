<template>
  <div class="markdown">
    <mavon-editor
      v-model="mkdoc"
      :defaultOpen="mode"
      :subfield="subfield"
      :toolbarsFlag="showToolBar"
      :boxShadow="boxShadow"
    />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import mavonEditor from "mavon-editor";
import { Mode } from "@/constants/mavon-editor";
import "mavon-editor/dist/css/index.css";

@Component({
  components: {
    "mavon-editor": mavonEditor.mavonEditor
  }
})
export default class Markdown extends Vue {
  @Prop() private mkdoc!: string;
  private mode: string = Mode.preview;
  private subfield: boolean = false;
  private showToolBar: boolean = false;
  private boxShadow: boolean = false;
}
</script>

<style scoped>
.markdown >>> .v-note-panel {
  border-width: 0px !important;
}
.markdown >>> .v-show-content {
  padding: 0 !important;
  background: none !important;
}
</style>