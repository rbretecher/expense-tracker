<template>
  <modal title="Add category" @success="saveCategory">
    <modal-name-input
      v-model:name="formData.name"
      :autofocus="$q.platform.is.desktop"
    />
    <modal-icon-color-input
      v-model:iconName="formData.iconName"
      v-model:iconColor="formData.iconColor"
    />
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
