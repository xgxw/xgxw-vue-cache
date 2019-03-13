<template>
  <main class="status">
    <button class="back">
      <b>{{msgCount}}</b>
    </button>
    <cite></cite>
    <menu></menu>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class StatusBar extends Vue {
  @Prop() private msgCount!: string;
  mounted() {}
}
</script>

<style scoped lang="scss">
@import "../../assets/css/iphonex.scss";
.status{
  height: $wechat-status-height;
  padding: 10px 4px;
  
}
</style>
