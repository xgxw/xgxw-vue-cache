<template>
  <mavon-editor
    :value="content"
    :defaultOpen="mode"
    :subfield="subfield"
    :toolbars="toolbars"
    :toolbarsFlag="showToolbar"
    :fontSize="fontSize"
    @save="save"
    @change="change"
  />
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import mavonEditor from "mavon-editor";
import { Mode, ToolbarsStyle, DefaultFontSize } from "@/constants/mavon-editor";
import "mavon-editor/dist/css/index.css";

@Component({
  components: {
    "mavon-editor": mavonEditor.mavonEditor
  }
})
export default class Editor extends Vue {
  @Prop() private isMobile!: boolean;
  @Prop() private save!: any;
  @Prop() private change!: any;
  @Prop() private content!: string;
  private mode: string = Mode.default;
  get subfield() {
    return !this.isMobile;
  }
  get showToolbar() {
    return true;
    // return this.isMobile;
  }
  get toolbars() {
    if (this.isMobile) {
      return ToolbarsStyle.mobile;
    }
    return ToolbarsStyle.default;
  }
  get fontSize() {
    return DefaultFontSize;
  }
}
</script>