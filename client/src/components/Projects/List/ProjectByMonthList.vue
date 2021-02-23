<template>
  <q-list bordered separator>
    <project-by-month-list-item
      v-for="month in expensesByMonth"
      :key="month.month"
      :month="month"
      :projectId="projectId"
    ></project-by-month-list-item>
  </q-list>
</template>

<script>
import ProjectByMonthListItem from './ProjectByMonthListItem.vue';

export default {
  props: ['projectId', 'expensesByMonth'],
  components: {
    ProjectByMonthListItem,
  },
};
</script>
