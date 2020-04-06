import { uid } from 'quasar';

export function addExpense({ commit, dispatch }, payload) {
  commit('addExpense', {
    id: uid(),
    collectionId: payload.collectionId,
    expense: payload.expense,
  });

  dispatch('collections/expenseAdded', payload.collectionId, { root: true });
}

export function updateExpense({ commit }, payload) {
  commit('updateExpense', payload);
}

export function deleteExpense({ commit, dispatch }, payload) {
  commit('deleteExpense', payload);

  dispatch('collections/expenseDeleted', payload.collectionId, { root: true });
}
