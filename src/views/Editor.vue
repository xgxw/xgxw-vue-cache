<template>
  <div class="container">
    <Loading :spinning="isLoading" />
    <EditorComponent :isMobile="isMobile" :content="content" :change="change" :save="save" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { default as EditorComponent } from "@/components/Editor.vue";
import Loading from "@/components/Loading.vue";
import { MobileWidth } from "@/constants/constants";
import { mapGetters, mapActions } from "vuex";
import { fileID } from "../router";
import { UnauthorizedError } from "../constants/error";

@Component({
  components: {
    EditorComponent,
    Loading
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
  private isLoading: boolean = true;
  get isMobile() {
    if (document.body.clientWidth < MobileWidth) {
      return true;
    }
    return false;
  }
  mounted() {
    // TODO: 添加定时任务, 每1分钟自动执行一次uploadContent
    let fid = this.$route.params[fileID];
    this.fetchContent(fid)
      .catch(e => {
        console.log("此处需要弹层通知错误, 添加 msg 组件后替换", e);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
  change(data: string) {
    this.changeContent(data).catch(e => {
      console.log("此处需要弹层通知错误, 添加 msg 组件后替换", e);
    });
  }
  save(data: string) {
    const hide = this.$message.loading("uploading..", 0);
    this.uploadContent(data)
      .catch(e => {
        console.log("此处需要弹层通知错误, 添加 msg 组件后替换", e);
        if (e == UnauthorizedError) {
          // then 弹出输入密码浮层
        }
      })
      .finally(() => {
        setTimeout(hide, 0);
        this.$message.info("uploading finished", 2);
      });
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/base.scss";
@import "@/assets/css/editor.scss";
</style>
