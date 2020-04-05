import { uid } from 'quasar';

export function addCategory({ commit }, payload) {
  commit('addCategory', { id: uid(), category: payload });
}

export function updateCategory({ commit }, payload) {
  commit('updateCategory', payload);
}
export function deleteCategory({ commit }, id) {
  commit('deleteCategory', id);
}
