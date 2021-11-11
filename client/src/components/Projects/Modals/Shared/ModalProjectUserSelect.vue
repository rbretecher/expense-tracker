<template>
  <q-select
    outlined
    :value="userId"
    @input="$emit('update:userId', $event)"
    :options="options"
    map-options
    emit-value
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
  props: ['userId', 'users'],
  computed: {
    options() {
      return this.users
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
};
</script>
