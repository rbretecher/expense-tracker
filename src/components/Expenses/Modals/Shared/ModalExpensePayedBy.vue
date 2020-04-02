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
export default {
  props: ['payedBy'],
  data() {
    return {
      // @TODO : Create and add this to users-store
      users: [
        'Romain',
        'Madeline',
      ],
    };
  },
};
</script>
