<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-form
      @submit="submitForm"
      ref="form"
    >
      <modal-header class="q-mb-sm">{{ title }}</modal-header>

      <q-card-section class="q-pt-none">
        <slot></slot>
      </q-card-section>

      <modal-actions />
    </q-form>
  </q-card>
</template>

<script>
import ModalActions from 'src/components/Shared/Modals/ModalActions';
import ModalHeader from 'src/components/Shared/Modals/ModalHeader';

export default {
  props: ['title'],
  components: {
    ModalActions,
    ModalHeader,
  },
  methods: {
    submitForm() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.$emit('success');
        }
      });
    },
  },
};
</script>
