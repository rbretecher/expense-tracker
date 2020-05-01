import Vue from 'vue';

export function initUser(state, userId) {
  Vue.set(state.users, userId, null);
}

export function deleteUser(state, userId) {
  Vue.delete(state.users, userId);
}

export function deleteUserFromCurrentCollection(state, userId) {
  Vue.delete(state.currentCollectionUsers, userId);
}

export function setCurrentCollectionUsers(state, users) {
  state.currentCollectionUsers = users;
}

export function addCurrentCollectionUser(state, { id, user }) {
  Vue.set(state.currentCollectionUsers, id, user);
}
