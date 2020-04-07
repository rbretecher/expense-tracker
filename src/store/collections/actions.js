import { uid } from 'quasar';

export function addCollection({ commit }, collection) {
  commit('addCollection', {
    id: uid(),
    collection,
  });
}

export function updateCollection({ commit }, payload) {
  commit('updateCollection', payload);
}
export function deleteCollection({ commit }, id) {
  commit('deleteCollection', id);
}

export function expenseAdded({ commit, getters }, id) {
  // TODO : Use firebase database triggers instead.
  Object.keys(getters.parents(id)).forEach((collectionId) => {
    commit('incrementCount', collectionId);
  });
}

export function expenseDeleted({ commit, getters }, id) {
  // TODO : Use firebase database triggers instead.
  Object.keys(getters.parents(id)).forEach((collectionId) => {
    commit('decrementCount', collectionId);
  });
}
