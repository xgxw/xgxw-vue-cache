<template>
  <div class="container">
    <EditorComponent
      :isMobile="isMobile"
      :content="content"
      :change="changeContent"
      :save="uploadContent"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { default as EditorComponent } from "@/components/Editor.vue";
import { MobileWidth } from "@/constants/constants";
import { mapGetters, mapActions } from "vuex";
import { fileID } from "../router";

@Component({
  components: {
    EditorComponent
  },
  computed: {
    ...mapGetters({
      content: "editor/getContent"
    })
  },
  methods: {
    ...mapActions({
      fetchContent: "editor/fetchContent",
      changeContent: "editor/changeContent",
      uploadContent: "editor/uploadContent"
    })
  }
})
export default class Editor extends Vue {
  get isMobile() {
    if (document.body.clientWidth < MobileWidth) {
      return true;
    }
    return false;
  }
  mounted() {
    // TODO: 添加定时任务, 每1分钟自动执行一次uploadContent
    let fid = this.$route.params[fileID];
    this.fetchContent(fid);
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
