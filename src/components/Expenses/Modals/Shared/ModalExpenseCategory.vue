<template>
  <q-select
    outlined
    :value="category"
    @input="$emit('update:category', $event)"
    :options="selectOptions"
    map-options
    emit-value
    :rules="[val => !!val || 'Please choose a value']"
    label="Category"
  >
    <template v-slot:prepend>
      <q-icon name="category" />
    </template>
  </q-select>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['category'],
  computed: {
    ...mapState('categories', ['categories']),
    selectOptions() {
      return Object.keys(this.categories).map(
        (key) => ({ label: this.categories[key].name, value: key }),
      );
    },
  },
};
</script>
