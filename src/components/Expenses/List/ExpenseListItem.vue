<template>
  <q-item
    clickable
    v-ripple
    @click="showEditExpense = true"
  >
    <q-item-section avatar>
      <q-icon
        :name="category.iconName"
        :color="category.iconColor"
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

    <app-dialog :showDialog.sync="showEditExpense">
      <edit-expense
        :expense="expense"
        :collectionId="collectionId"
        @close="showEditExpense = false"
      />
    </app-dialog>
  </q-item>
</template>

<script>
import { date } from 'quasar';
import { mapState, mapActions, mapGetters } from 'vuex';
import EditExpense from 'src/components/Expenses/Modals/EditExpense';
import mixinPrice from 'src/mixins/mixin-price';
import AppDialog from 'src/components/Shared/Dialog/Dialog';

export default {
  mixins: [mixinPrice],
  props: ['expense', 'collectionId'],
  data() {
    return {
      showEditExpense: false,
    };
  },
  computed: {
    ...mapState('categories', ['categories']),
    ...mapGetters('users', ['currentCollectionUsers']),
    paidByName() {
      const paidByUser = this
        .currentCollectionUsers
        .filter((user) => (user.id === this.expense.paidByUserId))
        .shift();

      if (!paidByUser) {
        return 'Unknown';
      }
      return paidByUser.name;
    },
    category() {
      const currentCategory = this
        .categories
        .filter((category) => (category.id === this.expense.categoryId))
        .shift();

      if (!currentCategory) {
        return {
          iconName: 'help_outline',
          iconColor: 'primary',
        };
      }
      return currentCategory;
    },
  },
  components: {
    EditExpense,
    AppDialog,
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
        this.deleteExpense(this.expense);
      });
    },
  },
};
</script>
