<template>
  <scroll-page>
    <right-side-button
      label="Add new category"
      icon="add_circle"
      @click="showAddCategory = true"
    />

    <big-title>Categories</big-title>

    <category-list
      :categories="categories"
      v-if="Object.keys(categories).length"
    />

    <no-resource-banner v-else>
      There is no category yet. Add a first category to sort your expenses.
    </no-resource-banner>

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
import NoResourceBanner from 'src/components/Shared/Banners/NoResourceBanner';
import RightSideButton from 'src/components/Shared/Buttons/RightSideButton';

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
    NoResourceBanner,
    RightSideButton,
  },
  computed: {
    ...mapGetters('categories', ['categories']),
  },
};
</script>
