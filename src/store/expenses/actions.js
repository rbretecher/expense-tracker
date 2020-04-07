import { uid, Notify } from 'quasar';
import { firebaseDb } from 'src/boot/firebase';
import { showErrorMessage } from 'src/functions/show-error-message';

export function addExpense({ dispatch }, payload) {
  dispatch('firebaseAddExpense', {
    id: uid(),
    collectionId: payload.collectionId,
    expense: payload.expense,
  });
}

export function updateExpense({ dispatch }, payload) {
  dispatch('firebaseUpdateExpense', payload);
}

export function deleteExpense({ dispatch }, payload) {
  dispatch('firebaseDeleteExpense', payload);
}

export function firebaseReadData({ commit, dispatch }, collectionId) {
  const expenses = firebaseDb.ref(`expenses/${collectionId}`);

  expenses.once('value', () => {
    dispatch('app/setExpensesLoaded', true, { root: true });
  }, (error) => {
    showErrorMessage(error.message);
  });

  expenses.on('child_added', (snapshot) => {
    const expense = snapshot.val();
    commit('addExpense', { id: snapshot.key, collectionId, expense });
  });

  expenses.on('child_changed', (snapshot) => {
    commit('updateExpense', { id: snapshot.key, collectionId: snapshot.ref.parent.key, updates: snapshot.val() });
  });

  expenses.on('child_removed', (snapshot) => {
    commit('deleteExpense', { id: snapshot.key, collectionId: snapshot.ref.parent.key });
  });
}

export function firebaseAddExpense(state, payload) {
  const expenseRef = firebaseDb.ref(`expenses/${payload.collectionId}/${payload.id}`);
  expenseRef.set(payload.expense, (error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Expense added!');
    }
  });
}

export function firebaseUpdateExpense(state, payload) {
  const expenseRef = firebaseDb.ref(`expenses/${payload.collectionId}/${payload.id}`);
  expenseRef.update(payload.updates, (error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Expense updated!');
    }
  });
}

export function firebaseDeleteExpense(state, payload) {
  const expenseRef = firebaseDb.ref(`expenses/${payload.collectionId}/${payload.id}`);
  expenseRef.remove((error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Expense deleted!');
    }
  });
}
