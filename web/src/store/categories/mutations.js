import Vue from 'vue';

export function setCategories(state, categories) {
  Vue.set(state, 'categories', categories);
}
