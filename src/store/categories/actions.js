import { uid, Notify } from 'quasar';
import { firebaseDb } from 'src/boot/firebase';
import { showErrorMessage } from 'src/functions/show-error-message';

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

export function firebaseReadData({ commit }) {
  const categories = firebaseDb.ref('categories');

  categories.once('value', () => {
  }, (error) => {
    showErrorMessage(error.message);
  });

  categories.on('child_added', (snapshot) => {
    const category = snapshot.val();
    commit('addCategory', { id: snapshot.key, category });
  });

  categories.on('child_changed', (snapshot) => {
    commit('updateCategory', { id: snapshot.key, updates: snapshot.val() });
  });

  categories.on('child_removed', (snapshot) => {
    commit('deleteCategory', snapshot.key);
  });
}

export function firebaseAddCategory(state, payload) {
  const categoryRef = firebaseDb.ref(`categories/${payload.id}`);
  categoryRef.set(payload.category, (error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Category added!');
    }
  });
}

export function firebaseUpdateCategory(state, payload) {
  const categoryRef = firebaseDb.ref(`categories/${payload.id}`);
  categoryRef.update(payload.updates, (error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Category updated!');
    }
  });
}

export function firebaseDeleteCategory(state, id) {
  const categoryRef = firebaseDb.ref(`categories/${id}`);
  categoryRef.remove((error) => {
    if (error) {
      showErrorMessage(error.message);
    } else {
      Notify.create('Category deleted!');
    }
  });
}
