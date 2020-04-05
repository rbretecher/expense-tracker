<template>
  <modal
    title="Add category"
    @success="saveCategory"
  >
    <modal-category-name
      :name.sync="formData.name"
      autofocus="true"
      class="q-mb-sm"
    />

    <modal-category-icon :icon.sync="formData.icon" />
  </modal>
</template>

<script>
import mixinAddEditCategory from 'src/mixins/mixin-add-edit-category';
import { mapActions } from 'vuex';

export default {
  mixins: [mixinAddEditCategory],
  methods: {
    ...mapActions('categories', ['addCategory']),
    saveCategory() {
      this.addCategory(this.formData);
      this.$emit('close');
    },
  },
};
</script>
