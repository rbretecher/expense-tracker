export function users(state) {
  return Object.keys(state.users).map((key) => ({ ...state.users[key] }));
}

export function usernames(state, getters) {
  return getters.users.map(({ name }) => (name));
}
