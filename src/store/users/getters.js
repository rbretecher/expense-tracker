export function users(state) {
  return Object.keys(state.users).map((key) => ({ ...state.users[key] }));
}

export function getUser(state, userId) {
  return state.users[userId];
}
