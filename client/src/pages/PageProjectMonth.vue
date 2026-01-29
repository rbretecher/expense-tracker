<template>
  <div>
    <page-spinner v-if="!currentProjectMonth" />

    <scroll-page
      v-else
      :title="formatDate(month)"
      actionName="Add new expense"
      v-model:actionModel="showAddExpense"
    >
      <template v-slot:breadcrumbs>
        <project-breadcrumbs :project="currentProjectMonth" :month="month" />
      </template>

      <div v-if="currentProjectMonth.expenses.length" class="q-mb-xl">
        <expense-list
          :projectId="projectId"
          :month="month"
          :expenses="currentProjectMonth.expenses"
          :users="currentProjectMonth.users"
          class="q-mb-xl"
        />

        <big-title>Suggested expenses</big-title>
        <project-suggested-expense-list
          v-if="currentProjectMonth.suggestedExpenses.length"
          :suggestedExpenses="currentProjectMonth.suggestedExpenses"
          :project="currentProjectMonth"
          :month="month"
          class="q-mb-xl"
        />
        <no-resource-banner class="q-mb-xl" v-else>
          There is no remaining suggested expense for this month.
        </no-resource-banner>

        <big-title>Summary</big-title>
        <expense-summary
          :users="currentProjectMonth.users"
          :expenses="currentProjectMonth.expenses"
        />
      </div>

      <no-resource-banner v-model:showAddExpense="showAddExpense" v-else>
        There is no expense in this month. Add a new expense and it will show up
        here.
      </no-resource-banner>

      <app-dialog v-model:showDialog="showAddExpense">
        <add-expense
          @save="handleAddExpense"
          :projectId="projectId"
          :users="currentProjectMonth.users"
        />
      </app-dialog>
    </scroll-page>
  </div>
</template>

<script>
import { Loading, Notify, date } from 'quasar';
import { mapActions, mapState } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import AddExpense from 'src/components/Expenses/Modals/AddExpense.vue';
import ExpenseList from 'src/components/Expenses/List/ExpenseList.vue';
import ExpenseSummary from 'src/components/Expenses/Summary/ExpenseSummary.vue';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';
import ProjectBreadcrumbs from 'src/components/Projects/ProjectBreadcrumbs.vue';
import ProjectSuggestedExpenseList from 'src/components/Projects/List/ProjectSuggestedExpenseList.vue';

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
    formatDate(value) {
      return date.formatDate(value, 'MMMM YYYY');
    },
  },
  components: {
    AddExpense,
    ExpenseList,
    ExpenseSummary,
    ProjectBreadcrumbs,
    ProjectSuggestedExpenseList,
  },
  created() {
    this.resetCurrentProjectMonth();
    this.loadProjectMonth({ projectId: this.projectId, month: this.month });
  },
  watch: {
    month() {
      this.resetCurrentProjectMonth();
      this.loadProjectMonth({ projectId: this.projectId, month: this.month });
    },
  },
};
</script>
