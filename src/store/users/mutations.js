import Vue from 'vue';

export function setCurrentUser(state, user) {
  Vue.set(state, 'currentUser', user);
}

export function setUsers(state, users) {
  Vue.set(state, 'users', users);
}

export function initUser(state, userId) {
  Vue.set(state.users, userId, null);
}

export function deleteUser(state, userId) {
  Vue.delete(state.users, userId);
}
