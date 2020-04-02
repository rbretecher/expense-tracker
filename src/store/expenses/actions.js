import { get } from 'lodash';
import { uid } from 'quasar';
import { buildPathFromDate } from 'src/functions/build-path-from-date';

export function addExpense({ commit }, payload) {
  commit('addExpense', {
    id: uid(),
    path: buildPathFromDate(payload.date),
    expense: payload,
  });
}

export function updateExpense({ commit, state, dispatch }, payload) {
  commit('updateExpense', payload);

  const newPath = buildPathFromDate(payload.updates.date);

  // Path changed, expense has to be moved.
  if (payload.path !== newPath) {
    const expense = get(state.expenses, payload.path)[payload.id];

    commit('addExpense', {
      id: payload.id,
      path: newPath,
      expense,
    });

    dispatch('deleteExpense', {
      id: payload.id,
      path: payload.path,
    });
  }
}

export function deleteExpense({ commit }, payload) {
  commit('deleteExpense', payload);
}
