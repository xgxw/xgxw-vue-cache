<template>
  <div class="container">
    <loading :spinning="fetching" />
    <article id="article" class="article">
      <markdown :mkdoc="content" :isMobile="isMobile" />
    </article>
    <footer class="print-footer">{{path}}</footer>
    <command-bar :pageDataset="commandBarData" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";
import {
  UnauthorizedError,
  NotFoundError,
  InvalidTokenError
} from "../constants/error";
import { getFidFromPath } from "@/constants/guard";
import { isMobile } from "@/util/util";
import { getEditorPath } from "@/router";
import Markdown from "@/components/Markdown.vue";
import Loading from "@/components/Loading.vue";
import CommandBar from "./components/XCommandBar.vue";
import { SelectItem } from "../constants/command";

const articleDomID: string = "article";

@Component({
  components: {
    markdown: Markdown,
    loading: Loading,
    "command-bar": CommandBar
  },
  computed: {
    ...mapGetters({
      fetching: "article/isFetching",
      content: "article/getContent"
    })
  },
  methods: {
    ...mapActions({
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
    this.fetchContent(fid)
      .catch(e => {
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
      })
      .finally(() => {});
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

.container {
  background-color: $backgroud-color-read;
  overflow: hidden;
  -webkit-print-color-adjust: exact;
}

.article {
  box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
}
.article::v-deep .markdown-body {
  color: $color-read !important;
}
.article::v-deep .v-note-wrapper {
  background-color: $backgroud-color-read !important;
}

// PC端界面
@media screen and (min-width: $mobile-width) {
  .article {
    min-height: 95vh;
    margin: 3vh auto;
    padding: 2rem 3rem;
    width: 55%;
  }
}

// 移动端界面
@media screen and (max-width: $mobile-width) {
  .article {
    margin: 0 auto;
    padding: 1.5rem 2rem;
    min-height: 100vh;
  }
}

@media screen {
  .print-footer {
    display: none;
  }
}

@media print {
  @page {
    size: auto;
    margin: 1.2cm auto 0 auto;
  }
  .article::v-deep .v-note-wrapper {
    background-color: white !important;
  }
  .print-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
