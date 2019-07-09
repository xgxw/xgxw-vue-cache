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
import { getFidFromPath, redirectToLogin } from "@/constants/guard";
import { mapGetters, mapActions } from "vuex";
import { UnauthorizedError, NotFoundError } from "../constants/error";

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
  private isLoadFile: boolean = false;
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
    redirectToLogin(this.$router)
      .then(res => {
        let fid = getFidFromPath(this.$route);
        this.fetchContent(fid)
          .then(res => {
            this.isLoadFile = true;
            this.autoSaveTimer = setInterval(
              this.autosave,
              this.autoSaveDuration
            );
          })
          .catch(e => {
            if (e == NotFoundError) {
              this.$message.warning("页面不存在..", 2);
              return;
            }
            this.$message.warning("服务器跑路了, 请稍候再试..", 2);
            this.isLoadFile = false;
          })
          .finally(() => {
            this.isLoading = false;
          });
      })
      .catch(e => {
        this.$message.info("需要登录", 2);
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
    if (!this.isLoadFile) {
      this.$message.warning("没有找到文件, 无法保存.", 2);
      return;
    }
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
