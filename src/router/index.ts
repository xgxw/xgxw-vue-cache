import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Article from '@/views/Article.vue';

Vue.use(Router);

const index: RouteConfig = {
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    title: '瞎搞瞎玩',
  },
};

const articlePath: String = '/article/';
const article: RouteConfig = {
  path: articlePath + ':name',
  name: 'article',
  component: Article,
  meta: {
    title: "文章",
  },
};

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    index,
    article,
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 设置title
  if (to.path.startsWith("/article/")) {
    document.title = to.meta.title + ' - ' + to.params.name;
  } else {
    document.title = to.meta.title;
  }
  next();
});

export default router;
