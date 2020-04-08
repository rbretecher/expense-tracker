<template>
  <q-item
    clickable
    v-ripple
    @click="showEditExpense = true"
  >
    <q-item-section avatar>
      <q-icon
        :name="categoryIcon"
        color="green"
      />

    </q-item-section>

    <q-item-section>
      <q-item-label>{{ expense.name }}</q-item-label>
      <q-item-label caption>Paid by {{ paidByName }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label>{{ expense.price | formatPrice }}</q-item-label>
      <q-item-label caption>{{ expense.date | formatDate }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="confirmDeleteExpense"
          flat
          round
          dense
          color="red-5"
          icon="delete"
        />
      </div>
    </q-item-section>

    <q-dialog
      v-model="showEditExpense"
      position="top"
      no-refocus
    >
      <edit-expense
        :id="id"
        :expense="expense"
        :collectionId="collectionId"
        @close="showEditExpense = false"
      />
    </q-dialog>
  </q-item>
</template>

<script>
import { date } from 'quasar';
import { mapState, mapActions } from 'vuex';
import EditExpense from 'src/components/Expenses/Modals/EditExpense';
import mixinPrice from 'src/mixins/mixin-price';

export default {
  mixins: [mixinPrice],
  props: ['id', 'expense', 'collectionId'],
  data() {
    return {
      showEditExpense: false,
    };
  },
  computed: {
    ...mapState('users', ['users']),
    ...mapState('categories', ['categories']),
    paidByName() {
      if (!this.users[this.expense.paidBy]) {
        return 'Unknown';
      }
      return this.users[this.expense.paidBy].name;
    },
    categoryIcon() {
      if (!this.categories[this.expense.category]) {
        return 'help_outline';
      }
      return this.categories[this.expense.category].icon;
    },
  },
  components: {
    EditExpense,
  },
  filters: {
    formatDate(value) {
      return date.formatDate(value, 'DD/MM/YYYY');
    },
  },
  methods: {
    ...mapActions('expenses', ['deleteExpense']),
    confirmDeleteExpense() {
      this.$q.dialog({
        icon: 'delete',
        title: 'Delete expense',
        message: 'Are you sure you want to delete this expense ?',
        ok: true,
        cancel: true,
      }).onOk(() => {
        this.deleteExpense({
          id: this.id,
          collectionId: this.collectionId,
        });
      });
    },
  },
};
</script>
