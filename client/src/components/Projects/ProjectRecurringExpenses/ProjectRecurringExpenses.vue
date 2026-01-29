<template>
  <div>
    <big-title-with-button
      buttonLabel="Add recurring expense"
      buttonIcon="autorenew"
      @click="showAddProjectRecurringExpense = true"
    >
      Recurring expenses
    </big-title-with-button>

    <project-recurring-expense-list v-if="project.recurringExpenses.length" :recurringExpenses="project.recurringExpenses" :project="project" />

    <no-resource-banner
        v-else
        class="q-mb-xl"
      >
        There is no recurring expense in this project. Add a new recurring expense and it will show up here.
    </no-resource-banner>

    <app-dialog v-model:showDialog="showAddProjectRecurringExpense">
      <add-project-recurring-expense
        @close="showAddProjectRecurringExpense = false"
        :project="project"
      />
    </app-dialog>
  </div>
</template>

<script>
import AppDialog from 'src/components/Shared/Dialog/Dialog.vue';
import BigTitleWithButton from '../../Shared/Titles/BigTitleWithButton.vue';
import ProjectRecurringExpenseList from '../List/ProjectRecurringExpenseList.vue';
import AddProjectRecurringExpense from '../Modals/AddProjectRecurringExpense.vue';
import NoResourceBanner from 'src/components/Shared/Banners/NoResourceBanner.vue';

export default {
  props: ['project'],
  components: {
    AppDialog,
    BigTitleWithButton,
    ProjectRecurringExpenseList,
    AddProjectRecurringExpense,
    NoResourceBanner
  },
  data() {
    return {
      showAddProjectRecurringExpense: false,
    };
  },
};
</script>
