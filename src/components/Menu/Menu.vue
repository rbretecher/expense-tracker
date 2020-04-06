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
      to="/categories"
      icon="category"
      label="Categories"
    />

    <menu-item
      to="/users"
      icon="account_circle"
      label="Users"
    />

  </q-list>
</template>

<script>
import { mapGetters } from 'vuex';
import CollectionItem from 'components/Menu/Expenses/CollectionItem';
import MenuItem from 'components/Menu/MenuItem';

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
</style>
