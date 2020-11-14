<template>
  <modal
    title="Edit category"
    @success="saveCategory"
  >
    <modal-name-input
      :name.sync="formData.name"
      :autofocus="$q.platform.is.desktop"
    />
    <modal-icon-color-input
      :iconName.sync="formData.iconName"
      :iconColor.sync="formData.iconColor"
    />
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditCategory from 'src/mixins/mixin-add-edit-category';

export default {
  mixins: [mixinAddEditCategory],
  props: ['category'],
  methods: {
    ...mapActions('categories', ['updateCategory']),
    saveCategory() {
      this.updateCategory({
        id: this.category.id,
        ...this.formData,
      });
      this.$emit('close');
    },
  },
  mounted() {
    this.formData = {
      ...this.category,
      iconName: this.category.iconName,
      iconColor: this.category.iconColor,
    };
  },
};
</script>
