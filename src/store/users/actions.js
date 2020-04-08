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

export const firebaseReadData = firebaseAction(
  ({ bindFirebaseRef, dispatch }) => bindFirebaseRef('users', firebase.database().ref('users')).then(() => {
    dispatch('app/setUsersLoaded', true, { root: true });
  }),
);
