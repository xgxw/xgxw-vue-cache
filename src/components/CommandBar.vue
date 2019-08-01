<template>
  <div class="container" v-show="visible">
    <div class="command-bar">
      <span>:</span>
      <input
        id="command-bar-input"
        v-model="inputText"
        class="command-bar-input"
        type="text"
        autofocus
        autocomplete="false"
      />
    </div>
    <ul class="command-items">
      <li
        :id="['item_'+index]"
        class="command-item"
        :class="{'stripe':index%2 != 1}"
        v-for="(suggest,index) in suggests"
        :key="suggest.name"
        @focus="handleFocus(suggest)"
        tabindex="-1"
      >
        <span class="command-item-name">{{suggest.name}}</span>
        <span class="command-item-desc">{{suggest.desc}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { KeyCode, isEditKey } from "@/util/keycode";
import { SelectItem } from "@/constants/command";

// 模仿 [chrome-vim](https://github.com/1995eaton/chromium-vim)

@Component({})
export default class CommandBar extends Vue {
  @Prop() private dataset!: SelectItem[];
  private visible: boolean = true;
  // command 当前选中的命令
  private command!: SelectItem;
  // suggests 建议的数据集
  private suggests: SelectItem[] = this.dataset;
  // focusIndex 当前应该获取焦点的 command-item 项. 如在 tab 时使用
  private focusIndex: number = -1;
  // inputText 用户输入的字符串
  private inputText: string = "";

  // handleDataSetChange 使用dataset初始化suggests
  @Watch("dataset")
  handleDataSetChange() {
    this.suggests = this.dataset;
  }

  // 处理因tab导致command-item焦点发生变化
  // handleSuggestsChange 数组变化时重置焦点索引
  @Watch("suggests")
  handleSuggestsChange() {
    this.focusIndex = -1;
  }
  // nextFocusIndex 移动到下一个索引点
  nextFocusIndex(): number {
    this.focusIndex++;
    if (this.focusIndex == this.suggests.length) {
      this.focusIndex = 0;
    }
    return this.focusIndex;
  }
  // handleFocus 当item获取焦点时触发的操作
  handleFocus(suggest: SelectItem) {
    this.inputText = suggest.name;
    this.command = suggest;
  }

  @Watch("inputText")
  onInputTextChange() {
    // // 特殊情况: tab切换选框不刷新
    // this.suggests = [];
    // this.dataset.forEach(item => {
    //   if (item.name.indexOf(this.inputText) != -1) {
    //     this.suggests.push(item);
    //   }
    // });
  }

  // focusDom 将焦点设置为传入的id所指的dom
  focusDom(id: string) {
    this.$nextTick(() => {
      let dom = document.getElementById(id);
      if (dom) {
        dom.focus();
      }
    });
  }

  // Handle Show/Hide
  showCommandBar() {
    this.visible = true;
    this.focusDom("command-bar-input");
  }
  hideCommandBar() {
    this.visible = false;
  }

  onKeyDown() {
    let _this = this;
    document.onkeydown = function(e) {
      switch (true) {
        case e.keyCode == KeyCode.tab && _this.visible: {
          let id = "item_" + _this.nextFocusIndex();
          _this.focusDom(id);
          return false;
        }
        case e.keyCode == KeyCode.space && e.altKey && !_this.visible: {
          _this.showCommandBar();
          break;
        }
        case e.keyCode == KeyCode.enter && _this.visible: {
          _this.hideCommandBar();
          if (_this.command && _this.command.cmd) {
            _this.command.cmd();
          }
          break;
        }
        case e.keyCode == KeyCode.esc && _this.visible: {
          _this.hideCommandBar();
          break;
        }
        case isEditKey(e) && _this.visible: {
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

$background-color: #1c1c1c;
$background-color-stripe: #1f1f1f;
$background-color-hover: #f1f1f1;
$color: #f1f1f1;
$color-hover: #1c1c1c;

.container {
  position: absolute;
  z-index: $command-bar;
  width: 100%;
  top: 0;
}

.command-bar {
  line-height: 1.5rem;
  background-color: $background-color;
  color: $color;

  .command-bar-input {
    background-color: $background-color;
    color: $color;
    position: absolute;
    right: 0;
    top: 0;
    width: calc(100% - 10px);
    height: 1.5rem;
    box-sizing: border-box;
    outline-style: none;
    border: 0;
  }
}

.command-items {
  padding: 0;
  margin: 0;

  .command-item {
    background-color: $background-color;
    color: $color;
    display: flex;
    justify-content: space-between;

    .command-item-desc {
      min-width: 60%;
    }
  }

  // .command-item:hover,
  .command-item:focus {
    background-color: $background-color-hover;
    color: $color-hover;
  }

  .stripe {
    background-color: $background-color-stripe;
  }
}
</style>
