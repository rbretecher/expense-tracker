<template>
  <q-input
    outlined
    v-model="model"
    lazy-rules
    :rules="[(val) => (val && val.length > 0) || 'Please enter an email']"
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
  emits: ['update:email'],
  computed: {
    model: {
      get() {
        return this.email;
      },
      set(val) {
        this.$emit('update:email', val);
      },
    },
  },
};
</script>
