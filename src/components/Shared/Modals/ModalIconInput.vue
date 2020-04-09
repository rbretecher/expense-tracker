<template>
  <q-select
    outlined
    map-options
    emit-value
    use-input
    fill-input
    hide-selected
    :value="name"
    :options="options"
    @input="$emit('update:name', $event)"
    @filter="filter"
    :rules="[val => !!val || 'Please choose a value']"
    label="Icon"
  >
    <template v-slot:prepend>
      <q-icon name="insert_photo" />
    </template>
    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
      >
        <q-item-section avatar>
          <q-icon
            :name="scope.opt"
            :color="color"
          />
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
};
</script>
