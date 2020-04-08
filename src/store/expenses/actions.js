import { uid, Notify } from 'quasar';
import { firebaseDb } from 'src/boot/firebase';
import { showErrorMessage } from 'src/functions/show-error-message';
import { firebaseAction } from 'vuexfire';

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

export const firebaseReadData = firebaseAction(
  ({ bindFirebaseRef, dispatch }, collectionId) => bindFirebaseRef('expenses', firebaseDb.ref('expenses').child(collectionId)).then(() => {
    dispatch('app/setExpensesLoaded', true, { root: true });
  }),
);

export function firebaseAddExpense(state, payload) {
  firebaseDb
    .ref(`expenses/${payload.collectionId}/${payload.id}`)
    .set(payload.expense, (error) => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create('Expense added!');
      }
    });
}

export function firebaseUpdateExpense(state, payload) {
  firebaseDb
    .ref(`expenses/${payload.collectionId}/${payload.id}`)
    .update(payload.updates, (error) => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create('Expense updated!');
      }
    });
}

export function firebaseDeleteExpense(state, payload) {
  firebaseDb
    .ref(`expenses/${payload.collectionId}/${payload.id}`)
    .remove((error) => {
      if (error) {
        showErrorMessage(error.message);
      } else {
        Notify.create('Expense deleted!');
      }
    });
}
