import { uid, Notify } from 'quasar';
import { firebaseDb } from 'src/boot/firebase';
import { showErrorMessage } from 'src/functions/show-error-message';
import { firebaseAction } from 'vuexfire';

export function addCollection({ dispatch }, collection) {
  dispatch('firebaseAddCollection', {
    id: uid(),
    collection,
  });
}

export function updateCollection({ dispatch }, payload) {
  dispatch('firebaseUpdateCollection', payload);
}

export function deleteCollection({ dispatch }, id) {
  dispatch('firebaseDeleteCollection', id);
}

export const firebaseReadData = firebaseAction(
  ({ bindFirebaseRef, dispatch }) => bindFirebaseRef('collections', firebaseDb.ref('collections')).then(() => {
    dispatch('app/setCollectionsLoaded', true, { root: true });
  }),
);

export function firebaseAddCollection(state, payload) {
  firebaseDb.ref(`collections/${payload.id}`).set(payload.collection, (error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Collection added!');
    }
  });
}

export function firebaseUpdateCollection(state, payload) {
  firebaseDb.ref(`collections/${payload.id}`).update(payload.updates, (error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Collection updated!');
    }
  });
}

export function firebaseDeleteCollection(state, id) {
  firebaseDb.ref(`collections/${id}`).remove((error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Collection deleted!');
    }
  });
}
