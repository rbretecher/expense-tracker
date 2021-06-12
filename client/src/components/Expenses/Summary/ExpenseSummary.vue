<template>
  <q-list bordered separator>
    <expense-summary-item
      v-for="expenseSummary in expenseSummaryPerUser"
      :key="expenseSummary.user.id"
      :expenseSummary="expenseSummary"
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

      this.users.forEach((user) => {
        expensesPerUser[user.id] = {
          user,
          paid: 0,
          shouldHavePaid: 0,
        };

        totalWeight += user.weight;
      });

      this.expenses.forEach((expense) => {
        // Ensure the referenced user exists.
        if (expensesPerUser[expense.paidByUserId]) {
          const price = parseFloat(expense.price, 10);
          expensesPerUser[expense.paidByUserId].paid += price;

          Object.keys(expensesPerUser).forEach((userId) => {
            const shouldHavePaid = (price / totalWeight) * expensesPerUser[userId].user.weight;
            expensesPerUser[userId].shouldHavePaid += shouldHavePaid;
          });
        }
      });

      return expensesPerUser;
    },
  },
};
</script>
