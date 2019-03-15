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
.status {
  height: $wechat-status-height;
  padding: 10px 4px;

  .back {
    width: 2rem;
    height: 2rem;
    font-size: 2rem;
    border: 0px;
    color: black;
    background: transparent;
  }

  .back::before {
    position: absolute;
    top: 0;
    content: "";
    height: 1.5rem;
    width: 0.15rem;
    background: black;
    transform: rotate(45deg);
    border-radius: 1rem;
  }

  .back::after {
    position: absolute;
    top: 0;
    content: "";
    height: 1.5rem;
    width: 0.15rem;
    background: black;
    transform: rotate(-45deg);
    border-radius: 1rem;
  }
}
</style>
