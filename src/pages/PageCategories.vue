<template>
  <scroll-page>
    <q-btn
      unelevated
      outline
      icon="add_circle"
      type="submit"
      color="primary"
      label="Add new category"
      class="absolute-top-right q-mt-sm"
      @click="showAddCategory = true"
    />
    <big-title>Categories</big-title>
    <category-list :categories="categories" />

    <q-dialog
      v-model="showAddCategory"
      position="top"
      no-refocus
    >
      <add-category @close="showAddCategory = false" />
    </q-dialog>
  </scroll-page>
</template>

<script>
import { mapGetters } from 'vuex';
import ScrollPage from 'src/components/Shared/ScrollPage';
import BigTitle from 'src/components/Shared/BigTitle';
import CategoryList from 'src/components/Categories/List/CategoryList';
import AddCategory from 'src/components/Categories/Modals/AddCategory';

export default {
  data() {
    return {
      showAddCategory: false,
    };
  },
  components: {
    ScrollPage,
    BigTitle,
    CategoryList,
    AddCategory,
  },
  computed: {
    ...mapGetters('categories', ['categories']),
  },
};
</script>
