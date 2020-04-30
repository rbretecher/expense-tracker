import Vue from 'vue';

export function initUser(state, userId) {
  Vue.set(state.users, userId, {});
}

export function setCurrentCollectionUserIds(state, users) {
  state.currentCollectionUserIds = users;
}
