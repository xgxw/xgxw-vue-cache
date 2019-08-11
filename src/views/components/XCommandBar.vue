<template>
  <div class="container">
    <command-bar
      :visible="showCommandBar"
      @onEnterKeyDown="onEnterKeyDown"
      :commandType="commandType"
      :dataset="dataset"
    />
    <catalog v-show="catalogExpand" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Catalog from "./Catalog.vue";
import CommandBar from "@/components/CommandBar.vue";
import { SelectItem, CommandType } from "@/constants/command";
import { KeyCode } from "@/util/keycode";
import { mapGetters, mapActions } from "vuex";
import { getEditorPath, getArticlePath, getIndexPath } from "@/router";
import { toolsPath, editorPath } from "@/router/tools";
import { InvalidTokenError } from "../../constants/error";

@Component({
  components: {
    catalog: Catalog,
    "command-bar": CommandBar
  },
  computed: {
    ...mapGetters({
      pageDataset: "command/getPageDataSet",
      paths: "catalog/getPaths",
      catalogExpand: "catalog/isExpand"
    })
  },
  methods: {
    ...mapActions({
      fetchCatalog: "catalog/fetchCatalog",
      toggleCatalog: "catalog/toggleExpand"
    })
  }
})
export default class XCommandBar extends Vue {
  private showCommandBar: boolean = false;
  private commandType = "";
  private dataset: SelectItem[] = [];
  private defaultDateSet: SelectItem[] = [];
  @Watch("pageDataset")
  handlePageDatasetChange() {
    this.defaultDateSet = [];
    this.defaultDateSet = this.defaultDateSet.concat(this.catalogDataSet);
    if (this.pageDataset && this.pageDataset.length > 0) {
      this.defaultDateSet = this.defaultDateSet.concat(this.pageDataset);
    }
  }

  // Catalog
  private catalogDataSet: SelectItem[] = [
    {
      name: "toggle-catalog-menu",
      desc: "切换菜单显示",
      cmd: this.toggleCatalog.bind(this)
    }
  ];

  // Route
  private routeDateSet: SelectItem[] = [];
  genRoute(): SelectItem[] {
    let result: SelectItem[] = [];
    let paths: string[] = [
      getIndexPath(),
      getArticlePath("todo"),
      toolsPath,
      editorPath
    ];
    if (this.paths) {
      for (let i = 0; i < this.paths.length; i++) {
        let path = this.paths[i];
        paths.push("/article/" + path);
        paths.push("/editor/" + path);
      }
    }
    for (let i = 0; i < paths.length; i++) {
      let path = paths[i];
      let item: SelectItem = {
        name: path,
        desc: "go to " + path,
        cmd: this.goRoute.bind(this, path)
      };
      result.push(item);
    }
    return result;
  }
  goRoute(path: string) {
    this.$nextTick(() => {
      this.$router.push(path);
    });
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
    this.fetchCatalog()
      .catch(e => {
        switch (e) {
          case InvalidTokenError:
            this.$message.warning("认证过期", 2);
            return;
          default:
            this.$message.warning("获取文件列表失败", 2);
        }
      })
      .finally(() => {
        this.routeDateSet = this.genRoute();
      });
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
