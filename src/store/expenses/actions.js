import firebase from 'firebase/app';
import 'firebase/database';

import { uid } from 'quasar';
import { firebaseAction } from 'vuexfire';
import { firebaseSetValue, firebaseUpdateValue, firebaseRemoveValue } from 'src/database/firebase';

export function addExpense(context, payload) {
  firebaseSetValue(`expenses/${payload.collectionId}/${uid()}`, payload.expense, { successMessage: 'Expense added!' });
}

export function updateExpense(context, payload) {
  firebaseUpdateValue(`expenses/${payload.collectionId}/${payload.id}`, payload.updates, { successMessage: 'Expense updated!' });
}

export function deleteExpense(context, payload) {
  firebaseRemoveValue(`expenses/${payload.collectionId}/${payload.id}`, { successMessage: 'Expense deleted!' });
}

export const firebaseReadData = firebaseAction(
  ({ bindFirebaseRef, dispatch }, collectionId) => bindFirebaseRef('expenses', firebase.database().ref('expenses').child(collectionId)).then(() => {
    dispatch('app/setExpensesLoaded', true, { root: true });
  }),
);
