import { RouteConfig } from 'vue-router';
import Catalog from '@/views/demo/CatalogMenu.vue';

export const catalogPath = "/demo/catalog"
export const catalog: RouteConfig = {
    path: catalogPath,
    name: 'demo_catalog',
    component: Catalog,
    meta: {
        title: '工具-编辑',
    },
};

export const demos: RouteConfig[] = [catalog]