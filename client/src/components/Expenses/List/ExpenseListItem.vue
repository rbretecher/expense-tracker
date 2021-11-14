<template>
  <q-item clickable v-ripple @click="showEditExpense = true">
    <q-item-section avatar>
      <q-icon :name="category.iconName" :color="category.iconColor" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ expense.name }}</q-item-label>
      <q-item-label caption>Paid by {{ paidByName }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label>{{ formatPrice(expense.price) }}</q-item-label>
      <q-item-label caption>{{ formatDate(expense.date) }}</q-item-label>
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

    <app-dialog v-model:showDialog="showEditExpense">
      <edit-expense
        :expense="expense"
        :projectId="projectId"
        :users="users"
        @save="handleUpdateExpense"
      />
    </app-dialog>
  </q-item>
</template>

<script>
import { date, Loading, Notify } from 'quasar';
import { mapState, mapActions } from 'vuex';
import EditExpense from 'src/components/Expenses/Modals/EditExpense';
import mixinPrice from 'src/mixins/mixin-price';
import AppDialog from 'src/components/Shared/Dialog/Dialog';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';

export default {
  mixins: [mixinPrice],
  props: ['expense', 'projectId', 'month', 'users'],
  data() {
    return {
      showEditExpense: false,
    };
  },
  computed: {
    ...mapState('categories', ['categories']),
    paidByName() {
      const paidByUser = this
        .users
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
  methods: {
    ...mapActions('expenses', ['updateExpense', 'deleteExpense']),
    ...mapActions('projects', ['loadProjects', 'loadProjectMonth']),
    async handleUpdateExpense(expense) {
      try {
        Loading.show();
        await this.updateExpense(expense);
        await this.loadProjectMonth({ projectId: this.projectId, month: this.month });
        await this.loadProjects();
        Loading.hide();
        this.showEditExpense = false;
        Notify.create('Expense updated!');
      } catch (e) {
        showErrorMessageWithTitle('Could not update expense', e.message);
      }
    },
    confirmDeleteExpense() {
      this.$q.dialog({
        icon: 'delete',
        title: 'Delete expense',
        message: 'Are you sure you want to delete this expense ?',
        ok: true,
        cancel: true,
      }).onOk(async () => {
        try {
          Loading.show();
          await this.deleteExpense(this.expense);
          await this.loadProjectMonth({ projectId: this.projectId, month: this.month });
          await this.loadProjects();
          Loading.hide();
          Notify.create('Expense deleted!');
        } catch (e) {
          showErrorMessageWithTitle('Could not delete expense', e.message);
        }
      });
    },
    formatDate(value) {
      return date.formatDate(value, 'DD/MM/YYYY');
    },
  },
};
</script>
