<template>
  <modal :title="formData.name || 'Edit expense'" @success="saveExpense">
    <modal-name-input
      v-model:name="formData.name"
      :autofocus="$q.platform.is.desktop"
    />
    <modal-expense-price v-model:price="formData.price" />
    <modal-expense-date v-model:date="formData.date" />

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
  props: ['expense', 'projectId', 'users'],
  methods: {
    saveExpense() {
      this.$emit('save', this.formData);
    },
  },
  mounted() {
    this.formData = {
      ...this.expense,
    };
  },
};
</script>
