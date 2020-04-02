<template>
  <q-expansion-item
    :header-inset-level="0.25"
    :content-inset-level="0.5"
    icon="calendar_today"
    :label="year"
    default-opened
    caption="X expenses"
  >
    <q-list>
      <month-item
        v-for="month in months(year)"
        :key="month"
        :year="year"
        :month="month"
      />
    </q-list>
  </q-expansion-item>
</template>

<script>
import { mapGetters } from 'vuex';
import MonthItem from 'components/Menu/Expenses/MonthItem';

export default {
  props: ['year'],
  components: {
    MonthItem,
  },
  computed: {
    ...mapGetters('expenses', ['months']),
  },
};
</script>
