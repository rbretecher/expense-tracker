<template>
  <modal title="Edit project recurring expense" @success="saveProjectRecurringExpense">
    <modal-name-input
      v-model:name="formData.name"
      :autofocus="$q.platform.is.desktop"
    />
    <modal-expense-price v-model:price="formData.price" />
    <modal-expense-date v-model:date="formData.startPeriod" required />
    <modal-expense-date v-model:date="formData.endPeriod" />
    <modal-expense-paid-by
      v-model:paidByUserId="formData.paidByUserId"
      :users="project.users"
    />
    <modal-expense-category v-model:category="formData.categoryId" />
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditProjectRecurringExpense from 'src/mixins/mixin-add-edit-project-recurring-expense';

export default {
  mixins: [mixinAddEditProjectRecurringExpense],
  props: ['recurringExpense', 'project'],
  methods: {
    ...mapActions('projects', ['updateProjectRecurringExpense']),
    saveProjectRecurringExpense() {
      this.updateProjectRecurringExpense({
        projectId: this.project.id,
        ...this.formData,
      });
      this.$emit('close');
    },
  },
  mounted() {
    this.formData = {
      id: this.recurringExpense.id,
      categoryId: this.recurringExpense.categoryId,
      paidByUserId: this.recurringExpense.paidByUserId,
      name: this.recurringExpense.name,
      price: this.recurringExpense.price,
      startPeriod: this.recurringExpense.startPeriod,
      endPeriod: this.recurringExpense.endPeriod ?? null,
    };
  },
};
</script>
