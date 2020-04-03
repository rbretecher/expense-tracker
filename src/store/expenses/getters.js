export function years(state) {
  return Object.keys(state.expenses).sort().reverse();
}

export function months(state) {
  return (year) => Object.keys(state.expenses[year]).sort();
}

export function expensesInMonth(state) {
  return (year, month) => state.expenses[year][month];
}

export function expensesInMonthSortedByDate(state, getters) {
  return (year, month) => {
    const expensesOrdered = {};
    const expenses = getters.expensesInMonth(year, month);

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
