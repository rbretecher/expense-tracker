<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-form
      @submit="submitForm"
      ref="form"
    >
      <modal-expense-header class="q-mb-sm">Add expense</modal-expense-header>

      <q-card-section class="q-pt-none">
        <modal-expense-name
          :name.sync="formData.name"
          autofocus="true"
          class="q-mb-sm"
        />
        <modal-expense-price
          :price.sync="formData.price"
          class="q-mb-sm"
        />
        <modal-expense-date
          :date.sync="formData.date"
          :defaultDate="defaultDate"
        />
        <modal-expense-paid-by :paidBy.sync="formData.paidBy" />
        <modal-expense-category :category.sync="formData.category" />
      </q-card-section>

      <modal-expense-actions />
    </q-form>
  </q-card>
</template>

<script>
import mixinAddEditExpense from 'src/mixins/mixin-add-edit-expense';
import { mapActions } from 'vuex';

export default {
  mixins: [mixinAddEditExpense],
  props: ['year', 'month'],
  methods: {
    ...mapActions('expenses', ['addExpense']),
    saveExpense() {
      this.addExpense(this.formData);
      this.$emit('close');
    },
  },
  computed: {
    defaultDate() {
      return `01/${this.month.padStart(2, '0')}/${this.year.padStart(4, '0')}`;
    },
  },
};
</script>
