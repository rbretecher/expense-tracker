
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
        path: '/expenses/:projectIdParam',
        component: () => import('pages/PageExpenses.vue'),
        props: true,
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
];


// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
