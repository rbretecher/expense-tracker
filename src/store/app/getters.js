export function appReady(state) {
  return state.categoriesLoaded && state.collectionsLoaded;
}

export function collectionsLoaded(state) {
  return state.collectionsLoaded;
}

export function expensePageReady(state) {
  return state.expensesLoaded && state.collectionUsersLoaded;
}
