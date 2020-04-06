export function expenseAdded({ commit, getters }, id) {
  commit('incrementCount', id);

  // TODO : Use firebase database triggers instead.
  getters.parents(id).forEach((collectionId) => {
    commit('incrementCount', collectionId);
  });
}

export function expenseDeleted({ commit, getters }, id) {
  commit('decrementCount', id);

  // TODO : Use firebase database triggers instead.
  getters.parents(id).forEach((collectionId) => {
    commit('decrementCount', collectionId);
  });
}
