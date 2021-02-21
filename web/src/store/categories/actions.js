import { executeRequest } from 'src/client/json-rpc';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';

import { Notify, Loading } from 'quasar';

export async function loadCategories({ commit }) {
  try {
    const categories = await executeRequest('Category.All');

    commit('setCategories', categories);
  } catch (e) {
    showErrorMessageWithTitle('Could not load categories', e.message);
  }
}

export async function addCategory({ dispatch }, category) {
  try {
    Loading.show();
    await executeRequest('Category.Create', category);
    await dispatch('loadCategories');
    Loading.hide();

    Notify.create('Category added!');
  } catch (e) {
    showErrorMessageWithTitle('Could not create category', e.message);
  }
}

export async function deleteCategory({ dispatch }, id) {
  try {
    Loading.show();
    await executeRequest('Category.Delete', { id });
    await dispatch('loadCategories');
    Loading.hide();

    Notify.create('Category deleted!');
  } catch (e) {
    showErrorMessageWithTitle('Could not delete category', e.message);
  }
}

export async function updateCategory({ dispatch }, category) {
  try {
    Loading.show();
    await executeRequest('Category.Update', category);
    await dispatch('loadCategories');
    Loading.hide();

    Notify.create('Category updated!');
  } catch (e) {
    showErrorMessageWithTitle('Could not update category', e.message);
  }
}
