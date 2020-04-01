<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-form
      @submit="submitForm"
      ref="form"
    >
      <modal-expense-header>Add expense</modal-expense-header>

      <q-card-section class="q-pt-none">
        <modal-expense-name :name.sync="formData.name" />
        <modal-expense-price :price.sync="formData.price" />
        <modal-expense-date :date.sync="formData.date" />
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
  methods: {
    ...mapActions('expenses', ['addExpense']),
    saveExpense() {
      this.addExpense(this.formData);
      this.$emit('close');
    },
  },
};
</script>
