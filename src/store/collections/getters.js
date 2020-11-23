
export function getCollection(state) {
  return (id) => (state.collections.filter((collection) => collection.id === id) || []).shift();
}

// Filter out empty collections.
export function collections(state) {
  const collectionsObj = {};

  Object
    .keys(state.collections || {})
    .forEach((key) => {
      if (state.collections[key] && Object.keys(state.collections[key]).length) {
        collectionsObj[key] = state.collections[key];
      }
    });

  return collectionsObj;
}

export function rootCollections(state, getters) {
  const collectionsObj = {};

  Object
    .keys(getters.collections)
    .forEach((key) => {
      if (!state.collections[key].collection) {
        collectionsObj[key] = state.collections[key];
      }
    });

  return collectionsObj;
}

export function children(state, getters) {
  return (id) => {
    const collectionsObj = {};

    Object
      .keys(getters.collections)
      .forEach((key) => {
        if (state.collections[key].collection === id) {
          collectionsObj[key] = state.collections[key];
        }
      });

    return collectionsObj;
  };
}

export function parents(state, getters) {
  return (id) => {
    if (state.collections[id].collection) {
      return {
        [id]: state.collections[id],
        ...getters.parents(state.collections[id].collection),
      };
    }
    return { [id]: state.collections[id] };
  };
}
