import { executeRequest } from 'src/client/json-rpc';

export function updateExpense(context, expense) {
  return executeRequest('Expense.Update', expense);
}

export function addExpense(context, expense) {
  return executeRequest('Expense.Create', expense);
}

export function deleteExpense(context, expense) {
  return executeRequest('Expense.Delete', { id: expense.id });
}
