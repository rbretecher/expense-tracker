<template>
  <modal
    title="Edit category"
    @success="saveCategory"
  >
    <q-input
      outlined
      v-model="formData.name"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please enter a name']"
      label="Name"
    >
      <template v-slot:prepend>
        <q-icon name="list_alt" />
      </template>
    </q-input>
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import Modal from 'src/components/Shared/Modals/Modal';

export default {
  props: ['id', 'category'],
  data() {
    return {
      formData: {
        name: null,
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
  },
  mounted() {
    this.formData = { ...this.category };
  },
};
</script>
