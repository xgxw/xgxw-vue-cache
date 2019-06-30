<template>
  <mavon-editor
    v-model="content"
    :defaultOpen="mode"
    :subfield="subfield"
    :toolbars="toolbars"
    :toolbarsFlag="showToolbar"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import mavonEditor from "mavon-editor";
import { Mode, ToolbarsStyle } from "@/constants/MavonEditor";
import "mavon-editor/dist/css/index.css";

@Component({
  components: {
    "mavon-editor": mavonEditor.mavonEditor
  }
})
export default class Editor extends Vue {
  @Prop() private isMobile!: boolean;
  private content: string = "_init_";
  private mode: string = Mode.default;
  get subfield() {
    return !this.isMobile;
  }
  get showToolbar() {
    return this.isMobile;
  }
  get toolbars() {
    if (this.isMobile) {
      return ToolbarsStyle.mobile;
    }
    return ToolbarsStyle.default;
  }
}
</script>