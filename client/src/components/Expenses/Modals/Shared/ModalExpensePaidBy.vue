<template>
  <q-select
    outlined
    v-model="model"
    :options="selectOptions"
    map-options
    emit-value
    :rules="[(val) => !!val || 'Please choose a value']"
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
  emits: ['update:paidByUserId'],
  computed: {
    selectOptions() {
      return this.users.map((user) => ({ label: user.name, value: user.id }));
    },
    model: {
      get() {
        return this.paidByUserId;
      },
      set(val) {
        this.$emit('update:paidByUserId', val);
      },
    },
  },
};
</script>
