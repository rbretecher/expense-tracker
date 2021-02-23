<template>
  <q-select
    outlined
    :value="paidByUserId"
    @input="$emit('update:paidByUserId', $event)"
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
  props: ['paidByUserId', 'users'],
  computed: {
    selectOptions() {
      return this.users.map((user) => ({ label: user.name, value: user.id }));
    },
  },
};
</script>
