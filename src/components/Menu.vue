<template>
  <a-menu :defaultSelectedKeys="['1']" mode="inline" :inlineCollapsed="collapsed">
    <a-sub-menu key="sub1">
      <span slot="title">
        <a-icon type="mail" />
        <span>Navigation One</span>
      </span>
      <a-menu-item-group key="g1">
        <template slot="title">
          <a-icon type="qq" />
          <span>Item 1</span>
        </template>
        <a-menu-item key="1">Option 1</a-menu-item>
        <a-menu-item key="2">Option 2</a-menu-item>
      </a-menu-item-group>
    </a-sub-menu>
  </a-menu>
</template>