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
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Modal, AutoComplete, Select, Input, Icon } from "ant-design-vue";
import { KeyCode } from "@/util/keycode";
import Index from "../views/tools/Index.vue";

const SelectOptGroup = Select.OptGroup;
const SelectOpt = Select.Option;

interface SelectItem {
  name: string;
  desc: string;
  cmd: () => void;
}

@Component({
  components: {
    "a-modal": Modal,
    "a-auto-complete": AutoComplete,
    "a-select-opt-group": SelectOptGroup,
    "a-select-option": SelectOpt,
    "a-input": Input,
    "a-icon": Icon
  }
})
export default class CommandBar extends Vue {
  private showDropDown: boolean = true;
  // AutoComplete
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

  private visible: boolean = false;
  private command!: SelectItem;
  private false = false;
  private commandBar = "commandBar";

  private dataset: SelectItem[] = [
    {
      name: "print",
      cmd: () => {},
      desc: "打印网页"
    },
    {
      name: "print2",
      cmd: () => {},
      desc: "打印网页"
    },
    {
      name: "2print",
      cmd: () => {},
      desc: "打印网页"
    },
    {
      name: "3print",
      cmd: () => {},
      desc: "打印网页"
    },
    {
      name: "4print",
      cmd: () => {},
      desc: "打印网页"
    }
  ];
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
