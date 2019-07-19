<template>
  <div class="container">
    <a-affix :offsetBottom="this.top" :style="{ position: 'fixed', bottom: '10px', right: '20px'}">
      <a-button type="primary" @click="()=>{this.top += 10}">Affix top</a-button>
    </a-affix>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { Affix,Button } from "ant-design-vue";
import Markdown from "@/components/Markdown.vue";

@Component({
  components: {
    "a-affix": Affix,
    "a-button": Button
  }
})
export default class TestPage extends Vue {
  private top: number = 10;
  mounted() {}
}
</script>
<style lang='scss' scoped>
</style>
