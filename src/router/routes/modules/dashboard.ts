import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  layout: {
    path: '/dashboard',
    name: 'Dashboard',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/dashboard/welcome',
    meta: {
      icon: 'ant-design:home-outlined',
      title: 'Dashboard',
    },
  },

  routes: [
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('/@/views/dashboard/welcome/index.vue'),
      meta: {
        affix: true,
        icon: 'ant-design:home-outlined',
        title: '首页',
      },
    },
  ],
};

export default dashboard;
