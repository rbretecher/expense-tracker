import { defineBoot } from '#q-app/wrappers';
import createStore from 'src/store';

export const store = createStore();

export default defineBoot(({ app }) => {
  app.use(store);
})
