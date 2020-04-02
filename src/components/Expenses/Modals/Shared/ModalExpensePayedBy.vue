<template>
  <q-select
    outlined
    :value="payedBy"
    @input="$emit('update:payedBy', $event)"
    :options="selectOptions"
    map-options
    emit-value
    :rules="[val => !!val || 'Please choose a value']"
    label="Payed by"
  >
    <template v-slot:prepend>
      <q-icon name="person" />
    </template>
  </q-select>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['payedBy'],
  computed: {
    ...mapState('users', ['users']),
    selectOptions() {
      return Object.keys(this.users).map((key) => ({ label: this.users[key].name, value: key }));
    },
  },
};
</script>
