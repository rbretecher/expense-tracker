export function appReady(state, getters, rootState, rootGetters) {
  return !!rootGetters['users/currentUser'] && rootGetters['categories/categories'];
}

export function collectionsLoaded(state) {
  return state.collectionsLoaded;
}

export function expensePageReady(state) {
  return state.expensesLoaded;
}

export function collectionUsersLoaded(state) {
  return state.collectionUsersLoaded;
}
