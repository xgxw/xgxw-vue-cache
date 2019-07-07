<template>
  <div class="container">
    <div class="drawing-board"></div>
    <article class="article">
      <Markdown :mkdoc="content" />
    </article>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import Markdown from "@/components/Markdown.vue";
import { mapGetters, mapActions } from "vuex";
import { fileID } from "../router";

@Component({
  components: {
    Markdown
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
export default class Home extends Vue {
  mounted() {
    let fid = this.$route.params[fileID];
    this.fetchContent(fid).catch(e => {
      console.log("此处需要弹层通知错误, 添加 msg 组件后替换", e);
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
    margin: 0 auto;
    padding: 30px;
    width: 65%;
  }
}

// 移动端界面
@media screen and (max-width: $mobile-width) {
  .article {
    margin: 0 auto;
    padding: 30px;
  }
}
</style>
