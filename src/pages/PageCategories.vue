<template>
  <scroll-page>
    <big-title>Categories</big-title>
    <category-list :categories="categories" />
  </scroll-page>
</template>

<script>
import { mapGetters } from 'vuex';
import ScrollPage from 'src/components/Shared/ScrollPage';
import BigTitle from 'src/components/Shared/BigTitle';
import CategoryList from 'src/components/Categories/List/CategoryList';

export default {
  components: {
    ScrollPage,
    BigTitle,
    CategoryList,
  },
  computed: {
    ...mapGetters('categories', ['categories']),
  },
};
</script>
