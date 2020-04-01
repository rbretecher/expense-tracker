<template>
  <q-input
    outlined
    :value="price"
    @input="$emit('update:price', $event)"
    lazy-rules
    :rules="[ val => val && val != 0 || 'Please enter a valid price']"
    clearable
    label="Price"
  />
</template>

<script>
export default {
  props: ['price'],
};
</script>
