export function appReady(state) {
  return state.categoriesLoaded && state.usersLoaded;
}

export function expensePageReady(state) {
  return state.collectionLoaded && state.expensesLoaded;
}
