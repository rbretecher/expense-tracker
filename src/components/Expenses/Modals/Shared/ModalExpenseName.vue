<template>
  <q-input
    outlined
    :value="name"
    @input="$emit('update:name', $event)"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Please enter a name']"
    clearable
    label="Name"
    :autofocus="autofocus"
  >
    <template v-slot:prepend>
      <q-icon name="list_alt" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: [
    'name',
    {
      autofocus: {
        default: false,
      },
    }],
};
</script>
