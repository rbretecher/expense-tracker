<template>
  <modal
    title="Edit category"
    @success="saveCategory"
  >
    <modal-name-input
      :name.sync="formData.name"
      autofocus="true"
      class="q-mb-sm"
    />

    <modal-icon-input :icon.sync="formData.icon" />
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditCategory from 'src/mixins/mixin-add-edit-category';

export default {
  mixins: [mixinAddEditCategory],
  props: ['id', 'category'],
  methods: {
    ...mapActions('categories', ['updateCategory']),
    saveCategory() {
      this.updateCategory({
        id: this.id,
        updates: this.formData,
      });
      this.$emit('close');
    },
  },
  mounted() {
    this.formData = { ...this.category };
  },
};
</script>
