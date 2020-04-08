export function expensesSortedByDate(state) {
  const expensesOrdered = {};

  if (!state.expenses) {
    return {};
  }

  const keys = Object.keys(state.expenses);

  keys.sort((a, b) => {
    const expenseAProp = state.expenses[a].date;
    const expenseBProp = state.expenses[b].date;

    let result = 0;

    if (expenseAProp > expenseBProp) {
      result = 1;
    } else if (expenseAProp < expenseBProp) {
      result = -1;
    }

    return result;
  });

  keys.forEach((key) => {
    expensesOrdered[key] = state.expenses[key];
  });

  return expensesOrdered;
}
