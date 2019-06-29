<template>
  <div v-html='content'></div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Markdown extends Vue {
  @Prop() private mkdoc!: string;
  private parse: any = null;
  private mounted() {
    this.parse = require('markdown').markdown;
  }
  get content() {
    if (this.parse && this.mkdoc) {
      return this.parse.toHTML(this.mkdoc);
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
