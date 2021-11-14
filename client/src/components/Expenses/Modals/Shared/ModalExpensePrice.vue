<template>
  <q-input
    outlined
    v-model="model"
    lazy-rules
    :rules="[(val) => (val && val != 0) || 'Please enter a valid price']"
    type="number"
    step="0.01"
    label="Price"
    suffix="€"
  >
    <template v-slot:prepend>
      <q-icon name="euro_symbol" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: ['price'],
  emits: ['update:price'],
  computed: {
    model: {
      get() {
        return this.price;
      },
      set(val) {
        this.$emit('update:price', parseFloat(val));
      },
    },
  },
};
</script>
