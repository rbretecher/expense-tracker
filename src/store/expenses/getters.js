export function expensesSortedByDate(state) {
  return (collectionId) => {
    const expensesOrdered = {};
    const expenses = state.expenses[collectionId];

    if (!expenses) {
      return {};
    }

    const keys = Object.keys(expenses);

    keys.sort((a, b) => {
      const expenseAProp = expenses[a].date;
      const expenseBProp = expenses[b].date;

      let result = 0;

      if (expenseAProp > expenseBProp) {
        result = 1;
      } else if (expenseAProp < expenseBProp) {
        result = -1;
      }

      return result;
    });

    keys.forEach((key) => {
      expensesOrdered[key] = expenses[key];
    });

    return expensesOrdered;
  };
}
