export function rootCollections(state) {
  const collections = {};

  Object
    .keys(state.collections)
    .forEach((key) => {
      if (!state.collections[key].collection) {
        collections[key] = state.collections[key];
      }
    });

  return collections;
}

export function children(state) {
  return (id) => {
    const collections = {};

    Object
      .keys(state.collections)
      .forEach((key) => {
        if (state.collections[key].collection === id) {
          collections[key] = state.collections[key];
        }
      });

    return collections;
  };
}

export function parents(state, getters) {
  return (id) => {
    console.log('> Getting parents for ', id);
    if (state.collections[id].collection) {
      return {
        [id]: state.collections[id],
        ...getters.parents(state.collections[id].collection),
      };
    }
    return { [id]: state.collections[id] };
  };
}
