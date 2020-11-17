export function users(state) {
  return state.users;
}

export function currentUser(state) {
  return state.currentUser;
}

export function currentCollectionUsers(state) {
  const collectionUsers = {};

  Object.keys(state.currentCollectionUsers).forEach((id) => {
    if (state.users[id]) {
      collectionUsers[id] = {
        ...state.users[id],
        weight: state.currentCollectionUsers[id].weight || 0.5,
      };
    }
  });

  return collectionUsers;
}
