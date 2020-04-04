export function orderObjectByProp(obj, prop) {
  const objectOrdered = {};

  const keys = Object.keys(obj);

  keys.sort((a, b) => {
    const aProp = obj[a][prop];
    const bProp = obj[b][prop];

    let result = 0;

    if (aProp > bProp) {
      result = 1;
    } else if (aProp < bProp) {
      result = -1;
    }

    return result;
  });

  keys.forEach((key) => {
    objectOrdered[key] = obj[key];
  });

  return objectOrdered;
}
