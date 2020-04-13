<template>
  <q-header
    elevated
    class="bg-white text-primary"
  >
    <q-toolbar v-if="$q.platform.is.desktop">
      <q-icon
        v-if="$q.platform.is.desktop"
        name="timeline"
        size="24px"
      />
      <q-toolbar-title class="text-bold">
        Expense Tracker
      </q-toolbar-title>
    </q-toolbar>

    <q-toolbar
      v-else
      class="toolbar"
    >
      <q-btn
        flat
        dense
        round
        icon="menu"
        @click="$emit('update:leftDrawerOpen', !leftDrawerOpen)"
      />
      <q-toolbar-title class="text-bold absolute-center">
        {{ currentPage }}
      </q-toolbar-title>

      <q-btn
        v-if="toolbarAction"
        flat
        dense
        round
        icon="add"
        @click="toolbarAction.action"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['leftDrawerOpen'],
  computed: {
    ...mapState('app', ['currentPage', 'toolbarAction']),
  },
};
</script>

<style scoped>
.toolbar {
  justify-content: space-between;
}
</style>
