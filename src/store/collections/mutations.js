import Vue from 'vue';

export function initCollection(state, collectionId) {
  Vue.set(state.collections, collectionId, null);
}

export function deleteCollection(state, collectionId) {
  Vue.delete(state.collections, collectionId);
}
