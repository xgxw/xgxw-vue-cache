import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import { dialog } from './wechat'
import Home from '@/views/Home.vue';

Vue.use(Router);

const index: RouteConfig = {
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    title: '瞎搞瞎玩',
  },
};

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    index,
    dialog,
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
