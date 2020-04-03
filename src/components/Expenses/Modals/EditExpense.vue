<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-form
      @submit="submitForm"
      ref="form"
    >
      <modal-expense-header class="q-mb-sm">
        {{ formData.name || 'Edit expense' }}
      </modal-expense-header>

      <q-card-section class="q-pt-none">
        <modal-expense-name
          :name.sync="formData.name"
          class="q-mb-sm"
        />
        <modal-expense-price
          :price.sync="formData.price"
          class="q-mb-sm"
        />
        <modal-expense-date :date.sync="formData.date" />
        <modal-expense-paid-by :paidBy.sync="formData.paidBy" />
        <modal-expense-category :category.sync="formData.category" />
      </q-card-section>

      <modal-expense-actions />
    </q-form>
  </q-card>
</template>

<script>
import { buildPathFromDate } from 'src/functions/build-path-from-date';
import mixinAddEditExpense from 'src/mixins/mixin-add-edit-expense';
import { mapActions } from 'vuex';

export default {
  mixins: [mixinAddEditExpense],
  props: ['id', 'expense'],
  methods: {
    ...mapActions('expenses', ['updateExpense']),
    saveExpense() {
      this.updateExpense({
        id: this.id,
        path: this.path,
        updates: this.formData,
      });
      this.$emit('close');
    },
  },
  mounted() {
    this.path = buildPathFromDate(this.expense.date);
    this.formData = {
      ...this.expense,
    };
  },
};
</script>
