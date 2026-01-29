<template>
  <modal title="Add suggested expense" @success="saveSuggestedExpense">
    <modal-name-input
      v-model:name="formData.name"
      :autofocus="$q.platform.is.desktop"
    />
    <modal-expense-price v-model:price="formData.price" />
    <modal-expense-date v-model:date="formData.date" required />
    <modal-expense-paid-by
      v-model:paidByUserId="formData.paidByUserId"
      :users="users"
    />
    <modal-expense-category v-model:category="formData.categoryId" />
  </modal>
</template>

<script>
import mixinAddEditExpense from 'src/mixins/mixin-add-edit-expense';

export default {
  mixins: [mixinAddEditExpense],
  props: ['projectId', 'users', 'suggestedExpense'],
  methods: {
    saveSuggestedExpense() {
      this.$emit('save', { projectId: this.projectId, ...this.formData });
    },
  },
  mounted() {
    this.formData = {
      id: this.suggestedExpense.id,
      name: this.suggestedExpense.name,
      price: this.suggestedExpense.price,
      paidByUserId: this.suggestedExpense.paidByUserId,
      categoryId: this.suggestedExpense.categoryId,
    };
  },
};
</script>
