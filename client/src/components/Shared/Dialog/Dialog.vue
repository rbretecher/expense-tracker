<template>
  <q-dialog
    v-model="model"
    :full-width="!$q.platform.is.desktop"
    :position="position"
    no-refocus
  >
    <slot></slot>
  </q-dialog>
</template>

<script>
export default {
  props: ['showDialog'],
  emits: ['update:showDialog'],
  computed: {
    position() {
      return this.$q.platform.is.desktop ? 'top' : 'standard';
    },
    model: {
      get() {
        return this.showDialog;
      },
      set(val) {
        this.$emit('update:showDialog', val);
      },
    },
  },
};
</script>
