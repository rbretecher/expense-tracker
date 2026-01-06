import { defineBoot } from '#q-app/wrappers'
import { LocalStorage } from 'quasar'
import { store } from 'boot/store'

export default defineBoot(({ router }) => {
  const user = LocalStorage.getItem('user')

  if (user) {
    store.dispatch('app/loggedIn', user)
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
  })
})
