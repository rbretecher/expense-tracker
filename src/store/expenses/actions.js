
import { uid } from 'quasar';

export function addExpense({ commit }, payload) {
  commit('addExpense', { id: uid(), expense: payload });
}
