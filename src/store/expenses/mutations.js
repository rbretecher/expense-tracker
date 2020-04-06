import Vue from 'vue';

export function addExpense(state, payload) {
  // Init the collection if it does not exist.
  if (!state.expenses[payload.collectionId]) {
    Vue.set(state.expenses, payload.collectionId, {});
  }

  Vue.set(state.expenses[payload.collectionId], payload.id, payload.expense);
}

export function updateExpense(state, payload) {
  Object.assign(state.expenses[payload.collectionId][payload.id], payload.updates);
}

export function deleteExpense(state, payload) {
  Vue.delete(state.expenses[payload.collectionId], payload.id);
}
