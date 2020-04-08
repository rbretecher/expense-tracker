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
    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
      >
        <q-item-section avatar>
          <q-icon :name="scope.opt.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label v-html="scope.opt.label" />
          <q-item-label caption>{{ scope.opt.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['category'],
  computed: {
    ...mapGetters('categories', ['categories']),
    selectOptions() {
      return Object.keys(this.categories).map(
        (key) => ({
          label: this.categories[key].name,
          value: key,
          icon: this.categories[key].icon,
        }),
      );
    },
  },
};
</script>
