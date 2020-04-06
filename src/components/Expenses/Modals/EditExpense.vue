<template>
  <modal
    :title="formData.name || 'Edit expense'"
    @success="saveExpense"
  >
    <modal-expense-name
      :name.sync="formData.name"
      class="q-mb-sm"
      autofocus
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
  props: ['id', 'expense', 'collectionId'],
  methods: {
    ...mapActions('expenses', ['updateExpense']),
    saveExpense() {
      this.updateExpense({
        id: this.id,
        collectionId: this.collectionId,
        updates: this.formData,
      });
      this.$emit('close');
    },
  },
  mounted() {
    this.formData = {
      ...this.expense,
    };
  },
};
</script>
