<template>
  <q-input
    outlined
    :value="color"
    @input="$emit('update:color', $event)"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Please enter a color']"
    label="Color"
  >
    <template v-slot:prepend>
      <q-icon name="palette" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: ['color'],
};
</script>
