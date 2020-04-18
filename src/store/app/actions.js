import { Loading } from 'quasar';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';

export function loadData({ dispatch }) {
  Loading.show();
  try {
    dispatch('categories/firebaseReadData', null, { root: true });
    dispatch('collections/firebaseReadData', null, { root: true });
    dispatch('users/firebaseReadData', null, { root: true });
  } catch (error) {
    Loading.hide();
    showErrorMessageWithTitle('Could not load Firebase data', 'Please make sure you configured properly Firebase credentials.');
  }
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

export function setCurrentPage({ commit }, value) {
  commit('setCurrentPage', value);
}

export function setToolbarAction({ commit }, value) {
  commit('setToolbarAction', value);
}
