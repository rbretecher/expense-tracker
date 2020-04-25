import firebase from 'firebase/app';
import 'firebase/database';

import { uid } from 'quasar';
import { firebaseAction } from 'vuexfire';
import { firebaseSetValue } from 'src/database/firebase';

export function addCollection(context, { collection, user }) {
  const collectionId = uid();
  const userId = user['.key'];

  firebaseSetValue(`collections/${collectionId}`, {
    ...collection,
    users: {
      [userId]: {
        name: user.name,
        icon: user.icon,
        settings: user.settings,
      },
    },
  }, { successMessage: 'Collection added!' });

  firebaseSetValue(`users/${userId}/collections/${collectionId}`, collection);
}

export function updateCollection(context, payload) {
  const rootRef = firebase.database().ref();
  const usersRef = rootRef.child(`collections/${payload.id}/users`);

  // Getting all users that have the collection.
  return usersRef.once('value').then((snapshot) => {
    const userKeys = Object.keys(snapshot.val());
    const updateObj = {};

    userKeys.forEach((key) => {
      updateObj[`users/${key}/collections/${payload.id}/name`] = payload.updates.name;
      updateObj[`users/${key}/collections/${payload.id}/icon`] = payload.updates.icon;
    });

    updateObj[`collections/${payload.id}/name`] = payload.updates.name;
    updateObj[`collections/${payload.id}/icon`] = payload.updates.icon;

    return rootRef.update(updateObj);
  });
}

export function deleteCollection(context, collectionId) {
  const rootRef = firebase.database().ref();
  const usersRef = rootRef.child(`collections/${collectionId}/users`);

  // Getting all users that have the collection.
  return usersRef.once('value').then((snapshot) => {
    const userKeys = Object.keys(snapshot.val());
    const updateObj = {};

    userKeys.forEach((key) => {
      updateObj[`users/${key}/collections/${collectionId}`] = null;
    });

    updateObj[`collections/${collectionId}`] = null;

    return rootRef.update(updateObj);
  });
}

export const loadCollection = firebaseAction(
  ({ bindFirebaseRef, dispatch }, collectionId) => bindFirebaseRef('currentCollection', firebase.database().ref(`collections/${collectionId}`)).then(() => {
    dispatch('app/setCollectionLoaded', true, { root: true });
  }),
);
