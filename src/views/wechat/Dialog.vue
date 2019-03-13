<template>
  <main class="dialog">
    <article class="phone">
      <header>
        <StatusBar :time="timeNow"/>
      </header>
      <Wechat :msgCount="msgCount"/>
      <footer class="footer"/>
    </article>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StatusBar from "@/components/StatusBar.vue";
import Wechat from "@/components/wechat/Index.vue";

@Component({
  components: {
    StatusBar,
    Wechat
  }
})
export default class Dialog extends Vue {
  mounted() {}
  get timeNow() {
    let date = new Date();
    return date.getHours() + ":" + date.getMinutes();
  }
  get msgCount() {
    return "11";
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/iphonex.scss";
@media all {
  .dialog {
    min-height: $height; // 最小高度为 phone.scss 中定义的高度
    box-shadow: 0 2px 6px rgba(100, 100, 100, 0.3);
    background-color: #fff;
    padding: 30px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
  }
}
@media screen and (min-width: 980px) {
  .dialog {
    margin: 0 auto;
    width: 65%;
  }
}
</style>
