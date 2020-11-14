import { LocalStorage } from 'quasar';

export default async ({ router, store }) => {
  const user = LocalStorage.getItem('user');
  if (user !== null) {
    store.dispatch('users/login', user, { root: true });
  }

  router.beforeEach((to, from, next) => {
    const currentUser = store.getters['users/currentUser'];

    if (!currentUser && to.path !== '/login') {
      next('/login');
    } else if (currentUser && to.path === '/login') {
      next('/');
    } else {
      next();
    }
  });
};
