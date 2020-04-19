import { LocalStorage } from 'quasar';

export default async ({ router }) => {
  router.beforeEach((to, from, next) => {
    const signedIn = LocalStorage.getItem('signedIn');
    if (!signedIn && to.path !== '/login') {
      next('/login');
    } else if (signedIn && to.path === '/login') {
      next('/');
    } else {
      next();
    }
  });
};
