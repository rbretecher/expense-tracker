import { orderObjectByProp } from 'src/functions/order-object-by-prop';

export function users(state) {
  return orderObjectByProp(state.users, 'name');
}

export function userRootCollections(state) {
  const collections = {};

  Object
    .keys(state.currentUser.collections)
    .forEach((key) => {
      if (!state.currentUser.collections[key].collection) {
        collections[key] = state.currentUser.collections[key];
      }
    });

  return collections;
}

export function children(state) {
  return (id) => {
    const collections = {};

    Object
      .keys(state.currentUser.collections)
      .forEach((key) => {
        if (state.currentUser.collections[key].collection === id) {
          collections[key] = state.currentUser.collections[key];
        }
      });

    return collections;
  };
}

export function parents(state, getters) {
  return (id) => {
    if (state.currentUser.collections[id].collection) {
      return {
        [id]: state.currentUser.collections[id],
        ...getters.parents(state.currentUser.collections[id].collection),
      };
    }
    return { [id]: state.currentUser.collections[id] };
  };
}
