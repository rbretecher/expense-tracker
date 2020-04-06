
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/PageDashboard.vue'),
      },
      {
        path: '/expenses/:collectionId',
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
