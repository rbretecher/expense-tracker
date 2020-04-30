import firebase from 'firebase/app';
import 'firebase/database';

import { uid } from 'quasar';
import { firebaseAction } from 'vuexfire';
import { firebaseSetValue, firebaseUpdateValue, firebaseRemoveValue } from 'src/database/firebase';

export function addUser(context, user) {
  firebaseSetValue(`users/${uid()}`, user, { successMessage: 'User added!' });
}

export function updateUser(context, payload) {
  firebaseUpdateValue(`users/${payload.id}`, payload.updates, { successMessage: 'User updated!' });
}

export function deleteUser(context, id) {
  firebaseRemoveValue(`users/${id}`, { successMessage: 'User deleted!' });
}

export const loadUsers = firebaseAction(
  ({ bindFirebaseRef, dispatch }) => bindFirebaseRef('users', firebase.database().ref('users')).then(() => {
    dispatch('app/setUsersLoaded', true, { root: true });
  }),
);

export const loadCurrentUser = firebaseAction(
  ({ bindFirebaseRef, dispatch }, userUid) => bindFirebaseRef('currentUser', firebase.database().ref(`users/${userUid}`)).then((snapshot) => {
    dispatch('app/loadData', snapshot.key, { root: true });
  }),
);

// Load users related to a collection.
export function loadUsersFromCollection({ dispatch }, collectionId) {
  const collectionHasUsers = firebase.database().ref(`collection_has_users/${collectionId}`);

  collectionHasUsers.once('value', (snapshot) => {
    dispatch('setCurrentCollectionUserIds', Object.keys(snapshot.val()));
    dispatch('users/loadUsersFromIds', Object.keys(snapshot.val()), { root: true });
  });

  /*
  userHasCollections.on('child_added', (snapshot) => {
    if (!rootGetters['app/collectionsLoaded']) {
      return;
    }
    dispatch('collections/loadCollection', snapshot.key, { root: true });
  });

  userHasCollections.on('child_removed', (snapshot) => {
    dispatch('collections/unbindCollection', snapshot.key, { root: true });
  });
  */
}

export const loadUsersFromIds = firebaseAction(
  ({ bindFirebaseRef, commit, dispatch }, users) => {
    const promises = [];

    users.forEach((userId) => {
      commit('initUser', userId);
      promises.push(
        bindFirebaseRef(`users.${userId}`, firebase.database().ref(`users/${userId}`)),
      );
    });

    Promise.all(promises).then(() => {
      dispatch('app/setCollectionUsersLoaded', true, { root: true });
    });
  },
);

export function setCurrentCollectionUserIds({ commit }, value) {
  commit('setCurrentCollectionUserIds', value);
}
