import { orderObjectByProp } from 'src/functions/order-object-by-prop';

export function users(state) {
  return orderObjectByProp(state.users, 'name');
}

export function userRootCollections({ currentUser }) {
  const collections = {};

  Object
    .keys(currentUser.collections || {})
    .forEach((key) => {
      if (!currentUser.collections[key].collection) {
        collections[key] = currentUser.collections[key];
      }
    });

  return collections;
}

export function children({ currentUser }) {
  return (id) => {
    const collections = {};

    Object
      .keys(currentUser.collections)
      .forEach((key) => {
        if (currentUser.collections[key].collection === id) {
          collections[key] = currentUser.collections[key];
        }
      });

    return collections;
  };
}

export function parents({ currentUser }, getters) {
  return (id) => {
    if (currentUser.collections[id].collection) {
      return {
        [id]: currentUser.collections[id],
        ...getters.parents(currentUser.collections[id].collection),
      };
    }
    return { [id]: currentUser.collections[id] };
  };
}
