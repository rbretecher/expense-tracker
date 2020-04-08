<template>
  <div class="relative-position">
    <q-page v-if="!expensesLoaded">
      <q-inner-loading :showing="!expensesLoaded">
        <q-spinner
          color="primary"
          size="3em"
          :thickness="10"
        />
      </q-inner-loading>
    </q-page>

    <scroll-page v-else>

      <right-side-button
        label="Add new expense"
        icon="add_circle"
        @click="showAddExpense = true"
      />

      <big-title>Expenses</big-title>

      <div
        v-if="Object.keys(expenses).length"
        class="q-mb-xl"
      >
        <expense-list
          :collectionId="collectionId"
          :expenses="expenses"
          class="q-mb-xl"
        />

        <big-title>Summary</big-title>
        <expense-summary :expenses="expenses" />
      </div>

      <no-resource-banner
        :showAddExpense.sync="showAddExpense"
        v-else
      >
        There is no expense in this collection. Add a new expense and it will show up here.
      </no-resource-banner>

      <q-dialog
        v-model="showAddExpense"
        position="top"
        no-refocus
      >
        <add-expense
          @close="showAddExpense = false"
          :collectionId="collectionId"
        />
      </q-dialog>
    </scroll-page>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import AddExpense from 'src/components/Expenses/Modals/AddExpense';
import ExpenseList from 'src/components/Expenses/List/ExpenseList';
import ExpenseSummary from 'src/components/Expenses/Summary/ExpenseSummary';
import NoResourceBanner from 'src/components/Shared/Banners/NoResourceBanner';
import BigTitle from 'src/components/Shared/BigTitle';
import ScrollPage from 'src/components/Shared/ScrollPage';
import RightSideButton from 'src/components/Shared/Buttons/RightSideButton';

export default {
  props: ['collectionId'],
  data() {
    return {
      showAddExpense: false,
    };
  },
  computed: {
    ...mapState('app', ['expensesLoaded']),
    ...mapGetters('expenses', ['expensesSortedByDate']),
    expenses() {
      return this.expensesSortedByDate;
    },
  },
  methods: {
    ...mapActions('app', ['loadExpenseData']),
    showAddExpenseDialog() {
      this.showAddExpense = true;
    },
  },
  components: {
    AddExpense,
    ExpenseList,
    ExpenseSummary,
    NoResourceBanner,
    BigTitle,
    ScrollPage,
    RightSideButton,
  },
  watch: {
    collectionId() {
      this.loadExpenseData(this.collectionId);
    },
  },
  mounted() {
    this.loadExpenseData(this.collectionId);
  },
};
</script>

<style scoped>
.q-scroll-area-expenses {
  display: flex;
  flex-grow: 1;
}
</style>
