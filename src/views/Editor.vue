<template>
  <div class="container">
    <Loading :spinning="isLoading" />
    <PasswdModal
      :visible="isNeedPasswd"
      v-on:handleOk="handleAfterAuth"
      v-on:handleCancel="handleAfterAuthFalse"
    />
    <EditorComponent :isMobile="isMobile" :content="content" :change="change" :save="save" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { default as EditorComponent } from "@/components/Editor.vue";
import Loading from "@/components/Loading.vue";
import PasswdModal from "./components/PasswdModal.vue";
import { MobileWidth } from "@/constants/constants";
import { mapGetters, mapActions } from "vuex";
import { fileID } from "../router";
import { UnauthorizedError } from "../constants/error";

@Component({
  components: {
    EditorComponent,
    Loading,
    PasswdModal
  },
  computed: {
    ...mapGetters({
      content: "article/getContent"
    })
  },
  methods: {
    ...mapActions({
      fetchContent: "article/fetchContent",
      changeContent: "article/changeContent",
      uploadContent: "article/uploadContent"
    })
  }
})
export default class Editor extends Vue {
  private isNeedPasswd: boolean = false;
  private isLoading: boolean = true;
  private autoSaveTimer: any;
  private autoSaveDuration: number = 60 * 1000;
  autosave() {
    this.save(this.content);
  }
  resetAutoSaveTimer() {
    window.clearInterval(this.autoSaveTimer);
    this.autoSaveTimer = setInterval(this.autosave, this.autoSaveDuration);
  }
  mounted() {
    this.autoSaveTimer = setInterval(this.autosave, this.autoSaveDuration);
    // TODO: 添加定时任务, 每1分钟自动执行一次uploadContent
    let fid = this.$route.params[fileID];
    this.fetchContent(fid)
      .catch(e => {
        this.$message.warning("服务器跑路了, 请稍候再试..", 2);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
  get isMobile() {
    if (document.body.clientWidth < MobileWidth) {
      return true;
    }
    return false;
  }
  change(data: string) {
    this.changeContent(data);
  }
  save(data: string) {
    this.resetAutoSaveTimer();
    const hide: TimerHandler = this.$message.loading("uploading..", 0);
    this.uploadContent(data)
      .then(res => {
        this.$message.info("uploading finished", 2);
      })
      .catch(e => {
        if (e == UnauthorizedError) {
          this.isNeedPasswd = true;
          return;
        }
        this.$message.warning("服务器跑路了, 请稍候再试..", 2);
      })
      .finally(() => {
        setTimeout(hide, 0);
      });
  }
  handleAfterAuth() {
    this.isNeedPasswd = false;
    this.save(this.content);
  }
  handleAfterAuthFalse() {
    this.isNeedPasswd = false;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
@import "@/assets/css/editor.scss";
</style>
