import { uid } from 'quasar';

export function addExpense({ commit }, payload) {
  commit('addExpense', {
    id: uid(),
    collectionId: payload.collectionId,
    expense: payload.expense,
  });
}

export function updateExpense({ commit }, payload) {
  commit('updateExpense', payload);
}

export function deleteExpense({ commit }, payload) {
  commit('deleteExpense', payload);
}
