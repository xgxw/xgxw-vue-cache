<template>
  <div class="container">
    <Loading :spinning="isLoading" />
    <div class="drawing-board"></div>
    <article class="article">
      <Markdown :mkdoc="content" />
    </article>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import Markdown from "@/components/Markdown.vue";
import Loading from "@/components/Loading.vue";
import { mapGetters, mapActions } from "vuex";
import { NotFoundError } from "@/constants/error";
import { getFidFromPath } from "@/constants/guard";

@Component({
  components: {
    Markdown,
    Loading
  },
  computed: {
    ...mapGetters({
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
  private isLoading: boolean = true;
  mounted() {
    let fid = getFidFromPath(this.$route);
    this.fetchContent(fid)
      .catch(e => {
        if (e == NotFoundError) {
          this.$message.warning("页面不存在..", 2);
          return;
        }
        this.$message.warning("服务器跑路了, 请稍候再试..", 2);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
</script>
<style lang='scss' scoped>
@import "@/assets/css/base.scss";

.drawing-board {
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  color: $black;
  background-color: $backgroud-color;
}
@media all {
  .article {
    box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
    background-color: #fff;
  }
}

// PC端界面
@media screen and (min-width: $mobile-width) {
  .article {
    min-height: 95vh;
    margin: 1vh auto;
    padding: 30px;
    width: 65%;
  }
}

// 移动端界面
@media screen and (max-width: $mobile-width) {
  .article {
    margin: 0 auto;
    padding: 30px;
    min-height: 100vh;
  }
}
</style>