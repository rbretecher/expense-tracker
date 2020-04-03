<template>
  <q-item
    clickable
    tag="a"
    :to="`/expenses/${year}/${month}`"
    exact
    active-class="active"
  >
    <q-item-section avatar>
      <q-badge color="primary">{{ count }}</q-badge>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ months[month] }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['year', 'month'],
  data() {
    return {
      months: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
      },
    };
  },
  computed: {
    ...mapGetters('expenses', ['expensesInMonth']),
    count() {
      return Object.keys(this.expensesInMonth(this.year, this.month)).length;
    },
  },
};
</script>

<style lang="scss">
.active {
  background: $blue-1;
}
</style>
