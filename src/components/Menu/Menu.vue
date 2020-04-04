<template>
  <q-list>
    <q-item-label
      header
      class="text-grey-8"
    >
      Navigation
    </q-item-label>

    <q-expansion-item
      expand-separator
      icon="euro_symbol"
      label="Expenses"
      caption="Manage your expenses"
      default-opened
    >
      <year-item
        v-for="year in years"
        :key="year"
        :year="year"
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
import YearItem from 'components/Menu/Expenses/YearItem';
import MenuItem from 'components/Menu/MenuItem';

export default {
  components: {
    YearItem,
    MenuItem,
  },
  computed: {
    ...mapGetters('expenses', ['years']),
  },
};
</script>
