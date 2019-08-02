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
        tabindex="-1"
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
  @Prop() private visible!: boolean;
  private command: SelectItem | null = null; // command 当前选中的命令
  private suggests: SelectItem[] = this.dataset; // suggests 建议的数据集
  private focusIndex: number = -1; // focusIndex 当前获取焦点的 command-item 项. 处理tab按键事件时使用
  private inputText: string = ""; // inputText 用户输入的字符串

  @Watch("visible")
  handleVisibleChange() {
    if (this.visible) {
      this.init();
    }
  }

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

  onKeyDown() {
    let onkeydown = (e: KeyboardEvent) => {
      switch (true) {
        case e.keyCode == KeyCode.tab && this.visible: {
          let id = "item_";
          if (e.shiftKey) {
            id = id + this.prevFocusIndex();
          } else {
            id = id + this.nextFocusIndex();
          }
          this.focusDom(id);
          break;
        }
        case e.keyCode === KeyCode.enter && this.visible: {
          if (this.command && this.command.cmd) {
            this.command.cmd();
            this.$emit("onEnterKeyDown", this.command);
          }
          break;
        }
        case (isEditKey(e) || e.keyCode == KeyCode.backspace) && this.visible: {
          // 按键监听流程: 当 keydown 时将焦点聚焦到 input 框, 然后系统处理, 然后 keyup 处理, 更新 suggests
          // 之所以不在 keydown 中全部处理(如增删inputText)然后 `return false`, 是因为
          // 当使用 addEventListener 监听时会触发两次增删(系统处理一次, 自身一次),
          // 除非使用 document.onkeydown=fun(), 而非 addEventListener
          this.focusDom("command-bar-input");
          break;
        }
      }
    };
    document.addEventListener("keydown", onkeydown.bind(this));
    // 取消默认的tab按键事件. 默认事件会影响监听组件中的处理: 默认事件中 tab 会自动聚焦到 input/输入框
    // 等组件且在自定义 EventListener 之后触发. 自定义监听事件更改了focus, 然后又被默认事件更改了, 从而使逻辑无效.
    let _this = this;
    document.onkeydown = function(e) {
      switch (true) {
        case e.keyCode == KeyCode.tab && _this.visible: {
          return false;
        }
      }
    };
  }
  onKeyUp() {
    let onKeyUp = (e: KeyboardEvent) => {
      switch (true) {
        case (isEditKey(e) || e.keyCode == KeyCode.backspace) && this.visible: {
          this.updateSuggests();
          break;
        }
      }
    };
    document.addEventListener("keyup", onKeyUp.bind(this));
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
