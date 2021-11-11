<template>
  <q-select
    outlined
    map-options
    emit-value
    use-input
    fill-input
    hide-selected
    :value="userId"
    :options="filterOptions"
    @input="$emit('update:userId', $event)"
    @filter="filter"
    :rules="[(val) => !!val || 'Please choose a value']"
    label="User"
  >
    <template v-slot:prepend>
      <q-icon name="face" />
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
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
export default {
  props: ['userId', 'users', 'projectUsers'],
  data() {
    return {
      filterOptions: [],
    };
  },
  computed: {
    options() {
      return this.users
        .filter((user) => !this.projectUsers.some((projectUser) => (user.id === projectUser.id)))
        .map(
          (user) => ({
            label: user.name,
            value: user.id,
            iconName: user.iconName,
            iconColor: user.iconColor,
          }),
        );
    },
  },
  methods: {
    filter(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.filterOptions = this.options.filter(
          (option) => option.label.toLowerCase().indexOf(needle) > -1,
        );
      });
    },
  },
};
</script>
