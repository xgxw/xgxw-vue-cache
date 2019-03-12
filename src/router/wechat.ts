import { RouteConfig } from "vue-router";
import Dialog from '@/views/wechat/Dialog.vue'
import Home from '@/views/Home.vue';

const dialog: RouteConfig = {
  path: 'dialog',
  name: 'dialog',
  component: Dialog,
  meta: {
    title: '微信对话生成',
  },
};

export const wechat: RouteConfig = {
  path: 'wechat',
  name: 'wechat',
  component: Home,
  children: [
    dialog,
  ],
  meta: {
    title: '微信相关',
  },
}