<template>
  <q-list>
    <menu-item
      to="/"
      icon="dashboard"
      label="Dashboard"
    />

    <q-expansion-item
      expand-separator
      icon="euro_symbol"
      label="Expenses"
      caption="Manage your expenses"
      default-opened
    >
      <collection-item
        v-for="(collection, key) in rootCollections"
        :key="key"
        :id="key"
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
      to="/categories"
      icon="category"
      label="Categories"
      caption="Sort your expenses by category"
    />

    <menu-item
      to="/users"
      icon="account_circle"
      label="Users"
      caption="Manage users to split the bill"
    />

  </q-list>
</template>

<script>
import { mapGetters } from 'vuex';
import CollectionItem from 'components/Layout/Menu/Expenses/CollectionItem';
import MenuItem from 'components/Layout/Menu/MenuItem';

export default {
  components: {
    CollectionItem,
    MenuItem,
  },
  computed: {
    ...mapGetters('collections', ['rootCollections']),
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
