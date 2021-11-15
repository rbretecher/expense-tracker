<template>
  <div class="row q-col-gutter-sm">
    <div class="col">
      <modal-icon-input v-model:name="iconNameSync" :color="iconColorSync" />
    </div>
    <div class="col">
      <modal-color-input v-model:color="iconColorSync" :name="iconNameSync" />
    </div>
  </div>
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
