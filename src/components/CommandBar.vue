<template>
  <div class="container">
    <a-modal class="command-bar" :visible="visible" :footer="null" :closable="false" :mask="false">
      <a-auto-complete
        :dropdownMatchSelectWidth="false"
        optionLabelProp="value"
        style="width:100%;"
        @select="onSelect"
        @search="handleSearch"
        :open="showDropDown"
      >
        <template slot="dataSource">
          <a-select-option v-for="opt in dataSource" :key="opt.name" :value="opt.name">
            {{opt.name}}
            <span>{{opt.desc}}</span>
          </a-select-option>
        </template>
        <a-input :id="commandBar" />
      </a-auto-complete>
    </a-modal>
    <catalog-menu v-if="catalogMenu" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Modal, AutoComplete, Select, Input, Icon } from "ant-design-vue";
import { KeyCode } from "@/util/keycode";
import { SelectItem } from "@/constants/command";
import CatalogMenu from "@/views/components/CatalogMenu.vue";

const SelectOptGroup = Select.OptGroup;
const SelectOpt = Select.Option;

@Component({
  components: {
    "catalog-menu": CatalogMenu,
    "a-modal": Modal,
    "a-auto-complete": AutoComplete,
    "a-select-opt-group": SelectOptGroup,
    "a-select-option": SelectOpt,
    "a-input": Input,
    "a-icon": Icon
  }
})
export default class CommandBar extends Vue {
  @Prop() private pageDataset!: SelectItem[];
  private dataset: SelectItem[] = [];

  // AutoComplete
  private showDropDown: boolean = true;
  handleSearch(value: string) {
    this.dataSource = [];
    this.dataset.forEach(item => {
      if (item.name.indexOf(value) != -1) {
        this.dataSource.push(item);
      }
    });
  }
  onSelect(value: string) {
    this.dataSource.forEach(item => {
      if (item.name == value) {
        this.command = item;
        return;
      }
    });
  }

  // CatalogMenu
  private catalogMenu: boolean = false;
  showCatalogMenu() {
    this.catalogMenu = true;
  }
  hideCatalogMenu() {
    this.catalogMenu = false;
  }
  private catalogMenuDataSet: SelectItem[] = [
    {
      name: "show-catalog-menu",
      desc: "显示菜单",
      cmd: this.showCatalogMenu.bind(this)
    },
    {
      name: "hide-catalog-menu",
      desc: "隐藏菜单",
      cmd: this.hideCatalogMenu.bind(this)
    }
  ];

  private visible: boolean = false;
  private command!: SelectItem;
  private false = false;
  private commandBar = "commandBar";
  private dataSource: SelectItem[] = this.dataset;

  // Handle Show/Hide
  showCommandBar() {
    this.$nextTick(() => {
      // this.dataSource = [];
    });
    this.visible = true;
    this.$nextTick(() => {
      this.showDropDown = true;
      let dom = document.getElementById(this.commandBar);
      if (dom) {
        dom.focus();
      }
    });
  }
  hideCommandBar() {
    this.showDropDown = false;
    this.visible = false;
  }

  onKeyDown() {
    let _this = this;
    document.onkeydown = function(e) {
      switch (true) {
        case e.keyCode == KeyCode.space && e.altKey && !_this.visible: {
          _this.showCommandBar();
          break;
        }
        case e.keyCode == KeyCode.enter && _this.visible: {
          _this.hideCommandBar();
          _this.command.cmd();
        }
        case e.keyCode == KeyCode.esc && _this.visible: {
          _this.hideCommandBar();
        }
        default: {
        }
      }
    };
  }

  mounted() {
    this.onKeyDown();
    this.dataset = this.dataset
      .concat(this.pageDataset)
      .concat(this.catalogMenuDataSet);
    this.dataSource = this.dataset;
    console.log(this.dataset);
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
