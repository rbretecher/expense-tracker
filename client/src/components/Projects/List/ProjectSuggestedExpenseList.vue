<template>
  <q-list bordered separator>
    <project-suggested-expense-list-item
      v-for="suggestedExpense in suggestedExpenses"
      :key="suggestedExpense.id"
      :suggestedExpense="suggestedExpense"
      :project="project"
      :month="month"
    />
  </q-list>
</template>

<script>
import ProjectSuggestedExpenseListItem from './ProjectSuggestedExpenseListItem.vue';

export default {
  name: 'ProjectSuggestedExpenseList',
  props: ['suggestedExpenses', 'project', 'month'],
  components: {
    ProjectSuggestedExpenseListItem,
  },
};
</script>