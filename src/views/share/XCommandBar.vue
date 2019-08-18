<template>
  <div class="container">
    <command-bar
      :visible="showCommandBar"
      @onEnterKeyDown="onEnterKeyDown"
      :commandType="commandType"
      :dataset="dataset"
    />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import CommandBar from "@/components/CommandBar.vue";
import { SelectItem, CommandType } from "@/constants/command";
import { KeyCode } from "@/util/keycode";
import { mapGetters, mapActions } from "vuex";
import { getEditorPath, getArticlePath, getIndexPath } from "@/router";
import { toolsPath, editorPath } from "@/router/tools";
import { InvalidTokenError } from "@/constants/error";

/*
  Command 顺序:
    1. 通用: urlDataSet(常用路径/命令) -> PageDataSet(当页所需的命令)
    2. 导航: urlDataSet(常用路径/命令) -> catalog(目录树)
 */

@Component({
  components: {
    "command-bar": CommandBar
  },
  computed: {
    ...mapGetters({
      pageDataset: "command/getPageDataSet",
      paths: "command/getPaths"
    })
  },
  methods: {
    ...mapActions({
      fetchCatalog: "command/fetchCatalog"
    })
  }
})
export default class XCommandBar extends Vue {
  private showCommandBar: boolean = false;
  private commandType = "";
  private dataset: SelectItem[] = [];
  private defaultDateSet: SelectItem[] = [];
  private urlDataSet: SelectItem[] = [
    {
      name: getIndexPath(),
      desc: "去首页",
      cmd: this.goRoute.bind(this, getIndexPath())
    },
    {
      name: getArticlePath("todo"),
      desc: "去待办页",
      cmd: this.goRoute.bind(this, getArticlePath("todo"))
    },
    {
      name: toolsPath,
      desc: "去工具导航",
      cmd: this.goRoute.bind(this, toolsPath)
    },
    {
      name: editorPath,
      desc: "打开Markdown本地编辑器",
      cmd: this.goRoute.bind(this, editorPath)
    }
  ];
  @Watch("pageDataset")
  handlePageDatasetChange() {
    this.defaultDateSet = [];
    this.defaultDateSet = this.defaultDateSet.concat(this.urlDataSet);
    if (this.pageDataset && this.pageDataset.length > 0) {
      this.defaultDateSet = this.defaultDateSet.concat(this.pageDataset);
    }
  }

  // Route
  private routeDateSet: SelectItem[] = [];
  genRouteDateSet(): SelectItem[] {
    let paths: string[] = [];
    if (this.paths) {
      for (let i = 0; i < this.paths.length; i++) {
        let path = this.paths[i];
        paths.push("/article/" + path);
        paths.push("/editor/" + path);
      }
    }
    return this.urlDataSet.concat(this.transPath2SelectItem(paths));
  }
  transPath2SelectItem(paths: string[]): SelectItem[] {
    let result: SelectItem[] = [];
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
        this.routeDateSet = this.genRouteDateSet();
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
