import {
  Loading, Notify, LocalStorage,
} from 'quasar';

import { executeRequest, setAxiosHeaders } from 'src/client/json-rpc';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';

export function login({ commit }, user) {
  commit('setCurrentUser', user);
  LocalStorage.set('user', user);
  setAxiosHeaders(user.jwt);
}

export function logout({ commit }) {
  commit('setCurrentUser', null);
  LocalStorage.remove('user');
}

export async function loadUsers({ commit }) {
  try {
    const categories = await executeRequest('User.All');

    commit('setUsers', categories);
  } catch (e) {
    showErrorMessageWithTitle('Could not load users', e.message);
  }
}

export async function addUser({ dispatch }, user) {
  try {
    Loading.show();
    await executeRequest('User.Create', user);
    await dispatch('loadUsers');
    Loading.hide();

    Notify.create('User updated!');
  } catch (e) {
    showErrorMessageWithTitle('Could not create user', e.message);
  }
}

export async function updateUser({ dispatch }, user) {
  try {
    Loading.show();
    await executeRequest('User.Update', user);
    await dispatch('loadUsers');
    Loading.hide();

    Notify.create('User updated!');
  } catch (e) {
    showErrorMessageWithTitle('Could not update user', e.message);
  }
}

export async function deleteUser({ dispatch }, id) {
  try {
    Loading.show();
    await executeRequest('User.Delete', { id });
    await dispatch('loadUsers');
    Loading.hide();

    Notify.create('User deleted!');
  } catch (e) {
    showErrorMessageWithTitle('Could not delete user', e.message);
  }
}
