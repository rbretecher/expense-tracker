export function appReady(state) {
  return state.categoriesLoaded && state.collectionsLoaded && state.usersLoaded;
}
