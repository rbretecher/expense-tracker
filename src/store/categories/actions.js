import { uid } from 'quasar';
import { firebaseDb } from 'src/boot/firebase';
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
  ({ bindFirebaseRef, dispatch }) => bindFirebaseRef('categories', firebaseDb.ref('categories')).then(() => {
    dispatch('app/setCategoriesLoaded', true, { root: true });
  }),
);
