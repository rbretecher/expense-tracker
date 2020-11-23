
import { Notify, Loading } from 'quasar';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';
import { executeRequest } from 'src/client/json-rpc';

export async function loadExpenses({ commit, dispatch }, collectionId) {
  try {
    const expenses = await executeRequest('Expense.Get', { id: parseInt(collectionId, 10) });

    commit('setExpenses', expenses);
    dispatch('app/setExpensesLoaded', true, { root: true });
  } catch (e) {
    showErrorMessageWithTitle('Could not load expenses', e.message);
  }
}

export async function updateExpense({ dispatch }, expense) {
  try {
    Loading.show();
    await executeRequest('Expense.Update', expense);
    await dispatch('loadExpenses', expense.collectionId);
    Loading.hide();

    Notify.create('Expense updated!');
  } catch (e) {
    showErrorMessageWithTitle('Could not update expense', e.message);
  }
}

export async function addExpense({ dispatch }, expense) {
  try {
    Loading.show();
    await executeRequest('Expense.Create', expense);
    await dispatch('loadExpenses', expense.collectionId);
    await dispatch('collections/loadCollections', expense.collectionId, { root: true }); // Reload collection count
    Loading.hide();

    Notify.create('Expense added!');
  } catch (e) {
    showErrorMessageWithTitle('Could not create expense', e.message);
  }
}

export async function deleteExpense({ dispatch }, expense) {
  try {
    Loading.show();
    await executeRequest('Expense.Delete', { id: expense.id });
    await dispatch('loadExpenses', expense.collectionId);
    await dispatch('collections/loadCollections', expense.collectionId, { root: true }); // Reload collection count
    Loading.hide();

    Notify.create('Expense deleted!');
  } catch (e) {
    showErrorMessageWithTitle('Could not delete expense', e.message);
  }
}
