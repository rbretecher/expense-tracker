import firebase from 'firebase/app';
import 'firebase/auth';
import { Loading, LocalStorage } from 'quasar';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';

export function handleAuthStateChanged({ commit, dispatch }) {
  const unsubscribeOnAuthStateChange = firebase.auth().onAuthStateChanged((user) => {
    Loading.hide();
    if (user) {
      commit('setIsSignedIn', true);
      LocalStorage.set('signedIn', true);
      dispatch('users/loadCurrentUser', user.uid, { root: true });
      if (this.$router.currentRoute.fullPath === '/login') {
        this.$router.push('/').catch(() => { });
      }
    } else {
      commit('setIsSignedIn', false);
      LocalStorage.set('signedIn', false);
      dispatch('resetState');
      this.$router.push('/login').catch(() => { });
      unsubscribeOnAuthStateChange();
    }
  });
}

export function login({ commit, dispatch }, { email, password }) {
  Loading.show();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      commit('setIsSignedIn', true);
      LocalStorage.set('signedIn', true);
      dispatch('users/loadCurrentUser', result.user.uid, { root: true });
      if (this.$router.currentRoute.fullPath === '/login') {
        this.$router.push('/').catch(() => { });
      }
    })
    .catch((error) => {
      Loading.hide();
      showErrorMessageWithTitle('Could not sign in', error.message);
    });
}

export function logout() {
  Loading.show();
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      Loading.hide();
      showErrorMessageWithTitle('Could not sign out', error.message);
    });
}

export function loadData({ dispatch }, userId) {
  Loading.show();
  try {
    dispatch('categories/loadCategories', null, { root: true });
    dispatch('collections/loadCollections', userId, { root: true });
  } catch (error) {
    Loading.hide();
    showErrorMessageWithTitle('Could not load Firebase data', 'Please make sure you configured properly Firebase credentials.');
  }
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

export function setCurrentPage({ commit }, value) {
  commit('setCurrentPage', value);
}

export function setToolbarAction({ commit }, value) {
  commit('setToolbarAction', value);
}

export function resetState({ commit }) {
  commit('setIsSignedIn', false);

  commit('setCurrentPage', null);
  commit('setToolbarAction', null);

  commit('setCategoriesLoaded', false);
  commit('setCollectionsLoaded', false);

  commit('setExpensesLoaded', false);
}

// Actions related to the expense page.

export function resetExpensePage({ commit, dispatch }) {
  commit('setExpensesLoaded', false);
  commit('setCollectionUsersLoaded', false);

  dispatch('expenses/setExpenses', {}, { root: true });
  dispatch('users/setCurrentCollectionUserIds', [], { root: true });
}

export function setExpensesLoaded({ commit }, value) {
  commit('setExpensesLoaded', value);
}

export function setCollectionUsersLoaded({ commit }, value) {
  commit('setCollectionUsersLoaded', value);
}
