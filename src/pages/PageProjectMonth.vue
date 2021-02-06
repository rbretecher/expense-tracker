<template>
  <div>
    <page-spinner v-if="!currentProjectMonth" />

    <scroll-page
      v-else
      title="Expenses"
      actionName="Add new expense"
      :actionModel.sync="showAddExpense"
    >
      <template v-slot:breadcrumbs>
        <project-breadcrumbs :project="currentProjectMonth" :month="month" />
      </template>

      <div v-if="currentProjectMonth.expenses.length" class="q-mb-xl">
        <expense-list
          :projectId="projectId"
          :month="month"
          :expenses="currentProjectMonth.expenses"
          class="q-mb-xl"
        />

        <big-title>Summary</big-title>
        <expense-summary
          :users="currentProjectMonth.users"
          :expenses="currentProjectMonth.expenses"
        />
      </div>

      <no-resource-banner :showAddExpense.sync="showAddExpense" v-else>
        There is no expense in this month. Add a new expense and it will show up
        here.
      </no-resource-banner>

      <app-dialog :showDialog.sync="showAddExpense">
        <add-expense @save="handleAddExpense" :projectId="projectId" />
      </app-dialog>
    </scroll-page>
  </div>
</template>

<script>
import { Loading, Notify } from 'quasar';
import { mapActions, mapState } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import AddExpense from 'src/components/Expenses/Modals/AddExpense';
import ExpenseList from 'src/components/Expenses/List/ExpenseList';
import ExpenseSummary from 'src/components/Expenses/Summary/ExpenseSummary';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';
import ProjectBreadcrumbs from 'src/components/Projects/ProjectBreadcrumbs';

export default {
  mixins: [mixinPage],
  props: ['projectId', 'month'],
  data() {
    return {
      showAddExpense: false,
    };
  },
  computed: {
    ...mapState('projects', ['currentProjectMonth']),
  },
  methods: {
    ...mapActions('expenses', ['addExpense']),
    ...mapActions('projects', ['loadProjects', 'loadProjectMonth', 'resetCurrentProjectMonth']),
    async handleAddExpense(expense) {
      try {
        Loading.show();
        await this.addExpense(expense);
        await this.loadProjectMonth({ projectId: this.projectId, month: this.month });
        await this.loadProjects();
        Loading.hide();
        this.showAddExpense = false;
        Notify.create('Expense added!');
      } catch (e) {
        showErrorMessageWithTitle('Could not create expense', e.message);
      }
    },
  },
  components: {
    AddExpense,
    ExpenseList,
    ExpenseSummary,
    ProjectBreadcrumbs,
  },
  watch: {
    projectId: {
      immediate: true,
      handler() {
        this.resetCurrentProjectMonth();
        this.loadProjectMonth({ projectId: parseInt(this.projectId, 10), month: this.month });
      },
    },
  },
};
</script>
