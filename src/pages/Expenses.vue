<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">

      <q-scroll-area class="q-scroll-area-expenses">

        <h5>Expenses</h5>
        <expense-list :expenses="expenses" />

        <h5>Summary</h5>
        <expense-summary :expenses="expenses" />
      </q-scroll-area>

      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          @click="showAddExpense = true"
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
        <add-expense @close="showAddExpense = false" />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import AddExpense from 'src/components/Expenses/Modals/AddExpense';
import ExpenseList from 'src/components/Expenses/List/ExpenseList';
import ExpenseSummary from 'src/components/Expenses/Summary/ExpenseSummary';

export default {
  data() {
    return {
      showAddExpense: false,
    };
  },
  computed: {
    ...mapGetters('expenses', ['expensesInMonthSortedByDate']),
    expenses() {
      return this.expensesInMonthSortedByDate(this.$route.params.year, this.$route.params.month);
    },
  },
  components: {
    AddExpense,
    ExpenseList,
    ExpenseSummary,
  },
};
</script>

<style scoped>
.q-scroll-area-expenses {
  display: flex;
  flex-grow: 1;
}
</style>
