<template>
  <q-list bordered separator>
    <category-list-item
      v-for="category in categories"
      :key="category.id"
      :category="category"
    />
  </q-list>
</template>

<script>
import CategoryListItem from 'src/components/Categories/List/CategoryListItem.vue';

export default {
  props: ['categories'],
  components: {
    CategoryListItem,
  },
};
</script>
