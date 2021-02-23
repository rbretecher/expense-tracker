<template>
  <q-input
    outlined
    :value="name"
    @input="$emit('update:name', $event)"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Please enter a name']"
    label="Name"
  >
    <template v-slot:prepend>
      <q-icon name="list_alt" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: ['name'],
};
</script>
