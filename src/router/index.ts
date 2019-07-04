import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Article from '@/views/Article.vue';
import Editor from '@/views/Editor.vue';

Vue.use(Router);

const index: RouteConfig = {
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    title: '瞎搞瞎玩',
  },
};

export const loginRoutePath = "/login";
const login: RouteConfig = {
  path: loginRoutePath,
  name: 'login',
  component: Login,
  meta: {
    title: '登录',
  },
};

export const fileID = "fid"
const articlePath: string = '/article/:';
const article: RouteConfig = {
  path: articlePath + fileID,
  name: 'article',
  component: Article,
  meta: {
    title: "文章",
  },
};

const editorPath: string = '/editor/:';
const editor: RouteConfig = {
  path: editorPath + fileID,
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
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 设置title
  if (to.path.startsWith(articlePath) || to.path.startsWith(editorPath)) {
    document.title = to.meta.title + ' - ' + to.params[fileID];
  } else {
    document.title = to.meta.title;
  }
  next();
});

export default router;
