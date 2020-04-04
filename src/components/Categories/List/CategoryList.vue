<template>
  <q-list
    bordered
    separator
  >
    <category-list-item
      v-for="(category, key) in categories"
      :key="key"
      :id="key"
      :category="category"
    />
  </q-list>
</template>

<script>
import CategoryListItem from 'src/components/Categories/List/CategoryListItem';

export default {
  props: ['categories'],
  components: {
    CategoryListItem,
  },
};
</script>
