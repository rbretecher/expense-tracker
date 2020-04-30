import Vue from 'vue';

export function initUser(state, userId) {
  Vue.set(state.users, userId, null);
}

export function deleteUser(state, userId) {
  Vue.delete(state.users, userId);
}

export function deleteUserFromCurrentCollection(state, userId) {
  state.currentCollectionUserIds.splice(state.currentCollectionUserIds.indexOf(userId), 1);
}

export function setCurrentCollectionUserIds(state, users) {
  state.currentCollectionUserIds = users;
}

export function addCurrentCollectionUser(state, userId) {
  state.currentCollectionUserIds.push(userId);
}
