<template>
  <q-input
    outlined
    type="text"
    :value="password"
    @input="$emit('update:password', $event)"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Please enter a password']"
    label="Password"
  >
    <template v-slot:prepend>
      <q-icon name="lock" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: ['password'],
};
</script>
