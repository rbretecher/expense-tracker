import { orderObjectByProp } from 'src/functions/order-object-by-prop';

export function users(state) {
  return orderObjectByProp(state.users, 'name');
}

export function currentUser(state) {
  return state.currentUser;
}

export function currentCollectionUsers(state) {
  const collectionUsers = {};

  state.currentCollectionUserIds.forEach((id) => {
    collectionUsers[id] = state.users[id];
  });

  return collectionUsers;
}
