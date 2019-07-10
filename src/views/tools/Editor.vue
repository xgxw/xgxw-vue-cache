<template>
  <div class="container">
    <Loading :spinning="fetching" />
    <EditorComponent :isMobile="isMobile" :content="content" :change="change" :save="save" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { default as EditorComponent } from "@/components/Editor.vue";
import Loading from "@/components/Loading.vue";
import { mapGetters, mapActions } from "vuex";
import { isMobile } from "@/util/util";
import AutoSaveClient from "@/util/autosave";
import RedirectModal from "../components/RedirectModal.vue";

@Component({
  components: {
    EditorComponent,
    Loading,
    RedirectModal
  },
  computed: {
    ...mapGetters({
      content: "article/getContent",
      fetching: "article/isFetching",
      isChanged: "article/isChangedSinceLastSave"
    })
  },
  methods: {
    ...mapActions({
      fetchContent: "article/fetchContentLocal",
      changeContent: "article/changeContent",
      uploadContent: "article/uploadContentLocal"
    })
  }
})
export default class Editor extends Vue {
  // 启动启动保存. 只有当文件加载成功时, 才会启用自动保存
  private autoSaveclient!: AutoSaveClient;
  startAutoSave() {
    let _this = this;
    this.autoSaveclient = new AutoSaveClient(function() {
      _this.save(_this.content);
    });
    this.autoSaveclient.start();
  }

  private isMobile = isMobile();
  mounted() {
    this.fetchContent("tools_editor").then(res => {
      this.startAutoSave();
    });
  }
  destroyed() {
    if (this.autoSaveclient) {
      this.autoSaveclient.stop();
    }
  }
  change(data: string) {
    this.changeContent(data);
  }
  save(data: string) {
    // 如果文件从上次save后没有更改过, 那么跳过执行save
    if (this.isChanged == false) {
      return;
    }
    const hide: TimerHandler = this.$message.loading(
      "save to localStorage..",
      0
    );
    this.uploadContent(data)
      .then(res => {
        this.$message.info("save finished", 2);
      })
      .catch(e => {
        this.$message.warning("服务器跑路了, 更新文件失败..", 2);
      })
      .finally(() => {
        setTimeout(hide, 0);
      });
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
@import "@/assets/css/editor.scss";
</style>
