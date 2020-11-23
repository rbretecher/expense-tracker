import { Notify, Loading } from 'quasar';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';
import { executeRequest } from 'src/client/json-rpc';

export async function loadCollections({ commit }) {
  try {
    const collections = await executeRequest('Collection.All');

    commit('setCollections', collections);
  } catch (e) {
    showErrorMessageWithTitle('Could not load collections', e.message);
  }
}

export async function addCollection({ dispatch }, collection) {
  try {
    Loading.show();
    await executeRequest('Collection.Create', collection);
    await dispatch('loadCollections');
    Loading.hide();

    Notify.create('Collection added!');
  } catch (e) {
    showErrorMessageWithTitle('Could not create collection', e.message);
  }
}

export async function deleteCollection({ dispatch }, id) {
  try {
    Loading.show();
    await executeRequest('Collection.Delete', { id });
    await dispatch('loadCollections');
    Loading.hide();

    Notify.create('Collection deleted!');
  } catch (e) {
    showErrorMessageWithTitle('Could not delete collection', e.message);
  }
}

export async function updateCollection({ dispatch }, collection) {
  try {
    Loading.show();
    await executeRequest('Collection.Update', collection);
    await dispatch('loadCollections');
    Loading.hide();

    Notify.create('Collection updated!');
  } catch (e) {
    showErrorMessageWithTitle('Could not update collection', e.message);
  }
}
