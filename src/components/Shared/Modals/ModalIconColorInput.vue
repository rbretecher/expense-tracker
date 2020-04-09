<template>
  <q-item class="no-padding">
    <q-item-section>
      <modal-icon-input
        :name.sync="icon.name"
        :color="icon.color"
      />
    </q-item-section>
    <q-item-section>
      <modal-color-input
        :color.sync="icon.color"
        :name="icon.name"
      />
    </q-item-section>
  </q-item>
</template>

<script>
import ModalIconInput from 'src/components/Shared/Modals/ModalIconInput';
import ModalColorInput from 'src/components/Shared/Modals/ModalColorInput';

export default {
  props: ['icon'],
  components: {
    ModalIconInput,
    ModalColorInput,
  },
};
</script>
