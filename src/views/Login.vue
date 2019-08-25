<template>
  <div class="container">
    <div class="card">
      <a-input placeholder="用户名" size="large" v-model="username" style="margin-bottom: 1rem;">
        <a-icon slot="prefix" type="user" />
        <a-icon v-if="username" slot="suffix" type="close-circle" @click="resetUsername" />
      </a-input>
      <a-input
        style="margin-bottom: 2rem;"
        size="large"
        placeholder="密码, 按回车确认"
        @change="handlePdInput"
        @pressEnter="handlePdEnter"
        :value="pdShow"
      >
        <a-icon slot="prefix" type="user" />
        <a-icon v-if="password" slot="suffix" type="close-circle" @click="resetPassword" />
      </a-input>
      <div class="btn-group">
        <a-button style="width:8rem;" @click="qrcodeLogin">二维码登录</a-button>
        <a-button type="primary" style="width:8rem;" @click="login" :loading="logining">登录</a-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { Input, Icon, Button } from "ant-design-vue";

@Component({
  components: {
    "a-input": Input,
    "a-icon": Icon,
    "a-button": Button
  }
})
export default class Login extends Vue {
  private username = "";
  private password = "";
  private pdShow = "";
  private logining = false;
  resetUsername() {
    this.username = "";
  }
  resetPassword() {
    this.pdShow = "";
    this.password = "";
  }
  handlePdInput(e: any) {
    if (e.data) {
      this.pdShow += "*";
      this.password += e.data;
    } else {
      this.pdShow = this.pdShow.substring(0, this.pdShow.length - 1);
      this.password = this.password.substring(0, this.password.length - 1);
    }
  }
  handlePdEnter() {
    console.log(this.password);
  }

  qrcodeLogin() {
    this.$message.info("暂未实现二维码登录", 2);
  }
  login() {
    this.logining = true;
    this.requestLogin();
  }
  requestLogin() {
    this.logining = false;
  }
  
  mounted() {}
}
</script>
<style lang='scss' scoped>
@import "@/assets/css/base.scss";

.container {
  overflow: hidden;
  -webkit-print-color-adjust: exact;
  min-height: 100vh;
}
.card {
  // box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
}
.btn-group {
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
}

// PC端界面
@media screen and (min-width: $mobile-width) {
  .card {
    width: 30rem;
    margin: 20vh auto;
    padding: 2rem 3rem;
  }
}

// 移动端界面
@media screen and (max-width: $mobile-width) {
  .card {
    width: 90%;
    margin: 30vh auto;
  }
}
</style>
