import firebase from 'firebase/app';
import 'firebase/database';

import { uid } from 'quasar';
import { firebaseAction } from 'vuexfire';
import { firebaseSetValue, firebaseUpdateValue, firebaseRemoveValue } from 'src/database/firebase';

export function addCategory(context, category) {
  firebaseSetValue(`categories/${uid()}`, category, { successMessage: 'Category added!' });
}

export function updateCategory(context, payload) {
  firebaseUpdateValue(`categories/${payload.id}`, payload.updates, { successMessage: 'Category updated!' });
}
export function deleteCategory(context, id) {
  firebaseRemoveValue(`categories/${id}`, { successMessage: 'Category deleted!' });
}

export const firebaseReadData = firebaseAction(
  ({ bindFirebaseRef, dispatch }) => bindFirebaseRef('categories', firebase.database().ref('categories')).then(() => {
    dispatch('app/setCategoriesLoaded', true, { root: true });
  }),
);
