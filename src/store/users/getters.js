import { orderObjectByProp } from 'src/functions/order-object-by-prop';

export function users(state) {
  return orderObjectByProp(state.users, 'name');
}
