import 'firebase/auth';
import { Loading } from 'quasar';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';

import { executeRequest } from 'src/client/json-rpc';

export async function login({ dispatch }, { email, password }) {
  Loading.show();
  try {
    const user = await executeRequest('User.Login', {
      email,
      password,
    });

    dispatch('loggedIn', user);

    if (this.$router.currentRoute.fullPath === '/login') {
      this.$router.push('/').catch(() => { });
    }
  } catch (e) {
    showErrorMessageWithTitle('Could not sign in', e.message);
  } finally {
    Loading.hide();
  }
}

// Should be called when user is logged in.
export function loggedIn({ dispatch }, user) {
  dispatch('users/login', user, { root: true });
  dispatch('categories/loadCategories', null, { root: true });
}

export function logout({ dispatch }) {
  dispatch('users/logout', null, { root: true });

  this.$router.push('/login').catch(() => { });
}

export function setCategoriesLoaded({ commit, getters }, value) {
  commit('setCategoriesLoaded', value);

  if (getters.appReady) {
    Loading.hide();
  }
}

export function setCollectionsLoaded({ commit, getters }, value) {
  commit('setCollectionsLoaded', value);

  if (getters.appReady) {
    Loading.hide();
  }
}

export function setUsersLoaded({ commit }, value) {
  commit('setUsersLoaded', value);
}

export function setToolbar({ commit }, value) {
  commit('setToolbar', value);
}

export function setExpensesLoaded({ commit }, value) {
  commit('setExpensesLoaded', value);
}

export function setCollectionUsersLoaded({ commit }, value) {
  commit('setCollectionUsersLoaded', value);
}

export function resetExpensePage({ commit, dispatch }) {
  commit('setExpensesLoaded', false);
  commit('setCollectionUsersLoaded', false);

  dispatch('expenses/setExpenses', {}, { root: true });
  dispatch('users/setCurrentCollectionUsers', {}, { root: true });
}

export function resetState({ commit, dispatch }) {
  commit('setToolbar', {
    title: null,
    button: null,
  });

  commit('setCategoriesLoaded', false);
  commit('setCollectionsLoaded', false);

  dispatch('resetExpensePage');

  dispatch('collections/setCollections', {}, { root: true });

  commit('setUsersLoaded', false);
}
