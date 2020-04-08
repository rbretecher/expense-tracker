<template>
  <scroll-page>
    <big-title>Dashboard</big-title>

    <div class="dashboard-item-list">

      <dashboard-item icon="euro_symbol">
        {{ expenseCount }} expenses
      </dashboard-item>

      <dashboard-item icon="account_tree">
        {{ Object.keys(collections).length }} collection
      </dashboard-item>

      <dashboard-item icon="category">
        {{ Object.keys(categories).length }} categories
      </dashboard-item>

      <dashboard-item icon="account_circle">
        {{ Object.keys(users).length }} users
      </dashboard-item>
    </div>
  </scroll-page>
</template>

<script>
import { mapState } from 'vuex';
import ScrollPage from 'src/components/Shared/ScrollPage';
import BigTitle from 'src/components/Shared/BigTitle';
import DashboardItem from 'src/components/Dashboard/DashboardItem';

export default {
  components: {
    ScrollPage,
    BigTitle,
    DashboardItem,
  },
  computed: {
    ...mapState('users', ['users']),
    ...mapState('collections', ['collections']),
    ...mapState('categories', ['categories']),
    expenseCount() {
      return Object
        .keys(this.collections)
        .filter((key) => !this.collections[key].collection)
        .reduce((acc, currentKey) => acc + this.collections[currentKey].count, 0);
    },
  },
};
</script>

<style>
.dashboard-item-list > * {
  margin: 10px 0;
}
</style>
