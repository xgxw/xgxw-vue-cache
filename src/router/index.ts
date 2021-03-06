import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Article from '@/views/Article.vue';
import Editor from '@/views/Editor.vue';
import { tools } from './tools/index';

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

const articlePath: string = '/article/';
export function getArticlePath(fid: string) {
  return articlePath + fid;
}
const article: RouteConfig = {
  path: articlePath + "*",
  name: 'article',
  component: Article,
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

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    index,
    login,
    article,
    editor,
    ...tools,
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 设置title
  document.title = to.meta.title;
  next();
});

export default router;
