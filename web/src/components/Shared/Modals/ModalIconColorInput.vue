<template>
  <q-item class="no-padding">
    <q-item-section>
      <modal-icon-input
        :name.sync="iconNameSync"
        :color="iconColorSync"
      />
    </q-item-section>
    <q-item-section>
      <modal-color-input
        :color.sync="iconColorSync"
        :name="iconNameSync"
      />
    </q-item-section>
  </q-item>
</template>

<script>
import ModalIconInput from 'src/components/Shared/Modals/ModalIconInput';
import ModalColorInput from 'src/components/Shared/Modals/ModalColorInput';

export default {
  props: ['iconName', 'iconColor'],
  data() {
    return {
      iconNameSync: this.iconName,
      iconColorSync: this.iconColor,
    };
  },
  watch: {
    iconName(val) {
      this.iconNameSync = val;
    },
    iconColor(val) {
      this.iconColorSync = val;
    },
    iconNameSync(val) {
      this.$emit('update:iconName', val);
    },
    iconColorSync(val) {
      this.$emit('update:iconColor', val);
    },
  },
  components: {
    ModalIconInput,
    ModalColorInput,
  },
};
</script>
