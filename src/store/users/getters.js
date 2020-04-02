export function users(state) {
  return Object.keys(state.users).map((key) => ({ ...state.users[key] }));
}

export function getUser(state, userId) {
  console.log('state', state);
  console.log('get user', userId);
  return state.users[userId];
}
