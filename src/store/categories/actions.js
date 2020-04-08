import { uid, Notify } from 'quasar';
import { firebaseDb } from 'src/boot/firebase';
import { showErrorMessage } from 'src/functions/show-error-message';
import { firebaseAction } from 'vuexfire';

export function addCategory({ dispatch }, category) {
  dispatch('firebaseAddCategory', {
    id: uid(),
    category,
  });
}

export function updateCategory({ dispatch }, payload) {
  dispatch('firebaseUpdateCategory', payload);
}
export function deleteCategory({ dispatch }, id) {
  dispatch('firebaseDeleteCategory', id);
}

export const firebaseReadData = firebaseAction(
  ({ bindFirebaseRef, dispatch }) => bindFirebaseRef('categories', firebaseDb.ref('categories')).then(() => {
    dispatch('app/setCategoriesLoaded', true, { root: true });
  }),
);

export function firebaseAddCategory(state, payload) {
  firebaseDb.ref(`categories/${payload.id}`).set(payload.category, (error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Category added!');
    }
  });
}

export function firebaseUpdateCategory(state, payload) {
  firebaseDb.ref(`categories/${payload.id}`).update(payload.updates, (error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Category updated!');
    }
  });
}

export function firebaseDeleteCategory(state, id) {
  firebaseDb.ref(`categories/${id}`).remove((error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Category deleted!');
    }
  });
}
