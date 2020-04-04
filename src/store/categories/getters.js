import { orderObjectByProp } from 'src/functions/order-object-by-prop';

export function categories(state) {
  return orderObjectByProp(state.categories, 'name');
}
