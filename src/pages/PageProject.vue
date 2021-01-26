<template>
  <div>
    <page-spinner v-if="!currentProject" />

    <scroll-page
      v-else
      title="Expenses"
      actionName="Add new expense"
      :actionModel.sync="showAddExpense"
    >
      <div
        v-if="currentProject.expenses.length"
        class="q-mb-xl"
      >
        <expense-list
          :projectId="projectId"
          :expenses="currentProject.expenses"
          class="q-mb-xl"
        />

        <big-title>Summary</big-title>
        <expense-summary
          :users="currentProject.users"
          :expenses="currentProject.expenses"
        />
      </div>

      <no-resource-banner
        :showAddExpense.sync="showAddExpense"
        v-else
      >
        There is no expense in this project. Add a new expense and it will show up here.
      </no-resource-banner>

      <app-dialog :showDialog.sync="showAddExpense">
        <add-expense
          @close="showAddExpense = false"
          :projectId="projectId"
        />
      </app-dialog>
    </scroll-page>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import AddExpense from 'src/components/Expenses/Modals/AddExpense';
import ExpenseList from 'src/components/Expenses/List/ExpenseList';
import ExpenseSummary from 'src/components/Expenses/Summary/ExpenseSummary';

export default {
  mixins: [mixinPage],
  props: ['projectIdParam'],
  data() {
    return {
      showAddExpense: false,
    };
  },
  computed: {
    ...mapState('projects', ['currentProject']),
    projectId() {
      return parseInt(this.projectIdParam, 10);
    },
  },
  methods: {
    ...mapActions('projects', ['loadProject', 'resetCurrentProject']),
    showAddExpenseDialog() {
      this.showAddExpense = true;
    },
  },
  components: {
    AddExpense,
    ExpenseList,
    ExpenseSummary,
  },
  watch: {
    projectId() {
      this.resetCurrentProject();

      this.loadProject(this.projectId);
    },
  },
  mounted() {
    this.loadProject(this.projectId);
  },
  destroyed() {
    this.resetCurrentProject();
  },
};
</script>
