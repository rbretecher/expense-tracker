<template>
  <modal
    title="Add expense"
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
      :users="currentCollectionUsers"
    />
    <modal-expense-category :category.sync="formData.categoryId" />
  </modal>
</template>

<script>
import mixinAddEditExpense from 'src/mixins/mixin-add-edit-expense';
import { mapActions, mapGetters } from 'vuex';

export default {
  mixins: [mixinAddEditExpense],
  props: ['collectionId'],
  computed: {
    ...mapGetters('users', ['currentCollectionUsers']),
  },
  methods: {
    ...mapActions('expenses', ['addExpense']),
    saveExpense() {
      this.addExpense({ collectionId: this.collectionId, ...this.formData });
      this.$emit('close');
    },
  },
};
</script>
