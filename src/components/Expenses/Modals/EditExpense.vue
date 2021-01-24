<template>
  <modal
    :title="formData.name || 'Edit expense'"
    @success="saveExpense"
  >
    <modal-name-input
      :name.sync="formData.name"
      :autofocus="$q.platform.is.desktop"
    />
    <modal-expense-price :price.sync="formData.price" />
    <modal-expense-date :date.sync="formData.date" />

    <modal-expense-paid-by
      :paidByUserId.sync="formData.paidByUserId"
      :users="users"
    />
    <modal-expense-category :category.sync="formData.categoryId" />
  </modal>
</template>

<script>
import mixinAddEditExpense from 'src/mixins/mixin-add-edit-expense';
import { mapActions, mapState } from 'vuex';

export default {
  mixins: [mixinAddEditExpense],
  props: ['expense', 'collectionId'],
  computed: {
    ...mapState('users', ['users']),
  },
  methods: {
    ...mapActions('expenses', ['updateExpense']),
    saveExpense() {
      this.updateExpense(this.formData);
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
