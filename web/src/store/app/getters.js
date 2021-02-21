export function appReady(state, getters, rootState, rootGetters) {
  return !!rootGetters['users/currentUser'] && rootGetters['categories/categories'];
}

export function projectsLoaded(state) {
  return state.projectsLoaded;
}
