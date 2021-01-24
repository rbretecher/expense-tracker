<template>
  <scroll-page title="Dashboard">
    <div class="dashboard-item-list">

      <dashboard-item icon="euro_symbol">
        {{ expenseCount }} expenses
      </dashboard-item>

      <dashboard-item icon="account_tree">
        {{ Object.keys(collections).length }} collections
      </dashboard-item>

      <dashboard-item icon="category">
        {{ Object.keys(categories).length }} categories
      </dashboard-item>
    </div>
  </scroll-page>
</template>

<script>
import { mapState } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import DashboardItem from 'src/components/Dashboard/DashboardItem';

export default {
  mixins: [mixinPage],
  components: {
    DashboardItem,
  },
  computed: {
    ...mapState('users', ['currentUser']),
    ...mapState('categories', ['categories']),
    ...mapState('collections', ['collections']),
    expenseCount() {
      return this.collections.reduce((acc, collection) => acc + collection.count, 0);
    },
  },
};
</script>

<style>
.dashboard-item-list > * {
  margin: 10px 0;
}
</style>
