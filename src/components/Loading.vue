<template>
  <div v-show="spinning" class="container">
    <Spin :spinning="spinning" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { Spin } from "ant-design-vue";

@Component({
  components: {
    Spin
  }
})
export default class Loading extends Vue {
  @Prop() private spinning!: Boolean;
  mounted() {}
}
</script>
<style lang='scss' scoped>
.container {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 11;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(0, 0, 0, 0.15);
}
</style>
