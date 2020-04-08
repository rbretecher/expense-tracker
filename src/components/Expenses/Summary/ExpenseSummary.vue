<template>
  <q-list
    bordered
    separator
  >
    <expense-summary-item
      v-for="(expenseSummary, key) in expenseSummaryPerUser"
      :key="key"
      :expenseSummary="expenseSummary"
    />
  </q-list>
</template>

<script>
import { mapState } from 'vuex';
import ExpenseSummaryItem from 'src/components/Expenses/Summary/ExpenseSummaryItem';

export default {
  props: ['expenses'],
  components: {
    ExpenseSummaryItem,
  },
  computed: {
    ...mapState('users', ['users']),
    expenseSummaryPerUser() {
      const expensesPerUser = {};
      let totalWeight = 0;

      Object.keys(this.users).forEach((key) => {
        expensesPerUser[key] = {
          user: key,
          paid: 0,
          shouldHavePaid: 0,
        };

        totalWeight += this.users[key].settings.weight;
      });

      Object.keys(this.expenses).forEach((key) => {
        const expense = this.expenses[key];

        // Ensure the referenced user exists.
        if (expensesPerUser[expense.paidBy]) {
          const price = parseFloat(expense.price, 10);
          expensesPerUser[expense.paidBy].paid += price;

          Object.keys(expensesPerUser).forEach((userId) => {
            const shouldHavePaid = (price / totalWeight) * this.users[userId].settings.weight;
            expensesPerUser[userId].shouldHavePaid += shouldHavePaid;
          });
        }
      });

      return expensesPerUser;
    },
  },
};
</script>
