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

    if (this.$router.currentRoute.value.fullPath === '/login') {
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
  dispatch('users/loadUsers', null, { root: true });
  dispatch('projects/loadProjects', null, { root: true });
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

export function setProjectsLoaded({ commit, getters }, value) {
  commit('setProjectsLoaded', value);

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

export function resetState({ commit, dispatch }) {
  commit('setToolbar', {
    title: null,
    button: null,
  });

  commit('setCategoriesLoaded', false);
  commit('setProjectsLoaded', false);

  dispatch('projects/setProjects', [], { root: true });

  commit('setUsersLoaded', false);
}
