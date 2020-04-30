<template>
  <q-list
    bordered
    separator
  >
    <expense-summary-item
      v-for="(expenseSummary, key) in expenseSummaryPerUser"
      :key="key"
      :expenseSummary="expenseSummary"
      :user="users[key]"
    />
  </q-list>
</template>

<script>
import ExpenseSummaryItem from 'src/components/Expenses/Summary/ExpenseSummaryItem';

export default {
  props: ['users', 'expenses'],
  components: {
    ExpenseSummaryItem,
  },
  computed: {
    expenseSummaryPerUser() {
      const expensesPerUser = {};
      let totalWeight = 0;

      Object.keys(this.users).forEach((key) => {
        expensesPerUser[key] = {
          user: key,
          paid: 0,
          shouldHavePaid: 0,
        };

        totalWeight += (this.users[key].weight || 0.5);
      });

      Object.keys(this.expenses).forEach((key) => {
        const expense = this.expenses[key];

        // Ensure the referenced user exists.
        if (expensesPerUser[expense.paidBy]) {
          const price = parseFloat(expense.price, 10);
          expensesPerUser[expense.paidBy].paid += price;

          Object.keys(expensesPerUser).forEach((userId) => {
            const shouldHavePaid = (price / totalWeight)
              * (this.users[userId].weight || 0.5);
            expensesPerUser[userId].shouldHavePaid += shouldHavePaid;
          });
        }
      });

      return expensesPerUser;
    },
  },
};
</script>
