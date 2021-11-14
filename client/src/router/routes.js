const routes = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/PageDashboard.vue'),
      },
      {
        path: '/projects/:projectId',
        component: () => import('pages/PageProject.vue'),
        props: ({ params }) => ({ projectId: Number.parseInt(params.projectId, 10) || 0 }),
      },
      {
        path: '/projects/:projectId/:month',
        component: () => import('pages/PageProjectMonth.vue'),
        props: ({ params }) => (
          { projectId: Number.parseInt(params.projectId, 10) || 0, month: params.month }
        ),
      },
      {
        path: '/categories',
        component: () => import('pages/PageCategories.vue'),
      },
      {
        path: '/users',
        component: () => import('pages/PageUsers.vue'),
      },
      {
        path: '/projects',
        component: () => import('pages/PageProjects.vue'),
      },
      {
        path: '/projects/:projectId',
        component: () => import('pages/PageProjects.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
