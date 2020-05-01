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
export const loadUsersFromCollection = firebaseAction(
  ({
    commit, dispatch, bindFirebaseRef, unbindFirebaseRef, rootGetters,
  }, collectionId) => {
    const collectionHasUsers = firebase.database().ref(`collection_has_users/${collectionId}`);

    collectionHasUsers.once('value', (snapshot) => {
      dispatch('setCurrentCollectionUsers', snapshot.val());

      const promises = [];

      Object.keys(snapshot.val()).forEach((userId) => {
        commit('initUser', userId);
        promises.push(
          bindFirebaseRef(`users.${userId}`, firebase.database().ref(`users/${userId}`)),
        );
      });

      Promise.all(promises).then(() => {
        dispatch('app/setCollectionUsersLoaded', true, { root: true });
      });
    });

    collectionHasUsers.on('child_added', (snapshot) => {
      if (!rootGetters['app/collectionUsersLoaded']) {
        return;
      }

      commit('initUser', snapshot.key);
      bindFirebaseRef(`users.${snapshot.key}`, firebase.database().ref(`users/${snapshot.key}`));
      commit('addCurrentCollectionUser', { id: snapshot.key, user: snapshot.val() });
    });

    collectionHasUsers.on('child_removed', (snapshot) => {
      unbindFirebaseRef(`users.${snapshot.key}`);
      commit('deleteUser', snapshot.key);
      commit('deleteUserFromCurrentCollection', snapshot.key);
    });
  },
);

export function setCurrentCollectionUsers({ commit }, value) {
  commit('setCurrentCollectionUsers', value);
}
