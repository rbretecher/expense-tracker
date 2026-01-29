<template>
  <modal title="Add recurring expense to project" @success="addRecurringExpenseToProject">
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
import mixinAddEditProjectUser from 'src/mixins/mixin-add-edit-project-recurring-expense';
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['project'],
  mixins: [mixinAddEditProjectUser],
  methods: {
    ...mapActions('projects', ['addProjectRecurringExpense']),
    addRecurringExpenseToProject() {
      const recurringProject = { projectId: this.project.id, ...this.formData };
      this.addProjectRecurringExpense(recurringProject);
      this.$emit('close');
    },
  },
  computed: {
    ...mapGetters('users', ['users']),
  },
};
</script>
