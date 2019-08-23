import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Reader from '@/views/reader/Reader.tsx';
import Editor from '@/views/Editor.vue';
import { tools } from './tools/index';
import { demos } from './demos/index';

Vue.use(Router);

export function getIndexPath() {
  return "/";
}
const index: RouteConfig = {
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    title: '瞎搞瞎玩',
  },
};

export const loginRoutePath = "/login";
export function getLoginPath() {
  return loginRoutePath;
}
const login: RouteConfig = {
  path: loginRoutePath,
  name: 'login',
  component: Login,
  meta: {
    title: '登录',
  },
};

const readerPath: string = '/reader/';
export function getReaderPath(fid: string) {
  return readerPath + fid;
}
const reader: RouteConfig = {
  path: readerPath + "*",
  name: 'reader',
  component: Reader,
  meta: {
    title: "文章",
  },
};

const editorPath: string = '/editor/';
export function getEditorPath(fid: string) {
  return editorPath + fid;
}
const editor: RouteConfig = {
  path: editorPath + "*",
  name: 'editor',
  component: Editor,
  meta: {
    title: "编辑",
  },
};

let devs: RouteConfig[] = []
if (process.env.NODE_ENV == "development") {
  console.log("concat demos in development")
  devs = devs.concat(demos)
}
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    index,
    login,
    reader,
    editor,
    ...tools,
    ...devs
  ],
});

router.beforeEach((to, from, next) => {
  // 设置title
  document.title = to.meta.title;
  next();
});

export default router;
