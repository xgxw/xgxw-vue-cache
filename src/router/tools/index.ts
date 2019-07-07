import { RouteConfig } from 'vue-router';
import Index from '@/views/tools/Index.vue';
import Editor from '@/views/tools/Editor.vue';

export const index: RouteConfig = {
  path: '/tools',
  name: 'tools',
  component: Index,
  meta: {
    title: '工具',
  },
};

export const editor: RouteConfig = {
  path: '/tools/etitor',
  name: 'tools_editor',
  component: Editor,
  meta: {
    title: '工具-编辑',
  },
};

export const tools: RouteConfig[] = [index, editor]