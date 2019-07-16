<template>
  <a-modal
    title="文章不存在, 你可能想.."
    :visible="visible"
    okText="请求新页面"
    cancelText="回到首页"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-input :auto-focus="autoFocus" @pressEnter="inputEnter" v-model="newPath" />
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Modal, Input } from "ant-design-vue";
import { getIndexPath } from '@/router';

@Component({
  components: {
    "a-input": Input,
    "a-modal": Modal
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
    window.location.href = document.location.origin + getIndexPath();
  }
  mounted() {
    this.newPath = window.location.href;
  }
}
</script>
