<template>
  <div class="container">
    <Loading :spinning="isLoading" />
    <article class="article">
      <Markdown :mkdoc="content" :isMobile="isMobile" />
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
import { isMobile } from "@/util/util";

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
  private isMobile = isMobile();
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

.container {
  background-color: $backgroud-color;
  overflow:hidden;
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
    margin: 5vh auto 5vh auto;
    padding: 0.5rem 2.5rem 1rem 2.5rem;
    width: 65%;
  }
}

// 移动端界面
@media screen and (max-width: $mobile-width) {
  .article {
    margin: 0 auto;
    padding: 0.5rem 2rem 1rem 2rem;
    min-height: 100vh;
  }
}
</style>
