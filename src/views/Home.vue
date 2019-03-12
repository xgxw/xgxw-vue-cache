<template>
  <div class="home">
    <article class="article">
      <Markdown mkdoc="_adasd_"/>
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Markdown from "@/components/Markdown.vue";

@Component({
  components: {
    Markdown
  },
  computed: {}
})
export default class Home extends Vue {
  mounted() {}
}
</script>
<style lang="scss" scoped>
@media all {
  .article {
    box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
    background-color: #fff;
  }
}
@media screen and (max-width: 980px) {
  .article {
    margin: 0 auto;
    padding: 30px;
    width: 65%;
  }
}
</style>
