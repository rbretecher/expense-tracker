<template>
  <q-dialog
    :value="showDialog"
    @input="$emit('update:showDialog', $event)"
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
  computed: {
    position() {
      return this.$q.platform.is.desktop ? 'top' : 'standard';
    },
  },
};
</script>
