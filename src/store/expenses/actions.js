
import { Notify, Loading } from 'quasar';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';
import { executeRequest } from 'src/client/json-rpc';

export async function updateExpense({ dispatch }, expense) {
  try {
    Loading.show();
    await executeRequest('Expense.Update', expense);
    await dispatch('projects/loadProject', expense.projectId, { root: true });
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
    await dispatch('projects/loadProject', expense.projectId, { root: true });
    await dispatch('projects/loadProjects', expense.projectId, { root: true }); // Reload project count
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
    await dispatch('projects/loadProject', expense.projectId, { root: true });
    await dispatch('projects/loadProjects', expense.projectId, { root: true }); // Reload project count
    Loading.hide();

    Notify.create('Expense deleted!');
  } catch (e) {
    showErrorMessageWithTitle('Could not delete expense', e.message);
  }
}
