<template>
  <scroll-page
    title="Categories"
    actionName="Add new category"
    v-model:actionModel="showAddCategory"
  >
    <category-list :categories="categories" v-if="categories.length" />

    <no-resource-banner v-else>
      There is no category yet. Add a first category to sort your expenses.
    </no-resource-banner>

    <app-dialog v-model:showDialog="showAddCategory">
      <add-category @close="showAddCategory = false" />
    </app-dialog>
  </scroll-page>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import CategoryList from 'src/components/Categories/List/CategoryList';
import AddCategory from 'src/components/Categories/Modals/AddCategory';

export default {
  mixins: [mixinPage],
  data() {
    return {
      showAddCategory: false,
    };
  },
  components: {
    CategoryList,
    AddCategory,
  },
  computed: {
    ...mapGetters('categories', ['categories']),
  },
};
</script>
