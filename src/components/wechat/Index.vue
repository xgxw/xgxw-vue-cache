<template>
  <main class="wechat">
    <StatusBar :msgCount="msgCount"/>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import StatusBar from "./StatusBar.vue";

@Component({
  components: {
    StatusBar
  }
})
export default class Wechat extends Vue {
  @Prop() private msgCount!: string;
  mounted() {}
}
</script>

<style scoped lang="scss">
</style>
