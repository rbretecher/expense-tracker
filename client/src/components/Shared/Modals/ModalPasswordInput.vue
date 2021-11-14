<template>
  <q-input
    outlined
    type="text"
    v-model="model"
    lazy-rules
    :rules="[(val) => (val && val.length > 0) || 'Please enter a password']"
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
  emits: ['update:password'],
  computed: {
    model: {
      get() {
        return this.password;
      },
      set(val) {
        this.$emit('update:password', val);
      },
    },
  },
};
</script>
