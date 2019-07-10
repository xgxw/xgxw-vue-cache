<template>
  <Modal
    title="文章不存在, 你可能想.."
    :visible="visible"
    okText="请求新页面"
    cancelText="回到首页"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <Input :auto-focus="autoFocus" @pressEnter="inputEnter" v-model="newPath" />
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Modal, Input, Button } from "ant-design-vue";

@Component({
  components: {
    Input,
    Modal,
    Button
  }
})
export default class RedirectModal extends Vue {
  @Prop() private visible!: boolean;
  private newPath: string = "";
  private autoFocus: boolean = true;
  inputEnter(data: any) {
    this.handleOk();
  }
  handleOk() {
    window.location.href = this.newPath;
  }
  handleCancel() {
    window.location.href = document.location.origin + "/home";
  }
  mounted() {
    this.newPath = window.location.href;
  }
}
</script>
