<template>
  <div class="container">
    <command-bar :dataset="dataset" />
    <catalog-menu v-if="catalogMenu" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { SelectItem } from "@/constants/command";
import CatalogMenu from "./CatalogMenu.vue";
import CommandBar from "@/components/CommandBar.vue";

@Component({
  components: {
    "catalog-menu": CatalogMenu,
    "command-bar": CommandBar
  }
})
export default class XCommandBar extends Vue {
  @Prop() private pageDataset!: SelectItem[];
  private dataset: SelectItem[] = [];
  @Watch("pageDataset")
  handlePageDatasetChange() {
    this.dataset = [];
    this.dataset = this.dataset
      .concat(this.pageDataset)
      .concat(this.catalogMenuDataSet);
  }

  // CatalogMenu
  private catalogMenu: boolean = false;
  toggleCatalogMenu() {
    this.catalogMenu = !this.catalogMenu;
  }
  private catalogMenuDataSet: SelectItem[] = [
    {
      name: "toggle-catalog-menu",
      desc: "切换菜单显示",
      cmd: this.toggleCatalogMenu.bind(this)
    }
  ];

  mounted() {
    this.dataset = this.dataset
      .concat(this.pageDataset)
      .concat(this.catalogMenuDataSet);
  }
}
</script>
<style lang='scss' scoped>
@import "@/assets/css/base.scss";
@import "@/assets/css/zindex.scss";

.command-bar {
  z-index: $command-bar;
}
</style>
