import { Loading } from 'quasar';

export function loadData({ dispatch }) {
  Loading.show();
  dispatch('categories/firebaseReadData', null, { root: true });
  dispatch('collections/firebaseReadData', null, { root: true });
  dispatch('users/firebaseReadData', null, { root: true });
}

export function loadExpenseData({ dispatch }, collectionId) {
  dispatch('setExpensesLoaded', false);
  dispatch('expenses/firebaseReadData', collectionId, { root: true });
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

export function setUsersLoaded({ commit, getters }, value) {
  commit('setUsersLoaded', value);

  if (getters.appReady) {
    Loading.hide();
  }
}

export function setExpensesLoaded({ commit }, value) {
  commit('setExpensesLoaded', value);
}
