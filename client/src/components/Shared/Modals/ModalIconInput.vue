<template>
  <q-select
    outlined
    map-options
    emit-value
    use-input
    fill-input
    hide-selected
    v-model="model"
    :options="options"
    @filter="filter"
    :rules="[(val) => !!val || 'Please choose a value']"
    label="Icon"
  >
    <template v-slot:prepend>
      <q-icon name="insert_photo" />
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="scope.opt" :color="color" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import materialIcons from 'src/data/material-icons';

export default {
  props: ['name', 'color'],
  emits: ['update:name'],
  data() {
    return {
      options: materialIcons,
    };
  },
  methods: {
    filter(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.options = materialIcons.filter((option) => option.indexOf(needle) > -1);
      });
    },
  },
  computed: {
    model: {
      get() {
        return this.name;
      },
      set(val) {
        this.$emit('update:name', val);
      },
    },
  },
};
</script>
