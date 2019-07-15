<template>
  <div class="container" v-bind:class="{ 'menu-expand': menuExpand }">
    <Loading :spinning="fetching" />
    <PasswdModal
      :visible="showPasswdModal"
      v-on:handleOk="handleAfterAuth"
      v-on:handleCancel="handleAfterAuthFalse"
    />
    <RedirectModal :visible="redirectNewUrl" />
    <CatalogMenu v-if="!isMobile" />
    <EditorComponent :isMobile="isMobile" :content="content" :change="change" :save="save" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { default as EditorComponent } from "@/components/Editor.vue";
import Loading from "@/components/Loading.vue";
import PasswdModal from "./components/PasswdModal.vue";
import RedirectModal from "./components/RedirectModal.vue";
import { getFidFromPath } from "@/constants/guard";
import { mapGetters, mapActions } from "vuex";
import { UnauthorizedError, NotFoundError } from "../constants/error";
import { client as tokenClient } from "@/api/token";
import { isMobile } from "@/util/util";
import AutoSaveClient from "@/util/autosave";
import CatalogMenu from "./components/CatalogMenu.vue";

@Component({
  components: {
    CatalogMenu,
    EditorComponent,
    Loading,
    PasswdModal,
    RedirectModal
  },
  computed: {
    ...mapGetters({
      menuExpand: "menu/isExpand",
      content: "article/getContent",
      fetching: "article/isFetching",
      isChanged: "article/isChangedSinceLastSave"
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
  // PasswdModal 相关
  private showPasswdModal: boolean = false;
  handleAfterAuth() {
    this.showPasswdModal = false;
    this.save(this.content);
    this.startAutoSave();
  }
  handleAfterAuthFalse() {
    this.showPasswdModal = false;
  }

  // 启动启动保存. 只有当文件加载成功, 并且本地有token时, 才会启用自动保存
  private autoSaveclient!: AutoSaveClient;
  startAutoSave() {
    tokenClient.hasTokenInfo().then(res => {
      let _this = this;
      this.autoSaveclient = new AutoSaveClient(function() {
        _this.save(_this.content);
      });
      this.autoSaveclient.start();
    });
  }

  private isMobile: boolean = isMobile();
  private redirectNewUrl: boolean = false;
  mounted() {
    let fid = getFidFromPath(this.$route);
    this.fetchContent(fid)
      .then(res => {
        this.startAutoSave();
      })
      .catch(e => {
        this.redirectNewUrl = true;
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
    const hide: TimerHandler = this.$message.loading("uploading..", 0);
    this.uploadContent(data)
      .then(res => {
        this.$message.info("uploading finished", 2);
      })
      .catch(e => {
        if (e == UnauthorizedError) {
          this.showPasswdModal = true;
          return;
        }
        this.$message.warning("服务器跑路了, 更新文件失败..", 2);
      })
      .finally(() => {
        setTimeout(hide, 0);
      });
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/editor.scss";
</style>
