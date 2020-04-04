<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">

      <q-scroll-area
        class="q-scroll-area-expenses"
        v-if="Object.keys(expenses).length"
      >
        <big-title>Expenses</big-title>
        <expense-list
          :expenses="expenses"
          class="q-mb-xl"
        />

        <big-title>Summary</big-title>
        <expense-summary :expenses="expenses" />
      </q-scroll-area>

      <no-expense-banner
        :showAddExpense.sync="showAddExpense"
        v-else
      />

      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          @click="showAddExpenseDialog"
          round
          color="primary"
          size="24px"
          icon="add"
          class="all-pointer-events"
        />
      </div>

      <q-dialog
        v-model="showAddExpense"
        position="top"
      >
        <add-expense
          @close="showAddExpense = false"
          :year="year"
          :month="month"
        />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import AddExpense from 'src/components/Expenses/Modals/AddExpense';
import ExpenseList from 'src/components/Expenses/List/ExpenseList';
import ExpenseSummary from 'src/components/Expenses/Summary/ExpenseSummary';
import NoExpenseBanner from 'src/components/Expenses/NoExpenseBanner';
import BigTitle from 'src/components/Shared/BigTitle';

export default {
  props: ['year', 'month'],
  data() {
    return {
      showAddExpense: false,
    };
  },
  computed: {
    ...mapGetters('expenses', ['expensesInMonthSortedByDate']),
    expenses() {
      return this.expensesInMonthSortedByDate(this.year, this.month);
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
  },
};
</script>

<style scoped>
.q-scroll-area-expenses {
  display: flex;
  flex-grow: 1;
}
</style>
