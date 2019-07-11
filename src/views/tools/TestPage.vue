<template>
  <div class="container">
    <RouteMenu />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import RouteMenu from "../components/RouteMenu.vue";

@Component({
  components: {
    RouteMenu
  }
})
export default class TestPage extends Vue {
  // private InputSearch = Input.Search;
  mounted() {}
  onSearch() {}
}
</script>
<style lang='scss' scoped>
</style>
