<template>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Hello extends Vue {
  @Prop() private msg!: string;
  mounted() {
  }
  get content() {
    return "Hello"
  }
}
</script>

<style scoped lang="scss">
</style>
