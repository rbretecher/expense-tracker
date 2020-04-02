<template>
  <q-select
    outlined
    :value="payedBy"
    @input="$emit('update:payedBy', $event)"
    :options="users"
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
  },
};
</script>
