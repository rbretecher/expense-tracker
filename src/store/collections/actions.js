import firebase from 'firebase/app';
import 'firebase/database';

import { uid } from 'quasar';
import { firebaseAction } from 'vuexfire';
import { firebaseUpdateValue, firebaseMultiPathUpdates } from 'src/database/firebase';

export function addCollection(context, { collection, user }) {
  const collectionId = uid();
  const userId = user['.key'];

  const updateObj = {
    [`collections/${collectionId}`]: collection,
    [`user_has_collections/${userId}/${collectionId}`]: true,
    [`collection_has_users/${collectionId}/${userId}`]: true,
  };

  return firebaseMultiPathUpdates(updateObj, { successMessage: 'Collection added!' });
}

export function updateCollection(context, payload) {
  firebaseUpdateValue(`collections/${payload.id}`, payload.updates, { successMessage: 'Collection updated!' });
}

export function deleteCollection(context, collectionId) {
  const updateObj = {};

  firebase.database().ref(`collection_has_users/${collectionId}`).once('value', (snapshot) => {
    Object.keys(snapshot.val()).forEach((userId) => {
      updateObj[`user_has_collections/${userId}/${collectionId}`] = null;
      updateObj[`collection_has_users/${collectionId}/${userId}`] = null;
    });
    updateObj[`collections/${collectionId}`] = null;

    return firebaseMultiPathUpdates(updateObj, { successMessage: 'Collection deleted!' });
  });
}

// Load collections related to a user.
export const loadCollections = firebaseAction(
  ({
    bindFirebaseRef, unbindFirebaseRef, commit, dispatch, rootGetters,
  }, userId) => {
    const userHasCollections = firebase.database().ref(`user_has_collections/${userId}`);

    userHasCollections.once('value', (snapshot) => {
      const promises = [];

      Object.keys(snapshot.val()).forEach((collectionId) => {
        commit('initCollection', collectionId);
        promises.push(
          bindFirebaseRef(`collections.${collectionId}`, firebase.database().ref(`collections/${collectionId}`)),
        );
      });

      Promise.all(promises).then(() => {
        dispatch('app/setCollectionsLoaded', true, { root: true });
      });
    });

    userHasCollections.on('child_added', (snapshot) => {
      if (!rootGetters['app/collectionsLoaded']) {
        return;
      }

      commit('initCollection', snapshot.key);
      bindFirebaseRef(`collections.${snapshot.key}`, firebase.database().ref(`collections/${snapshot.key}`));
    });

    userHasCollections.on('child_removed', (snapshot) => {
      unbindFirebaseRef(`collections.${snapshot.key}`);
      commit('deleteCollection', snapshot.key);
    });
  },
);
