<template>
  <div class="container">
    <loading :spinning="fetching" />
    <markdown :mkdoc="content" :isMobile="isMobile" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import {
  UnauthorizedError,
  NotFoundError,
  InvalidTokenError
} from "@/constants/error";
import { getFidFromPath } from "@/constants/guard";
import { isMobile } from "@/util/util";
import { getEditorPath } from "@/router";
import Markdown from "@/components/Markdown.vue";
import Loading from "@/components/Loading.vue";
import { SelectItem } from "@/constants/command";

@Component({
  components: {
    markdown: Markdown,
    loading: Loading
  },
  computed: {
    ...mapGetters({
      fetching: "article/isFetching",
      content: "article/getContent"
    })
  },
  methods: {
    ...mapActions({
      changePageDataSet: "command/changePageDataSet",
      fetchContent: "article/fetchContent"
    })
  }
})
export default class Article extends Vue {
  private isMobile = isMobile();
  private path = "";

  mounted() {
    this.path = "www.xiagaoxiawan.com" + this.$route.fullPath;
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
    this.changePageDataSet(this.commandBarData);
  }

  private commandBarData: SelectItem[] = [
    {
      name: "print",
      desc: "打印本页",
      cmd: this.print.bind(this)
    },
    {
      name: "editor",
      desc: "编辑本页",
      cmd: this.editor.bind(this)
    }
  ];
  print() {
    console.log("print");
    this.$nextTick(() => {
      window.print();
    });
  }
  editor() {
    console.log("editor");
    this.$router.push(getEditorPath(getFidFromPath(this.$route)));
  }
}
</script>
<style lang='scss' scoped>
@import "@/assets/css/base.scss";

.container::v-deep .markdown-body {
  color: $color-read !important;
}
.container::v-deep .v-note-wrapper {
  background-color: $backgroud-color-read !important;
}
</style>