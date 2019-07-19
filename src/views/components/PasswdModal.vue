<template>
  <a-modal title="卫兵, 这里有人" :visible="visible" @ok="handleOk" @cancel="handleCancel">
    <a-input
      id="passwd-input"
      :auto-focus="autoFocus"
      v-model="passwd"
      @pressEnter="inputEnter"
      placeholder="你需要输入密码, 快说口令"
    />
  </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Modal, Input } from "ant-design-vue";
import { client } from "@/api/index";

const defaultInputCount: number = 3;

@Component({
  components: {
    "a-input": Input,
    "a-modal": Modal
  }
})
export default class PasswdModal extends Vue {
  @Prop() private visible!: boolean;
  private passwd: string = "";
  private autoFocus: boolean = true;
  private inputCount: number = defaultInputCount;
  inputEnter(data: any) {
    this.handleOk();
  }
  handleOk() {
    client
      .authorization({ cipher: this.passwd })
      .then(res => {
        this.$message.info("你答对了, 朋友");
        this.$emit("handleOk");
      })
      .catch(e => {
        this.inputCount -= 1;
        if (this.inputCount == 0) {
          this.inputCount = defaultInputCount;
          this.$message.warning("接受制裁吧!", 5);
          return;
        }
        this.$message.warning(
          "你答错了, 陌生人, 你还有" + this.inputCount + "次机会"
        );
      });
  }
  handleCancel() {
    this.$message.info("再见, 陌生人");
    this.$emit("handleCancel");
  }
  mounted() {}
}
</script>
