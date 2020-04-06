<template>
  <modal
    title="Add expense"
    @success="saveExpense"
  >
    <modal-expense-name
      :name.sync="formData.name"
      autofocus="true"
      class="q-mb-sm"
    />
    <modal-expense-price
      :price.sync="formData.price"
      class="q-mb-sm"
    />
    <modal-expense-date :date.sync="formData.date" />
    <modal-expense-paid-by :paidBy.sync="formData.paidBy" />
    <modal-expense-category :category.sync="formData.category" />
  </modal>
</template>

<script>
import mixinAddEditExpense from 'src/mixins/mixin-add-edit-expense';
import { mapActions } from 'vuex';

export default {
  mixins: [mixinAddEditExpense],
  props: ['collectionId'],
  methods: {
    ...mapActions('expenses', ['addExpense']),
    saveExpense() {
      this.addExpense({ collectionId: this.collectionId, expense: this.formData });
      this.$emit('close');
    },
  },
};
</script>
