<template>
  <q-list
    bordered
    separator
  >
    <expense-list-item
      v-for="(expense, key) in expenses"
      :key="key"
      :expense="expense"
      :id="key"
    />
  </q-list>
</template>

<script>
import ExpenseListItem from 'src/components/Expenses/List/ExpenseListItem';

export default {
  props: ['expenses'],
  components: {
    ExpenseListItem,
  },
};
</script>
