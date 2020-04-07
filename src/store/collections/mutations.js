import Vue from 'vue';

export function addCollection(state, payload) {
  Vue.set(state.collections, payload.id, payload.collection);
}

export function updateCollection(state, payload) {
  Object.assign(state.collections[payload.id], payload.updates);
}

export function deleteCollection(state, id) {
  Vue.delete(state.collections, id);
}
