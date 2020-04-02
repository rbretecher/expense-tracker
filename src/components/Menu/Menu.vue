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
  </q-list>
</template>

<script>
import { mapGetters } from 'vuex';
import YearItem from 'components/Menu/Expenses/YearItem';

export default {
  components: {
    YearItem,
  },
  computed: {
    ...mapGetters('expenses', ['years']),
  },
};
</script>
