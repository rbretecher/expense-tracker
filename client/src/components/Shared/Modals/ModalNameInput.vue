<template>
  <q-input
    outlined
    v-model="model"
    lazy-rules
    :rules="[(val) => (val && val.length > 0) || 'Please enter a name']"
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
  emits: ['update:name'],
  computed: {
    model: {
      get() {
        return this.name;
      },
      set(val) {
        this.$emit('update:name', val);
      },
    },
  },
};
</script>
