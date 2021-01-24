<template>
  <q-list>
    <menu-item
      to="/"
      icon="dashboard"
      label="Dashboard"
    />

    <q-expansion-item
      v-if="collections.length"
      expand-separator
      icon="euro_symbol"
      label="Expenses"
      caption="Manage your expenses"
      default-opened
    >
      <collection-item
        v-for="collection in collections"
        :key="collection.id"
        :collection="collection"
      />
    </q-expansion-item>

    <menu-item
      to="/collections"
      icon="account_tree"
      label="Collections"
      caption="Organize your expenses"
    />

    <menu-item
      v-if="currentUser.admin"
      to="/categories"
      icon="category"
      label="Categories"
      caption="Sort your expenses by category"
    />

    <menu-item
      v-if="currentUser.admin"
      to="/users"
      icon="account_circle"
      label="Users"
      caption="Manage users to split the bill"
    />

  </q-list>
</template>

<script>
import { mapState } from 'vuex';
import CollectionItem from 'components/Layout/Menu/Expenses/CollectionItem';
import MenuItem from 'components/Layout/Menu/MenuItem';

export default {
  components: {
    CollectionItem,
    MenuItem,
  },
  computed: {
    ...mapState('users', ['currentUser']),
    ...mapState('collections', ['collections']),
  },
};
</script>

<style lang="scss">
.q-item__section--avatar .q-icon {
  color: $primary;
}

.q-drawer__content
  > .q-list
  > .q-expansion-item
  > .q-expansion-item__container
  > .q-expansion-item__content {
  padding-left: 15px;
}
</style>
