<template>
  <q-input
    outlined
    :value="email"
    @input="$emit('update:email', $event)"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Please enter an email']"
    label="Email"
  >
    <template v-slot:prepend>
      <q-icon name="email" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: ['email'],
};
</script>
