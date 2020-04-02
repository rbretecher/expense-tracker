import { get } from 'lodash';
import Vue from 'vue';

export function addExpense(state, payload) {
  const pathArray = payload.path.split('.');
  const year = pathArray[0];
  const month = pathArray[1];

  if (!state.expenses[year]) {
    Vue.set(state.expenses, year, {});
  }

  if (!state.expenses[year][month]) {
    Vue.set(state.expenses[year], month, {});
  }

  Vue.set(get(state.expenses, payload.path), payload.id, payload.expense);
}

export function updateExpense(state, payload) {
  Object.assign(get(state.expenses, payload.path)[payload.id], payload.updates);
}

export function deleteExpense(state, payload) {
  Vue.delete(get(state.expenses, payload.path), payload.id);
}
