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
          <q-icon
            :name="scope.opt.iconName"
            :color="scope.opt.iconColor"
          />
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
      return this.categories.map(
        (category) => ({
          label: category.name,
          value: category.id,
          iconName: category.iconName,
          iconColor: category.iconColor,
        }),
      );
    },
  },
};
</script>
