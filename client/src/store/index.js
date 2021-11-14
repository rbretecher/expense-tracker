import { createStore } from 'vuex';

import app from './app';
import projects from './projects';
import expenses from './expenses';
import users from './users';
import categories from './categories';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      app,
      projects,
      expenses,
      users,
      categories,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });

  return Store;
}
