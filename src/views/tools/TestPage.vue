<template>
  <div class="container">
    <a-affix :offsetBottom="this.top" :style="{ position: 'fixed', bottom: '10px', right: '20px'}">
      <a-button type="primary" @click="()=>{this.top += 10}">Affix top</a-button>
    </a-affix>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import Markdown from "@/components/Markdown.vue";

@Component({
  components: {}
})
export default class TestPage extends Vue {
  private top: number = 10;
  mounted() {}
}
</script>
<style lang='scss' scoped>
</style>
