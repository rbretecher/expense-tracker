<template>
  <div class="relative-position">
    <q-page v-if="!expensePageReady">
      <q-inner-loading :showing="!expensePageReady">
        <q-spinner
          color="primary"
          size="3em"
          :thickness="10"
        />
      </q-inner-loading>
    </q-page>

    <scroll-page
      v-else
      title="Expenses"
      actionName="Add new expense"
      :actionModel.sync="showAddExpense"
    >
      <div
        v-if="Object.keys(expenses).length"
        class="q-mb-xl"
      >
        <expense-list
          :collectionId="collectionId"
          :collection="currentCollection"
          :expenses="expenses"
          class="q-mb-xl"
        />

        <big-title>Summary</big-title>
        <expense-summary
          :collection="currentCollection"
          :expenses="expenses"
        />
      </div>

      <no-resource-banner
        :showAddExpense.sync="showAddExpense"
        v-else
      >
        There is no expense in this collection. Add a new expense and it will show up here.
      </no-resource-banner>

      <app-dialog :showDialog.sync="showAddExpense">
        <add-expense
          @close="showAddExpense = false"
          :collectionId="collectionId"
          :collection="currentCollection"
        />
      </app-dialog>
    </scroll-page>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import AddExpense from 'src/components/Expenses/Modals/AddExpense';
import ExpenseList from 'src/components/Expenses/List/ExpenseList';
import ExpenseSummary from 'src/components/Expenses/Summary/ExpenseSummary';

export default {
  mixins: [mixinPage],
  props: ['collectionId'],
  data() {
    return {
      showAddExpense: false,
    };
  },
  computed: {
    ...mapState('collections', ['currentCollection']),
    ...mapGetters('app', ['expensePageReady']),
    ...mapGetters('expenses', ['expensesSortedByDate']),
    expenses() {
      return this.expensesSortedByDate;
    },
  },
  methods: {
    ...mapActions('app', ['loadCollectionAndExpenses']),
    showAddExpenseDialog() {
      this.showAddExpense = true;
    },
  },
  components: {
    AddExpense,
    ExpenseList,
    ExpenseSummary,
  },
  watch: {
    collectionId() {
      this.loadCollectionAndExpenses(this.collectionId);
    },
  },
  mounted() {
    this.loadCollectionAndExpenses(this.collectionId);
  },
};
</script>

<style scoped>
.q-scroll-area-expenses {
  display: flex;
  flex-grow: 1;
}
</style>
