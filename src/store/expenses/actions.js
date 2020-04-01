
import { uid } from 'quasar';

export function addExpense({ commit }, payload) {
  commit('addExpense', { id: uid(), expense: payload });
}

export function updateExpense({ commit }, payload) {
  commit('updateExpense', payload);
}
