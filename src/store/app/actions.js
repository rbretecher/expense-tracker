import firebase from 'firebase/app';
import 'firebase/auth';
import { Loading, LocalStorage } from 'quasar';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';

export function handleAuthStateChanged({ commit, dispatch }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      commit('setIsSignedIn', true);
      LocalStorage.set('signedIn', true);
      dispatch('loadData');
      this.$router.push('/').catch(() => { });
    } else {
      commit('setIsSignedIn', false);
      LocalStorage.set('signedIn', true);
      this.$router.push('/login').catch(() => { });
    }
  });
}

export function login(context, { email, password }) {
  Loading.show();
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      Loading.hide();
    }).catch((error) => {
      Loading.hide();
      showErrorMessageWithTitle('Could not sign in', error.message);
    });
}

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
