<template>
  <q-page padding>
    <h6>No data.</h6>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('expenses', ['years', 'months']),
  },
  created() {
    // This redirects the user to the months with the last expense.
    if (this.years && this.years.length > 0) {
      const months = this.months(this.years[0]);
      if (months && months.length > 0) {
        const month = months[months.length - 1];
        this.$router.push(`/expenses/${this.years[0]}/${month}`).catch(() => { });
      }
    }
  },
};
</script>
