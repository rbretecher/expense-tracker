<template>
  <div>
    <page-spinner v-if="!expensePageReady" />

    <scroll-page
      v-else
      title="Expenses"
      actionName="Add new expense"
      :actionModel.sync="showAddExpense"
    >
      <div
        v-if="expenses.length"
        class="q-mb-xl"
      >
        <expense-list
          :collectionId="collectionId"
          :expenses="expenses"
          class="q-mb-xl"
        />

        <big-title>Summary</big-title>
        <expense-summary
          :users="users"
          :expenses="expenses"
        />
      </div>

      <no-resource-banner
        :showAddExpense.sync="showAddExpense"
        v-else
      >
        There is no expense in this collection. Add a new expense and it will show up here.
      </no-resource-banner>

      <app-dialog :showDialog.sync="showAddExpense">
        <add-expense
          @close="showAddExpense = false"
          :collectionId="collectionId"
        />
      </app-dialog>
    </scroll-page>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import AddExpense from 'src/components/Expenses/Modals/AddExpense';
import ExpenseList from 'src/components/Expenses/List/ExpenseList';
import ExpenseSummary from 'src/components/Expenses/Summary/ExpenseSummary';

export default {
  mixins: [mixinPage],
  props: ['collectionIdParam'],
  data() {
    return {
      showAddExpense: false,
    };
  },
  computed: {
    ...mapGetters('app', ['expensePageReady']),
    ...mapGetters('expenses', ['expenses']),
    ...mapState('users', ['users']),
    collectionId() {
      return parseInt(this.collectionIdParam, 10);
    },
  },
  methods: {
    ...mapActions('app', ['resetExpensePage']),
    ...mapActions('expenses', ['loadExpenses']),
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
    collectionId() {
      this.resetExpensePage();

      this.loadExpenses(this.collectionId);
    },
  },
  mounted() {
    this.loadExpenses(this.collectionId);
  },
  destroyed() {
    this.resetExpensePage();
  },
};
</script>
