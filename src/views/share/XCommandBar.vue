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
import { getEditorPath, getReaderPath, getIndexPath } from "@/router";
import { toolsPath, editorPath } from "@/router/tools";
import { InvalidTokenError } from "@/constants/error";
import { FetchCatalogRequset } from "@/api";

/*
  Command 顺序:
    1. 通用: urlDataSet(常用路径/命令) -> PageDataSet(当页所需的命令)
    2. 导航: urlDataSet(常用路径/命令) -> catalog(目录树)

  各组件提交自定义的 DataSet 到 store/command, 而后 本组件(XCommand) 从store取出, 添加到列表中
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
  // showCommandBar 控制是否显示
  private showCommandBar: boolean = false;
  // commandType: CommandBar 用于显示类别
  private commandType = "";
  // dataset: 传入Command组件, 当触发不同按键时, 用相应的dataSet替换
  private dataset: SelectItem[] = [];
  // defaultDateSet: 默认dataset, alt+space 等默认的数据源
  private defaultDateSet: SelectItem[] = [];
  // routeDataSet: 导航数据源, alt+g, 用于在文件间导航
  private routeDataSet: SelectItem[] = [];

  // start -------------- 自定义预置 command -----------------
  // urlDataSet 比较重要的, 自定义的URL路径
  private urlDataSet: SelectItem[] = [
    {
      name: getIndexPath(),
      desc: "去首页",
      cmd: this.goRoute.bind(this, getIndexPath())
    },
    {
      name: getReaderPath("todo"),
      desc: "去待办页",
      cmd: this.goRoute.bind(this, getReaderPath("todo"))
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
  private funDataSet: SelectItem[] = [];
  // end -------------- 自定义预置 command -----------------

  // pageDataset: 取出各组件存入store的Command, 结果添加到 defaultDataSet
  @Watch("pageDataset")
  handlePageDatasetChange() {
    this.defaultDateSet = [];
    this.defaultDateSet = this.defaultDateSet
      .concat(this.urlDataSet)
      .concat(this.funDataSet);
    if (this.pageDataset && this.pageDataset.length > 0) {
      this.defaultDateSet = this.defaultDateSet.concat(this.pageDataset);
    }
  }

  // start -------------- 生成 routeDataSet -----------------
  genRouteDateSet(): SelectItem[] {
    let paths: string[] = [];
    if (this.paths) {
      for (let i = 0; i < this.paths.length; i++) {
        let path = this.paths[i];
        paths.push(getReaderPath(path));
        paths.push(getEditorPath(path));
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
  // end -------------- 生成 routeDataSet -----------------

  // start -------------- onkeyDown事件监听 -----------------
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
          this.dataset = this.routeDataSet;
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
  // end -------------- onkeyDown事件监听 -----------------

  private hasRequestCatalog: boolean = false;
  requestCatalog() {
    // 当请求过则不再继续请求
    if (this.hasRequestCatalog) return;

    let r: FetchCatalogRequset = {
      path: "/"
    };
    this.fetchCatalog(r)
      .catch(e => {
        switch (e) {
          case InvalidTokenError:
            this.$message.warning("认证过期", 2);
            return;
          default:
            this.$message.warning("获取文件列表失败", 2);
        }
      })
      .then(res => {
        this.hasRequestCatalog = true;
      })
      .finally(() => {
        this.routeDataSet = this.genRouteDateSet();
      });
  }

  mounted() {
    this.handlePageDatasetChange();
    this.onKeyDown();
    this.requestCatalog();
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
