export function updateCategory(state, payload) {
  Object.assign(state.categories[payload.id], payload.updates);
}
