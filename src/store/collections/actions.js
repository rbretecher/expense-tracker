import firebase from 'firebase/app';
import 'firebase/database';

import { uid } from 'quasar';
import { firebaseAction } from 'vuexfire';
import { firebaseSetValue, firebaseUpdateValue, firebaseRemoveValue } from 'src/database/firebase';

export function addCollection(context, { collection, user }) {
  const collectionId = uid();
  const userId = user['.key'];

  firebaseSetValue(`collections/${collectionId}`, {
    ...collection,
    users: {
      [userId]: {
        name: user.name,
        icon: user.icon,
      },
    },
  }, { successMessage: 'Collection added!' });

  firebaseSetValue(`users/${userId}/collections/${collectionId}`, collection);
}

export function updateCollection(context, payload) {
  firebaseUpdateValue(`collections/${payload.id}`, payload.updates, { successMessage: 'Collection updated!' });
}

export function deleteCollection(context, collectionId) {
  firebaseRemoveValue(`collections/${collectionId}`, { successMessage: 'Collection deleted!' });
}

export const loadCollection = firebaseAction(
  ({ bindFirebaseRef, dispatch }, collectionId) => bindFirebaseRef('currentCollection', firebase.database().ref(`collections/${collectionId}`)).then(() => {
    dispatch('app/setCollectionLoaded', true, { root: true });
  }),
);
