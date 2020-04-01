<template>
  <q-item
    clickable
    v-ripple
    @click="showEditExpense = true"
  >
    <q-item-section>{{ expense.name }}</q-item-section>
    <q-item-section side>
      <q-item-label>{{ expense.price }}€</q-item-label>
      <q-item-label caption>{{ expense.date | formatDate }}</q-item-label>
    </q-item-section>

    <q-dialog
      v-model="showEditExpense"
      position="top"
    >
      <edit-expense
        :id="id"
        :expense="expense"
        @close="showEditExpense = false"
      />
    </q-dialog>
  </q-item>
</template>

<script>
import { date } from 'quasar';
import EditExpense from 'src/components/Expenses/Modals/EditExpense';

export default {
  data() {
    return {
      showEditExpense: false,
    };
  },
  props: ['id', 'expense'],
  components: {
    EditExpense,
  },
  filters: {
    formatDate(value) {
      return date.formatDate(value, 'DD/MM/YYYY');
    },
  },
};
</script>
