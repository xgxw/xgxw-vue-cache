import { RouteConfig } from "vue-router";
import Dialog from '@/views/wechat/Dialog.vue'

export const dialog: RouteConfig = {
  path: '/wechat/dialog',
  name: 'dialog',
  component: Dialog,
  meta: {
    title: '微信对话生成',
  },
};

// export const wechat: RouteConfig = {
//   path: 'wechat',
//   name: 'wechat',
//   component: Home,
//   meta: {
//     title: '微信相关',
//   },
// }