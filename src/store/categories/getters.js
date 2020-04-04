export function categories(state) {
  const categoriesOrdered = {};

  const keys = Object.keys(state.categories);

  keys.sort((a, b) => {
    const categoryAProp = state.categories[a].name;
    const categoryBProp = state.categories[b].name;

    let result = 0;

    if (categoryAProp > categoryBProp) {
      result = 1;
    } else if (categoryAProp < categoryBProp) {
      result = -1;
    }

    return result;
  });

  keys.forEach((key) => {
    categoriesOrdered[key] = state.categories[key];
  });

  return categoriesOrdered;
}
