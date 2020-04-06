export function incrementCount(state, id) {
  state.collections[id].count += 1;
}

export function decrementCount(state, id) {
  state.collections[id].count -= 1;
}
