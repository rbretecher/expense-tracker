import { uid, Notify } from 'quasar';
import { firebaseDb } from 'src/boot/firebase';
import { showErrorMessage } from 'src/functions/show-error-message';

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

// TODO : Use firebase database triggers instead.
export function expenseAdded({ commit, getters }, id) {
  Object.keys(getters.parents(id)).forEach((collectionId) => {
    commit('incrementCount', collectionId);
  });
}

// TODO : Use firebase database triggers instead.
export function expenseDeleted({ commit, getters }, id) {
  Object.keys(getters.parents(id)).forEach((collectionId) => {
    commit('decrementCount', collectionId);
  });
}

export function firebaseReadData({ commit, dispatch }) {
  const collections = firebaseDb.ref('collections');

  collections.once('value', () => {
    dispatch('app/setCollectionsLoaded', true, { root: true });
  }, (error) => {
    showErrorMessage(error.message);
  });

  collections.on('child_added', (snapshot) => {
    const collection = snapshot.val();
    commit('addCollection', { id: snapshot.key, collection });
  });

  collections.on('child_changed', (snapshot) => {
    commit('updateCollection', { id: snapshot.key, updates: snapshot.val() });
  });

  collections.on('child_removed', (snapshot) => {
    commit('deleteCollection', snapshot.key);
  });
}

export function firebaseAddCollection(state, payload) {
  const collectionRef = firebaseDb.ref(`collections/${payload.id}`);
  collectionRef.set(payload.collection, (error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Collection added!');
    }
  });
}

export function firebaseUpdateCollection(state, payload) {
  const collectionRef = firebaseDb.ref(`collections/${payload.id}`);
  collectionRef.update(payload.updates, (error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Collection updated!');
    }
  });
}

export function firebaseDeleteCollection(state, id) {
  const collectionRef = firebaseDb.ref(`collections/${id}`);
  collectionRef.remove((error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Collection deleted!');
    }
  });
}
