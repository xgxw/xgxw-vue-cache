<template>
  <div class='container'>
    <div class="drawing-board"></div>
    <article class="article">
      <Markdown :mkdoc="content" />
    </article>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import Markdown from "@/components/Markdown.vue";
import { mapGetters } from "vuex";

@Component({
  components: {
    Markdown
  },
  computed: {
    ...mapGetters({
      content: "article/getContent"
    })
  }
})
export default class Home extends Vue {}
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
