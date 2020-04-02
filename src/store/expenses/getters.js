export function years(state) {
  return Object.keys(state.expenses).sort().reverse();
}

export function months(state) {
  return (year) => Object.keys(state.expenses[year]).sort();
}

export function expensesInMonth(state) {
  return (year, month) => state.expenses[year][month];
}
