import { RouteConfig } from 'vue-router';
import Index from '@/views/tools/Index.vue';
import Editor from '@/views/tools/Editor.vue';
import TestPage from '@/views/tools/TestPage.vue';

export const toolsPath = "/tools"
export const index: RouteConfig = {
  path: toolsPath,
  name: 'tools',
  component: Index,
  meta: {
    title: '工具',
  },
};

export const editorPath = "/tools/editor"
export const editor: RouteConfig = {
  path: editorPath,
  name: 'tools_editor',
  component: Editor,
  meta: {
    title: '工具-编辑',
  },
};
export const test: RouteConfig = {
  path: '/tools/test',
  name: 'tools_test',
  component: TestPage,
  meta: {
    title: '工具-测试',
  },
};

export const tools: RouteConfig[] = [index, editor, test]