import Vue from 'vue';

export function addExpense(state, payload) {
  Vue.set(state.expenses, payload.id, payload.expense);
}

export function updateExpense(state, payload) {
  Object.assign(state.expenses[payload.id], payload.updates);
}
