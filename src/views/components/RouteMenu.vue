<template>
  <div class="container">
    <a-menu @click="handleClick" style="width: 256px" :openKeys.sync="openKeys" mode="inline">
      <a-sub-menu key="article" @titleClick="titleClick">
        <span slot="title">
          <a-icon type="mail" />
          <span>Navigation One</span>
        </span>
        <a-menu-item key="todo">todo</a-menu-item>
        <a-menu-item key="resume">resume</a-menu-item>
        <a-menu-item-group key="public" title="公共">
          <a-menu-item key="public-test">test.md</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-sub-menu key="tools" @titleClick="titleClick">
        <span slot="title">
          <a-icon type="appstore" />
          <span>Navigation Two</span>
        </span>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="setting">
        <span slot="title">
          <a-icon type="setting" />
          <span>Navigation Three</span>
        </span>
        <a-menu-item key="9">Option 9</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { client } from "@/api/index";
import { Menu, Icon } from "ant-design-vue";

@Component({
  components: {
    "a-menu": Menu,
    "a-menu-item": Menu.Item,
    "a-sub-menu": Menu.SubMenu,
    "a-menu-item-group": Menu.ItemGroup,
    "a-icon": Icon
  }
})
export default class RouteMenu extends Vue {
  // @Prop() private visible: boolean = false;
  private openKeys: string[] = ["article"];
  mounted() {}
  handleClick(data: any) {
    console.log("handleClick: ", data);
  }
  titleClick(data: any) {
    console.log("titleClick: ", data);
  }
}
</script>
