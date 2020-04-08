import { uid } from 'quasar';
import { firebaseDb } from 'src/boot/firebase';
import { firebaseAction } from 'vuexfire';
import { firebaseSetValue, firebaseUpdateValue, firebaseRemoveValue } from 'src/database/firebase';

export function addCollection(context, collection) {
  firebaseSetValue(`collections/${uid()}`, collection, { successMessage: 'Collection added!' });
}

export function updateCollection(context, payload) {
  firebaseUpdateValue(`collections/${payload.id}`, payload.updates, { successMessage: 'Collection updated!' });
}

export function deleteCollection(context, id) {
  firebaseRemoveValue(`collections/${id}`, { successMessage: 'Collection deleted!' });
}

export const firebaseReadData = firebaseAction(
  ({ bindFirebaseRef, dispatch }) => bindFirebaseRef('collections', firebaseDb.ref('collections')).then(() => {
    dispatch('app/setCollectionsLoaded', true, { root: true });
  }),
);
