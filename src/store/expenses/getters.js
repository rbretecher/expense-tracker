
export function totalAmount(state) {
  let total = 0;
  Object.keys(state.expenses).forEach((key) => {
    total += parseInt(state.expenses[key].price, 10);
  });
  return total;
}
