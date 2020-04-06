<template>
  <scroll-page>
    <div
      v-if="Object.keys(expenses).length"
      class="q-mb-xl"
    >
      <q-btn
        unelevated
        outline
        icon="add_circle"
        type="submit"
        color="primary"
        label="Add new expense"
        class="absolute-top-right q-mt-sm"
        @click="showAddExpense = true"
      />
      <big-title>Expenses</big-title>
      <expense-list
        :collectionId="collectionId"
        :expenses="expenses"
        class="q-mb-xl"
      />

      <big-title>Summary</big-title>
      <expense-summary :expenses="expenses" />
    </div>

    <no-expense-banner
      :showAddExpense.sync="showAddExpense"
      v-else
    />

    <q-dialog
      v-model="showAddExpense"
      position="top"
      no-refocus
    >
      <add-expense
        @close="showAddExpense = false"
        :collectionId="collectionId"
      />
    </q-dialog>
  </scroll-page>
</template>

<script>
import { mapGetters } from 'vuex';
import AddExpense from 'src/components/Expenses/Modals/AddExpense';
import ExpenseList from 'src/components/Expenses/List/ExpenseList';
import ExpenseSummary from 'src/components/Expenses/Summary/ExpenseSummary';
import NoExpenseBanner from 'src/components/Expenses/NoExpenseBanner';
import BigTitle from 'src/components/Shared/BigTitle';
import ScrollPage from 'src/components/Shared/ScrollPage';

export default {
  props: ['collectionId'],
  data() {
    return {
      showAddExpense: false,
    };
  },
  computed: {
    ...mapGetters('expenses', ['expensesSortedByDate']),
    expenses() {
      return this.expensesSortedByDate(this.collectionId);
    },
  },
  methods: {
    showAddExpenseDialog() {
      this.showAddExpense = true;
    },
  },
  components: {
    AddExpense,
    ExpenseList,
    ExpenseSummary,
    NoExpenseBanner,
    BigTitle,
    ScrollPage,
  },
};
</script>

<style scoped>
.q-scroll-area-expenses {
  display: flex;
  flex-grow: 1;
}
</style>
