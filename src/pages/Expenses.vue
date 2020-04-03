<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">

      <h5>Expenses</h5>

      <q-scroll-area class="q-scroll-area-expenses">
        <q-list
          bordered
          separator
          v-for="(expense, key) in expenses"
          :key="key"
          class="q-mb-sm"
        >
          <expense-item
            :expense="expense"
            :id="key"
          />
        </q-list>

        <q-separator />

        <h6 class="float-right">Total : {{ totalAmount }}€</h6>
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
import ExpenseItem from 'src/components/Expenses/ExpenseItem';
import AddExpense from 'src/components/Expenses/Modals/AddExpense';

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
    totalAmount() {
      let total = 0;
      Object.keys(this.expenses).forEach((key) => {
        total += parseInt(this.expenses[key].price, 10);
      });
      return total;
    },
  },
  components: {
    AddExpense,
    ExpenseItem,
  },
};
</script>

<style scoped>
.q-scroll-area-expenses {
  display: flex;
  flex-grow: 1;
}
</style>
