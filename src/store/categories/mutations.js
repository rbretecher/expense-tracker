import Vue from 'vue';

export function addCategory(state, payload) {
  Vue.set(state.categories, payload.id, payload.category);
}

export function updateCategory(state, payload) {
  Object.assign(state.categories[payload.id], payload.updates);
}

export function deleteCategory(state, id) {
  Vue.delete(state.categories, id);
}
