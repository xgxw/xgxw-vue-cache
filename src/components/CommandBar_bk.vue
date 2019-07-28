<template>
  <div class="container">
    <div class="command-bar">
      <span>:</span>
      <input
        v-model="inputText"
        class="command-bar-input"
        type="text"
        tabindex="1"
        autofocus
        autocomplete="false"
      />
    </div>
    <ul class="command-items">
      <li
        class="command-item"
        :class="{'active':index%2 != 1}"
        v-for="(suggest,index) in suggests"
        :tabindex="index+1"
        :key="suggest.name"
        :command="suggest.cmd"
        @click.stop="hancleClick(suggest)"
        @focus="handleFocus(suggest)"
      >
        <span class="command-item-name">{{suggest.name}}</span>
        <span class="command-item-desc">{{suggest.desc}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
import { KeyCode } from "@/util/keycode";

// 搞不定了, 模仿 [chrome-vim](https://github.com/1995eaton/chromium-vim) 写的

interface SelectItem {
  name: string;
  cmd: () => void;
  desc: string;
}

@Component({})
export default class CommandBarBk extends Vue {
  private inputText: string = "";
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
  private suggests: SelectItem[] = this.dataset;
  @Watch("inputText")
  onInputTextChange() {
    // 当删除时应遍历dataset, 当新增时应在 suggests 中搜索
    // 目前默认先都遍历dataset
    // 特殊情况: tab切换选框不刷新
    // this.suggests = [];
    // this.dataset.forEach(item => {
    //   if (item.name.indexOf(this.inputText) != -1) {
    //     this.suggests.push(item);
    //   }
    // });
  }

  hancleClick(suggest: SelectItem) {
    console.log("hancleClick");
    suggest.cmd();
  }
  handleFocus(suggest: SelectItem) {
    this.inputText = suggest.name;
  }
  onKeyDown() {
    let _this = this;
    document.onkeydown = function(e) {
      switch (true) {
        case e.keyCode == KeyCode.space && e.altKey: {
          break;
        }
        case e.keyCode == KeyCode.enter: {
          break;
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

$background-color: #1c1c1c;
$background-color-stripe: #1f1f1f;
$color: #fff;

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

  .command-item:focus {
    background-color: aqua;
  }

  .active {
    background-color: $background-color-stripe;
  }
}
</style>
