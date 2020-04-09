<template>
  <q-select
    outlined
    map-options
    emit-value
    use-input
    fill-input
    hide-selected
    :value="color"
    :options="options"
    @input="$emit('update:color', $event)"
    @filter="filter"
    :rules="[val => !!val || 'Please choose a value']"
    label="Color"
  >
    <template v-slot:prepend>
      <q-icon name="palette" />
    </template>
    <template v-slot:option="scope">
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
      >
        <q-item-section avatar>
          <q-icon
            :name="name"
            :color="scope.opt"
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
import colorPalette from 'src/data/color-palette';

export default {
  props: ['color', 'name'],
  data() {
    return {
      options: colorPalette,
    };
  },
  methods: {
    filter(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.options = colorPalette.filter((option) => option.indexOf(needle) > -1);
      });
    },
  },
};
</script>
