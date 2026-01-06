<template>
  <q-list bordered separator>
    <project-recurring-expense-list-item
      v-for="recurringExpense in recurringExpenses"
      :key="recurringExpense.id"
      :recurringExpense="recurringExpense"
      :project="project"
    />
  </q-list>
</template>

<script>
import ProjectRecurringExpenseListItem from './ProjectRecurringExpenseListItem.vue';

export default {
  props: ['recurringExpenses', 'project'],
  components: {
    ProjectRecurringExpenseListItem,
  },
};
</script>
