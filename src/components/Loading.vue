<template>
  <div v-show="spinning" class="container">
    <a-spin :spinning="spinning" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { Spin } from "ant-design-vue";

@Component({
  components: {
    "a-spin": Spin
  }
})
export default class Loading extends Vue {
  @Prop() private spinning!: Boolean;
  mounted() {}
}
</script>
<style lang='scss' scoped>
@import "@/assets/css/zindex.scss";

.container {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: $loading;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(0, 0, 0, 0.15);
}
</style>
