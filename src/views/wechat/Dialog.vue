<template>
  <main class="dialog">
    <article class="iphonex">
      <header>
        <!-- <StatusBar/> -->
      </header>
      <footer>
      </footer>
    </article>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StatusBar from "@/components/StatusBar.vue";

@Component({
  components: {
    StatusBar
  }
})
export default class Dialog extends Vue {
  mounted() {}
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/iphonex.scss";
@media all {
  .dialog {
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
