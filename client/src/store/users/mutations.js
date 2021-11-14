export function setCurrentUser(state, user) {
  state.currentUser = user;
}

export function setUsers(state, users) {
  state.users = users;
}

export function deleteUser(state, userId) {
  delete state.users[userId];
}
