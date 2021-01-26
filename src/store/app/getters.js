export function appReady(state, getters, rootState, rootGetters) {
  return !!rootGetters['users/currentUser'] && rootGetters['categories/categories'];
}

export function projectsLoaded(state) {
  return state.projectsLoaded;
}

export function expensePageReady(state) {
  return state.expensesLoaded;
}

export function projectUsersLoaded(state) {
  return state.projectUsersLoaded;
}
