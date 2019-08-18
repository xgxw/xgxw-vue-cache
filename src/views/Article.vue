<template>
  <div class="container">
    <paper-layout :path="path">
      <share-article v-if="isArticle" />
      <catalog v-if="isCatalog" />
    </paper-layout>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { default as PaperLayout } from "@/layout/Paper.vue";
import { default as ShareArticle } from "./share/Article.vue";
import Catalog from "./share/Catalog.vue";

@Component({
  components: {
    "paper-layout": PaperLayout,
    "share-article": ShareArticle,
    catalog: Catalog
  }
})
export default class Article extends Vue {
  private path = "";
  get isCatalog() {
    return this.path.endsWith("/");
  }
  get isArticle() {
    return !this.path.endsWith("/");
  }
  mounted() {
    this.path = this.$route.fullPath;
  }
}
</script>
<style lang='scss' scoped>
</style>
