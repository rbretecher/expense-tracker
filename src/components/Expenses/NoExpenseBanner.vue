<template>
  <q-banner
    rounded
    class="bg-grey-3"
  >
    <template v-slot:avatar>
      <q-icon
        name="help_outline"
        color="primary"
      />
    </template>
    There is no expense in this collection. Add a new expense and it will show up here.
    <template v-slot:action>

      <q-btn
        unelevated
        outline
        icon="add_circle"
        type="submit"
        color="primary"
        label="Add an expense"
        @click="$emit('update:showAddExpense', true)"
      />
    </template>
  </q-banner>
</template>

<script>
export default {
  props: ['showAddExpense'],
};
</script>
