<template>
  <Modal title="卫兵, 这里有人" :visible="visible" @ok="handleOk" @cancel="handleCancel">
    <Input
      id="passwd-input"
      :auto-focus="autoFocus"
      v-model="passwd"
      @pressEnter="inputEnter"
      placeholder="你需要输入密码, 快说口令"
    />
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Modal, Input } from "ant-design-vue";

@Component({
  components: {
    Input,
    Modal
  }
})
export default class PasswdModal extends Vue {
  @Prop() private visible: boolean = false;
  private passwd: string = "";
  private autoFocus: boolean = true;
  inputEnter(data: any) {
    this.handleOk();
  }
  handleOk() {
    // TODO: 使用密码获取token
    // this.$emit("handleOk");
  }
  handleCancel() {
    this.$emit("handleCancel");
    // TODO: 无密码但请求需认证的服务时该如何处理?
    // 随机跳转? 还是?
  }
  mounted() {}
}
</script>
