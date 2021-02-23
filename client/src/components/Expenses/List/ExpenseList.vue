<template>
  <q-list bordered separator>
    <expense-list-item
      v-for="expense in expenses"
      :key="expense.id"
      :expense="expense"
      :month="month"
      :projectId="projectId"
      :users="users"
    />

    <expense-list-item-total :count="count" :amount="amount" />
  </q-list>
</template>

<script>
import ExpenseListItem from 'src/components/Expenses/List/ExpenseListItem';
import ExpenseListItemTotal from 'src/components/Expenses/List/ExpenseListItemTotal';

export default {
  props: ['projectId', 'month', 'expenses', 'users'],
  components: {
    ExpenseListItem,
    ExpenseListItemTotal,
  },
  computed: {
    count() {
      return this.expenses.length;
    },
    amount() {
      return Object
        .keys(this.expenses)
        .reduce((acc, key) => acc + parseFloat(this.expenses[key].price, 10), 0);
    },
  },
};
</script>
