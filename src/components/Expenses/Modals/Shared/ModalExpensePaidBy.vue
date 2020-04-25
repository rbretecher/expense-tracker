<template>
  <q-select
    outlined
    :value="paidBy"
    @input="$emit('update:paidBy', $event)"
    :options="selectOptions"
    map-options
    emit-value
    :rules="[val => !!val || 'Please choose a value']"
    label="Paid by"
  >
    <template v-slot:prepend>
      <q-icon name="person" />
    </template>
  </q-select>
</template>

<script>
export default {
  props: ['paidBy', 'users'],
  computed: {
    selectOptions() {
      return Object.keys(this.users).map((key) => ({ label: this.users[key].name, value: key }));
    },
  },
};
</script>
