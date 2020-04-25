export function appReady(state) {
  return state.categoriesLoaded;
}

export function expensePageReady(state) {
  return state.collectionLoaded && state.expensesLoaded;
}
