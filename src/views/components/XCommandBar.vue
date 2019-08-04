<template>
  <div class="container">
    <command-bar
      :visible="showCommandBar"
      @onEnterKeyDown="onEnterKeyDown"
      :commandType="commandType"
      :dataset="dataset"
    />
    <catalog-menu v-show="menuExpand" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CatalogMenu from "./CatalogMenu.vue";
import CommandBar from "@/components/CommandBar.vue";
import { SelectItem, CommandType } from "@/constants/command";
import { KeyCode } from "@/util/keycode";
import { mapGetters, mapActions } from "vuex";
import { getEditorPath, getArticlePath, getIndexPath } from "@/router";
import { toolsPath, editorPath } from "@/router/tools";

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
  private showCommandBar: boolean = false;
  private commandType = "";
  private dataset: SelectItem[] = [];
  private defaultDateSet: SelectItem[] = [];
  @Watch("pageDataset")
  handlePageDatasetChange() {
    this.defaultDateSet = [];
    this.defaultDateSet = this.defaultDateSet.concat(this.catalogMenuDataSet);
    if (this.pageDataset && this.pageDataset.length > 0) {
      this.defaultDateSet = this.defaultDateSet.concat(this.pageDataset);
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

  // Route
  private goActionStr: String = "go";
  private routeDateSet: SelectItem[] = [
    {
      name: this.goActionStr + "-home",
      desc: "go to home page",
      cmd: this.goRoute.bind(this, getIndexPath())
    },
    {
      name: this.goActionStr + "-article-todo",
      desc: "go to todo page",
      cmd: this.goRoute.bind(this, getArticlePath("todo"))
    },
    {
      name: this.goActionStr + "-tools",
      desc: "go to tools index page",
      cmd: this.goRoute.bind(this, toolsPath)
    },
    {
      name: this.goActionStr + "-tools-editor",
      desc: "go to markdown editor tools page",
      cmd: this.goRoute.bind(this, editorPath)
    }
  ];
  goRoute(path: String) {
    console.log(path);
  }

  onEnterKeyDown(command: SelectItem) {
    this.showCommandBar = false;
  }

  onKeyDown() {
    let onKeyDown = (e: KeyboardEvent) => {
      switch (true) {
        case e.keyCode == KeyCode.space && e.altKey: {
          this.showCommandBar = !this.showCommandBar;
          this.commandType = CommandType.default;
          this.dataset = this.defaultDateSet;
          break;
        }
        case e.keyCode == KeyCode.g && e.altKey: {
          this.showCommandBar = !this.showCommandBar;
          this.commandType = CommandType.go;
          this.dataset = this.routeDateSet;
          break;
        }
        case e.keyCode == KeyCode.esc && this.showCommandBar: {
          this.showCommandBar = false;
          break;
        }
      }
    };
    document.addEventListener("keydown", onKeyDown.bind(this));
  }

  mounted() {
    this.handlePageDatasetChange();
    this.onKeyDown();
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
