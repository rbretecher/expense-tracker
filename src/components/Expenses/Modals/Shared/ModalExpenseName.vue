<template>
  <q-input
    outlined
    :value="name"
    @input="$emit('update:name', $event)"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Please enter a name']"
    clearable
    label="Name"
  />
</template>

<script>
export default {
  props: ['name'],
};
</script>
