<template>
  <div class="container">
    <loading :spinning="fetching" />
    <editor-component :isMobile="isMobile" :content="content" :save="save" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { default as EditorComponent } from "@/components/Editor.vue";
import Loading from "@/components/Loading.vue";
import { getFidFromPath } from "@/constants/guard";
import { mapGetters, mapActions } from "vuex";
import {
  UnauthorizedError,
  NotFoundError,
  InvalidTokenError
} from "@/constants/error";
import { isMobile } from "@/util/util";

@Component({
  components: {
    "editor-component": EditorComponent,
    loading: Loading
  },
  computed: {
    ...mapGetters({
      content: "article/getContent",
      fetching: "article/isFetching"
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
  private isMobile: boolean = isMobile();
  mounted() {
    let fid = getFidFromPath(this.$route);
    this.fetchContent(fid).catch(e => {
      switch (e) {
        case UnauthorizedError:
          this.$message.warning("需要授权", 2);
          return;
        case InvalidTokenError:
          this.$message.warning("认证过期", 2);
          return;
        default:
          this.$message.warning("未找到文章", 2);
      }
    });
  }
  save(data: string) {
    const hide: TimerHandler = this.$message.loading("uploading..", 0);
    this.uploadContent(data)
      .then(res => {
        this.$message.info("uploading finished", 2);
      })
      .catch(e => {
        switch (e) {
          case UnauthorizedError:
            this.$message.warning("更新文章失败: 需要授权", 2);
            return;
          case InvalidTokenError:
            this.$message.warning("更新文章失败: 认证过期", 2);
            return;
          default:
            this.$message.warning("更新文章失败.", 2);
        }
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
