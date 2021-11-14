<template>
  <q-select
    outlined
    v-model="model"
    :options="selectOptions"
    map-options
    emit-value
    :rules="[(val) => !!val || 'Please choose a value']"
    label="Category"
  >
    <template v-slot:prepend>
      <q-icon name="category" />
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="scope.opt.iconName" :color="scope.opt.iconColor" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['category'],
  emits: ['update:category'],
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
    model: {
      get() {
        return this.category;
      },
      set(val) {
        this.$emit('update:category', val);
      },
    },
  },
};
</script>
