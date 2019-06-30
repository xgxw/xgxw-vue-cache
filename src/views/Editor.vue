<template>
  <div class="container">
    <EditorComponent :isMobile="isMobile" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { default as EditorComponent } from "@/components/Editor.vue";
import { MobileWidth } from "@/constants/Constants";

@Component({
  components: {
    EditorComponent
  }
})
export default class Editor extends Vue {
  get isMobile() {
    if (document.body.clientWidth < MobileWidth) {
      return true;
    }
    return false;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";

@media all {
  .v-note-wrapper::v-deep {
    min-height: 90vh !important;
  }
}

// PC端界面
@media screen and (min-width: $mobile-width) {
  .container {
    padding: 20px;
  }
}

// 移动端界面
@media screen and (max-width: $mobile-width) {
  .container {
    padding: 0px;
  }
}
</style>
