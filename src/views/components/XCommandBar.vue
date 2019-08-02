<template>
  <div class="container">
    <command-bar :commandType="commandType" :dataset="dataset" />
    <catalog-menu v-show="menuExpand" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CatalogMenu from "./CatalogMenu.vue";
import CommandBar, { SelectItem } from "@/components/CommandBar.vue";
import { KeyCode } from "@/util/keycode";
import { mapGetters, mapActions } from "vuex";

@Component({
  components: {
    "catalog-menu": CatalogMenu,
    "command-bar": CommandBar
  },
  computed: {
    ...mapGetters({
      menuExpand: "menu/isExpand"
    })
  },
  methods: {
    ...mapActions({
      toggleCatalogMenu: "menu/toggleExpand"
    })
  }
})
export default class XCommandBar extends Vue {
  @Prop() private pageDataset!: SelectItem[];
  private commandType = "";
  private dataset: SelectItem[] = [];
  @Watch("pageDataset")
  handlePageDatasetChange() {
    this.dataset = [];
    this.dataset = this.dataset.concat(this.catalogMenuDataSet);
    if (this.pageDataset && this.pageDataset.length > 0) {
      this.dataset = this.dataset.concat(this.pageDataset);
    }
  }

  // CatalogMenu
  private catalogMenuDataSet: SelectItem[] = [
    {
      name: "toggle-catalog-menu",
      desc: "切换菜单显示",
      cmd: this.toggleCatalogMenu.bind(this)
    }
  ];

  mounted() {
    this.handlePageDatasetChange();
    // let onkeydown = document.onkeydown
    // document.onkeydown = function(e) {
    //   if(onkeydown)onkeydown(e)
    // };
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
