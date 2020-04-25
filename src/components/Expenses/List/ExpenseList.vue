<template>
  <q-list
    bordered
    separator
  >
    <expense-list-item
      v-for="(expense, key) in expenses"
      :key="key"
      :id="key"
      :expense="expense"
      :collectionId="collectionId"
      :collection="collection"
    />

    <expense-list-item-total
      :count="count"
      :amount="amount"
    />
  </q-list>
</template>

<script>
import ExpenseListItem from 'src/components/Expenses/List/ExpenseListItem';
import ExpenseListItemTotal from 'src/components/Expenses/List/ExpenseListItemTotal';

export default {
  props: ['collectionId', 'collection', 'expenses'],
  components: {
    ExpenseListItem,
    ExpenseListItemTotal,
  },
  computed: {
    count() {
      return Object.keys(this.expenses).length;
    },
    amount() {
      return Object
        .keys(this.expenses)
        .reduce((acc, key) => acc + parseFloat(this.expenses[key].price, 10), 0);
    },
  },
};
</script>
