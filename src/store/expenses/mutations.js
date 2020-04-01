import Vue from 'vue';

export function addExpense(state, payload) {
  Vue.set(state.expenses, payload.id, payload.expense);
}
