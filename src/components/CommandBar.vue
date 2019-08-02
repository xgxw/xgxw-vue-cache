<template>
  <div class="container" v-show="visible">
    <div class="command-bar">
      <span>{{commandType}}:</span>
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

export interface SelectItem {
  name: string;
  desc: string;
  cmd: () => void;
}

// 模仿 [chrome-vim](https://github.com/1995eaton/chromium-vim)

@Component({})
export default class CommandBar extends Vue {
  @Prop() private commandType!: String;
  @Prop() private dataset!: SelectItem[];
  private visible: boolean = false;
  private command: SelectItem | null = null; // command 当前选中的命令
  private suggests: SelectItem[] = this.dataset; // suggests 建议的数据集
  private focusIndex: number = -1; // focusIndex 当前获取焦点的 command-item 项. 处理tab按键事件时使用
  private inputText: string = ""; // inputText 用户输入的字符串

  init() {
    this.inputText = "";
    this.suggests = this.dataset;
    this.focusIndex = -1;
    this.command = null;
    this.focusDom("command-bar-input");
  }

  nextFocusIndex(): number {
    this.focusIndex++;
    if (this.focusIndex == this.suggests.length) {
      this.focusIndex = 0;
    }
    return this.focusIndex;
  }
  prevFocusIndex(): number {
    this.focusIndex--;
    if (this.focusIndex == -1) {
      this.focusIndex = this.suggests.length - 1;
    }
    return this.focusIndex;
  }

  // handleFocus 当item获取焦点时触发的操作
  handleFocus(suggest: SelectItem) {
    this.inputText = suggest.name;
    this.command = suggest;
  }

  updateSuggests() {
    this.focusIndex = -1;
    this.suggests = [];
    this.dataset.forEach(item => {
      if (item.name.indexOf(this.inputText) != -1) {
        this.suggests.push(item);
      }
    });
  }

  focusDom(id: string) {
    this.$nextTick(() => {
      let dom = document.getElementById(id);
      if (dom) {
        dom.focus();
      }
    });
  }

  showCommandBar() {
    this.visible = true;
    this.init();
  }
  hideCommandBar() {
    this.visible = false;
  }

  onKeyDown() {
    let _this = this;
    document.onkeydown = function(e) {
      switch (true) {
        case e.keyCode == KeyCode.tab && _this.visible: {
          let id = "item_";
          if (e.shiftKey) {
            id = id + _this.prevFocusIndex();
          } else {
            id = id + _this.nextFocusIndex();
          }
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
        case (isEditKey(e) || e.keyCode == KeyCode.backspace) &&
          _this.visible: {
          _this.focusDom("command-bar-input");
          if (e.keyCode == KeyCode.backspace) {
            _this.inputText = _this.inputText.slice(
              0,
              _this.inputText.length - 1
            );
          } else {
            _this.inputText += e.key;
          }
          _this.updateSuggests();
          return false;
        }
      }
    };
  }
  onKeyUp() {
    let _this = this;
    document.onkeyup = function(e) {};
  }

  mounted() {
    this.onKeyDown();
    this.onKeyUp();
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
  position: fixed;
  z-index: $command-bar;
  width: 100vw;
  top: 0;
  left: 0;
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
