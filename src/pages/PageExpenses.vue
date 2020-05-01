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
        v-if="Object.keys(expensesSortedByDate).length"
        class="q-mb-xl"
      >
        <expense-list
          :collectionId="collectionId"
          :expenses="expensesSortedByDate"
          class="q-mb-xl"
        />

        <big-title>Summary</big-title>
        <expense-summary
          :users="currentCollectionUsers"
          :expenses="expensesSortedByDate"
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
import { mapGetters, mapActions } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import AddExpense from 'src/components/Expenses/Modals/AddExpense';
import ExpenseList from 'src/components/Expenses/List/ExpenseList';
import ExpenseSummary from 'src/components/Expenses/Summary/ExpenseSummary';

export default {
  mixins: [mixinPage],
  props: ['collectionId'],
  data() {
    return {
      showAddExpense: false,
    };
  },
  computed: {
    ...mapGetters('app', ['expensePageReady']),
    ...mapGetters('expenses', ['expensesSortedByDate']),
    ...mapGetters('users', ['currentCollectionUsers']),
  },
  methods: {
    ...mapActions('app', ['resetExpensePage']),
    ...mapActions('expenses', ['loadExpenses']),
    ...mapActions('users', ['loadUsersFromCollection']),
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
      this.loadUsersFromCollection(this.collectionId);
    },
  },
  mounted() {
    this.loadExpenses(this.collectionId);
    this.loadUsersFromCollection(this.collectionId);
  },
  destroyed() {
    this.resetExpensePage();
  },
};
</script>
