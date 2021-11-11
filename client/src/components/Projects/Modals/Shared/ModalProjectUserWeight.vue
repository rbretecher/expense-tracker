<template>
  <q-input
    outlined
    :value="weight"
    @input="$emit('update:weight', parseFloat($event))"
    lazy-rules
    :rules="[(val) => (val && val != 0) || 'Please enter a valid weight']"
    type="number"
    step="0.01"
    label="Weight"
  >
    <template v-slot:prepend>
      <q-icon name="donut_small" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: ['weight'],
};
</script>
