<template>
  <modal
    title="Edit category"
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
import { mapActions } from 'vuex';
import Modal from 'src/components/Shared/Modals/Modal';
import ModalCategoryName from 'src/components/Categories/Modals/Shared/ModalCategoryName';
import ModalCategoryIcon from 'src/components/Categories/Modals/Shared/ModalCategoryIcon';

export default {
  props: ['id', 'category'],
  data() {
    return {
      formData: {
        name: null,
        icon: null,
      },
    };
  },
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
  components: {
    Modal,
    ModalCategoryName,
    ModalCategoryIcon,
  },
  mounted() {
    this.formData = { ...this.category };
  },
};
</script>
